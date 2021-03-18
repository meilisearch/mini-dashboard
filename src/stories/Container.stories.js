import React from 'react'
import Container from 'components/Container'

export default {
  title: 'Components/Container',
  component: Container,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'gray', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
}

const Template = (args) => <Container {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <div style={{ backgroundColor: 'white' }}>
      I’m a Container with a max-width
    </div>
  ),
}
