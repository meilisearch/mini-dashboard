import React from 'react'
import styled from 'styled-components'
import Color from 'color'
import { DialogDisclosure, useDialogState } from 'reakit/Dialog'

import ApiKeyModalContent from 'components/ApiKeyModalContent'
import Button from 'components/Button'
import Link from 'components/Link'
import Modal from 'components/Modal'
import NoSelectOption from 'components/NoSelectOption'
import Typography from 'components/Typography'
import SearchBox from 'components/SearchBox'
import Box from 'components/Box'
import Container from 'components/Container'
import Select from 'components/Select'
import { MeilisearchLogo, Indexes, Key } from 'components/icons'
import HelpCenter from './HelpCenter'

const HeaderWrapper = styled.div`
  background-color: white;
  display: flex;
  position: sticky;
  top: 0;
  height: 120px;
  box-shadow: 0px 0px 30px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.15)};
  z-index: 3;
`

const ApiKey = ({ requireApiKeyToWork }) => {
  const dialog = useDialogState()
  return (
    <>
      <DialogDisclosure {...dialog}>
        {(props) => (
          <Button
            icon={<Key style={{ height: 19 }} />}
            style={{ width: '100%' }}
            {...props}
          >
            Api Key
          </Button>
        )}
      </DialogDisclosure>
      {dialog.visible && (
        <Modal title="Enter your private API key (facultative)" dialog={dialog}>
          {requireApiKeyToWork ? (
            <ApiKeyModalContent closeModal={() => dialog.hide()} />
          ) : (
            <Typography variant="typo11" color="gray.6">
              You haven’t set an API key yet, if you want to set one you can
              read the{' '}
              <Link href="https://docs.meilisearch.com/reference/api/keys.html">
                documentation
              </Link>
            </Typography>
          )}
        </Modal>
      )}
    </>
  )
}

const Header = ({
  indexes,
  currentIndex,
  setCurrentIndex,
  requireApiKeyToWork,
}) => (
  <HeaderWrapper>
    <Container
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="100%"
    >
      <MeilisearchLogo title="MeiliSearch" style={{ width: 64 }} />
      <Box display="flex">
        <SearchBox />
        <Select
          options={indexes}
          icon={<Indexes style={{ height: 22 }} />}
          currentOption={currentIndex}
          setCurrentOption={setCurrentIndex}
          noOptionComponent={<NoSelectOption />}
        />
        <ApiKey requireApiKeyToWork={requireApiKeyToWork} />
      </Box>
      <HelpCenter />
    </Container>
  </HeaderWrapper>
)

export default Header
