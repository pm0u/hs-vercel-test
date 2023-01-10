import React from "react"

export interface CtaProps {
  text: React.ReactNode
  buttonText: string
  buttonType: string
}

export const Cta = ({ text, buttonText, buttonType }: CtaProps) => {
  return (
    <section className="container mx-auto flex flex-col items-center">
      <section className="mb-legacy-8 max-w-2xl">{text}</section>
      <button className="rounded bg-legacy-purple p-legacy-4 font-bold text-neutral">
        {buttonText}
      </button>
    </section>
  )
}
