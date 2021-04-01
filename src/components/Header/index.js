import React from 'react'
import styled from 'styled-components'
import Color from 'color'
import { DialogDisclosure, useDialogState } from 'reakit/Dialog'

import Key from 'components/icons/Key'
import ApiKeyModalContent from 'components/ApiKeyModalContent'
import Button from 'components/Button'
import Link from 'components/Link'
import Modal from 'components/Modal'
import Typography from 'components/Typography'
import SearchBox from 'components/SearchBox'
import Box from 'components/Box'
import Container from 'components/Container'
import Select from 'components/Select'
import Indexes from 'components/icons/Indexes'
import MSLogo from 'components/icons/MSLogo'
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

const ApiKey = ({ isApiKeyRequired }) => {
  const dialog = useDialogState()
  return (
    <>
      <DialogDisclosure {...dialog}>
        {(props) => (
          <Button icon={<Key />} style={{ width: '100%' }} {...props}>
            Api Key
          </Button>
        )}
      </DialogDisclosure>

      <Modal title="Enter your private API key (facultative)" dialog={dialog}>
        {isApiKeyRequired ? (
          <ApiKeyModalContent closeModal={() => dialog.hide()} />
        ) : (
          <Typography variant="typo11" color="gray.6">
            You can’t set an API key, if you want to set one you can read the{' '}
            <Link href="https://docs.meilisearch.com/reference/api/keys.html">
              documentation
            </Link>
          </Typography>
        )}
      </Modal>
    </>
  )
}

const NoOptionComponent = () => (
  <Box
    py={3}
    px={24}
    backgroundColor="white"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <Typography variant="typo4" color="gray.6" mb={3}>
      no index found
    </Typography>
    <Button
      variant="bordered"
      size="small"
      as="a"
      href="https://docs.meilisearch.com/reference/api/indexes.html"
      target="_blank"
      style={{ textDecoration: 'none' }}
    >
      Need help ?
    </Button>
  </Box>
)

const Header = ({
  indexes,
  currentIndex,
  setCurrentIndex,
  isApiKeyRequired,
}) => (
  <HeaderWrapper>
    <Container
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="100%"
    >
      <MSLogo width={64} />
      <Box display="flex">
        <SearchBox />
        <Select
          options={indexes}
          icon={<Indexes />}
          currentOption={currentIndex}
          setCurrentOption={setCurrentIndex}
          noOptionComponent={<NoOptionComponent />}
        />
        <ApiKey isApiKeyRequired={isApiKeyRequired} />
      </Box>
      <HelpCenter />
    </Container>
  </HeaderWrapper>
)

export default Header
