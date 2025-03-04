import React from 'react'
import styled, { keyframes } from 'styled-components'
import useNewsletter from 'hooks/useNewsletter'
import ArrowPathIcon from './icons/heroicons/ArrowPathIcon'
import CheckIcon from './icons/heroicons/CheckIcon'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const SpinningIcon = styled.div`
  display: inline-flex;
  animation: ${spin} 1s linear infinite;
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${(p) => p.theme.colors.gray[8]};
  border-radius: 8px;
  font-size: 0.875rem;
  color: ${(p) => p.theme.colors.gray[0]};
  background: ${(p) => p.theme.colors.white};
  margin: 1rem 0;
  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.main.default};
  }
  &::placeholder {
    color: ${(p) => p.theme.colors.gray[6]};
  }
`

const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${(p) => p.theme.colors.main.default};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  &:hover {
    background: ${(p) => p.theme.colors.main.dark};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const ErrorMessage = styled.p`
  color: ${(p) => p.theme.colors.error.text};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const SuccessMessage = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${(p) => p.theme.colors.success.background};
  border: 1px solid ${(p) => p.theme.colors.success.border};
  border-radius: 8px;
  padding: 0rem;
  color: ${(p) => p.theme.colors.success.text};
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  p {
    font-size: 0.875rem;
  }
`

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
