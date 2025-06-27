import React from 'react'
import styled from 'styled-components'
import Link from 'components/Link'
import Typography from 'components/Typography'
import AcademicHatIcon from 'components/icons/heroicons/AcademicHatIcon'
import LifebuoyIcon from 'components/icons/heroicons/LifebuoyIcon'
import ChatBubbleIcon from 'components/icons/heroicons/ChatBubbleIcon'
import NewsletterForm from 'components/NewsletterForm'
import ExportDatasetForm from 'components/ExportDatasetForm'
import CloseIcon from './icons/heroicons/CloseIcon'

const PanelWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: ${(p) => p.theme.sizes.rightPanel};
  height: 100vh;
  background: ${(p) => p.theme.colors.white};
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  padding: 2rem 2.5rem;
  z-index: 10;
  overflow-y: scroll;
`

const Title = styled.h2`
  color: ${(p) => p.theme.colors.main.default};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`

const SectionTitle = styled.h3`
  color: ${(p) => p.theme.colors.gray[0]};
  font-weight: 600;
  margin-bottom: 2rem;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  margin-bottom: 2rem;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: ${(p) => p.theme.colors.gray[0]};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
    color: ${(p) => p.theme.colors.gray[0]};
  }
`

const HelpLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  background-color: transparent;
  border: 1px solid ${(p) => p.theme.colors.gray[10]};
  border-radius: 8px;
  box-shadow: 0px 4px 6px ${(p) => p.theme.colors.gray[10]}10;
  text-decoration: none;
  color: ${(p) => p.theme.colors.gray[0]};
  transition: all 0.2s;

  svg {
    width: 20px;
    height: 20px;
    color: ${(p) => p.theme.colors.gray[0]};
    transition: color 0.1s;
  }

  &:hover {
    box-shadow: none;
    border-color: ${(p) => p.theme.colors.main.default};
    text-decoration: none;
    color: ${(p) => p.theme.colors.gray[0]};

    svg {
      // color: ${(p) => p.theme.colors.main.default};
    }
  }
`

const Section = styled.div`
  margin-bottom: 2.5rem;
`
const CloudButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(269.85deg, #ff1786 0%, #8e33de 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`

const CloudCardLink = styled(Link)`
  text-decoration: none;
  display: block;

  &:hover {
    text-decoration: none;
  }
`
const RightPanel = ({ isOpen, onClose }) => (
  <PanelWrapper isOpen={isOpen} data-testid="right-panel">
    <Header>
      <Title>Getting started</Title>
      <CloseButton onClick={onClose} aria-label="Close Panel">
        <CloseIcon />
      </CloseButton>
    </Header>

    <Section>
      <SectionTitle>Try Meilisearch Cloud</SectionTitle>
      <Typography
        variant="typo11"
        color="gray.6"
        style={{ marginBottom: '1rem' }}
      >
        Streamline your experience with search analytics, monitoring, and more.
      </Typography>
      <CloudCardLink href="https://cloud.meilisearch.com?utm_campaign=oss&utm_source=integration&utm_medium=minidashboard">
        <CloudButton>Start free trial</CloudButton>
      </CloudCardLink>
      <Typography
        marginTop="1rem"
        variant="typo11"
        color="gray.6"
        style={{ marginBottom: '1rem' }}
      >
        Send your data to Meilisearch Cloud without a hassle.
      </Typography>
      <ExportDatasetForm />
    </Section>

    <Section>
      <SectionTitle>Need help?</SectionTitle>
      <Typography
        variant="typo11"
        color="gray.6"
        style={{ marginBottom: '1.25rem' }}
      >
        Check out our resources to get started.
      </Typography>

      <HelpLink href="https://docs.meilisearch.com/?utm_campaign=oss&utm_source=integration&utm_medium=minidashboard">
        <AcademicHatIcon />
        <span>Documentation</span>
      </HelpLink>
      <HelpLink href="https://help.meilisearch.com?utm_campaign=oss&utm_source=integration&utm_medium=minidashboard">
        <LifebuoyIcon />
        <span>Help center</span>
      </HelpLink>
      <HelpLink href="https://dub.sh/meili-discord?utm_campaign=oss&utm_source=integration&utm_medium=minidashboard">
        <ChatBubbleIcon />
        <span>Discord community</span>
      </HelpLink>
    </Section>

    <Section>
      <SectionTitle>Stay up to date</SectionTitle>
      <Typography
        variant="typo11"
        color="gray.6"
        style={{ marginBottom: '1.25rem' }}
      >
        Get monthly updates about new features and tips to get the the most out
        of Meilisearch.
      </Typography>
      <NewsletterForm />
    </Section>
  </PanelWrapper>
)

export default RightPanel
