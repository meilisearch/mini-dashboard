import React from 'react'
import styled from 'styled-components'
import { connectRefinementList } from 'react-instantsearch-dom'
import {
  useDisclosureState,
  Disclosure as ReakitDisclosure,
  DisclosureContent as ReakitDisclosureContent,
} from 'reakit/Disclosure'

import { ArrowDown } from 'components/icons'
import Box from 'components/Box'
import Button from 'components/Button'
import Typography from 'components/Typography'

import RefinementOptions from './RefinementOptions'
import ShowMoreButton from './ShowMoreButton'

const RefinementGroupWrapper = styled.div`
  margin-bottom: 24px;
  border: 1px solid ${(p) => p.theme.colors.gray[9]};
  border-radius: 8px;
  padding: 16px;
`

const Disclosure = styled(ReakitDisclosure)`
  background-color: transparent;
  border: none;
  padding: 12px;
  margin: -12px;
  &:hover,
  &:focus {
    outline: none;
    cursor: pointer;
    svg {
      color: ${(p) => p.theme.colors.main.default};
    }
  }

  svg {
    transition: transform 300ms, color 300ms;
  }

  &[aria-expanded='true'] {
    svg {
      transform: rotate(180deg);
    }
  }
`

const DisclosureContent = styled(ReakitDisclosureContent)`
  margin-top: 16px;
  transition: opacity 200ms ease-in-out, transform 300ms ease-in-out;
  opacity: 0;
  transform: translate3d(0, -15%, 0);
  &[data-enter] {
    opacity: 1;
    transform: translate3d(0, 0%, 0);
  }
`

const RefinementTitle = styled(Typography)`
  text-transform: capitalize;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${(p) => p.theme.colors.gray[0]};
`

const RefinementGroupHeader = ({
  attribute,
  currentRefinement,
  disclosure,
  refine,
}) => (
  <Box display="flex" justifyContent="space-between" backgroundColor="white">
    <Box display="flex" alignItems="center" pr={16}>
      <RefinementTitle variant="typo1">{attribute}</RefinementTitle>
      {currentRefinement?.length > 0 && (
        <>
          {disclosure.visible ? (
            <Button variant="link" onClick={() => refine([])}>
              <Typography variant="typo3" ml={16}>
                Clear
              </Typography>
            </Button>
          ) : (
            <RefinementTitle variant="typo1" ml={1}>
              {`(${currentRefinement.length})`}
            </RefinementTitle>
          )}
        </>
      )}
    </Box>
    <Disclosure {...disclosure}>
      <ArrowDown width={9} />
    </Disclosure>
  </Box>
)

const sortBy = (key) => (a, b) =>
  // eslint-disable-next-line no-nested-ternary
  a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0

const CustomRefinementList = connectRefinementList(
  ({
    items: initialItems,
    refine,
    showMore,
    limit,
    attribute,
    currentRefinement,
  }) => {
    const items = initialItems.concat().sort(sortBy('label'))
    const [extended, setExtended] = React.useState(false)
    const disclosure = useDisclosureState({ animated: true })

    React.useEffect(() => {}, [items])

    return (
      <RefinementGroupWrapper>
        <RefinementGroupHeader
          attribute={attribute}
          currentRefinement={currentRefinement}
          disclosure={disclosure}
          refine={refine}
        />
        <DisclosureContent {...disclosure}>
          <RefinementOptions
            items={items}
            limit={limit}
            extended={extended}
            refine={refine}
          />
          {showMore && (
            <ShowMoreButton extended={extended} setExtended={setExtended} />
          )}
        </DisclosureContent>
      </RefinementGroupWrapper>
    )
  }
)

export default CustomRefinementList
