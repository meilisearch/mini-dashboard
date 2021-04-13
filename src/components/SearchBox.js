import React from 'react'
import styled from 'styled-components'
import { connectSearchBox } from 'react-instantsearch-dom'

import Input from 'components/Input'
import { SearchMedium } from 'components/icons'

const SearchIcon = styled(SearchMedium)`
  max-width: 20px;
  color: ${(p) => p.theme.colors.gray[2]};
`

const SearchBox = connectSearchBox(({ currentRefinement, refine }) => {
  const [value, setValue] = React.useState(currentRefinement)

  React.useEffect(() => {
    refine(value)
  }, [value])

  return (
    <Input
      type="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      clear={() => setValue('')}
      placeholder="Search something"
      icon={<SearchIcon />}
      style={{ width: 520 }}
    />
  )
})

export default SearchBox
