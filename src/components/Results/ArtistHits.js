import React, { useEffect } from 'react'
import styled from 'styled-components'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import Box from 'components/Box'
import Card from 'components/Card'
import Typography from 'components/Typography'

const CustomCard = styled(Card)`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`

const MainContainer = styled.ul`
  list-style: none;
  padding-left: 0;
  min-width: 300px;
`

const ArtistContainer = styled.li`
  margin-bottom: 16px;
`

const ArtistHit = ({ hit }) => {
  useEffect(() => {
    if (!hit._highlightResult) {
      // eslint-disable-next-line no-console
      console.warn('Your hits have no field. Please check your index settings.')
    }
  }, [hit._highlightResult])

  return (
    <ArtistContainer>
      <CustomCard>
        <Box width={200} mr={4} flexShrink={0}>
          {hit.artist}
        </Box>
      </CustomCard>
    </ArtistContainer>
  )
}

const ArtistHits = ({ hits, index, limit = 4 }) => (
  <MainContainer>
    <Typography variant="typo1" color="main.default" mb={3}>
      Top Artists
    </Typography>
    {hits.slice(0, limit).map((artistHit) => (
      <ArtistHit key={`artists-${index}-${artistHit.id}`} hit={artistHit} />
    ))}
  </MainContainer>
)

export default ArtistHits
