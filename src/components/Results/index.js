/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import { Stats } from 'react-instantsearch-dom'

import Document from 'components/icons/Document'
import Picture from 'components/icons/Picture'
import Box from 'components/Box'
import Toggle from 'components/Toggle'
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

const Results = () => (
  <Wrapper>
    <Box maxWidth={928} m="0 auto" py={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Stats />
        <Toggle
          onLabel={<Label1 />}
          offLabel={<Label2 />}
          ariaLabel="toggleMode"
          // Use onChange to update context Fancy/Json
          // eslint-disable-next-line no-console
          onChange={(e) => console.log(e.target.checked)}
        />
      </Box>
      <ResultsList />
    </Box>
  </Wrapper>
)

export default Results
