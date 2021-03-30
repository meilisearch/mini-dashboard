import React from 'react'

import Select from 'components/Select'
import Indexes from 'components/icons/Indexes'

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
  icon: <Indexes />,
}

export const WithoutOptions = Template.bind({})
WithoutOptions.args = {
  options: null,
  icon: <Indexes />,
  noOptionComponent: <div style={{ padding: 16 }}>no indexes found</div>,
}
