import * as React from 'react'

function Picture({ width = 26, height = 22, ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M24.521.043H1.629a.88.88 0 00-.88.88v19.371a.88.88 0 00.88.88h22.892a.88.88 0 00.88-.88V.924a.88.88 0 00-.88-.88zm-6.066 12.52l2.544-3.187 2.642 3.302v5.397l-5.186-5.511zM2.509 1.805h21.132v8.057l-1.955-2.44a.88.88 0 00-1.374 0l-3.081 3.848-6.163-6.55a.881.881 0 00-.634-.273.88.88 0 00-.643.255l-7.282 7.273V1.804zm0 17.61v-4.957l7.925-7.854 12.053 12.81H2.51zM16.597 7.968a2.642 2.642 0 110-5.284 2.642 2.642 0 010 5.284zm0-3.522a.88.88 0 100 1.76.88.88 0 000-1.76z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Picture
