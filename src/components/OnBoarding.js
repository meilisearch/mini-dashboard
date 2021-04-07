import React from 'react'
import styled from 'styled-components'

import Box from 'components/Box'
import Button from 'components/Button'
import Card from 'components/Card'
import Typography from 'components/Typography'
import { LogoText } from 'components/icons'

const OnBoardingCard = ({ number, title, icon, href, ...props }) => (
  <Card
    as="section"
    style={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      width: 248,
      height: 224,
    }}
    {...props}
  >
    {icon}
    <Box display="flex" flexDirection="row" alignItems="center" mb={20}>
      <Typography variant="typo12" color="main.default" mr={12}>
        {number}
      </Typography>
      <Typography
        variant="typo4"
        color="gray.0"
        style={{ textAlign: 'center' }}
      >
        {title}
      </Typography>
    </Box>
    <Button
      variant="bordered"
      size="small"
      as="a"
      href={href}
      style={{ textDecoration: 'none' }}
    >
      Learn how
    </Button>
  </Card>
)

const CardsContainer = styled.div`
  display: flex;
  margin-top: 48px;
  section + section {
    margin-left: 72px;
  }
`

const OnBoarding = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100%"
  >
    <Typography variant="typo12" mb={42} color="gray.0">
      Welcome to
    </Typography>
    <LogoText style={{ width: 260 }} />
    <Typography variant="typo13" mt={12} color="main.default">
      Mini Dashboard
    </Typography>
    <Typography
      variant="typo8"
      color="gray.0"
      style={{ maxWidth: 368, textAlign: 'center' }}
      mt={68}
    >
      This dashboard will help you check the search results with ease.
    </Typography>
    <CardsContainer>
      <OnBoardingCard
        number="1"
        title="Set your API key (facultative)"
        href="https://docs.meilisearch.com/reference/api/keys.html"
      />
      <OnBoardingCard
        number="2"
        title="Select an index"
        href="https://docs.meilisearch.com/reference/api/indexes.html"
      />
      <OnBoardingCard
        number="3"
        title="Use facets to filter your search"
        href="https://docs.meilisearch.com/reference/api/attributes_for_faceting.html"
      />
    </CardsContainer>
  </Box>
)

export default OnBoarding
