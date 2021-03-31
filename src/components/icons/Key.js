import * as React from 'react'

function Key({ size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.902 4.13a2.193 2.193 0 000 4.384 2.194 2.194 0 000-4.385zm0 1.46a.731.731 0 110 1.463.731.731 0 010-1.462z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.07 6.735a5.849 5.849 0 015.832-6.26 5.849 5.849 0 015.847 5.847 5.849 5.849 0 01-6.26 5.831l-1.262 1.262a.731.731 0 01-.517.214H9.518v2.193a.73.73 0 01-.731.73H6.595v2.193a.731.731 0 01-.731.73H2.94a2.193 2.193 0 01-2.192-2.192v-2.317c0-.582.23-1.14.642-1.55l6.68-6.68zm3.338 5.433l1.293-1.293a.73.73 0 01.614-.208 4.387 4.387 0 004.972-4.346 4.387 4.387 0 00-4.385-4.384A4.387 4.387 0 009.557 6.91a.73.73 0 01-.208.613L2.424 14.45a.73.73 0 00-.214.517v2.317c0 .404.327.73.73.731h2.193v-2.192a.73.73 0 01.73-.731h2.193v-2.192a.73.73 0 01.731-.731h2.62z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.5}
      />
    </svg>
  )
}

export default Key
