import Link from "next/link"
import React from "react"

export const ETA2022FooterCta = ({ className }: { className?: string }) => {
  return (
    <aside className={className}>
      <div className="legacy-grid-container text-center text-neutral-0">
        <div className="mx-auto legacy-sm-md:w-7/12">
          <h2 className="mx-auto max-w-[580px] px-legacy-7 pb-legacy-4 text-legacy-2xl leading-legacy-tight legacy-sm-md:px-0 legacy-sm-md:text-legacy-3.95xl">
            Shoot for the stars with an award-winning strategy
          </h2>
          <p className="-mx-[10px] mb-legacy-4 px-legacy-7 pb-legacy-6 text-legacy-lg legacy-sm-md:px-0">
            Learn how to create a game plan for winning early talent.
          </p>
          <Link
            className="mb-legacy-20 inline-block rounded-legacy bg-neutral-0 py-legacy-4 px-legacy-7 text-legacy-sm font-bold text-neutral-100 transition-all duration-[350ms] hover:scale-110 hover:shadow-[0_0_15px_4px_rgba(186_24_209_/_70%)]"
            target="_blank"
            href="/employers/resources/your-game-plan-for-winning-early-talent/"
          >
            How to win
          </Link>
        </div>
      </div>
    </aside>
  )
}
