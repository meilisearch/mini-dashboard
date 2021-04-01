import React from 'react'

import IconButton from 'components/IconButton'
import Close from 'components/icons/Close'
import InterrogationMark from 'components/icons/InterrogationMark'

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

const Template = (args) => <IconButton {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <Close />,
  color: 'gray.4',
}

export const Bordered = Template.bind({})
Bordered.args = {
  children: <InterrogationMark />,
  variant: 'bordered',
}
