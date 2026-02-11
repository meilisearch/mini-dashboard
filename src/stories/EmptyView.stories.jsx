import React from 'react'
import EmptyView from 'components/EmptyView'
import Typography from 'components/Typography'

export default {
  title: 'Components/EmptyView',
  component: EmptyView,
}

const Template = (args) => <EmptyView {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <Typography
      variant="typo8"
      style={{ textAlign: 'center' }}
      mb={32}
      color="gray.0"
    >
      There’s no document in the selected index
    </Typography>
  ),
  buttonLink: 'https://docs.meilisearch.com/reference/api/documents.html',
}
