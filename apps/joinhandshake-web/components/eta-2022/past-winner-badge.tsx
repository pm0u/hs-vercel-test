import React from "react"

export const ETA2022PastWinnerBadge = ({
  className,
}: {
  className?: string
}) => {
  return (
    <div
      className={`inline-block bg-eta2022-fuschia p-legacy-2 ${
        className ?? ""
      }`}
    >
      <span className="whitespace-nowrap text-legacy-sm font-bold uppercase text-neutral-0">
        Past Winner
      </span>
    </div>
  )
}
