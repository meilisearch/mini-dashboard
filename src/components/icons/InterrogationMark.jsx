import * as React from 'react'
const SvgInterrogationMark = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 10 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M4.715.136C2.37.136.399 2.107.399 4.45a.72.72 0 1 0 1.439 0c0-1.515 1.362-2.877 2.877-2.877 1.515 0 2.876 1.362 2.876 2.877.011 1.247-.663 1.874-1.55 2.663-.444.395-.922.798-1.326 1.326-.405.528-.72 1.206-.72 2.011v.472a.72.72 0 1 0 1.439 0v-.472c0-.462.141-.777.415-1.135.274-.357.688-.726 1.147-1.135.915-.814 2.044-1.923 2.034-3.73V4.44C9.023 2.1 7.054.136 4.715.136Zm0 12.585a1.079 1.079 0 1 0 0 2.158 1.079 1.079 0 0 0 0-2.158Z"
      fill="currentColor"
    />
  </svg>
)
export default SvgInterrogationMark
