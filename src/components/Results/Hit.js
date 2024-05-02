import React, { useEffect } from 'react'
import styled from 'styled-components'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'

import Box from 'components/Box'
import Card from 'components/Card'
import placeholderImage from '../../assets/placeholder.png'
import Highlight from './Highlight'

const CustomCard = styled(Card)`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`

const ContentContainer = styled.div`
  margin-top: 16px;
  width: 100%;
`

const Hit = ({ hit }) => {
  const [usePlaceholder, setUsePlaceholder] = React.useState(false)

  useEffect(() => {
    if (!hit._highlightResult) {
      // eslint-disable-next-line no-console
      console.warn('Your hits have no field. Please check your index settings.')
    }
  }, [hit._highlightResult])

  return (
    <CustomCard>
      <Box width={240} mr={4} flexShrink={0}>
        <LazyLoadImage
          src={usePlaceholder ? placeholderImage : hit.image_url}
          effect="opacity"
          width="100%"
          height="264px"
          style={{ borderRadius: 10, objectFit: 'cover' }}
          onError={() => setUsePlaceholder(true)}
        />
      </Box>
      <ContentContainer>
        <Highlight
          maxLength={60}
          variant="typo1"
          color="gray.1"
          attribute="title"
          hit={hit}
          style={{ marginBottom: '5px' }}
          title={hit.title}
        />
        <Highlight
          maxLength={100}
          variant="typo2"
          color="gray.2"
          attribute="artist"
          hit={hit}
          title={hit.artist}
        />
        <br />
        <Highlight
          maxLength={100}
          variant="typo3"
          color="gray.5"
          attribute="album"
          hit={hit}
          title={hit.album}
        />
      </ContentContainer>
    </CustomCard>
  )
}

export default Hit
