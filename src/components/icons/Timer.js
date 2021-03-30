import * as React from 'react'

function Timer({ width = 18, height = 16, ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.328 14.28a7.582 7.582 0 01-2.222-5.385c0-2.092.845-3.99 2.21-5.368.005-.005.007-.012.012-.017.005-.005.011-.006.016-.011a7.543 7.543 0 0110.691 0c.005.005.012.006.017.011.005.005.007.012.011.017a7.607 7.607 0 012.21 5.368 7.582 7.582 0 01-2.221 5.385M8.649 1.821v1.084M2.731 8.863H1.648M15.731 8.863h-1.083M13.565 3.717l-.766.766M10.738 7.316L8.69 10.512M3.815 3.717l.766.766"
        stroke="#BBC1CF"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect
        x={7.261}
        y={9.476}
        width={2.776}
        height={2.776}
        rx={1.388}
        fill="#BBC1CF"
      />
    </svg>
  )
}

export default Timer
