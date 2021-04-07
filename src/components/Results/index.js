/* eslint-disable no-unused-vars */
import React from 'react'
import { connectStateResults, connectStats } from 'react-instantsearch-dom'

import { DocumentBig, Picture } from 'components/icons'
import Box from 'components/Box'
import Stats from 'components/Stats'
import Toggle from 'components/Toggle'
import useLocalStorage from 'hooks/useLocalStorage'
import InfiniteHits from './InfiniteHits'

const Label1 = () => (
  <>
    <Picture style={{ marginRight: 8, height: 22 }} />
    Fancy
  </>
)

const Label2 = () => (
  <>
    <DocumentBig style={{ marginRight: 8, height: 22 }} />
    Json
  </>
)

const ConnectedStats = connectStats((props) => <Stats {...props} />)

const Results = connectStateResults(({ searchResults, searching }) => {
  const [mode, setMode] = useLocalStorage('mode', 'fancy')
  const hasResults = searchResults && searchResults.nbHits !== 0
  // if (searching) return <div>loading</div>
  // if (!searching && hasResults) return <InfiniteHits hitComponent={Hit} />
  // return <div>No results</div>
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={56}
      >
        <div>
          <ConnectedStats
            nbResults={searchResults && searchResults.hits.length}
          />
        </div>
        <Toggle
          onLabel={<Label1 />}
          offLabel={<Label2 />}
          ariaLabel="toggleMode"
          initialValue={mode === 'fancy'}
          onChange={(e) => setMode(e.target.checked ? 'fancy' : 'json')}
        />
      </Box>
      <InfiniteHits mode={mode} />
    </>
  )
})

export default Results
