import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const SpinningIcon = styled.div`
  display: inline-flex;
  animation: ${spin} 1s linear infinite;
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`

export const Input = styled.input`
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

export const Button = styled.button`
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

export const ErrorMessage = styled.p`
  color: ${(p) => p.theme.colors.error.text};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

export const SuccessMessage = styled.div`
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
