import * as React from 'react'
// {title ? <title id={titleId}>{title}</title> : null}
function SvgMeilisearchLogo({ title, titleId, ...props }) {
  return (
    <svg
      viewBox="0 0 127 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M0.824951 73.993L24.0688 14.5224C27.3443 6.14182 35.4223 0.626003 44.4202 0.626003H58.4336L35.1898 60.0966C31.9143 68.4772 23.8363 73.993 14.8383 73.993H0.824951Z"
        fill="url(#paint0_linear_0_6)"
      />
      <path
        d="M34.9246 73.9932L58.1684 14.5226C61.4439 6.14199 69.5219 0.626178 78.5199 0.626178H92.5332L69.2894 60.0968C66.0139 68.4774 57.9359 73.9932 48.9379 73.9932H34.9246Z"
        fill="url(#paint1_linear_0_6)"
      />
      <path
        d="M69.0262 73.9932L92.27 14.5226C95.5455 6.14199 103.623 0.626178 112.621 0.626178H126.635L103.391 60.0968C100.115 68.4774 92.0375 73.9932 83.0395 73.9932H69.0262Z"
        fill="url(#paint2_linear_0_6)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_0_6"
          x1="126.635"
          y1="-4.97796"
          x2="0.824952"
          y2="66.0978"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF5CAA" />
          <stop offset="1" stop-color="#FF4E62" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_0_6"
          x1="126.635"
          y1="-4.97796"
          x2="0.824952"
          y2="66.0978"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF5CAA" />
          <stop offset="1" stop-color="#FF4E62" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_0_6"
          x1="126.635"
          y1="-4.97796"
          x2="0.824952"
          y2="66.0978"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF5CAA" />
          <stop offset="1" stop-color="#FF4E62" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default SvgMeilisearchLogo
