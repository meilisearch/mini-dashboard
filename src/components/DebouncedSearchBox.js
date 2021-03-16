import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

const SearchBox = ({ currentRefinement, refine, delay }) => {
  const [value, setValue] = React.useState(currentRefinement)
  const [timerId, setTimerId] = React.useState(null)

  const onChangeDebounced = (event) => {
    const newValue = event.currentTarget.value
    setValue(newValue)
    clearTimeout(timerId)
    setTimerId(setTimeout(() => refine(newValue), delay))
  }

  return (
    <input
      type="search"
      value={value}
      onChange={onChangeDebounced}
      placeholder="Search for products..."
    />
  )
}

const DebouncedSearchBox = connectSearchBox(SearchBox)

export default DebouncedSearchBox
