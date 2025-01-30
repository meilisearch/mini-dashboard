import React from 'react'
import styled from 'styled-components'

import useNewsletter from 'hooks/useNewsletter'

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

  &:hover {
    background: ${(p) => p.theme.colors.main.dark};
  }
`

const NewsletterForm = () => {
  const [email, setEmail] = React.useState('')
  const { subscribe } = useNewsletter()
  const [status, setStatus] = React.useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    subscribe(email)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
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
      />
      <Button type="submit">Subscribe</Button>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'success' && <p>Success!</p>}
      {status === 'error' && <p>Error</p>}
    </form>
  )
}

export default NewsletterForm
