import React from 'react'

import Toggle from 'components/Toggle'
import { DocumentBig, Picture } from 'components/icons'

export default {
  title: 'Components/Toggle',
  component: Toggle,
}

const Template = (args) => <Toggle {...args} />

export const Default = Template.bind({})
Default.args = {
  onLabel: (
    <>
      <Picture style={{ marginRight: 8, height: 22 }} />
      Fancy
    </>
  ),
  offLabel: (
    <>
      <DocumentBig style={{ marginRight: 8, height: 22 }} />
      Json
    </>
  ),
  onChange: () => {},
}
