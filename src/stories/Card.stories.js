import React from 'react'

import Card from 'components/Card'

export default {
  title: 'Components/Card',
  component: Card,
}

const Template = (args) => <Card {...args} style={{ width: '40%' }} />

export const Default = Template.bind({})
Default.args = {
  children: 'I’m a Card',
}
