import React from 'react'

import IconButton from 'components/IconButton'
import { Cross, InterrogationMark } from 'components/icons'

export default {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default', 'bordered'],
      },
    },
  },
}

const Template = (args) => <IconButton color="gray.2" {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <Cross style={{ width: 15 }} />,
}

export const Bordered = Template.bind({})
Bordered.args = {
  style: { width: 24, height: 24 },
  variant: 'bordered',
  children: <InterrogationMark style={{ height: 16 }} />,
}
