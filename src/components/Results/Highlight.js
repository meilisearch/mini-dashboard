import React from 'react'
import { connectHighlight } from 'react-instantsearch-dom'

const Highlight = connectHighlight(
  ({ highlight, attribute, hit, indexContextValue, ...props }) => {
    const parsedHit = highlight({
      highlightProperty: '_highlightResult',
      attribute,
      hit,
    })

    return (
      <span {...props}>
        {parsedHit.map((part, index) =>
          part.isHighlighted ? (
            <mark key={index}>{part.value}</mark>
          ) : (
            <span key={index}>{part.value}</span>
          )
        )}
      </span>
    )
  }
)

export default Highlight
