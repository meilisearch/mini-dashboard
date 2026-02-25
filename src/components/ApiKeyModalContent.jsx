import React from 'react'
import styled from 'styled-components'
import { MeiliSearch as Meilisearch } from 'meilisearch'

import ApiKeyContext from 'context/ApiKeyContext'
import Box from 'components/Box'
import Button from 'components/Button'
import Input from 'components/Input'
import Link from 'components/Link'
import Typography from 'components/Typography'
import baseUrl from 'config'

import clientAgents from '../version/client-agents'

const ErrorMessage = styled(Typography)`
  position: absolute;
  left: 0;
  top: 32px;
`

const ApiKeyModalContent = ({ closeModal }) => {
  const { apiKey, setApiKey } = React.useContext(ApiKeyContext)
  const [value, setValue] = React.useState(apiKey || '')
  const [error, setError] = React.useState()

  const updateClient = async () => {
    const clientToTry = new Meilisearch({
      host: baseUrl,
      apiKey: value,
      clientAgents,
    })
    try {
      await clientToTry.getIndexes()
      setApiKey(value)
      closeModal()
      setError()
    } catch (err) {
      setError(err.message)
    }
  }

  React.useEffect(() => {
    setValue(apiKey)
  }, [apiKey])

  const handleClearKey = () => {
    setApiKey('')
    setValue('')
    setError()
    closeModal()
  }

  return (
    <>
      <Box display="flex">
        <Input
          style={{ display: 'block', height: 34 }}
          name="apiKey"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              updateClient()
            }
          }}
        />
        <Button
          variant="filled"
          size="small"
          onClick={() => updateClient()}
          style={{ minWidth: 'auto', width: 48, marginLeft: 16 }}
        >
          Go
        </Button>
        {apiKey ? (
          <Button
            variant="outlined"
            size="small"
            onClick={handleClearKey}
            style={{ marginLeft: 8 }}
            aria-label="Clear API key"
          >
            Clear key
          </Button>
        ) : null}
      </Box>
      <Box position="relative">
        <Typography variant="typo11" my={3} color="gray.6" mt={2}>
          An API key that has at least{' '}
          <Link
            href="https://docs.meilisearch.com/reference/api/keys.html#create-a-key"
            target="_blank"
          >
            permission
          </Link>{' '}
          to get the indexes, search and get the version of Meilisearch.
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
