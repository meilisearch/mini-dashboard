/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import { Stats } from 'react-instantsearch-dom'

import Document from 'components/icons/Document'
import Picture from 'components/icons/Picture'
import Box from 'components/Box'
import Toggle from 'components/Toggle'
import useLocalStorage from 'hooks/useLocalStorage'
import ResultsList from './ResultsList'

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

const Results = () => {
  const [mode, setMode] = useLocalStorage('mode', 'fancy')
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
            <Stats />
          </div>
          <Toggle
            onLabel={<Label1 />}
            offLabel={<Label2 />}
            ariaLabel="toggleMode"
            initialValue={mode === 'fancy'}
            onChange={(e) => setMode(e.target.checked ? 'fancy' : 'json')}
          />
        </Box>
        <ResultsList mode={mode} />
      </Box>
    </Wrapper>
  )
}

export default Results
