import React from 'react'
import styled from 'styled-components'
import { useMeilisearchClientContext } from 'context/MeilisearchClientContext'
// import theme from '../../theme'

const PanelWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 25vw;
  height: 100vh;
  background: ${(p) => p.theme.colors.background.gradient};
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  padding: 1.5rem 2rem;
`

const Title = styled.h2`
  color: ${(p) => p.theme.colors.gray[11]};
  display: flex;
  align-items: center;
  gap: 1rem;
`

const TitleIcon = styled.span`
  font-size: 2rem;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: ${(p) => p.theme.colors.gray[11]};
`

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
    </PanelWrapper>
  )
}

export default RightPanel
