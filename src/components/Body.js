import React from 'react'

import Box from 'components/Box'
import EmptyView from 'components/EmptyView'
import OnBoarding from 'components/OnBoarding'
import Results from 'components/Results'
import Typography from 'components/Typography'
import BodyWrapper from 'components/BodyWrapper'

const IndexContent = ({ currentIndex }) => {
  if (!currentIndex) return <OnBoarding />
  if (currentIndex?.stats?.numberOfDocuments > 0) return <Results />
  return (
    <EmptyView buttonLink="https://docs.meilisearch.com/reference/api/documents.html">
      <Typography
        variant="typo8"
        style={{ textAlign: 'center' }}
        mb={32}
        color="gray.0"
      >
        There&apos;s no document in the selected index
      </Typography>
    </EmptyView>
  )
}

const Body = ({ currentIndex, isRightPanelOpen }) => (
  <BodyWrapper isRightPanelOpen={isRightPanelOpen}>
    <Box
      flex={1}
      m="0 auto"
      py={4}
      px={4}
      display="flex"
      flexDirection="column"
    >
      <IndexContent currentIndex={currentIndex} />
    </Box>
  </BodyWrapper>
)

export default Body
