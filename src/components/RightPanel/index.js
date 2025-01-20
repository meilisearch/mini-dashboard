import React from 'react'
import styled from 'styled-components'
import Color from 'color'
import { useMeilisearchClientContext } from 'context/MeilisearchClientContext'
import { MeilisearchLogo, DiscordLogo, GithubLogo } from 'components/icons'
import Card from 'components/Card'
import Link from 'components/Link'
import Typography from 'components/Typography'
// import theme from '../../theme'

const PanelWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 25vw;
  height: 100vh;
  background: ${(p) => p.theme.colors.gray[11]};
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  padding: 1.5rem 2rem;
  z-index: 10;
  overflow-y: auto;
`

const Title = styled.h2`
  color: ${(p) => p.theme.colors.main.default};
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0;
`

const TitleIcon = styled.span`
  font-size: 2rem;
`

const SectionTitle = styled.h3`
  color: ${(p) => p.theme.colors.gray[0]};
  font-size: 1.25rem;
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

const StyledCard = styled(Card)`
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

const StyledLink = styled(Link)`
  border-radius: 20px;
  box-shadow: none;
  transition: box-shadow 300ms;
  text-decoration: none;

  &:hover,
  &:focus {
    outline: none;
    box-shadow: 0px 0px 30px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.1)};
  }
`

const Logo = styled.div`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const HelpCard = ({ description, title, logo, href, ...props }) => (
  <StyledLink href={href} {...props}>
    <StyledCard forwardedAs="div">
      <Logo>{logo}</Logo>
      <CardContent>
        <Typography variant="typo4" color="gray.0">
          {title}
        </Typography>
        <Typography variant="typo3" color="gray.8" style={{ fontWeight: 400 }}>
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  </StyledLink>
)

const RightPanel = ({ isOpen, onClose }) => {
  const { meilisearchJsClient } = useMeilisearchClientContext()
  const [version, setVersion] = React.useState()

  React.useEffect(() => {
    const getMeilisearchVersion = async () => {
      try {
        const res = await meilisearchJsClient.getVersion()
        setVersion(res.pkgVersion)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }
    getMeilisearchVersion()
  }, [meilisearchJsClient])

  return (
    <PanelWrapper isOpen={isOpen}>
      <Header>
        <Title>
          <TitleIcon>🚀</TitleIcon>
          <span>Get started with Meilisearch v{version}</span>
        </Title>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </Header>

      <SectionTitle>Help center</SectionTitle>
      <Typography
        variant="typo11"
        color="gray.6"
        style={{ marginBottom: '2rem' }}
      >
        If you need help with anything, here are a few links that can be useful.
      </Typography>

      <HelpCard
        logo={<GithubLogo style={{ width: 62 }} />}
        title="Github"
        description="Explore our repositories on Github"
        href="https://github.com/meilisearch"
      />
      <HelpCard
        logo={<DiscordLogo style={{ width: 62 }} />}
        title="Discord"
        description="Join our Discord and find the help you need"
        href="https://discord.meilisearch.com"
      />
      <HelpCard
        logo={<MeilisearchLogo style={{ width: 62 }} />}
        title="Documentation"
        description="Learn how to tune your Meilisearch"
        href="https://docs.meilisearch.com/?utm_campaign=oss&utm_source=integration&utm_medium=minidashboard"
      />
    </PanelWrapper>
  )
}

export default RightPanel
