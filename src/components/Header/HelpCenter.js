import React from 'react'
import Color from 'color'
import styled from 'styled-components'
import { DialogDisclosure, useDialogState } from 'reakit/Dialog'

import {
  MeilisearchLogo,
  DiscordLogo,
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

const Logo = styled.div`
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HelpCard = ({ description, title, logo, href, ...props }) => (
  <StyledLink href={href} style={{ textDecoration: 'none' }} {...props}>
    <StyledCard forwardedAs="div">
      <Logo>{logo}</Logo>
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
            aria-label="help"
            style={{ width: 26, height: 26 }}
            {...props}
          >
            <InterrogationMark style={{ height: 14 }} />
          </IconButton>
        )}
      </DialogDisclosure>
      <Modal
        title="What is this?"
        dialog={dialog}
        ariaLabel="Help Center"
        style={{ paddingBottom: 56 }}
      >
        <Typography variant="typo11" color="gray.6">
          This demo highlights the impressive performance of Meilisearch on a
          dataset containing <strong>44,978,258 music tracks</strong> and{' '}
          <strong>2,380,474 artists</strong>. It showcases the engine&apos;s
          capability to handle large datasets efficiently while providing a
          seamless user experience through an attractive web interface.
          <br />
          <br />
          The music data comes from{' '}
          <Link href="https://musicbrainz.org">MusicBrainz</Link>, an open music
          encyclopedia that gathers and shares music metadata with the public.
        </Typography>
        <CardsContainer>
          <HelpCard
            logo={<GithubLogo style={{ width: 62 }} />}
            title="Github"
            description="Explore our repositories on Github"
            href="https://github.com/meilisearch"
          />
          <HelpCard
            logo={<DiscordLogo style={{ width: 62 }} />}
            title="Discord"
            description="Join our Discord and find the help you need"
            href="https://discord.meilisearch.com"
          />
          <HelpCard
            logo={<MeilisearchLogo style={{ width: 62 }} />}
            title="Meilisearch Cloud"
            description="Build an intuitive search experience in a snap"
            href="https://meilisearch.com/cloud/?utm_campaign=musics-demo&utm_source=preview&utm_medium=modal"
          />
        </CardsContainer>
      </Modal>
    </>
  )
}

export default HelpCenter
