import React from 'react'
import styled from 'styled-components'
import { connectSearchBox } from 'react-instantsearch-dom'
import Input from 'components/Input'
import Search from 'components/icons/Search'

const Icon = styled(Search)`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
`

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
      icon={<Icon size={16} />}
      style={{ width: 520 }}
    />
  )
}

const DebouncedSearchBox = connectSearchBox(SearchBox)

export default DebouncedSearchBox
