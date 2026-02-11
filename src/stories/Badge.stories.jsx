import React from 'react'

import Badge from 'components/Badge'

export default {
  title: 'Components/Badge',
  component: Badge,
}

const Template = (args) => <Badge {...args} />

export const Default = Template.bind({})
Default.args = {
  children: '4762',
}
