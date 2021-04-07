import React from 'react'

import IconButton from 'components/IconButton'
import { Cross } from 'components/icons'

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
