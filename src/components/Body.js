import React from 'react'
import { InstantSearch } from 'react-instantsearch-dom'

import { useMeilisearchClientContext } from 'context/MeilisearchClientContext'
import useLocalStorage from 'hooks/useLocalStorage'
import Box from 'components/Box'
import Header from 'components/Header/index'
import Facets from 'components/Facets/index'
import BodyWrapper from 'components/BodyWrapper'
import EmptyView from 'components/EmptyView'
import OnBoarding from 'components/OnBoarding'
import Results from 'components/Results'
import Typography from 'components/Typography'

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
  const [settings, setSettings] = useLocalStorage('indexSettings')
  const { meilisearchJsClient, instantMeilisearchClient } =
    useMeilisearchClientContext()

  // Get the settings for facets
  React.useEffect(() => {
    const getIndexSettings = async () => {
      try {
        const res = await meilisearchJsClient
          .index(currentIndex?.uid)
          ?.getSettings()
        setSettings(res.filterableAttributes)
      } catch (err) {
        setSettings([])
      }
    }

    getIndexSettings()
  }, [meilisearchJsClient, currentIndex])

  return (
    <InstantSearch
      indexName={currentIndex ? currentIndex.uid : ''}
      searchClient={instantMeilisearchClient}
    >
      <Header
        indexes={indexes}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        requireApiKeyToWork={requireApiKeyToWork}
        client={meilisearchJsClient}
        refreshIndexes={getIndexesList}
        isBannerVisible={isApiKeyBannerVisible}
      />
      <BodyWrapper>
        <>
          <Facets settings={settings} />
          <Box
            width={928}
            m="0 auto"
            py={4}
            display="flex"
            flexDirection="column"
          >
            <IndexContent currentIndex={currentIndex} />
          </Box>
        </>
      </BodyWrapper>
    </InstantSearch>
  )
}

export default Body
