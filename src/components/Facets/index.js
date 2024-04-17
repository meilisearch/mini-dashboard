import React from 'react'
import Color from 'color'
import styled from 'styled-components'
import { connectCurrentRefinements } from 'react-instantsearch-dom'

import Box from 'components/Box'
import Button from 'components/Button'
import Sidebar from 'components/Sidebar'
import Typography from 'components/Typography'
import { SettingsBig, SettingsMedium } from 'components/icons'
import useLocalStorage from 'hooks/useLocalStorage'
import NoFacets from './NoFacets'
import CustomRefinementList from './CustomRefinementList'

const ClearButton = styled(Button)`
  width: 136px;
  margin: 0 auto;
`

const ClearBox = styled.div`
  box-shadow: 0px 0px 30px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.07)};

  background-color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 0;
`

const CustomClearRefinements = connectCurrentRefinements(
  ({ items, refine }) => (
    <ClearBox>
      <ClearButton
        variant="filled"
        size="small"
        px={12}
        onClick={() => refine(items)}
        disabled={!items.length}
      >
        Clear all filters
      </ClearButton>
    </ClearBox>
  )
)

const Facets = ({ settings }) => {
  const [sidebarOpen, setSidebarOpen] = useLocalStorage('sidebarOpen', 'true')

  return (
    <Sidebar
      sidebarIcon={<SettingsBig />}
      style={{ height: 'calc(100vh - 120px)', top: 120, position: 'sticky' }}
      visible={sidebarOpen}
      onChange={(visible) => setSidebarOpen(visible)}
    >
      {settings?.length ? (
        <>
          <Box pb={72} pt={24} pl={24} pr={32} height="100%" overflow="auto">
            <Box display="flex" alignItems="center" color="gray.7" mb={24}>
              <SettingsMedium width={20} />
              <Typography
                variant="typo7"
                style={{ textTransform: 'uppercase', letterSpacing: 1 }}
                ml={10}
              >
                Facets
              </Typography>
            </Box>
            {settings?.map((setting) => (
              <React.Fragment key={setting}>
                <CustomRefinementList
                  attribute={setting}
                  limit={5}
                  showMoreLimit={100}
                  showMore
                  operator="and"
                />
              </React.Fragment>
            ))}
          </Box>
          <CustomClearRefinements />
        </>
      ) : (
        <NoFacets />
      )}
    </Sidebar>
  )
}

export default Facets
