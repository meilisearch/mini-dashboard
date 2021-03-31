import React from 'react'

import Stats from 'components/Stats'

export default {
  title: 'Components/Stats',
  component: Stats,
}

const Template = (args) => <Stats {...args} />

export const Default = Template.bind({})
Default.args = {
  nbHits: 19546,
  processingTimeMS: 2,
  nbResults: 19546,
}

export const Imprecise = Template.bind({})
Imprecise.args = {
  nbHits: 19546,
  processingTimeMS: 2,
  nbResults: 19500,
}
