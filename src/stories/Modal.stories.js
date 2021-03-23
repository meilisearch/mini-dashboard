import React from 'react'

import Modal from 'components/Modal'

export default {
  title: 'Components/Modal',
  component: Modal,
}

const Template = (args) => <Modal {...args} />

export const Default = Template.bind({})
Default.args = {
  buttonText: 'Click me',
  title: 'I’m a title',
  children: <div>I’m the Modal’s content</div>,
}
