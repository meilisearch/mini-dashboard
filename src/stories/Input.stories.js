import React from 'react'

import Input from 'components/Input'
import { SearchMedium } from 'components/icons'

export default {
  title: 'Components/Input',
  component: Input,
}

const Template = (args) => (
  <Input type="search" {...args} style={{ maxWidth: 300 }} />
)

export const Default = Template.bind({})

export const WithIcon = Template.bind({})
WithIcon.args = {
  icon: <SearchMedium style={{ width: 20 }} />,
}
