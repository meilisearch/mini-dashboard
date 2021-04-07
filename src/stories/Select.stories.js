import React from 'react'

import Select from 'components/Select'
import NoSelectOption from 'components/NoSelectOption'
import { Indexes } from 'components/icons'

export default {
  title: 'Components/Select',
  component: Select,
}

const options = [
  {
    uid: 'pokemon',
    stats: {
      numberOfDocuments: 809,
    },
  },
  {
    uid: 'movies',
    stats: {
      numberOfDocuments: 19546,
    },
  },
]

const Template = (args) => {
  const [currentOption, setCurrentOption] = React.useState()
  return (
    <Select
      currentOption={currentOption}
      setCurrentOption={setCurrentOption}
      {...args}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  options,
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  options,
  icon: <Indexes style={{ height: 18 }} />,
}

export const WithoutOptions = Template.bind({})
WithoutOptions.args = {
  options: null,
  icon: <Indexes style={{ height: 18 }} />,
  noOptionComponent: <NoSelectOption />,
}
