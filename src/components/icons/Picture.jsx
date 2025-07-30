import * as React from 'react'
const SvgPicture = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 26 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M24.521.017H1.629a.88.88 0 0 0-.88.88v19.37a.88.88 0 0 0 .88.88h22.892a.88.88 0 0 0 .88-.88V.897a.88.88 0 0 0-.88-.88Zm-6.066 12.52 2.544-3.187 2.642 3.301v5.398l-5.186-5.512ZM2.509 1.777h21.132v8.057l-1.955-2.44a.88.88 0 0 0-1.374 0l-3.081 3.848-6.163-6.55a.882.882 0 0 0-.634-.273.88.88 0 0 0-.643.255l-7.282 7.273V1.777Zm0 17.61V14.43l7.925-7.854 12.053 12.81H2.51ZM16.597 7.94a2.642 2.642 0 1 1 0-5.284 2.642 2.642 0 0 1 0 5.284Zm0-3.522a.88.88 0 1 0 0 1.761.88.88 0 0 0 0-1.761Z"
      fill="currentColor"
    />
  </svg>
)
export default SvgPicture
