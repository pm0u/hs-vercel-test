/**
 * The Next Is Now microsite has a todo list at the top of the screen.
 *
 * This todo list is kept permanent via localStorage.
 *
 * Clicking on corresponding various task elements (e.g. a link that needs to be clicked) will automatically mark that corresponding todo completed!
 *
 * @function todoList()
 *
 * Updated to function based on custom events rather than binding click events to elements.
 */
export const initTodos = () => {
  // Define a set of completed todos, populated from localstorage
  const localStorageKey = "nin-completed-todos"
  const completedTodos = new Set(
    JSON.parse(localStorage.getItem(localStorageKey) ?? "[]") ?? []
  )

  // Completes a todo with dom (and set) ID `todo`
  const completeTodo = (todo: string) => {
    // Add to our set and update localStorage
    completedTodos.add(todo)
    // @ts-expect-error
    localStorage.setItem(localStorageKey, JSON.stringify([...completedTodos]))

    // Check the checkbox in the dom
    const todoItem = document.getElementById(todo)

    if (todoItem !== null) todoItem.setAttribute("checked", "true")

    // Are all of the checboxes checked?  Cool! Throw a class for some celebratory styles
    // Sadly, we never got around to adding such celebratory styles due to time constraints
    // So don't expect any visual state change to accompany this added class!
    // "I'm sorry, kids, the pizza party is cancelled." [Tears everywhere]
    if (
      document.querySelectorAll("[data-todo]").length ===
      document.querySelectorAll("[data-todo]:checked").length
    ) {
      const container = document.querySelector("[datqa-nin]")
      if (container != null)
        (container as HTMLElement).dataset.ninTodosComplete = "true"
    }
  }

  // Complete our todos loaded in from localStorage
  // @ts-expect-error
  completedTodos.forEach(completeTodo)

  const onTodoComplete = (e: Event) => {
    const { todo } = (e as CustomEvent).detail

    if (typeof todo !== "undefined") {
      completeTodo(todo)
    }
  }

  document.addEventListener("todo-complete", onTodoComplete)

  return () => {
    document.removeEventListener("todo-complete", onTodoComplete)
  }
}
