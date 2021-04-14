import React from 'react'

import Badge from 'components/Badge'
import Checkbox from 'components/Checkbox'
import Typography from 'components/Typography'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
}

const Template = (args) => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <>
      <Typography variant="typo2" mr={2}>
        Carrot cake
      </Typography>
      <Badge>12349</Badge>
    </>
  ),
}
