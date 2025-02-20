import React from 'react'
import Typography from 'components/Typography'
import EmptyView from 'components/EmptyView'
import BodyWrapper from 'components/BodyWrapper'
import Box from 'components/Box'
import Button from 'components/Button'
import { Key } from 'components/icons'
import styled from 'styled-components'

const OpenModalButton = styled(Button)`
  margin-bottom: 2.5rem;
`

const UnreachableInstance = ({ baseUrl, onOpenApiKeyModal }) => (
  <BodyWrapper>
    <Box width={928} m="0 auto" py={4} display="flex" flexDirection="column">
      <EmptyView buttonLink="https://docs.meilisearch.com/learn/getting_started/quick_start.html">
        <Typography
          variant="typo8"
          style={{ textAlign: 'center' }}
          mb={3}
          color="gray.0"
        >
          Cannot reach Meilisearch at <strong>{baseUrl}</strong>.
        </Typography>
        <Typography
          variant="typo8"
          style={{ textAlign: 'center' }}
          mb={3}
          color="gray.0"
        >
          Check the provided URL and API Key.
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

        <OpenModalButton
          icon={<Key style={{ height: 19 }} />}
          aria-label="Edit API key"
          onClick={onOpenApiKeyModal}
        >
          API key
        </OpenModalButton>
      </EmptyView>
    </Box>
  </BodyWrapper>
)

export default UnreachableInstance
