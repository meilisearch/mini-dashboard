import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

import Input from 'components/Input'
import Search from 'components/icons/Search'

import useThrottle from 'hooks/useThrottle'

const SearchBox = ({ currentRefinement, refine }) => {
  const [value, setValue] = React.useState(currentRefinement)
  const throttledText = useThrottle(value, 1000)

  React.useEffect(() => {
    refine(throttledText)
  }, [throttledText])

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
}

const ThrottledSearchBox = connectSearchBox(SearchBox)

export default ThrottledSearchBox
