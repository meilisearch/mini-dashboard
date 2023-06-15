import React from 'react'
import styled from 'styled-components'
import Color from 'color'
import Typography from 'components/Typography'
import Link from 'components/Link'
import Container from './Container'

const CloudBannerWrapper = styled.div`
  background: linear-gradient(269.85deg, #ff1786 0%, #8e33de 100%);
  display: flex;
  position: sticky;
  top: 0;
  height: auto;
  box-shadow: 0px 0px 30px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.15)};
  z-index: 3;
  padding: 10px;
`

const CloudBanner = () => (
  <CloudBannerWrapper>
    <Container display="flex" flexDirection="column" alignContent="center">
      <Typography variant="typo14" color="white">
        Supercharge your Meilisearch experience
      </Typography>

      <Typography variant="typo15" color="white">
        Say goodbye to server management, and manual updates with{' '}
        <Link href="https://cloud.meilisearch.com" color="white">
          <Typography variant="typo14" color="white">
            Meilisearch cloud
          </Typography>
        </Link>
        . No credit card required.
      </Typography>
    </Container>
  </CloudBannerWrapper>
)

export default CloudBanner
