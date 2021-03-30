import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

import Input from 'components/Input'
import Search from 'components/icons/Search'

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
      placeholder="Search something"
      icon={<Search size={16} />}
      style={{ width: 520 }}
    />
  )
})

export default SearchBox
