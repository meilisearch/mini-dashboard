import React from 'react'
import { useDisclosureState } from 'reakit/Disclosure'

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

const Template = (args) => {
  const disclosure = useDisclosureState({ animated: true })

  return (
    <Box position="relative" height="100vh">
      <Sidebar disclosure={disclosure} {...args} />
    </Box>
  )
}

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
