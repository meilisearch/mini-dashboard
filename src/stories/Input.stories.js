import React from 'react'

import Input from 'components/Input'
import Search from 'components/icons/Search'

export default {
  title: 'Components/Input',
  component: Input,
}

const Template = (args) => <Input {...args} style={{ maxWidth: 300 }} />

export const Default = Template.bind({})

export const WithIcon = Template.bind({})
WithIcon.args = {
  icon: <Search />,
}
