import React from 'react'
import styled from 'styled-components'
import { useSearchBox } from 'react-instantsearch'

import Input from 'components/Input'
import { SearchMedium } from 'components/icons'

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  flex: 1;

  > div {
    width: 100%;
  }
`

const SearchIcon = styled(SearchMedium)`
  max-width: 20px;
  color: ${(p) => p.theme.colors.gray[2]};
`

const SearchInput = ({ query, refine, refreshIndexes, currentIndex }) => {
  const [value, setValue] = React.useState(query)

  React.useEffect(() => {
    if (currentIndex?.stats?.numberOfDocuments === 0) {
      refreshIndexes()
    }
    refine(value)
  }, [value])

  return (
    <SearchWrapper>
      <Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        clear={() => setValue('')}
        placeholder="Search something"
        icon={<SearchIcon />}
        style={{ width: 520 }}
      />
    </SearchWrapper>
  )
}

const SearchBox = (props) => {
  const searchBoxApi = useSearchBox(props)

  return <SearchInput {...searchBoxApi} />
}

export default SearchBox
