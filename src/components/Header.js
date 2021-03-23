import React from 'react'
import styled from 'styled-components'
import Color from 'color'
import { useMenuState, Menu, MenuItem, MenuButton } from 'reakit/Menu'

import Modal from 'components/Modal'
import SearchBox from 'components/DebouncedSearchBox'
import Box from 'components/Box'
import Container from 'components/Container'
import Input from 'components/Input'
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

const ApiKey = ({ apiKey, setApiKey }) => (
  <Modal buttonText="API key" title="Enter your private API key (facultative)">
    <Input
      type="text"
      onChange={(e) => setApiKey(e.target.value)}
      value={apiKey}
      style={{ width: '100%' }}
    />
    <span>
      At least a private API key is required for the dashboard to access the
      indexes list.
    </span>
  </Modal>
)

const Header = ({ apiKey, setApiKey, indexes, setCurrentIndex }) => (
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
      <ApiKey apiKey={apiKey} setApiKey={setApiKey} />
    </Container>
  </HeaderWrapper>
)

export default Header
