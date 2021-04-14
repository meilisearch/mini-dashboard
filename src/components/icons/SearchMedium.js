import * as React from 'react'

function SvgSearchMedium({ title, titleId, ...props }) {
  return (
    <svg
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.773 10.405c0-5.493 4.436-9.948 9.912-9.948 5.475 0 9.911 4.455 9.911 9.948 0 2.497-.917 4.779-2.43 6.526l4.466 4.472c.398.399.399 1.045.002 1.445-.36.363-.926.396-1.325.1l-.114-.099-4.516-4.521a9.844 9.844 0 01-5.994 2.025c-5.476 0-9.912-4.455-9.912-9.948zm17.743 0c0-4.343-3.508-7.862-7.831-7.862-4.324 0-7.832 3.519-7.832 7.862s3.508 7.862 7.832 7.862c4.323 0 7.83-3.519 7.83-7.862z"
        fill="currentColor"
      />
    </svg>
  )
}

export default SvgSearchMedium
