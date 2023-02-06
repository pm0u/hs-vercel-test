/** @module nextIsNow/customCursor */

/**
 * Adds a custom cursor to the NIN microsite, imitating a fake "HandshakeOS"-like GUI.
 * The cursor changes state/icon when hovering (changing to a hand icon)
 * It also changes when moving toward the bottom of the viewport when at the top of the page (changes to a "scroll more" icon)
 *
 * Importantly we do not show the cursor until we detect a mouse has moved, so it should not appear on touch advices.
 * @function customCursor
 *
 * Updated to remove jquery, return cleanup function for SPA environment
 */
export const initCustomCursor = function (pageContainer: HTMLElement) {
  // Get the DOM element
  const customCursor: HTMLElement | null = pageContainer.querySelector(
    ".nin__custom-cursor"
  )

  const containerEl = pageContainer.querySelector(".nin") as HTMLElement

  // -----------------------------------------------------------------------
  // MOVEMENT
  // -----------------------------------------------------------------------
  // Follow the user's mouse
  const onMouseMove = (e: MouseEvent) => {
    if (customCursor !== null)
      customCursor.style.transform = `translate(${e.clientX}px,${e.clientY}px)`
  }
  window.addEventListener("mousemove", onMouseMove)

  // -----------------------------------------------------------------------
  // SHOW/HIDE
  // -----------------------------------------------------------------------
  // Hide when the mouse leaves the window
  const onMouseOut = (e: MouseEvent) => {
    if (e.relatedTarget !== null) {
      containerEl.classList.remove("nin--show-custom-cursor")
    }
  }
  document.body.addEventListener("mouseout", onMouseOut)

  // Enter/exiting iframes (e.g. youtube player)
  let isInIFrame = false
  const iframes = document.querySelectorAll("iframe")

  const onIframeEnter = () => {
    containerEl.classList.remove("nin--show-custom-cursor")
    isInIFrame = true
  }

  const onIframeExit = () => {
    containerEl.classList.add("nin--show-custom-cursor")
    isInIFrame = false
  }

  iframes.forEach((iframe) =>
    iframe.addEventListener("mouseenter", onIframeEnter)
  )
  iframes.forEach((iframe) =>
    iframe.addEventListener("mouseleave", onIframeExit)
  )

  // -----------------------------------------------------------------------
  // TOUCH DETECTION
  // -----------------------------------------------------------------------
  // For starters, we'll use CSS to start the custom cursor element in a hidden state
  // We will then only ever make it visible on a mousemove event
  window.addEventListener("mousemove", () => {
    if (!isInIFrame) containerEl.classList.add("nin--show-custom-cursor")
  })
  // Remove our custom mouse if we detect touch device
  window.addEventListener("touchstart", () => {
    containerEl.classList.add("nin--touch-device")
    // This class will display: none our cursor and return to default cursors
    // We return to default curosrs on the offchance it is a touch AND mouse device--cant just hide the mouse
  })

  // -----------------------------------------------------------------------
  // CURSOR VARIATIONS
  // -----------------------------------------------------------------------
  // Show the scroll variation if appropriate
  const onMouseMoveCursorVariation = () => {
    if (customCursor !== null) {
      if (
        customCursor.getBoundingClientRect().top > window.innerHeight * 0.7 &&
        window.scrollY < 50 &&
        !document.body.classList.contains("youtube-modal-is-open")
      ) {
        customCursor.classList.add("nin__custom-cursor--scroll")
      } else {
        customCursor.classList.remove("nin__custom-cursor--scroll")
      }
    }
  }
  window.addEventListener("mousemove", onMouseMoveCursorVariation)

  // Mouse will start with a loading variation class, remove it when the experience is loaded
  const onTransformationExperienceLoaded = () => {
    if (customCursor !== null)
      customCursor.classList.remove("nin__custom-cursor--loading")
  }
  document.addEventListener(
    "transformation-experience-loaded",
    onTransformationExperienceLoaded
  )

  const onSpecialElementsMouseEnter = () => {
    if (customCursor !== null) {
      customCursor.classList.add("nin__custom-cursor--hover")
    }
  }
  const onSpecialElementsMouseLeave = () => {
    if (customCursor !== null)
      customCursor.classList.remove("nin__custom-cursor--hover")
  }
  const specialElements = document.querySelectorAll(
    'a, button, input[type="submit"]'
  )
  // Show hover cursor variation if appropiate
  specialElements.forEach((el) => {
    el.addEventListener("mouseenter", onSpecialElementsMouseEnter)
    el.addEventListener("mouseleave", onSpecialElementsMouseLeave)
  })

  return () => {
    window.removeEventListener("mousemove", onMouseMove)
    window.removeEventListener("mousemove", onMouseMoveCursorVariation)
    document.body.removeEventListener("mouseout", onMouseOut)
    document.removeEventListener(
      "transformation-experience-loaded",
      onTransformationExperienceLoaded
    )
    iframes.forEach((iframe) => {
      iframe.removeEventListener("mouseenter", onIframeEnter)
      iframe.removeEventListener("mouseleave", onIframeExit)
    })
    specialElements.forEach((el) => {
      el.removeEventListener("mouseenter", onSpecialElementsMouseEnter)
      el.removeEventListener("mouseleave", onSpecialElementsMouseLeave)
    })
  }
}
