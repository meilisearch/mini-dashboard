import React from 'react'
import { useDialogState, DialogDisclosure } from 'reakit/Dialog'

import Modal from 'components/Modal'

export default {
  title: 'Components/Modal',
  component: Modal,
}

const Template = (args) => {
  const dialog = useDialogState({ animated: true })
  return (
    <>
      <DialogDisclosure {...dialog}>Click me</DialogDisclosure>
      <Modal dialog={dialog} {...args} />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  title: 'I’m a title',
  children: <div>I’m the Modal’s content</div>,
}
