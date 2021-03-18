import React from 'react'
import styled from 'styled-components'
import { ClearRefinements, RefinementList } from 'react-instantsearch-dom'

const SidebarWrapper = styled.div`
  background-color: white;
  padding: ${(p) => p.theme.space[3]}px;
  width: 300px;
  overflow: auto;
`

const Sidebar = () => (
  <SidebarWrapper>
    <ClearRefinements />
    <h2>Genres</h2>
    <RefinementList attribute="genres" />
  </SidebarWrapper>
)

export default Sidebar
