import React from 'react'
import styled from 'styled-components'
import { MeilisearchLogo, DiscordLogo } from 'components/icons'
import Link from 'components/Link'
import Typography from 'components/Typography'

const PanelWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 30vw;
  height: 100vh;
  background: ${(p) => p.theme.colors.gray[11]};
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  padding: 2rem 2.5rem;
  z-index: 10;
  overflow-y: auto;
`

const Title = styled.h2`
  color: ${(p) => p.theme.colors.main.default};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`

const SectionTitle = styled.h3`
  color: ${(p) => p.theme.colors.gray[0]};
  font-weight: 600;
  margin: 0 0 1.25rem 0;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: ${(p) => p.theme.colors.gray[0]};
`

const HelpLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background: ${(p) => p.theme.colors.gray[10]};
  border-radius: 6px;
  text-decoration: none;
  color: ${(p) => p.theme.colors.gray[0]};
  transition: background-color 0.2s;

  svg {
    width: 20px;
    height: 20px;
    color: ${(p) => p.theme.colors.gray[0]};
  }

  &:hover {
    background: ${(p) => p.theme.colors.gray[9]};
    text-decoration: none;
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

  &:hover {
    background: ${(p) => p.theme.colors.main.dark};
  }
`

const Section = styled.div`
  margin-bottom: 2.5rem;
`

const CloudButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(269.85deg, #ff1786 0%, #8e33de 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`

const CloudCardLink = styled(Link)`
  text-decoration: none;
  display: block;

  &:hover {
    text-decoration: none;
  }
`

const RightPanel = ({ isOpen, onClose }) => {
  const [email, setEmail] = React.useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    console.log('Subscribe with email:', email)
  }

  return (
    <PanelWrapper isOpen={isOpen}>
      <Header>
        <Title>Get started</Title>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </Header>

      <Section>
        <SectionTitle>Try Meilisearch Cloud</SectionTitle>
        <Typography
          variant="typo11"
          color="gray.6"
          style={{ marginBottom: '1rem' }}
        >
          Streamline your experience with search analytics, monitoring, and
          more.
        </Typography>
        <CloudCardLink href="https://cloud.meilisearch.com">
          <CloudButton>Start free trial</CloudButton>
        </CloudCardLink>
      </Section>

      <Section>
        <SectionTitle>Need help?</SectionTitle>
        <Typography
          variant="typo11"
          color="gray.6"
          style={{ marginBottom: '1.25rem' }}
        >
          Check out our resources to get started.
        </Typography>

        <HelpLink href="https://docs.meilisearch.com/?utm_campaign=oss&utm_source=integration&utm_medium=minidashboard">
          <MeilisearchLogo />
          <span>Documentation</span>
        </HelpLink>
        <HelpLink href="https://github.com/meilisearch">
          <MeilisearchLogo />
          <span>Help center</span>
        </HelpLink>
        <HelpLink href="https://discord.meilisearch.com">
          <DiscordLogo />
          <span>Community</span>
        </HelpLink>
      </Section>

      <Section>
        <SectionTitle>Stay up to date</SectionTitle>
        <Typography
          variant="typo11"
          color="gray.6"
          style={{ marginBottom: '0rem' }}
        >
          Get monthly updates about new features and tips to get the the most
          out of Meilisearch.
        </Typography>
        <form onSubmit={handleSubscribe}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </Section>
    </PanelWrapper>
  )
}

export default RightPanel
