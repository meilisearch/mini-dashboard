import React from 'react'
import styled from 'styled-components'
import Color from 'color'
import Typography from 'components/Typography'
import IconButton from 'components/IconButton'
import { AlertCircle, Cross } from 'components/icons'
import Container from './Container'

const Button = styled(IconButton)`
  position: absolute;
  right: 16px;
  &:hover {
    pointer-events: initial;
  }
`

const ApiKeyBannerWrapper = styled.div`
  background: #e41359;
  display: flex;
  position: sticky;
  top: 0;
  height: 55px;
  box-shadow: 0px 0px 30px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.15)};
  z-index: 4;
  padding: 4px;
  overflow: hidden;
`

const CloudBanner = ({ onClose }) => (
  <ApiKeyBannerWrapper>
    <Container display="flex" flexDirection="row" alignItems="center">
      <AlertCircle style={{ height: 24, margin: 10, color: 'white' }} />
      <Typography variant="typo14" color="white">
        Please be aware that you are using api_key in the params. Do not share
        the url with api_key to any unknown source.
      </Typography>
      <Button color="gray.9" aria-label="close" onClick={onClose}>
        <Cross style={{ width: 10 }} />
      </Button>
    </Container>
  </ApiKeyBannerWrapper>
)

export default CloudBanner
