import React from 'react'
import { connectHighlight } from 'react-instantsearch-dom'
import Typography from 'components/Typography'

/**
 * Crops an array of parts, each with a value and isHighlighted, so that the total
 * length of the concatenated values doesn't exceed maxLength.
 *
 * @param {Array} parts - The array of objects ({value: string, isHighlighted: boolean}).
 * @param {number} maxLength - The maximum total length of the concatenated values.
 * @returns {Array} A cropped array of parts.
 */
function cropPartsToMaxLength(parts, maxLength) {
  let totalLength = 0
  let hasReachedMax = false

  return parts.reduce((acc, currentPart) => {
    if (hasReachedMax) return acc

    const updatedLength = totalLength + currentPart.value.length
    if (updatedLength > maxLength) {
      const availableSpace = maxLength - totalLength
      if (availableSpace > 0) {
        acc.push({
          isHighlighted: currentPart.isHighlighted,
          value: currentPart.value.substring(0, availableSpace),
        })
      }
      acc.push({ isHighlighted: false, value: '...' })
      hasReachedMax = true
    } else {
      acc.push(currentPart)
      totalLength = updatedLength
    }

    return acc
  }, [])
}

const Highlight = connectHighlight(
  ({ highlight, maxLength, attribute, hit, indexContextValue, ...props }) => {
    const parsedHit = highlight({
      highlightProperty: '_highlightResult',
      attribute,
      hit,
    })

    console.log(hit)

    const croppedParts = cropPartsToMaxLength(parsedHit, maxLength)

    return (
      <Typography {...props}>
        {croppedParts.map((part, index) =>
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
