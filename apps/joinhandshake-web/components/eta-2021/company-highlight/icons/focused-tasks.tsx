import React from "react"

export const FocusedTasks = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 25"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M24 3.6v4.8c0 .662-.538 1.2-1.2 1.2H18a1.2 1.2 0 0 1-1.2-1.2V7.2H7.2v1.781l3.103 5.419H14.4a1.2 1.2 0 0 1 1.2 1.2v4.8c0 .663-.538 1.201-1.2 1.201H9.6A1.2 1.2 0 0 1 8.4 20.4v-4.495L4.79 9.6H1.2C.538 9.6 0 9.062 0 8.4V3.6c0-.662.538-1.2 1.2-1.2H6c.662 0 1.2.538 1.2 1.2v1.2h9.6V3.6c0-.662.538-1.2 1.2-1.2h4.8A1.2 1.2 0 0 1 24 3.6zm-18.6.6H1.8v3.6h3.6V4.2zm4.8 15.6h3.6v-3.6h-3.6v3.6zm12-15.6h-3.6v3.6h3.6V4.2z"
    />
  </svg>
)
