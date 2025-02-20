import React from 'react'
import styled from 'styled-components'
import { MeiliSearch as Meilisearch } from 'meilisearch'

import Button from 'components/Button'
import Input from 'components/Input'
import Link from 'components/Link'
import Typography from 'components/Typography'

import ApiKeyContext from 'context/ApiKeyContext'

import clientAgents from '../version/client-agents'

const ErrorMessage = styled(Typography)`
  margin-top: 2rem;
`

const ErrorName = styled.div`
  margin-bottom: 1rem;
`

const ErrorKeyWrapper = styled.div`
  // margin-bottom: 0.25rem;
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

const ApiKeyModalContent = ({ host, closeModal }) => {
  const { apiKey, setApiKey } = React.useContext(ApiKeyContext)
  const [value, setValue] = React.useState(apiKey || '')
  const [error, setError] = React.useState(null)

  const updateClient = async () => {
    const clientToTry = new Meilisearch({
      host,
      apiKey: value,
      clientAgents,
    })
    try {
      await clientToTry.getIndexes()
      setApiKey(value)
      closeModal()
      setError(null)
    } catch (err) {
      setError(err)
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

      {error && (
        <div>
          <ErrorMessage variant="typo1" color="main.default">
            <ErrorName>{error.name}</ErrorName>

            {Object.keys(error.cause).map((key) => (
              <ErrorKeyWrapper key={key}>
                <Typography variant="typo8" color="gray.6">
                  {key} {JSON.stringify(error.cause[key])}
                </Typography>
              </ErrorKeyWrapper>
            ))}
          </ErrorMessage>
        </div>
      )}
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
      </div>
    </>
  )
}

export default ApiKeyModalContent
