import React, { ReactNode } from "react"

export const TextWidthBlock = ({ content }: { content: ReactNode }) => {
  return <section className="mx-auto max-w-2xl">{content}</section>
}
