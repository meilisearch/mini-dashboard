import React from 'react'

import Typography from 'components/Typography'

export default {
  title: 'Components/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [
          'default',
          'typo1',
          'typo2',
          'typo3',
          'typo4',
          'typo5',
          'typo6',
          'typo7',
          'typo8',
          'typo9',
          'typo10',
          'typo11',
          'typo12',
          'typo13',
        ],
      },
    },
  },
}

const Template = (args) => <Typography {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'I’m a Typography with default variant',
}

export const typo1 = Template.bind({})
typo1.args = {
  variant: 'typo1',
  children: 'I’m a Typography with typo1 variant',
}

export const typo2 = Template.bind({})
typo2.args = {
  variant: 'typo2',
  children: 'I’m a Typography with typo2 variant',
}

export const Typo3 = Template.bind({})
Typo3.args = {
  variant: 'typo3',
  children: 'I’m a Typography with typo3 variant',
}

export const Typo4 = Template.bind({})
Typo4.args = {
  variant: 'typo4',
  children: 'I’m a Typography with typo4 variant',
}

export const Typo5 = Template.bind({})
Typo5.args = {
  variant: 'typo5',
  children: 'I’m a Typography with typo5 variant',
}

export const Typo6 = Template.bind({})
Typo6.args = {
  variant: 'typo6',
  children: 'I’m a Typography with typo6 variant',
}

export const Typo7 = Template.bind({})
Typo7.args = {
  variant: 'typo7',
  children: 'I’m a Typography with typo7 variant',
}

export const Typo8 = Template.bind({})
Typo8.args = {
  variant: 'typo8',
  children: 'I’m a Typography with typo8 variant',
}

export const Typo9 = Template.bind({})
Typo9.args = {
  variant: 'typo9',
  children: 'I’m a Typography with typo9 variant',
}

export const Typo10 = Template.bind({})
Typo10.args = {
  variant: 'typo10',
  children: 'I’m a Typography with typo10 variant',
}

export const Typo11 = Template.bind({})
Typo11.args = {
  variant: 'typo11',
  children: 'I’m a Typography with typo11 variant',
}

export const Typo12 = Template.bind({})
Typo12.args = {
  variant: 'typo12',
  children: 'I’m a Typography with typo12 variant',
}

export const Typo13 = Template.bind({})
Typo13.args = {
  variant: 'typo13',
  children: 'I’m a Typography with typo13 variant',
}
