import React from 'react'
import styled from 'styled-components'
import Color from 'color'

import { useMeilisearchClientContext } from 'context/MeilisearchClientContext'
import Button from 'components/Button'
import NoSelectOption from 'components/NoSelectOption'
import Typography from 'components/Typography'
import SearchBox from 'components/SearchBox'
import Box from 'components/Box'
import Select from 'components/Select'
import { MeilisearchLogo, Indexes, Key } from 'components/icons'
import MenuBarsIcon from 'components/icons/heroicons/MenuBarsIcon'

const HeaderWrapper = styled('div')`
  background-color: white;
  position: sticky;
  top: ${(props) => props.top}px;
  width: 100%;
  padding: 2rem;
  box-shadow: 0px 0px 30px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.15)};
`

const HeaderLayout = styled('div')`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;
  width: 100%;
`

const RightSideWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
`

const SearchBoxWrapper = styled('div')`
  flex-grow: 1;
  margin-left: 2rem;
  margin-right: 2rem;
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
    color: ${(p) => p.theme.colors.gray[0]};
  }

  &:hover svg {
    color: ${(p) => p.theme.colors.main.default};
  }
`

const HeaderContent = styled('div')`
  width: ${({ isRightPanelOpen }) =>
    isRightPanelOpen ? 'calc(100% - 430px)' : '100%'};
  margin-left: 0;
  transition: width 0.3s ease-in-out;
  display: flex;
  align-items: center;
`

const LogoBox = ({ version }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    flexShrink={0}
    mr={4}
  >
    {/* Trick to make the logo look centered */}
    <MeilisearchLogo
      title="Meilisearch"
      style={{ height: '28px', marginBottom: '8px' }}
    />
    {version && (
      <Typography
        variant="typo10"
        color="gray.0"
        style={{ lineHeight: '10px' }}
      >{`v${version}`}</Typography>
    )}
  </Box>
)

const Header = ({
  indexes,
  currentIndex,
  setCurrentIndex,
  refreshIndexes,
  isApiKeyBannerVisible,
  isRightPanelOpen,
  onTogglePanel,
  onOpenApiKeyModal,
}) => {
  const { meilisearchJsClient } = useMeilisearchClientContext()
  const [version, setVersion] = React.useState()

  React.useEffect(() => {
    const getMeilisearchVersion = async () => {
      try {
        const res = await meilisearchJsClient.getVersion()
        setVersion(res.pkgVersion)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }
    getMeilisearchVersion()
  }, [meilisearchJsClient])

  const topPosition = isApiKeyBannerVisible ? 55 : 0
  return (
    <HeaderWrapper top={topPosition}>
      <HeaderContent isRightPanelOpen={isRightPanelOpen}>
        <HeaderLayout>
          <LogoBox version={version} />
          <Select
            options={indexes}
            icon={<Indexes style={{ height: 22 }} />}
            currentOption={currentIndex}
            onChange={setCurrentIndex}
            noOptionComponent={<NoSelectOption />}
            style={{ width: 216 }}
            onClick={refreshIndexes}
          />
          <SearchBoxWrapper>
            <SearchBox
              refreshIndexes={refreshIndexes}
              currentIndex={currentIndex}
            />
          </SearchBoxWrapper>
          <RightSideWrapper>
            <Button
              icon={<Key style={{ height: 19 }} />}
              aria-label="Edit API key"
              onClick={onOpenApiKeyModal}
            >
              API key
            </Button>
            {!isRightPanelOpen && onTogglePanel && (
              <IconButton
                onClick={onTogglePanel}
                type="button"
                aria-label="Open Panel"
              >
                <MenuBarsIcon />
              </IconButton>
            )}
          </RightSideWrapper>
        </HeaderLayout>
      </HeaderContent>
    </HeaderWrapper>
  )
}

export default Header
