import * as React from 'react'

function InterrogationMark({ width = 9, height = 16, ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.54.752C2.195.752.223 2.724.223 5.067a.72.72 0 101.439 0c0-1.515 1.361-2.876 2.876-2.876s2.877 1.361 2.877 2.876c.01 1.247-.664 1.874-1.55 2.664-.444.394-.922.797-1.327 1.326-.404.528-.719 1.206-.719 2.011v.472a.72.72 0 101.438 0v-.472c0-.462.142-.777.416-1.135s.688-.727 1.146-1.135c.916-.815 2.045-1.923 2.034-3.73v-.012C8.848 2.718 6.88.752 4.54.752zm0 12.586a1.079 1.079 0 100 2.157 1.079 1.079 0 000-2.157z"
        fill="currentColor"
      />
    </svg>
  )
}

export default InterrogationMark
