import React from 'react'
import styled from 'styled-components'
import { connectInfiniteHits } from 'react-instantsearch-dom'
import ReactJson from 'react-json-view'

import theme from 'theme'
import Card from 'components/Card'

import Hit from './Hit'

const HitsList = styled.ul`
  padding: 0;
  > li + li {
    margin-top: 16px;
  }
`

const jsonTheme = {
  base00: 'white',
  base01: '#ddd',
  base02: theme.colors.jsonVue.badgeBg,
  base03: '#444',
  base04: 'purple',
  base05: '#444',
  base06: '#444',
  base07: theme.colors.jsonVue.keys,
  base08: '#444',
  base09: theme.colors.jsonVue.string,
  base0A: theme.colors.jsonVue.badgeFg,
  base0B: theme.colors.jsonVue.string,
  base0C: theme.colors.jsonVue.keyNumber,
  base0D: theme.colors.jsonVue.arrows,
  base0E: theme.colors.jsonVue.arrows,
  base0F: theme.colors.jsonVue.integers,
}

const InfiniteHits = connectInfiniteHits(
  ({ hits, hasMore, refineNext, mode }) => (
    <div>
      {mode === 'fancy' ? (
        <HitsList>
          {hits.map((hit, index) => (
            <Hit key={index} hit={hit} />
          ))}
        </HitsList>
      ) : (
        <Card style={{ fontSize: 14 }}>
          <ReactJson
            src={hits}
            name={null}
            collapsed={3}
            enableClipboard={false}
            displayObjectSize={false}
            displayDataTypes={false}
            theme={jsonTheme}
          />
        </Card>
      )}

      <button disabled={!hasMore} onClick={refineNext} type="button">
        Show more
      </button>
    </div>
  )
)

export default InfiniteHits
