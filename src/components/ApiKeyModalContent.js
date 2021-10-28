import React from 'react'
import styled from 'styled-components'
import { MeiliSearch } from 'meilisearch'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

import { baseUrl } from 'App'
import Box from 'components/Box'
import Button from 'components/Button'
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
  const { setISClient, setMSClient } = React.useContext(ClientContext)
  const { apiKey, setApiKey } = React.useContext(ApiKeyContext)
  const [value, setValue] = React.useState(apiKey || '')
  const [error, setError] = React.useState()

  const updateClient = async () => {
    const clientToTry = new MeiliSearch({ host: baseUrl, apiKey: value })
    try {
      await clientToTry.getIndexes()
      setApiKey(value)
      setISClient(instantMeiliSearch(baseUrl, value))
      setMSClient(clientToTry)
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
          style={{ display: 'block', height: 34 }}
          name="apiKey"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          variant="filled"
          size="small"
          onClick={() => updateClient()}
          style={{ minWidth: 'auto', width: 48, marginLeft: 16 }}
        >
          Go
        </Button>
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
