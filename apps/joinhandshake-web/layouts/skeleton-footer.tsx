export const SkeletonFooter = () => (
  <footer className="pt-legacy-16">
    <div className="legacy-grid-container">
      <div className="legacy-md:px-[8.33%]">
        <div className="mb-legacy-12 grid grid-cols-2 gap-legacy-6 legacy-lg:grid-cols-7">
          <p className="col-span-2 hidden bg-neutral-20 legacy-md:block"></p>
          <p className="skeleton-text h-legacy-64"></p>
          <p className="skeleton-text h-legacy-72"></p>
          <p className="skeleton-text h-legacy-96"></p>
          <p className="skeleton-text h-legacy-52"></p>
          <p className="skeleton-text h-legacy-40"></p>
          <p className="bg-neutral-20 legacy-md:hidden"></p>
        </div>
        <div className="border-t-neutral-30 py-legacy-4 legacy-lg:border-t-2">
          <div className="flex items-center justify-evenly gap-legacy-4 legacy-lg:justify-between">
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
      </div>
    </div>
  </footer>
)
