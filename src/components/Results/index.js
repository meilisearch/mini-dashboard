/* eslint-disable no-unused-vars */
import React from 'react'
import { connectStateResults, connectStats } from 'react-instantsearch-dom'

import { DocumentMedium, Picture } from 'components/icons'
import Box from 'components/Box'
import Stats from 'components/Stats'
import Toggle from 'components/Toggle'
import useLocalStorage from 'hooks/useLocalStorage'
import InfiniteHits from './InfiniteHits'
import NoResultForRequest from './NoResultForRequest'

const Label1 = () => (
  <>
    <Picture style={{ marginRight: 8, height: 18 }} />
    Fancy
  </>
)

const Label2 = () => (
  <>
    <DocumentMedium style={{ marginRight: 8, height: 20 }} />
    Json
  </>
)

const ConnectedStats = connectStats((props) => <Stats {...props} />)

const Results = connectStateResults(({ searchResults }) => {
  const [mode, setMode] = useLocalStorage('mode', 'fancy')
  const hasResults = searchResults?.nbHits !== 0

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={56}
      >
        <div>
          <ConnectedStats nbResults={searchResults?.hits.length} />
        </div>
        <Toggle
          onLabel={<Label1 />}
          offLabel={<Label2 />}
          ariaLabel="toggleMode"
          initialValue={mode === 'fancy'}
          onChange={(e) => setMode(e.target.checked ? 'fancy' : 'json')}
        />
      </Box>
      {hasResults ? <InfiniteHits mode={mode} /> : <NoResultForRequest />}
    </>
  )
})

export default Results
