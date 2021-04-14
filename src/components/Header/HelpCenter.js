import React from 'react'
import Color from 'color'
import styled from 'styled-components'
import { DialogDisclosure, useDialogState } from 'reakit/Dialog'

import {
  MeilisearchLogo,
  SlackLogo,
  GithubLogo,
  InterrogationMark,
} from 'components/icons'
import Card from 'components/Card'
import IconButton from 'components/IconButton'
import Link from 'components/Link'
import Modal from 'components/Modal'
import Typography from 'components/Typography'

const StyledCard = styled(Card)`
  padding: 20px 12px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledLink = styled(Link)`
  border-radius: 20px;
  box-shadow: none;
  transition: box-shadow 300ms;

  &:hover,
  &:focus {
    outline: none;
    box-shadow: 0px 0px 30px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.1)};
  }
`

const HelpCard = ({ description, title, logo, href, ...props }) => (
  <StyledLink href={href} style={{ textDecoration: 'none' }} {...props}>
    <StyledCard forwardedAs="div">
      {logo}
      <Typography variant="typo4" color="gray.0" my={1}>
        {title}
      </Typography>
      <Typography
        variant="typo3"
        color="gray.8"
        style={{ textAlign: 'center', fontWeight: 400 }}
      >
        {description}
      </Typography>
    </StyledCard>
  </StyledLink>
)

const CardsContainer = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > a + a {
    margin-left: 20px;
  }
`

const HelpCenter = () => {
  const dialog = useDialogState()

  return (
    <>
      <DialogDisclosure {...dialog}>
        {(props) => (
          <IconButton
            color="main.default"
            variant="bordered"
            style={{ width: 26, height: 26 }}
            {...props}
          >
            <InterrogationMark style={{ height: 14 }} />
          </IconButton>
        )}
      </DialogDisclosure>
      <Modal title="Help Center" dialog={dialog} style={{ paddingBottom: 56 }}>
        <Typography variant="typo11" color="gray.6">
          If you need help with anything, here are a few links that that can be
          useful.
        </Typography>
        <CardsContainer>
          <HelpCard
            logo={<GithubLogo style={{ width: 62 }} />}
            title="Github"
            description="Explore our repositories on Github"
            href="https://github.com/meilisearch"
          />
          <HelpCard
            logo={<SlackLogo style={{ width: 62 }} />}
            title="Slack"
            description="Join our Slack Community and find the help you need"
            href="https://slack.meilisearch.com/"
          />
          <HelpCard
            logo={<MeilisearchLogo style={{ width: 62 }} />}
            title="Documentation"
            description="Learn how to tune your MeiliSearch"
            href="https://docs.meilisearch.com/"
          />
        </CardsContainer>
      </Modal>
    </>
  )
}

export default HelpCenter
