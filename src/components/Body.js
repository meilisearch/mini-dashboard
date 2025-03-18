import React from 'react'
import { InstantSearch } from 'react-instantsearch-dom'
import styled from 'styled-components'
import { useMeilisearchClientContext } from 'context/MeilisearchClientContext'
import useLocalStorage from 'hooks/useLocalStorage'
import Box from 'components/Box'
import Header from 'components/Header/index'
import RightPanel from 'components/RightPanel'
import BodyWrapper from 'components/BodyWrapper'
import EmptyView from 'components/EmptyView'
import OnBoarding from 'components/OnBoarding'
import Results from 'components/Results'
import Typography from 'components/Typography'

const ContentWrapper = styled.div`
  width: ${({ isRightPanelOpen, theme }) =>
    isRightPanelOpen ? `calc(100% - ${theme.sizes.rightPanel})` : '100%'};
  transition: width 0.3s ease-in-out;
`

const IndexContent = ({ currentIndex }) => {
  if (!currentIndex) return <OnBoarding />
  if (currentIndex?.stats?.numberOfDocuments > 0) return <Results />
  return (
    <EmptyView buttonLink="https://docs.meilisearch.com/reference/api/documents.html">
      <Typography
        variant="typo8"
        style={{ textAlign: 'center' }}
        mb={32}
        color="gray.0"
      >
        There’s no document in the selected index
      </Typography>
    </EmptyView>
  )
}

const Body = ({
  currentIndex,
  indexes,
  getIndexesList,
  setCurrentIndex,
  requireApiKeyToWork,
  isApiKeyBannerVisible,
}) => {
  const { meilisearchJsClient, instantMeilisearchClient } =
    useMeilisearchClientContext()
  const [storedIsPanelOpen, setStoredIsPanelOpen] = useLocalStorage(
    'meilisearch-panel-open',
    true
  )

  // Right-side panel
  const [isRightPanelOpen, setIsRightPanelOpen] =
    React.useState(storedIsPanelOpen)
  const handleTogglePanel = React.useCallback(() => {
    setIsRightPanelOpen((isOpen) => !isOpen)
    setStoredIsPanelOpen((isOpen) => !isOpen)
  }, [])

  return (
    <InstantSearch
      indexName={currentIndex ? currentIndex.uid : ''}
      searchClient={instantMeilisearchClient}
    >
      <ContentWrapper isRightPanelOpen={isRightPanelOpen}>
        <Header
          indexes={indexes}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          requireApiKeyToWork={requireApiKeyToWork}
          client={meilisearchJsClient}
          refreshIndexes={getIndexesList}
          isApiKeyBannerVisible={isApiKeyBannerVisible}
          showPanelButton={!isRightPanelOpen}
          onPanelToggle={handleTogglePanel}
        />
        <BodyWrapper>
          {/* <Sidebar /> */}
          <Box
            width={928}
            m="0 auto"
            py={4}
            display="flex"
            flexDirection="column"
          >
            <IndexContent currentIndex={currentIndex} />
          </Box>
        </BodyWrapper>
      </ContentWrapper>
      <RightPanel
        isOpen={isRightPanelOpen}
        onClose={() => {
          setIsRightPanelOpen(false)
          setStoredIsPanelOpen(false)
        }}
      />
    </InstantSearch>
  )
}

export default Body
