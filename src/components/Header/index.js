import React from 'react'
import styled from 'styled-components'
import Color from 'color'
import { DialogDisclosure, useDialogState } from 'reakit/Dialog'

import { useMeilisearchClientContext } from 'context/MeilisearchClientContext'
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

const HeaderWrapper = styled('div')`
  background-color: white;
  position: sticky;
  top: ${(props) => props.top}px;
  width: 100%;
  height: 120px;
  box-shadow: 0px 0px 30px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.15)};
`

const HeaderContent = styled('div')`
  width: ${({ isRightPanelOpen }) =>
    isRightPanelOpen ? 'calc(100% - 430px)' : '100%'};
  margin-left: 0;
  transition: width 0.3s ease-in-out;
`

const LogoBox = ({ version }) => (
  <Box display="flex" flexDirection="column" alignItems="center" flexShrink={0}>
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
      <Modal
        title={`Enter your admin API key${
          requireApiKeyToWork ? '' : ' (optional)'
        }`}
        dialog={dialog}
        ariaLabel="settings-api-key"
      >
        {requireApiKeyToWork ? (
          <ApiKeyModalContent closeModal={() => dialog.hide()} />
        ) : (
          <Typography variant="typo11" color="gray.6">
            You haven&apos;t set an API key yet, if you want to set one you can
            read the{' '}
            <Link href="https://docs.meilisearch.com/reference/api/keys.html">
              documentation
            </Link>
          </Typography>
        )}
      </Modal>
    </>
  )
}

const Header = ({
  indexes,
  currentIndex,
  setCurrentIndex,
  refreshIndexes,
  requireApiKeyToWork,
  isApiKeyBannerVisible,
  isCloudBannerVisible,
  isRightPanelOpen,
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

  const topPosition =
    (isCloudBannerVisible ? 74 : 0) + (isApiKeyBannerVisible ? 55 : 0)
  return (
    <HeaderWrapper top={topPosition}>
      <HeaderContent isRightPanelOpen={isRightPanelOpen}>
        <Container
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height="100%"
          gap={4}
        >
          <LogoBox version={version} />
          <SearchBox
            refreshIndexes={refreshIndexes}
            currentIndex={currentIndex}
          />
          <Select
            options={indexes}
            icon={<Indexes style={{ height: 22 }} />}
            currentOption={currentIndex}
            onChange={setCurrentIndex}
            noOptionComponent={<NoSelectOption />}
            style={{ width: 216 }}
            onClick={refreshIndexes}
          />
          <ApiKey requireApiKeyToWork={requireApiKeyToWork} />
        </Container>
      </HeaderContent>
    </HeaderWrapper>
  )
}

export default Header
