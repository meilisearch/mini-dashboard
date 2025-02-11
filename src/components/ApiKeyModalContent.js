import React from 'react'
import styled from 'styled-components'
import { MeiliSearch as Meilisearch } from 'meilisearch'

import { baseUrl } from 'App'
import Button from 'components/Button'
import Input from 'components/Input'
import Link from 'components/Link'
import Typography from 'components/Typography'

import ApiKeyContext from 'context/ApiKeyContext'

import clientAgents from '../version/client-agents'

const ErrorMessage = styled(Typography)`
  position: absolute;
  left: 0;
  top: 32px;
`

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const FullWidthInput = styled(Input)`
  display: block;
  height: 34px;
  width: 100%;
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

  return (
    <>
      <InputContainer>
        <FullWidthInput
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
          style={{ minWidth: 'auto', width: 64, marginLeft: 24 }}
        >
          Save
        </Button>
      </InputContainer>
      <div>
        <Typography variant="typo11" my={3} color="gray.6" mt={3}>
          The API key should have permission to check the instance health and
          list indexes. Learn more about{' '}
          <Link
            href="https://docs.meilisearch.com/reference/api/keys.html#create-a-key"
            target="_blank"
          >
            API keys
          </Link>
          .
        </Typography>
        {error && (
          <ErrorMessage variant="typo11" color="main.default">
            {error}
          </ErrorMessage>
        )}
      </div>
    </>
  )
}

export default ApiKeyModalContent
