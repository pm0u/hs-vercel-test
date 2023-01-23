import React from "react"

export const LightWorkload = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 25"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M21 5.25v16.499A2.252 2.252 0 0 1 18.75 24H5.25A2.252 2.252 0 0 1 3 21.749V5.25A2.25 2.25 0 0 1 5.25 3H9c0-1.654 1.346-3 3-3s3 1.346 3 3h3.75A2.25 2.25 0 0 1 21 5.25zm-2.25.281a.283.283 0 0 0-.281-.281H16.5v1.687c0 .31-.254.562-.562.562H8.063a.563.563 0 0 1-.563-.562V5.25H5.532a.283.283 0 0 0-.281.281v15.937c0 .154.127.281.281.281h12.937a.283.283 0 0 0 .281-.281V5.531zM10.875 3c0 .623.502 1.125 1.125 1.125S13.125 3.623 13.125 3 12.623 1.875 12 1.875 10.875 2.377 10.875 3z"
    />
  </svg>
)