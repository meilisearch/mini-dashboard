import React from 'react'
import Typography from 'components/Typography'
import EmptyView from 'components/EmptyView'

const NoMeilisearchRunning = () => (
  <EmptyView buttonLink="https://docs.meilisearch.com/learn/getting_started/quick_start.html">
    <Typography
      variant="typo8"
      style={{ textAlign: 'center' }}
      mb={3}
      color="gray.0"
    >
      It seems like Meilisearch isn’t running, did you forget to start it?
    </Typography>
    <Typography
      variant="typo8"
      style={{ textAlign: 'center' }}
      mb={32}
      color="gray.2"
    >
      (Don’t forget to set an API Key if you want one)
    </Typography>
    <Typography
      variant="typo8"
      style={{ textAlign: 'center', fontSize: 40 }}
      mb={56}
    >
      <span role="img" aria-label="face-with-monocle">
        🧐
      </span>
    </Typography>
  </EmptyView>
)

export default NoMeilisearchRunning
