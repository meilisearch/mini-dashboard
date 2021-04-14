import * as React from 'react'

function SvgDocumentBig({ title, titleId, ...props }) {
  return (
    <svg
      viewBox="0 0 32 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M8.545 16.75a1.037 1.037 0 000 2.074h15.368a1.037 1.037 0 000-2.074H8.545zM7.508 23.933c0-.572.464-1.037 1.037-1.037h15.368a1.037 1.037 0 010 2.074H8.545a1.037 1.037 0 01-1.037-1.037zM8.545 29.044a1.037 1.037 0 100 2.073h9.22a1.037 1.037 0 000-2.073h-9.22z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.592 3.051C.592 1.72 1.677.613 2.998.613H22.2c.36 0 .702.156.98.391l.009.008 7.795 7.872.003.004c.568.62.877 1.38.877 2.228v24.48c0 1.331-1.085 2.437-2.405 2.437H2.997c-1.321 0-2.406-1.106-2.406-2.438V3.051zm20.292-.468H2.54v33.44h27.377v-24.23h-6.869c-1.2 0-2.164-.983-2.164-2.192V2.583zm7.975 7.24l-6.067-6.158v6.159h6.067z"
        fill="currentColor"
      />
    </svg>
  )
}

export default SvgDocumentBig
