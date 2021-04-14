import * as React from 'react'

function SvgSearchSmall({ title, titleId, ...props }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.438 15.52l-.09-.078-2.841-2.845a6.768 6.768 0 01-3.944 1.26c-3.765 0-6.814-3.064-6.814-6.84C.749 3.243 3.798.18 7.563.18c3.766 0 6.815 3.063 6.815 6.839 0 1.63-.57 3.13-1.52 4.305l2.794 2.796c.362.363.363.951.002 1.315a.925.925 0 01-1.208.091l-.008-.006zm-1.944-8.502c0-2.736-2.21-4.951-4.93-4.951-2.722 0-4.931 2.215-4.931 4.95 0 2.737 2.209 4.952 4.93 4.952 2.722 0 4.931-2.215 4.931-4.951z"
        fill="currentColor"
      />
    </svg>
  )
}

export default SvgSearchSmall
