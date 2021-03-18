import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import Input from 'components/Input'

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
    <Input
      type="search"
      value={value}
      onChange={onChangeDebounced}
      placeholder="Search something"
    />
  )
}

const DebouncedSearchBox = connectSearchBox(SearchBox)

export default DebouncedSearchBox
