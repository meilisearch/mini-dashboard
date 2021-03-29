import * as React from 'react'

function ArrowDown({ width = 11, height = 7, ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M.824 1.38L5.324 6l4.5-4.62"
        stroke="#BBC1CF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowDown
