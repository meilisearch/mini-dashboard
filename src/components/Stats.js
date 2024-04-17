import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { SearchSmall, Speed } from 'components/icons'
import Typography from 'components/Typography'

const Legend = styled(Typography)`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  svg {
    margin-right: 6px;
  }
`

const Stat = ({ icon, legend, value, ...props }) => (
  <div style={{ minWidth: 170, marginRight: '30px' }} {...props}>
    <Legend variant="typo4" color="gray.7">
      {icon}
      <span>{legend}</span>
    </Legend>
    <Typography variant="typo9" color="main.default">
      {value}
    </Typography>
  </div>
)

const StatsContainer = styled.div`
  display: flex;
`

const Stats = ({ nbHits, processingTimeMS, nbResults, ...props }) => {
  const localeNbHits = `${
    nbHits !== nbResults ? '~' : ''
  } ${nbHits.toLocaleString()}`

  return (
    <StatsContainer {...props}>
      <Stat
        icon={<SearchSmall style={{ height: 12 }} />}
        legend="Hits"
        value={localeNbHits}
      />
      <Stat
        icon={<Speed style={{ height: 13 }} />}
        legend="Time spent"
        value={`${processingTimeMS} ms`}
      />
    </StatsContainer>
  )
}

Stats.propTypes = {
  /**
   * Number of hits provided by connectStats
   */
  nbHits: PropTypes.number,
  /**
   * Time in ms needed to execute the request
   */
  processingTimeMS: PropTypes.number,
  /**
   * Number of results provided by connectStateResults
   */
  nbResults: PropTypes.number,
}

export default Stats
