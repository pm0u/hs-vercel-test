import React from "react"

interface LayoutProps {
  children: React.ReactNode
}
export const ETA2021Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 h-legacy-12 bg-neutral-0"></header>
      <main className="mt-legacy-12">{children}</main>
      <footer className="bg-neutral-10 py-legacy-16">
        <div className="legacy-grid-container mb-legacy-12 grid grid-cols-2 gap-legacy-6 legacy-lg:grid-cols-7">
          <p className="col-span-2 hidden bg-neutral-20 legacy-md:block"></p>
          <p className="skeleton-text h-legacy-64"></p>
          <p className="skeleton-text h-legacy-72"></p>
          <p className="skeleton-text h-legacy-96"></p>
          <p className="skeleton-text h-legacy-52"></p>
          <p className="skeleton-text h-legacy-40"></p>
          <p className="bg-neutral-20 legacy-md:hidden"></p>
        </div>
        <div className="legacy-grid-container border-t-neutral-30 pt-legacy-4 legacy-lg:border-t-2">
          <div className="flex justify-between gap-legacy-4 legacy-md:-mx-[30px]">
            <div className="flex flex-col gap-legacy-4 legacy-lg:flex-row">
              <p className="mx-auto h-legacy-4 w-legacy-40 bg-neutral-20"></p>
              <p className="mx-auto h-legacy-4 w-legacy-80 bg-neutral-20"></p>
            </div>
            <div className="hidden gap-legacy-4 legacy-lg:flex">
              <p className="mx-auto h-legacy-8 w-legacy-8 bg-neutral-20"></p>
              <p className="mx-auto h-legacy-8 w-legacy-8 bg-neutral-20"></p>
              <p className="mx-auto h-legacy-8 w-legacy-8 bg-neutral-20"></p>
              <p className="mx-auto h-legacy-8 w-legacy-8 bg-neutral-20"></p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
