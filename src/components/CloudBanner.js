import React from 'react'
import styled from 'styled-components'
import Color from 'color'
import Typography from 'components/Typography'
import Link from 'components/Link'

import IconButton from 'components/IconButton'
import { Cross } from 'components/icons'
import Container from './Container'

const Button = styled(IconButton)`
  position: absolute;
  top: 27px;
  right: 16px;
  &:hover {
    pointer-events: initial;
  }
`

const CloudBannerWrapper = styled.div`
  background: linear-gradient(269.85deg, #ff1786 0%, #8e33de 100%);
  display: flex;
  position: sticky;
  top: 0;
  height: 74px;
  box-shadow: 0px 0px 30px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.15)};
  z-index: 3;
  padding: 4px;
`

const CloudBanner = () => {
  const [isBannerVisible, setIsBannerVisible] = React.useState(true)

  const handleBannerClose = () => {
    setIsBannerVisible(false)
    localStorage.setItem('bannerVisibility', JSON.stringify(false))
  }

  // Retrieve the banner visibility state from local storage on component mount
  React.useEffect(() => {
    const storedVisibility = localStorage.getItem('bannerVisibility')
    if (storedVisibility) {
      setIsBannerVisible(JSON.parse(storedVisibility))
    }

    return () => {}
  }, [])

  return (
    <>
      {isBannerVisible && (
        <CloudBannerWrapper>
          <Container
            display="flex"
            flexDirection="column"
            alignContent="center"
          >
            <Typography variant="typo14" color="white">
              Supercharge your Meilisearch experience
            </Typography>

            <Typography variant="typo15" color="white">
              Say goodbye to server management, and manual updates with{' '}
              <Link
                href="https://www.meilisearch.com/pricing?utm_campaign=oss&utm_source=integration&utm_medium=minidashboard"
                color="white"
              >
                <Typography variant="typo14" color="white">
                  Meilisearch Cloud
                </Typography>
              </Link>
              .&nbsp;
              <Typography variant="typo14" color="white">
                No credit card required.
              </Typography>
            </Typography>
            <Button
              color="gray.9"
              aria-label="close"
              onClick={handleBannerClose}
            >
              <Cross style={{ width: 10 }} />
            </Button>
          </Container>
        </CloudBannerWrapper>
      )}
    </>
  )
}

export default CloudBanner
