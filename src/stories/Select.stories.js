import React from 'react'

import Select from 'components/Select'
import Indexes from 'components/icons/Indexes'

export default {
  title: 'Components/Select',
  component: Select,
}

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
  options: [{ name: 'movies' }, { name: 'pokemon' }],
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  options: [{ name: 'movies' }, { name: 'pokemon' }],
  icon: <Indexes />,
}
