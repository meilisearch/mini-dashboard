import * as React from 'react'
const SvgIndexes = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 20 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.162.547a1.5 1.5 0 0 0-1.484 1.5v1.948H1.715a1.5 1.5 0 0 0-1.484 1.5v16.062a1.5 1.5 0 0 0 1.484 1.5h13.06a1.5 1.5 0 0 0 1.484-1.5v-1.948h1.964a1.5 1.5 0 0 0 1.484-1.5V6.027c0-.495-.183-.941-.51-1.3l-.006-.005-3.86-3.898-.015-.014a1.054 1.054 0 0 0-.676-.263H5.162Zm9.542 19.062H5.162a1.5 1.5 0 0 1-1.484-1.5V5.56H1.786v15.911h12.918V19.61Zm-9.47-1.586V2.113h8.46V5.28a1.37 1.37 0 0 0 1.364 1.378h3.094v11.365H5.233Zm9.995-12.93V3.074l1.988 2.019H15.23Z"
      fill="currentColor"
    />
  </svg>
)
export default SvgIndexes
