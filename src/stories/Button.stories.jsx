import React from 'react'

import Button from 'components/Button'
import { DocumentBig, Key } from 'components/icons'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default', 'filled', 'bordered', 'link', 'grayscale'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['medium', 'small'],
      },
    },
  },
}

const Template = (args) => {
  const [toggled, setToggled] = React.useState(false)
  return (
    <Button
      aria-expanded={toggled}
      onClick={() => setToggled((prevtoggled) => !prevtoggled)}
      {...args}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  children: 'I’m a Button',
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  children: 'I’m a Button',
  icon: <Key style={{ width: 19 }} />,
}

export const SizeSmall = Template.bind({})
SizeSmall.args = {
  children: 'I’m a Button',
  size: 'small',
}

export const VariantFilled = Template.bind({})
VariantFilled.args = {
  children: 'I’m a Button',
  size: 'small',
  variant: 'filled',
}

export const VariantBordered = Template.bind({})
VariantBordered.args = {
  children: 'I’m a Button',
  size: 'small',
  variant: 'bordered',
}

export const VariantLink = Template.bind({})
VariantLink.args = {
  children: 'I’m a Button',
  size: 'small',
  variant: 'link',
}

export const VariantGrayscale = Template.bind({})
VariantGrayscale.args = {
  children: 'I’m a Button',
  icon: <DocumentBig style={{ height: 22 }} />,
  size: 'small',
  variant: 'grayscale',
  toggable: true,
}
