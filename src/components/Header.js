import React from 'react'
import styled from 'styled-components'
import { SearchBox } from 'react-instantsearch-dom'

import Modal from 'components/Modal'

const HeaderWrapper = styled.div`
  background-color: white;
  padding: ${(p) => p.theme.space[4]}px;
  display: flex;
  position: sticky;
  top: 0;
  height: 120px;
`

const Header = ({ setApiKey }) => (
  <HeaderWrapper>
    <SearchBox />

    <Modal buttonText="API key">
      <label htmlFor="apiKey">
        API key:
        <input
          id="apiKey"
          type="text"
          onChange={(e) => setApiKey(e.target.value)}
        />
      </label>
    </Modal>
  </HeaderWrapper>
)

export default Header
