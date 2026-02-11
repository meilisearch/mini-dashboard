import * as React from 'react'
const SvgMeilisearchLogo = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 127 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="m.825 73.993 23.244-59.47A21.85 21.85 0 0 1 44.42.625h14.014L35.19 60.096a21.85 21.85 0 0 1-20.352 13.897H.825Z"
      fill="url(#meilisearch_logo_svg__a)"
    />
    <path
      d="m34.925 73.993 23.243-59.47A21.85 21.85 0 0 1 78.52.626h14.013L69.29 60.096a21.85 21.85 0 0 1-20.351 13.897H34.925Z"
      fill="url(#meilisearch_logo_svg__b)"
    />
    <path
      d="m69.026 73.993 23.244-59.47A21.85 21.85 0 0 1 112.621.626h14.014l-23.244 59.47a21.851 21.851 0 0 1-20.352 13.897H69.026Z"
      fill="url(#meilisearch_logo_svg__c)"
    />
    <defs>
      <linearGradient
        id="meilisearch_logo_svg__a"
        x1={126.635}
        y1={-4.978}
        x2={0.825}
        y2={66.098}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF5CAA" />
        <stop offset={1} stopColor="#FF4E62" />
      </linearGradient>
      <linearGradient
        id="meilisearch_logo_svg__b"
        x1={126.635}
        y1={-4.978}
        x2={0.825}
        y2={66.098}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF5CAA" />
        <stop offset={1} stopColor="#FF4E62" />
      </linearGradient>
      <linearGradient
        id="meilisearch_logo_svg__c"
        x1={126.635}
        y1={-4.978}
        x2={0.825}
        y2={66.098}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF5CAA" />
        <stop offset={1} stopColor="#FF4E62" />
      </linearGradient>
    </defs>
  </svg>
)
export default SvgMeilisearchLogo
