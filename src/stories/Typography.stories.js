import React from 'react'

import Typography from 'components/Typography'

export default {
  title: 'Components/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default', 'filters', 'h3', 'hitKey', 'hitValue'],
      },
    },
  },
}

const Template = (args) => <Typography {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'I’m a Typography with default variant',
}

export const Filters = Template.bind({})
Filters.args = {
  variant: 'filters',
  children: 'I’m a Typography with filters variant',
}

export const H3 = Template.bind({})
H3.args = {
  variant: 'h3',
  children: 'I’m a Typography with h3 variant',
}

export const HitKey = Template.bind({})
HitKey.args = {
  variant: 'hitKey',
  children: 'I’m a Typography with hitKey variant',
}

export const HitValue = Template.bind({})
HitValue.args = {
  variant: 'hitValue',
  children: 'I’m a Typography with hitValue variant',
}
