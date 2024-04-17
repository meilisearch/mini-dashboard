import React from 'react'

import Badge from 'components/Badge'
import Checkbox from 'components/Checkbox'
import Typography from 'components/Typography'

const RefinementOptions = ({ items, limit, extended, refine }) =>
  (items || []).map(
    (item, i) =>
      (i < limit || extended) && (
        <Checkbox
          label={item.label}
          key={item.label}
          checked={item.isRefined}
          onChange={(e) => {
            e.preventDefault()
            refine(item.value)
          }}
        >
          <Typography variant="typo2" mr={2}>
            {item.label}
          </Typography>
          <Badge>{item.count}</Badge>
        </Checkbox>
      )
  )

export default RefinementOptions
