import React from 'react'
import useNewsletter from 'hooks/useNewsletter'
import {
  SpinningIcon,
  Input,
  Button,
  ErrorMessage,
  SuccessMessage,
} from 'components/FormElements'
import ArrowPathIcon from './icons/heroicons/ArrowPathIcon'
import CheckIcon from './icons/heroicons/CheckIcon'

const NewsletterForm = () => {
  const [email, setEmail] = React.useState('')
  const { subscribe } = useNewsletter()
  const [status, setStatus] = React.useState('idle')
  const [error, setError] = React.useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    subscribe(email)
      .then(() => setStatus('success'))
      .catch((err) => {
        setStatus('error')
        setError(err.message)
      })
  }

  if (status === 'success') {
    return (
      <SuccessMessage>
        <CheckIcon />
        <p>Thanks for subscribing!</p>
      </SuccessMessage>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'loading'}
        required
        style={{ marginTop: '0rem' }}
      />
      <Button
        type="submit"
        disabled={status === 'loading'}
        aria-label="Subscribe"
      >
        {status === 'loading' ? (
          <>
            <SpinningIcon>
              <ArrowPathIcon />
            </SpinningIcon>
            Subscribing...
          </>
        ) : (
          'Subscribe'
        )}
      </Button>
      {status === 'error' && <ErrorMessage>{error}</ErrorMessage>}
    </form>
  )
}

export default NewsletterForm
