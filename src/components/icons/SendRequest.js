import * as React from 'react';
const Send = ({ title, titleId, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 106 95" {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <defs>
      <linearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="gradient">
        <stop offset="0%" stopColor="rgb(0, 255, 0)"/>
        <stop offset="100%" stopColor="rgb(0, 179, 0)"/>
      </linearGradient>
    </defs>
    <g>
      <path d="M 25.02 93.53 L -0.26 63.83 L 33.16 35.38 L 15.34 14.44 L 105.62 -0.68 L 76.26 86.03 L 58.44 65.08 Z" fill="url(#gradient)" stroke="none" pointerEvents="all"/>
    </g>
  </svg>
);

export default Send