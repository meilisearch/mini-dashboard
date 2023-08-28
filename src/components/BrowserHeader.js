import React from 'react'
import styled from 'styled-components'
import Color from 'color'

import Typography from 'components/Typography'
import Box from 'components/Box'
import Container from 'components/Container'
import { MeilisearchLogo } from 'components/icons'
import { compose, position } from 'styled-system'
import HelpCenter from 'components/Header/HelpCenter'
import useLocalStorage from 'hooks/useLocalStorage'
import { Link } from 'react-router-dom'

const HeaderWrapper = styled('div')(compose(position), {
  backgroundColor: 'white',
  display: 'flex',
  position: 'sticky',
  height: '120px',
  boxShadow: `0px 0px 30px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.15)}`,
  zIndex: 3,
})

const BrowserHeader = () => {
  const version = useLocalStorage('meiliVersion')

  return (
    <HeaderWrapper>
      <Container
        p={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {/* Trick to make the logo look centered */}
            <MeilisearchLogo
              title="Meilisearch"
              style={{
                width: 75,
                paddingTop: 11,
                paddingBottom: 11,
                marginLeft: 13,
              }}
            />
            {version && (
              <Typography
                variant="typo10"
                color="gray.0"
                style={{
                  textTransform: 'unset',
                }}
              >{`v${version[0]}`}</Typography>
            )}
          </Box>
        </Link>
        <HelpCenter />
      </Container>
    </HeaderWrapper>
  )
}

export default BrowserHeader
