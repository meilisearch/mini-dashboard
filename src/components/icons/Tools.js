import * as React from 'react';
const Tools = ({ title, titleId, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-0.5 -0.5 170 170" {...props} >
  {title ? <title id={titleId}>{title}</title> : null}
  <defs/>
  <g>
    <path d="M 32.74 8.63 C 50.24 1.95 70.02 8.31 80.35 23.92 C 90.69 39.53 88.81 60.22 75.84 73.72 C 62.86 87.22 42.26 89.91 26.25 80.2 C 10.25 70.49 3.12 50.97 9.09 33.23" fill="none" stroke="#6c8ebf" strokeWidth="10" strokeMiterlimit="10" pointerEvents="all"/>
    <path d="M 61.75 82.43 L 160.75 82.43 Q 144.99 106.43 160.75 130.43 L 61.75 130.43 Q 45.99 106.43 61.75 82.43 Z" fill="none" stroke="#6c8ebf" strokeWidth="10" strokeMiterlimit="10" transform="rotate(-135,107.31,106.43)" pointerEvents="all"/>
    <ellipse cx="129.5" cy="128.5" rx="7.5" ry="7.5" fill="#6c8ebf" stroke="#6c8ebf" strokeWidth="5" pointerEvents="all"/>
    <path d="M 14.86 15.27 Q 56.86 15.27 56.86 35.27 Q 56.86 55.27 14.86 55.27" fill="none" stroke="#6c8ebf" strokeWidth="10" strokeMiterlimit="10" transform="rotate(44,35.86,35.27)" pointerEvents="all"/>
  </g>
</svg>
);

export default Tools