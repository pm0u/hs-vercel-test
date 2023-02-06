/** @module nextIsNow/transformations */

type Coordinate = [number, number]

/**
 * Manages the craziness that is the transformation animations of the NIN microsite, and related hijinx including:
 * - Loading Screen
 * - Cellular automata background
 * - Assigining draggability to GUI elements
 *
 * In short, the GUI elements transform simply by changing the class and havin a CSS transition animate all changes.
 * We randomize the transition delay for every element, and give the transition a funny bezier curve.
 * This gives the element a glitchy effect when changing.
 *
 * Uses PIXI to draw/manage the backgrounds.  The background is divided into squares.  Each UI element "claims" the nearest squares.
 * When the transformation animation for a given element is triggered, it progressively removes its claimed squares
 *
 * @see https://pixijs.com/
 * @function transformations
 */
const transformations = async function (pageContainer: HTMLElement) {
  // -------------------------------------------------------------------------------------------
  // LOADING
  // -------------------------------------------------------------------------------------------

  // Animate the loading screen (number of dots increases over time)
  const loadingAnimationInterval = setInterval(() => {
    const progressIndicator = document.querySelector(
      ".nin__loading-screen__card__progress-indicator"
    )

    if (progressIndicator !== null)
      progressIndicator.textContent = `${progressIndicator.textContent ?? ""}.`
  }, 100)

  // We have two HEAVY dependencies, PIXI and makeDraggable (which uses interact.js)
  // They should not be directly included, as they would be loaded on all pages.
  // Dynamically import them
  const PIXI = await import(/* webpackChunkName: "pixi" */ "pixi.js")
  const { makeDraggable } = await import(
    /* webpackChunkName: "nin-make-draggable" */ "./makeDraggable"
  )

  // Let's keep track of the things that need to happen in order to remove the loading screen
  const loadingChecklist = {
    // documentLoaded: false, // We want the document to fully load, we'll handle this imminently
    pixiReady: false, // We want PIXI to finish its ownership claiming process, we'll handle this after the PIXI claming process is complete
    // Implicitly, we want the scripts above to load, but that blocks the thread, so by the time we get here that's done
  }

  // A check to see if we have loaded the experience
  const isLoaded = () => {
    return loadingChecklist.pixiReady // && loadingChecklist.documentLoaded
  }

  // This is a custom event that will start the clock for time-based transformations
  const transformationExperienceLoaded = new Event(
    "transformation-experience-loaded"
  )

  // Check if we've loaded. If so, start the experience.
  // We'll run this every time we complet an item on our loadingChecklist
  function startExperienceIfLoaded() {
    if (isLoaded()) {
      // Remove loading classes
      document
        .querySelector(".nin__loading-screen")
        ?.classList.add("nin__loading-screen--site-loaded")
      document.querySelector(".nin")?.classList.add("nin--loaded")

      // Stop loading anim
      clearInterval(loadingAnimationInterval)

      // Let the world know with our custom event
      document.dispatchEvent(transformationExperienceLoaded)
    }
  }

  // // Update our checklist and check if we should begin when document loads
  // $(window).on("load",()=> {
  //   loadingChecklist.documentLoaded = true
  //   startExperienceIfLoaded()
  // })

  // Get debugging options from URL
  // Can append ?verision=old or ?version=new to the url force one state
  const urlParams = new URLSearchParams(location.search)

  // -------------------------------------------------------------------------------------------
  // INIT PIXI AND BUILD THE BACKGROUND
  // -------------------------------------------------------------------------------------------
  // We're gonna build a PIXI.js managed canvas covering the whole document housing a grid of nPixelsWide x nPixelsTall pixels (each pixelSize x pixelSize)
  // UNRELATED to CSS Grid--also used in this project, but that's not what we're talking about here

  if (pageContainer.querySelector("canvas") !== null) {
    Array.from(pageContainer.querySelectorAll("canvas")).forEach((canvas) =>
      pageContainer.removeChild(canvas)
    )
  }

  // Calculate size based on document size
  const canvasWidth = pageContainer.clientWidth
  const canvasHeight = pageContainer.clientHeight // + parseFloat($('html').css('margin-top'))
  const pixelSize = Math.ceil(Math.max(15, canvasWidth / 100) / 2) * 2 // We want a pixel size of 15 if possible, but with a limit if the screen is too big (too many pixels = memory hog)
  const nPixelsWide = Math.ceil(canvasWidth / pixelSize)
  const nPixelsTall = Math.ceil(canvasHeight / pixelSize)

  const setBgSize = () => {
    const bg = pageContainer.querySelector(".nin")
    const canvasWidth = pageContainer.clientWidth
    const canvasHeight = pageContainer.clientHeight // + parseFloat($('html').css('margin-top'))
    if (bg !== null) {
      ;(bg as HTMLElement).style.width = `${canvasWidth}px`
      ;(bg as HTMLElement).style.height = `${canvasHeight}px`
    }
  }

  setBgSize()

  // Make and configure our PIXI canvas
  const app = new PIXI.Application({
    width: canvasWidth,
    height: canvasHeight,
    backgroundAlpha: 0, // make transparent
    resizeTo: pageContainer,
  })
  const pixiCanvas = pageContainer.appendChild(app.view)
  pixiCanvas.classList.add("nin__background")
  const container = new PIXI.Container()
  app.stage.addChild(container)

  // Dynamically render a pixel-sized black and white checkerboard background.  Save as a texture.
  // We probably coulda prebaked a graphic, but because we don't know the size of the pixels its nice to make it on the fly.
  const pixelGraphic = new PIXI.Graphics()
  let color = 0x000000
  for (let i = 0; i < pixelSize; i++) {
    for (let j = 0; j < pixelSize; j++) {
      pixelGraphic.beginFill(color)
      pixelGraphic.drawRect(i, j, 1, 1)
      pixelGraphic.endFill()
      color = color === 0x000000 ? 0xffffff : 0x000000
    }
  }
  const pixelTexture = app.renderer.generateTexture(pixelGraphic)

  // These arrays will house most our data
  const pixels: any[] = [] // A 2dim array [i][j] to house an object for each pixel
  const coordList: any[] = [] // For easier filtering, an array of coordinate arrays [i,j] corresponding to each pixel

  // Loop through and make these bad boys!
  // Loop through rows
  for (let i = 0; i < nPixelsWide; i++) {
    pixels[i] = []

    // Loop through columns
    for (let j = 0; j < nPixelsTall; j++) {
      pixels[i][j] = {
        owner: false, // Which transforming module owns this pixel?
        sprite: new PIXI.Sprite(pixelTexture), // PIXI sprite object for this pixel
      }

      // Position the sprite and put it on the PIXI stage
      pixels[i][j].sprite.position.x = i * pixelSize
      pixels[i][j].sprite.position.y = j * pixelSize
      container.addChild(pixels[i][j].sprite)

      // Note that this coordinate exists for our coordList
      coordList.push([i, j])
    }
  }

  // -------------------------------------------------------------------------------------------
  // SET UP PIXELS "CLAIMING"
  // -------------------------------------------------------------------------------------------
  // Every transformable module must claim the background pixels that will transform along with it
  // And we want all pixels claimed
  // The below is process of giving all pixels a pixel.owner
  // We will use a cellular automata pattern to do the claiming
  // Seed pixels will be claimed at random positions in the transforming element
  // At every iteration, the pixels surrounding a newly-claimed pixel will be claimed--UNLESS that pixel is already claimed
  // In essence, pixel ownership will "spread out" behind each transformable module until "borders" are made

  // We'll use this house pixels that will be claimed next iteration
  // For fast lookup using key=>value pairs: This is an object.
  // Each pixel will be stored under a key (string derived from its [i,j] coords)
  // with value [coord,owner]
  // We use a queue because its faster, easer to run our cellular automata algorithm
  let pixelsClaimQueue: Record<string, [Coordinate, number]> = {}

  // Generate a unique string from the coords that can be used as a key for the entry in the queue object
  // Again, this makes it easy to fast lookup.
  // E.g. Suppose you wanted to see if pixel with coordinates [8,9] is in the queue.
  // Rather than loop or filter slowly, you can just reference it directly with they key created here e.g. pixelsClaimQueue['8,9']
  function getKeyFromCoord(coord: Coordinate) {
    return `${coord[0]},${coord[1]}`
  }

  // Add pixel with [i,j] coordinates `coord` to be queued to take the owner `owner`
  function queuePixelToClaim(coord: Coordinate, owner: number) {
    // If its out of grid range, already in queue, or already owned, dont add it.
    if (
      coord[0] < 0 ||
      coord[1] < 0 ||
      coord[0] >= nPixelsWide ||
      coord[1] >= nPixelsTall ||
      typeof pixelsClaimQueue[getKeyFromCoord(coord)] !== "undefined" ||
      isClaimed(coord)
    )
      return

    // Add to the queue
    pixelsClaimQueue[getKeyFromCoord(coord)] = [coord, owner]
  }

  // Queue pixel for claim not with [i,j] coordinates but via x,y coordinates corresponding to the document
  // This is useful to claim a pixel e.g. in the center of an element (without knowing what [i,j] that corresponds to)
  function queuePixelToClaimXY(x: number, y: number, owner: number) {
    const coord = [Math.floor(x / pixelSize), Math.floor(y / pixelSize)] // Calc [i,j]
    queuePixelToClaim(coord as Coordinate, owner)
  }

  // This function actually claims a pixel at `coord` [i,j] for `owner`
  function claimPixel(coord: Coordinate, owner: number) {
    pixels[coord[0]][coord[1]].owner = owner
  }

  // Check if a pixel is claimed at `coord` [i,j]
  function isClaimed(coord: Coordinate) {
    return pixels[coord[0]][coord[1]].owner !== false
  }

  // OK.  This is our claiming process/algorithm.
  // It will run after each transformable element drops seeds into the queue
  const runClaimingProcess = () => {
    let iteration = 0
    const maxIterationsAllowed = 1000
    while (Object.keys(pixelsClaimQueue).length !== 0) {
      // When the queue is empty, we are done.

      // Copy and clear our quee
      const previousPixelsClaimQueue = {
        ...pixelsClaimQueue,
      }
      pixelsClaimQueue = {}

      // Loop through all queue entries
      const claimKeys = Object.keys(previousPixelsClaimQueue)
      for (let n = 0, nQueued = claimKeys.length; n < nQueued; n++) {
        // Alias the data for this pixel for easy reference
        const [coords, owner] = previousPixelsClaimQueue[claimKeys[n]]
        const [i, j] = coords

        // Claim the ownder outright
        claimPixel(coords, owner)

        // Now queue its neighbors
        queuePixelToClaim([i, j - 1], owner)
        queuePixelToClaim([i, j + 1], owner)
        queuePixelToClaim([i + 1, j], owner)
        queuePixelToClaim([i - 1, j], owner)
        // If you just did the above, everything would be diamond-y shaped with hard edges.
        // Because the above IS a diamond surrounding this pixel
        // We dont really want straight angular lines
        // We can approximate a more circlular shape by queuing its far away neihbors with a percentage chance
        // These numbers are not derived, but rather found by playing around
        // Changing them alters the shape/character of the claimed territories substantially!
        if (Math.random() > 0.5) queuePixelToClaim([i - 1, j - 1], owner)
        if (Math.random() > 0.5) queuePixelToClaim([i + 1, j + 1], owner)
        if (Math.random() > 0.5) queuePixelToClaim([i - 1, j + 1], owner)
        if (Math.random() > 0.5) queuePixelToClaim([i + 1, j - 1], owner)
        if (Math.random() > 0.8) queuePixelToClaim([i, j - 2], owner)
        if (Math.random() > 0.8) queuePixelToClaim([i, j + 2], owner)
        if (Math.random() > 0.8) queuePixelToClaim([i + 2, j], owner)
        if (Math.random() > 0.8) queuePixelToClaim([i - 2, j], owner)
      }

      // Theoretically this while loop shouldn't hang, but just to be safe...
      iteration++
      if (iteration === maxIterationsAllowed) {
        console.error(
          "Pixel claiming algorithm for background animations froze, breaking..."
        )
        break
      }
    }
    // This process reliably completes without unclaimed orphan pixels

    // At this point, our masterpiece is ready to be revealed
    loadingChecklist.pixiReady = true
    startExperienceIfLoaded()
  }

  // -------------------------------------------------------------------------------------------
  // SET UP PIXELS "TRANSFORMING"
  // -------------------------------------------------------------------------------------------

  // When a transformable element transforms, we want the pixels behind it to transform as well
  // We want an animation that spreads outward from the center of the module
  // We want that spread to stop when it encounters pixels of different owner
  // ("transforming pixels" merely dissappear,revealing the background behind them)
  // We will use a VERY similar cellular automata pattern here--but with each iteration happening in a different animation frame
  // Read claiming section above, as they are very similar--and Ill refer to it

  // Transform queue (just like with claiming)
  let pixelsTransformQueue: Record<string, [Coordinate, number]> = {}

  // Queue a pixel to transform
  function queuePixelToTransform(coord: Coordinate, owner: number) {
    // If in bounds, if not in queue already, if not already transformed
    if (
      coord[0] < 0 ||
      coord[1] < 0 ||
      coord[0] >= nPixelsWide ||
      coord[1] >= nPixelsTall ||
      typeof pixelsTransformQueue[getKeyFromCoord(coord)] !== "undefined" ||
      isTransformed(coord)
    )
      return

    // If this pixel has a different owner, instead of transforming it, we will bring its alpha down to 0.5
    // This is just a cool visual and makes it appear like there is a border on the transformation edge
    if (getOwner(coord) !== owner) {
      pixels[coord[0]][coord[1]].sprite.alpha = 0.5
      return
    }

    // Still here? Add it.
    pixelsTransformQueue[getKeyFromCoord(coord)] = [coord, owner]
  }

  // We will also want to able to queue things via document coordinate [x,y] instead of grid [i,j]
  function queuePixelToTransformXY(x: number, y: number, owner: number) {
    const coord = [Math.floor(x / pixelSize), Math.floor(y / pixelSize)]
    queuePixelToTransform(coord as Coordinate, owner)
  }

  // Utility functions to get data about a pixel with `coord` [i,j]
  function getOwner(coord: Coordinate) {
    return pixels[coord[0]][coord[1]].owner
  }

  function isTransformed(coord: Coordinate) {
    return pixels[coord[0]][coord[1]].sprite.alpha === 0
  }

  // Transform the pixel
  function transformPixel(coord: Coordinate) {
    pixels[coord[0]][coord[1]].sprite.alpha = 0
  }

  // This is DIRECTLY analogous to our claim process algorithm (almost to the point of not being DRY...)
  // The only difference is that it is hooking into PIXI's animation ticker, which runs every frame
  // So rather than loop until all iterations are done, we iterate once per frame--and get a dope animation
  // Importantly, it runs constantly in the background, waiting for new pixels to be queued
  // TODO: stop this after transformation is fully done
  app.ticker.add((delta) => {
    // Copy and clear our queue
    const transformingPixels = {
      ...pixelsTransformQueue,
    }
    pixelsTransformQueue = {}

    // Loop through
    const transformKeys = Object.keys(transformingPixels)
    for (let n = 0, nQueued = transformKeys.length; n < nQueued; n++) {
      const [coords, owner] = transformingPixels[transformKeys[n]]
      const [i, j] = coords
      transformPixel(coords)
      queuePixelToTransform([i, j - 1], owner)
      queuePixelToTransform([i, j + 1], owner)
      queuePixelToTransform([i + 1, j], owner)
      queuePixelToTransform([i - 1, j], owner)
      if (Math.random() > 0.5) queuePixelToTransform([i - 1, j - 1], owner)
      if (Math.random() > 0.5) queuePixelToTransform([i + 1, j + 1], owner)
      if (Math.random() > 0.5) queuePixelToTransform([i - 1, j + 1], owner)
      if (Math.random() > 0.5) queuePixelToTransform([i + 1, j - 1], owner)
      if (Math.random() > 0.8) queuePixelToTransform([i, j - 2], owner)
      if (Math.random() > 0.8) queuePixelToTransform([i, j + 2], owner)
      if (Math.random() > 0.8) queuePixelToTransform([i + 2, j], owner)
      if (Math.random() > 0.8) queuePixelToTransform([i - 2, j], owner)
    }
  })

  // -------------------------------------------------------------------------------------------
  // CREATE TRANSFORMABLE ELEMENTS
  // -------------------------------------------------------------------------------------------

  // OK! We're getting there.  Now we need to create the elements that transform
  // They will seed the claim and transform algorithms

  // Grab them from the dom
  const listeners = Array.from(
    document.querySelectorAll(".nin__transformable")
  ).map((element, index) => {
    const $transformable = element as HTMLElement

    // Add randomized transition and animation timing to every child element
    // In CSS, each element is given a little bounce animation (with the duration randomized below)
    // In CSS, each property (all) is given a transition (with delay randomized here)
    // Also the easing function is a really crazy curve
    // The result is literally every CSS change animates in the transformation
    // Chaos ensues
    Array.from($transformable.querySelectorAll("*")).forEach((el) => {
      const element = el as HTMLElement
      const duration = Math.random() * 0.5
      element.style.transitionDelay = `${duration * 0.9}s`
      element.style.animationDelay = `${duration}s`
    })

    // Let's get our seed pixels

    // Information
    const w = $transformable.offsetWidth
    const h = $transformable.offsetHeight
    const top = $transformable.offsetTop
    const left = $transformable.offsetLeft
    const ownerIndex = index + 1 // The number that reflects ownership by this element. Lets not allow 0 so we avoid falsy issues.

    // Create an array of seed document coordinates [x,y]
    // These will be randomly generated across the height and width of our element
    const seeds: Coordinate[] = []
    const nSeeds = 20
    for (let i = 0; i < nSeeds; i++) {
      seeds.push([left + Math.random() * w, top + Math.random() * h])
    }

    // Add our seeds to the queue
    for (const seed of seeds) {
      queuePixelToClaimXY(seed[0], seed[1], ownerIndex)
    }

    // A function that, when called in a variety of cases, initiates transformation of this element
    const transformMe = () => {
      // We dont' transform if debug ?version=old
      if (urlParams.get("version") === "old") return

      // Tell the css we've transformed (our animation and transitions will take it from there)
      $transformable.classList.add("nin__transformable--transformed")

      // A split second later, add all of our seeds to the transformation queue
      setTimeout(() => {
        for (const seed of seeds) {
          queuePixelToTransformXY(seed[0], seed[1], ownerIndex)
        }
      }, 100)

      // Our transformation algorithm sometimes leaves untransformed orphans
      // Find them and destroy them.
      // After 800ms, transform each of them with a random delay
      setTimeout(() => {
        const myOwnedCoords = coordList.filter((coord) => {
          // This is where coordList comes in handy
          return pixels[coord[0]][coord[1]].owner === ownerIndex
        })
        const myUntransformed = myOwnedCoords.filter((coord) => {
          return !isTransformed(coord)
        })
        myUntransformed.forEach((coord) => {
          setTimeout(() => {
            transformPixel(coord)
          }, Math.random() * 300)
        })
      }, 800)
    }

    // On scroll, trigger transformation if the top of this unit scolls above halfway up the window
    // or if we hit the bottom
    const transformMeIfInView = () => {
      if (
        window.innerHeight * 0.5 > element.getBoundingClientRect().top || // Element top is above halfway up the screen
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 // We've within 100px of bottom of the page (in case its impossible for a bottom element to get that far up)
      ) {
        transformMe()
        window.removeEventListener("scroll", transformMeIfInView)
      }
    }
    window.addEventListener("scroll", transformMeIfInView)

    // Some of our elements have data attributes with timed delays for when they should transform
    // This creates a cool intro
    // Handle all of those that are currently on screen (many of the desktop ones are not onscreen for mobile sizes, so we should drop this behavior in that case)
    const transformDelay = parseInt(
      (element as HTMLElement).dataset.transformDelay ?? ""
    )

    const onTransformationExperienceLoaded = () => {
      if (
        !isNaN(transformDelay) &&
        element.getBoundingClientRect().top < window.innerHeight
      ) {
        setTimeout(transformMe, transformDelay)
      }
    }

    const onResize = () => {
      if (canvasWidth !== document.body.clientWidth) {
        transformMe()
        setBgSize()
      }
    }

    const onFocusIn = () => {
      transformMe()
    }

    document.addEventListener(
      "transformation-experience-loaded",
      onTransformationExperienceLoaded
    )

    // Obviously this is all very fragile to document size.
    // So if we resize the window in such a way that changes doc width,
    // we're just gonna transform everything
    window.addEventListener("resize", onResize)

    element.addEventListener("focusin", onFocusIn)

    // If debug param ?version=new is set, transform everything from the getgo
    if (urlParams.get("version") === "new") {
      transformMe()
    }

    // Make this slement draggable--we pass the transformMe function because we want the object to transform if dragged, so our code will need it
    if (element.classList.contains("nin__draggable")) {
      makeDraggable(element as HTMLElement, transformMe)
    }

    return () => {
      window.removeEventListener("scroll", transformMeIfInView)
      document.removeEventListener(
        "transformation-experience-loaded",
        onTransformationExperienceLoaded
      )
      window.removeEventListener("resize", onResize)
      element.removeEventListener("focusin", onFocusIn)
    }
  })

  // OK! Kick off the claming process!
  runClaimingProcess()

  return () => {
    listeners.forEach((listener) => listener())
    clearInterval(loadingAnimationInterval)
  }
}

export default transformations
