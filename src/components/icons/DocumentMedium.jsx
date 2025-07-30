import * as React from 'react'
const SvgDocumentMedium = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 19 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M5.119 9.932a.89.89 0 1 0 0 1.781h8.905a.89.89 0 0 0 0-1.78H5.119ZM4.229 14.384a.89.89 0 0 1 .89-.89h8.905a.89.89 0 1 1 0 1.78H5.119a.89.89 0 0 1-.89-.89ZM5.119 17.056a.89.89 0 1 0 0 1.78h5.343a.89.89 0 0 0 0-1.78H5.119Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.223 2.284c0-.927.753-1.702 1.683-1.702h11.127c.294 0 .556.126.755.295l.015.013 4.53 4.574.006.007c.375.41.584.92.584 1.486v14.185c0 .927-.754 1.702-1.684 1.702H1.906c-.93 0-1.683-.775-1.683-1.702V2.284Zm1.708.019V21.1h15.283V7.64h-3.69a1.55 1.55 0 0 1-1.543-1.56V2.303H1.93Zm11.734 1.044V5.92H16.2l-2.534-2.572Z"
      fill="currentColor"
    />
  </svg>
)
export default SvgDocumentMedium
