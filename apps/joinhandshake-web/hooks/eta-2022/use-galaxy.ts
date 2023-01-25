import { useState, useEffect } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  trailLengthDelta: number
  radius: number
  isDying: boolean
  isDead: boolean
  isSpawning: boolean

  create: (x: number, y: number, speed: number, direction: number) => Particle
  getSpeed: () => number
  setSpeed: (speed: number) => void
  getHeading: () => number
  setHeading: (heading: number) => void
  update: () => void
}

/**
 * Constants
 */

// how often (ms) a shooting star will generate.
const shootingStarEmittingInterval = 3500
// how long (ms) a shooting star should live
const shootingStarLifeTime = 500
// set a base for all shooting star sizes
const shootingStarRadius = 3
// set the min/max speed a shooting star can travel
const shootingStarSpeed = {
  min: 15,
  max: 20,
}
// max shooting star trail length
const maxTrailLength = 300
// set a base for all star sizes
const starBaseRadius = 2
// max # of shooting stars at once
const maxShootingStars = 5
/**
 * Star speed scaling factor
 * scales the legacy "speed" for fixed stars & shooting stars
 * in case we need to tweak for the new implementation
 */
const backgroundStarSpeedScale = 1
const shootingStarSpeedScale = 1
// rate at which the shooting star trail increases/decreases
const trailLengthDelta = 0.01 * shootingStarSpeedScale
// rate at which the shooting star opacity increases/decreases
const shootingStarOpacityDelta = 0.01 * shootingStarSpeedScale

/*
  HELPERS
*/

// convert degrees to radians for setting star headings
function degreesToRads(degrees: number) {
  return (degrees / 180) * Math.PI
}

// find angle from line for shooting star position
function lineToAngle(x1: number, y1: number, length: number, radians: number) {
  const x2 = x1 + length * Math.cos(radians)
  const y2 = y1 + length * Math.sin(radians)
  return {
    x: x2,
    y: y2,
  }
}

// return random value from min to max
function randomRange(min: number, max: number) {
  return min + Math.random() * (max - min)
}

// scale count of stars with the size of the viewport
function setStarCountFromBounds(
  initialCount: number,
  height: number,
  width: number
) {
  return Math.ceil(initialCount * ((height + width) * 0.01))
}

// particle class used to generate all stars
const particle: Particle = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  opacity: 0,
  trailLengthDelta: 0,
  radius: 0,
  isDying: false,
  isDead: false,
  isSpawning: true,

  create: function (x, y, speed, direction): Particle {
    const obj = Object.create(this)
    obj.x = x
    obj.y = y
    obj.vx = Math.cos(direction) * speed
    obj.vy = Math.sin(direction) * speed
    return obj
  },

  getSpeed: function () {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy)
  },

  setSpeed: function (speed) {
    const heading = this.getHeading()
    this.vx = Math.cos(heading) * speed
    this.vy = Math.sin(heading) * speed
  },

  // get the direction in which this star is traveling
  getHeading: function () {
    return Math.atan2(this.vy, this.vx)
  },

  // set the direction in which this star is traveling
  setHeading: function (heading: number) {
    const speed = this.getSpeed()
    this.vx = Math.cos(heading) * speed
    this.vy = Math.sin(heading) * speed
  },

  // position update for animation loop
  update: function () {
    this.x += this.vx
    this.y += this.vy
  },
}

function drawShootingStar(p: Particle, context: CanvasRenderingContext2D) {
  const x = p.x
  const y = p.y
  const currentTrailLength = maxTrailLength * p.trailLengthDelta
  const pos = lineToAngle(x, y, -currentTrailLength, p.getHeading())

  context.fillStyle = `rgba(255, 255, 255,  ${p.opacity})`

  const starLength = 5

  // canvas logic to append the trail line
  // to the existing path
  context.beginPath()
  context.moveTo(x - 1, y + 1)

  context.lineTo(x, y + starLength)
  context.lineTo(x + 1, y + 1)

  context.lineTo(x + starLength, y)
  context.lineTo(x + 1, y - 1)

  context.lineTo(x, y + 1)
  context.lineTo(x, y - starLength)

  context.lineTo(x - 1, y - 1)
  context.lineTo(x - starLength, y)

  context.lineTo(x - 1, y + 1)
  context.lineTo(x - starLength, y)

  context.closePath()
  context.fill()

  // trail fill style
  context.fillStyle = `rgba(255, 221, 157, ${p.opacity})`
  context.beginPath()
  context.moveTo(x - 1, y - 1)
  context.lineTo(pos.x, pos.y)
  context.lineTo(x + 1, y + 1)
  context.closePath()
  context.fill()
}

// redraw stars in the animation loop
function drawStar(star: Particle, context: CanvasRenderingContext2D) {
  context.fillStyle = "rgb(255, 221, 157)"
  context.beginPath()
  context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false)
  context.fill()
}

// create an instance of a shooting star
// and push it to the array of shooting stars
// that get drawn in the animation loop
const createShootingStar = (height: number, width: number) => {
  // create a shooting star somewhere randomly
  // within the bounds of the canvas
  const shootingStar = particle.create(
    randomRange(width / 2, width),
    randomRange(0, height / 2),
    0,
    0
  )
  shootingStar.setSpeed(
    randomRange(shootingStarSpeed.min, shootingStarSpeed.max) *
      shootingStarSpeedScale
  )
  shootingStar.setHeading(degreesToRads(randomRange(0, 359)))
  shootingStar.radius = shootingStarRadius

  return shootingStar
}

// set the isDying flag to true and the
// animation loop will begin to transition the star out
function killShootingStar(shootingStar: typeof particle) {
  setTimeout(function () {
    shootingStar.isDying = true
  }, shootingStarLifeTime)
}

/**
 * Animations
 */

const createGalaxy = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  prefersReducedMotion: boolean
) => {
  const stars: Particle[] = []
  const shootingStars: Particle[] = []
  const context = canvas.getContext("2d") as CanvasRenderingContext2D
  let paused = prefersReducedMotion
  let frame: number

  canvas.width = width
  canvas.height = height

  const layers = [
    {
      // "bottom" layer has the highest star count, with the smallest and slowest stars
      // these stars will appear to be the farthest away
      speed: prefersReducedMotion ? 0 : 0.02 * backgroundStarSpeedScale,
      scale: 0.2,
      count: setStarCountFromBounds(15, height, width),
      angle: randomRange(0, 359),
    },
    {
      // "middle" layer contains many less stars, are larger and move faster
      // these stars will appear to be between the bottom and top layers
      speed: prefersReducedMotion ? 0 : 0.03 * backgroundStarSpeedScale,
      scale: 0.5,
      count: setStarCountFromBounds(4, height, width),
      angle: randomRange(0, 359),
    },
    {
      // "top" layer contains even less stars, are largest and move fastest
      // these stars will appear to be the closest to the viewer
      speed: prefersReducedMotion ? 0 : 0.06 * backgroundStarSpeedScale,
      scale: 0.75,
      count: setStarCountFromBounds(1, height, width),
      angle: randomRange(0, 359),
    },
  ]

  for (let j = 0; j < layers.length; j += 1) {
    const layer = layers[j]
    for (let i = 0; i < layer.count; i += 1) {
      const star = particle.create(
        randomRange(0, width),
        randomRange(0, height),
        0,
        0
      )
      star.radius = starBaseRadius * layer.scale
      star.setSpeed(layer.speed)
      star.setHeading(degreesToRads(layer.angle))
      stars.push(star)
    }
  }

  const interval = setInterval(() => {
    if (paused || prefersReducedMotion) return
    shootingStars.push(createShootingStar(height, width))
  }, shootingStarEmittingInterval)

  const onFocus = () => {
    shootingStars.length = 0
    paused = false
    updateStars()
  }

  const onBlur = () => {
    paused = true
    cancelAnimationFrame(frame)
  }

  const stop = () => {
    paused = true
    cancelAnimationFrame(frame)
    clearInterval(interval)
    window.removeEventListener("focus", onFocus)
    window.removeEventListener("blur", onBlur)
  }

  const updateStars = () => {
    if (!paused) {
      context.clearRect(0, 0, width, height)
      // keep canvas background transparent
      context.fillStyle = "transparent"
      context.fillRect(0, 0, width, height)
      context.fill()

      if (shootingStars.length > maxShootingStars) {
        shootingStars.length = 0
        frame = requestAnimationFrame(updateStars)
        return
      }

      stars.forEach((star) => {
        star.update()
        // redraw star with new position
        drawStar(star, context)

        // if star moves out of bounds, reposition it
        if (star.x > width) {
          star.x = 0
        }
        if (star.x < 0) {
          star.x = width
        }
        if (star.y > height) {
          star.y = 0
        }
        if (star.y < 0) {
          star.y = height
        }
      })

      // for each shooting star, redraw it in its new position
      // and with updated opacity and trail values
      shootingStars.forEach((shootingStar) => {
        if (shootingStar.isSpawning) {
          // the shooting star has been created but not yet drawn
          shootingStar.opacity += shootingStarOpacityDelta
          if (shootingStar.opacity >= 1.0) {
            shootingStar.isSpawning = false
            killShootingStar(shootingStar)
          }
        }
        if (shootingStar.isDying) {
          // this stars shootingStarLifeTime has ended
          shootingStar.opacity -= shootingStarOpacityDelta
          if (shootingStar.opacity <= 0.0) {
            // shooting star has no opacity, it is official dead. RIP my friend.
            shootingStar.isDying = false
            shootingStar.isDead = true
          }
        }

        // update trail length
        shootingStar.trailLengthDelta += trailLengthDelta

        // update the shooting star's position
        shootingStar.update()

        if (shootingStar.opacity > 0.0) {
          // star still has opacity, redraw it.
          drawShootingStar(shootingStar, context)
        }
      })
      frame = requestAnimationFrame(updateStars)
    }
  }

  updateStars()

  window.addEventListener("focus", onFocus)
  window.addEventListener("blur", onBlur)

  return stop
}

export const useGalaxy = (
  canvas: HTMLCanvasElement | null | undefined,
  prefersReducedMotion: boolean
) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  // once on the client, get w/h
  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement
    setHeight(body.offsetHeight)
    setWidth(body.offsetWidth)
  }, [])

  // start stars update loop
  useEffect(() => {
    let stop: Function

    if (
      typeof canvas !== "undefined" &&
      canvas !== null &&
      width > 0 &&
      height > 0
    ) {
      stop = createGalaxy(canvas, width, height, prefersReducedMotion)
    }

    return () => {
      if (typeof stop !== "undefined") {
        stop()
      }
    }
  }, [canvas, width, height, prefersReducedMotion])

  // When resized, adjust canvas size. Triggers reset of star loop.
  useEffect(() => {
    const onResize = () => {
      const body = document.querySelector("body") as HTMLBodyElement
      setHeight(body.offsetHeight)
      setWidth(body.offsetWidth)
    }
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [])
}
