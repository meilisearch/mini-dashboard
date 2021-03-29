import React from 'react'
import styled from 'styled-components'
import Color from 'color'
import { useMenuState, Menu, MenuItem, MenuButton } from 'reakit/Menu'
import { DialogDisclosure, useDialogState } from 'reakit/Dialog'

import ApiKeyModalContent from 'components/ApiKeyModalContent'
import Modal from 'components/Modal'
import SearchBox from 'components/SearchBox'
import Box from 'components/Box'
import Container from 'components/Container'
import Link from 'components/Link'
import Typography from 'components/Typography'
import MSLogo from 'components/icons/MSLogo'

const HeaderWrapper = styled.div`
  background-color: white;
  display: flex;
  position: sticky;
  top: 0;
  height: 120px;
  box-shadow: 0px 0px 30px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.15)};
`

const SelectIndexesButton = styled(MenuButton)`
  height: 48px;
  background-color: white;
`

const IndexesListContainer = styled(Menu)`
  display: flex;
  flex-direction: column;
`

const IndexesList = ({ indexes, setCurrentIndex }) => {
  const menu = useMenuState()
  return (
    <>
      <SelectIndexesButton {...menu}>Menu</SelectIndexesButton>
      <IndexesListContainer {...menu} aria-label="Indexes">
        {indexes &&
          indexes.map((data, index) => (
            <MenuItem
              {...menu}
              key={index}
              id={data.name}
              onClick={() => {
                setCurrentIndex(data)
                menu.hide()
              }}
            >
              {data.name}
            </MenuItem>
          ))}
      </IndexesListContainer>
    </>
  )
}

const ApiKey = ({ isApiKeyRequired }) => {
  const dialog = useDialogState({ animated: true })
  return (
    <>
      <DialogDisclosure {...dialog}>Api Key</DialogDisclosure>
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

const Header = ({ indexes, setCurrentIndex, isApiKeyRequired }) => (
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
        <IndexesList indexes={indexes} setCurrentIndex={setCurrentIndex} />
      </Box>
      <ApiKey isApiKeyRequired={isApiKeyRequired} />
    </Container>
  </HeaderWrapper>
)

export default Header
