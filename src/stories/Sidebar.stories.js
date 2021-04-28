import React from 'react'

import Box from 'components/Box'
import Sidebar from 'components/Sidebar'
import { SettingsBig } from 'components/icons'

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
}

const Template = (args) => (
  <Box height="100vh">
    <Sidebar {...args} />
  </Box>
)

export const Default = Template.bind({})
Default.args = {
  children: (
    <Box py={32} px={24}>
      I’m a sidebar
    </Box>
  ),
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  sidebarIcon: <SettingsBig />,
  children: (
    <Box py={32} px={24}>
      I’m a sidebar
    </Box>
  ),
}
