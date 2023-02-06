import { useCallback, useEffect, useState } from "react"
import { initCustomCursor } from "./customCursor"
import { initTodos } from "./todoList"
import initTransformations from "./transformations"

/**
 * Initializes all of our nextIsNow modules
 *
 * ### Testing
 * Tested in nextIsNow.spec.js
 *
 * @function nextIsNow
 *
 * Converted from legacy code to function as a react hook.
 */
export const useNextIsNow = function () {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  const setRef = useCallback((node: HTMLElement | null) => {
    setContainer(node)
  }, [])

  useEffect(() => {
    let historyScrollRestoration: ScrollRestoration
    let cursorCleanup = () => {}
    let todoCleanup = () => {}

    const beforeUnload = () => {
      window.scrollTo(0, 0)
    }

    if (typeof window !== "undefined") {
      historyScrollRestoration = window.history.scrollRestoration
      window.history.scrollRestoration = "manual"
      window.addEventListener("beforeunload", beforeUnload)
    }

    if (typeof container !== "undefined" && container !== null) {
      void initTransformations(container)
      cursorCleanup = initCustomCursor(container)
      todoCleanup = initTodos()
    }

    return () => {
      if (typeof historyScrollRestoration !== "undefined")
        window.history.scrollRestoration = historyScrollRestoration
      window.removeEventListener("beforeunload", beforeUnload)
      cursorCleanup()
      todoCleanup()
    }
  }, [container])

  return setRef
}
