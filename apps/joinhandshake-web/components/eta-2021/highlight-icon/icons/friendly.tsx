import React from "react"

export const Friendly = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 25"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M24 11.999C24 18.628 18.629 24 12 24S0 18.629 0 11.999s5.371-12 12-12 12 5.371 12 12zm-2.323 0c0-5.337-4.341-9.677-9.677-9.677s-9.677 4.341-9.677 9.677 4.34 9.678 9.677 9.678 9.677-4.341 9.677-9.678zM17.7 14.588a1.16 1.16 0 0 1 .151 1.635c-1.452 1.742-3.587 2.739-5.851 2.739s-4.398-.997-5.85-2.739a1.164 1.164 0 0 1 .15-1.635 1.164 1.164 0 0 1 1.635.15c1.006 1.215 2.492 1.906 4.065 1.906s3.058-.697 4.065-1.906a1.164 1.164 0 0 1 1.635-.15zM6.581 9.677c0-.857.692-1.548 1.548-1.548s1.548.691 1.548 1.548c0 .857-.692 1.548-1.548 1.548s-1.548-.691-1.548-1.548zm7.742 0c0-.857.692-1.548 1.548-1.548s1.548.692 1.548 1.548c0 .857-.692 1.548-1.548 1.548s-1.548-.691-1.548-1.548z"
    />
  </svg>
)