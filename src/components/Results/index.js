/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import { Stats } from 'react-instantsearch-dom'

import Box from 'components/Box'
import ResultsList from './ResultsList'

const Wrapper = styled.div`
  flex: 1;
  overflow: auto;
`

const Results = () => (
  <Wrapper>
    <Box maxWidth={928} m="0 auto" py={4}>
      <Stats />
      <ResultsList />
    </Box>
  </Wrapper>
)

export default Results
