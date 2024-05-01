import React from 'react'
import styled from 'styled-components'
import { connectInfiniteHits, Configure } from 'react-instantsearch-dom'

import Button from 'components/Button'
import ScrollToTop from 'components/ScrollToTop'

import Hit from './Hit'

const HitsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;

  > li {
    width: calc((100% - 2 * 16px) / 3);
    margin-bottom: 16px;
  }
`

const isAnImage = async (elem) => {
  // Test the standard way with regex and image extensions
  if (
    typeof elem === 'string' &&
    elem.match(/^(https|http):\/\/.*(jpe?g|png|gif|webp)(\?.*)?$/gi)
  )
    return true

  if (typeof elem === 'string' && elem.match(/^https?:\/\//)) {
    // Tries to load an image that is a valid URL but doesn't have a correct extension
    return new Promise((resolve) => {
      const img = new Image()
      img.src = elem
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
    })
  }
  return false
}

const findImageKey = async (array) => {
  const promises = array.map(async (elem) => isAnImage(elem[1]))
  const results = await Promise.all(promises)
  const index = results.findIndex((result) => result)
  const imageField = array[index]
  return imageField?.[0]
}

const InfiniteHits = connectInfiniteHits(({ hits, hasMore, refineNext }) => {
  const [imageKey, setImageKey] = React.useState(false)

  React.useEffect(() => {
    const getImageKey = async () => {
      setImageKey(hits[0] ? await findImageKey(Object.entries(hits[0])) : null)
    }
    getImageKey()
  }, [hits[0]])
  return (
    <div>
      <Configure hitsPerPage={21} />
      <HitsList>
        {hits.map((hit, index) => (
          <Hit key={index} hit={hit} imageKey={imageKey} />
        ))}
      </HitsList>
      {hasMore && (
        <Button
          size="small"
          variant="bordered"
          onClick={refineNext}
          style={{ margin: '0 auto', marginTop: 32 }}
        >
          Load more
        </Button>
      )}
      <ScrollToTop />
    </div>
  )
})

export default InfiniteHits
