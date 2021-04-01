import React from 'react'
import Color from 'color'
import styled from 'styled-components'
import { DialogDisclosure, useDialogState } from 'reakit/Dialog'

import InterrogationMark from 'components/icons/InterrogationMark'
import GithubLogo from 'components/icons/GithubLogo'
import MSLogo from 'components/icons/MSLogo'
import SlackLogo from 'components/icons/SlackLogo'
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
  &:focus {
    outline: none;
    filter: drop-shadow(
      0px 0px 4px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.1)}
    );
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
        style={{ textAlign: 'center' }}
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
  const dialog = useDialogState({ animated: true })

  return (
    <>
      <DialogDisclosure {...dialog}>
        {(props) => (
          <IconButton variant="bordered" {...props}>
            <InterrogationMark />
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
            logo={<GithubLogo />}
            title="Github"
            description="Lorem ipsum dolor sit amet qui cheese bacon."
            href="https://github.com/meilisearch"
          />
          <HelpCard
            logo={<SlackLogo />}
            title="Slack"
            description="Lorem ipsum dolor sit amet qui cheese bacon."
            href="https://slack.meilisearch.com/"
          />
          <HelpCard
            logo={<MSLogo size={62} />}
            title="Documentation"
            description="Lorem ipsum dolor sit amet qui cheese bacon."
            href="https://docs.meilisearch.com/"
          />
        </CardsContainer>
      </Modal>
    </>
  )
}

export default HelpCenter
