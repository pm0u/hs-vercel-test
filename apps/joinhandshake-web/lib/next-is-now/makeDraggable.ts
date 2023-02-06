/** @module nextIsNow/makeDraggable */
import interact from "interactjs"

/**
 * Uses interact.js to make elements on the NIN microsite draggable
 * @param {Element} element - the element that should be draggable
 * @param {Function} transformMe - a function that transforms the element, will be called on drag (we want any element to transform the moment a drag is attempted)
 * @see https://interactjs.io/
 * @function makeDraggable
 */
export const makeDraggable = (
  element: HTMLElement,
  transformMe: () => void
) => {
  let x = 0
  let y = 0
  interact(element)
    .draggable({
      allowFrom: ".nin__draggable__handle", // Can only be dragged by elements with this class
      modifiers: [
        interact.modifiers.snap({
          // Dragging snaps to a grid for effect
          targets: [
            interact.snappers.grid({
              x: 30,
              y: 30,
            }),
          ],
          range: Infinity,
          relativePoints: [
            {
              x: 0,
              y: 0,
            },
          ],
        }),
      ],
      inertia: true,
    })
    .on("dragmove", (event: { dx: number; dy: number }) => {
      // Moving this element would totally muck up the transformation if it hasnt occured yet,
      // So do it right now.
      transformMe()

      x += event.dx
      y += event.dy

      element.style.transform = `translate(${x}px, ${y}px)`
    })

  // Reset drags on resize
  // If you dont do this, these translations remain on even with dramatic responsive layouts
  // producing unexpected mostly undesirable results
  window.addEventListener("resize", () => {
    x = 0
    y = 0
    element.style.transform = ""
  })
}
