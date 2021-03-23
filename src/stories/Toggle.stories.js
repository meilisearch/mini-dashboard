import React from 'react'

import Toggle from 'components/Toggle'

export default {
  title: 'Components/Toggle',
  component: Toggle,
}

const Template = (args) => <Toggle {...args} />

export const Default = Template.bind({})
Default.args = {
  onLabel: 'Fancy',
  offLabel: 'Json',
  onChange: () => {},
}
