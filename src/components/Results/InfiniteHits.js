import React from 'react'
import styled from 'styled-components'
import { connectInfiniteHits } from 'react-instantsearch-dom'
// import ReactJson from 'react-json-view'

// import { jsonTheme } from 'theme'
import Button from 'components/Button'
// import Card from 'components/Card'
import ScrollToTop from 'components/ScrollToTop'

import Hit from './Hit'

const HitsList = styled.ul`
  padding: 0;
  margin: 0;
  > li + li {
    margin-top: 16px;
  }
`

const InfiniteHits = connectInfiniteHits(({ hits, hasMore, refineNext }) => (
  // ({ hits, hasMore, refineNext, mode }) => {
  <div>
    {/* {mode === 'fancy' ? ( */}
    <HitsList>
      {hits.map((hit, index) => (
        <Hit key={index} hit={hit} />
      ))}
    </HitsList>
    {/* ) : (
        <Card style={{ fontSize: 14, minHeight: 320 }}>
          <ReactJson
            src={hits}
            name={null}
            collapsed={2}
            enableClipboard={false}
            displayObjectSize={false}
            displayDataTypes={false}
            theme={jsonTheme}
          />
        </Card>
      )} */}
    {hasMore && (
      <Button
        size="small"
        variant="bordered"
        onClick={refineNext}
        style={{ margin: '0 auto', marginTop: 32 }}
      >
        Load more
      </Button>
    )}
    <ScrollToTop />
  </div>
))

export default InfiniteHits
