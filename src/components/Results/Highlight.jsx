import React from 'react'
import { connectHighlight } from 'react-instantsearch-dom'
import Typography from 'components/Typography'

const Highlight = connectHighlight(
  ({ highlight, attribute, hit, indexContextValue, ...props }) => {
    const parsedHit = highlight({
      highlightProperty: '_highlightResult',
      attribute,
      hit,
    })

    return (
      <Typography {...props}>
        {parsedHit.map((part, index) =>
          part.isHighlighted ? (
            <mark key={index}>{part.value}</mark>
          ) : (
            <span key={index}>{part.value}</span>
          )
        )}
      </Typography>
    )
  }
)

export default Highlight
