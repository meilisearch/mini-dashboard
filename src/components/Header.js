import React from 'react'
import styled from 'styled-components'
import Color from 'color'
import { useMenuState, Menu, MenuItem, MenuButton } from 'reakit/Menu'
import { DialogDisclosure, useDialogState } from 'reakit/Dialog'

import ApiKeyModalContent from 'components/ApiKeyModalContent'
import Modal from 'components/Modal'
import SearchBox from 'components/DebouncedSearchBox'
import Box from 'components/Box'
import Container from 'components/Container'
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

const ApiKey = () => {
  const dialog = useDialogState({ animated: true })
  return (
    <>
      <DialogDisclosure {...dialog}>Api Key</DialogDisclosure>
      <Modal title="Enter your private API key (facultative)" dialog={dialog}>
        <ApiKeyModalContent closeModal={() => dialog.hide()} />
      </Modal>
    </>
  )
}

const Header = ({ indexes, setCurrentIndex }) => (
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
        <SearchBox delay={500} />
        <IndexesList indexes={indexes} setCurrentIndex={setCurrentIndex} />
      </Box>
      <ApiKey buttonText="API key" />
    </Container>
  </HeaderWrapper>
)

export default Header
