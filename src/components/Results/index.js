/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import { connectStateResults, connectStats } from 'react-instantsearch-dom'

import Document from 'components/icons/Document'
import Picture from 'components/icons/Picture'
import Box from 'components/Box'
import Stats from 'components/Stats'
import Toggle from 'components/Toggle'
import useLocalStorage from 'hooks/useLocalStorage'
import InfiniteHits from './InfiniteHits'

const Wrapper = styled.div`
  flex: 1;
  overflow: auto;
`

const Label1 = () => (
  <>
    <Picture width={25} height={21} style={{ marginRight: 8 }} />
    Fancy
  </>
)

const Label2 = () => (
  <>
    <Document width={19} height={22} style={{ marginRight: 8 }} />
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
    <Wrapper>
      <Box maxWidth={928} m="0 auto" py={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={56}
        >
          <div>
            <ConnectedStats nbResults={searchResults && searchResults.nbHits} />
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
      </Box>
    </Wrapper>
  )
})

export default Results
