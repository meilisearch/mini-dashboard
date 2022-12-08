import * as React from 'react'
const SvgArrowDown = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 11 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M1 1.38 5.5 6 10 1.38"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default SvgArrowDown
