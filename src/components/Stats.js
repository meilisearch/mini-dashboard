import React from 'react'
import styled from 'styled-components'
import { connectStats } from 'react-instantsearch-dom'

import Search from 'components/icons/Search'
import Timer from 'components/icons/Timer'
import Typography from 'components/Typography'

const Legend = styled(Typography)`
  display: block;
  margin-bottom: 6px;
  svg {
    margin-right: 6px;
  }
`

const Stat = ({ icon, legend, value, ...props }) => (
  <div {...props}>
    <Legend variant="typo4" color="gray.7">
      {icon}
      {legend}
    </Legend>
    <Typography variant="typo9" color="main.default">
      {value}
    </Typography>
  </div>
)

const StatsContainer = styled.div`
  display: flex;
`

const Stats = connectStats(({ nbHits, processingTimeMS }) => (
  <StatsContainer>
    <Stat icon={<Search size={11} />} legend="Hits" value={nbHits} />
    <Stat
      icon={<Timer width={15} height={13} />}
      legend="Time spent"
      value={`${processingTimeMS} ms`}
      style={{ marginLeft: 88 }}
    />
  </StatsContainer>
))

export default Stats
