import React from 'react'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import styled from 'styled-components'
import { Button } from 'reakit/Button'

import { baseUrl } from 'App'
import Box from 'components/Box'
import Input from 'components/Input'
import Typography from 'components/Typography'

import ApiKeyContext from 'context/ApiKeyContext'
import ClientContext from 'context/ClientContext'

const ErrorMessage = styled(Typography)`
  position: absolute;
  left: 0;
  top: 32px;
`

const ApiKeyModalContent = ({ closeModal }) => {
  const { setClient } = React.useContext(ClientContext)
  const { apiKey, setApiKey } = React.useContext(ApiKeyContext)
  const [value, setValue] = React.useState(apiKey || '')
  const [error, setError] = React.useState()

  const updateClient = async () => {
    const clientToTry = instantMeiliSearch(baseUrl, value)
    try {
      await clientToTry.client.listIndexes()
      setApiKey(value)
      setClient(clientToTry)
      closeModal()
      setError()
    } catch (err) {
      setError(err.message)
    }
  }

  React.useEffect(() => {
    setValue(apiKey)
  }, [apiKey])

  return (
    <>
      <Box display="flex">
        <Input
          style={{ display: 'block' }}
          name="apiKey"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => updateClient()}>Go</Button>
      </Box>
      <Box position="relative">
        <Typography variant="typo11" my={3} color="gray.6" mt={2}>
          At least a private API key is required for the dashboard to access the
          indexes list.
        </Typography>
        {error && (
          <ErrorMessage variant="typo11" color="main.default">
            {error}
          </ErrorMessage>
        )}
      </Box>
    </>
  )
}

export default ApiKeyModalContent
