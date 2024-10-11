import React from 'react'
import { Highlight as InstantSearchHighLight } from 'react-instantsearch'
import Typography from 'components/Typography'

const Highlight = ({ attribute, hit, ...props }) => (
  <Typography {...props}>
    <InstantSearchHighLight hit={hit} attribute={attribute} />
  </Typography>
)

export default Highlight
