import React from 'react'
import styled from 'styled-components'
import { connectSearchBox } from 'react-instantsearch-dom'

import { scrollToTop } from 'components/ScrollToTop'
import Input from 'components/Input'
import { SearchMedium } from 'components/icons'

const SearchIcon = styled(SearchMedium)`
  max-width: 20px;
  color: ${(p) => p.theme.colors.gray[2]};
`

const SearchBox = connectSearchBox(
  ({ currentRefinement, refine, refreshIndexes, currentIndex }) => {
    const [value, setValue] = React.useState(currentRefinement)

    React.useEffect(() => {
      if (currentIndex?.stats?.numberOfDocuments === 0) {
        refreshIndexes()
      }
      refine(value)
    }, [value])

    return (
      <Input
        type="search"
        value={value}
        onChange={(e) => {
          scrollToTop()
          setValue(e.target.value)
        }}
        clear={() => {
          scrollToTop()
          setValue('')
        }}
        placeholder="Search something"
        icon={<SearchIcon />}
        style={{ width: 520 }}
        autoFocus
      />
    )
  }
)

export default SearchBox
