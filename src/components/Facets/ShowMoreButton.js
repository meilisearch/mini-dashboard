import React from 'react'

import Button from 'components/Button'

const ShowMoreButton = ({ extended, setExtended }) => (
  <Button
    size="small"
    variant="bordered"
    mt={24}
    onClick={() => {
      setExtended(!extended)
    }}
  >
    {extended ? 'Show less' : 'Show more'}
  </Button>
)

export default ShowMoreButton
