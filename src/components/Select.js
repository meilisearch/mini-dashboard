import React from 'react'
import styled, { css } from 'styled-components'
import Color from 'color'
import PropTypes from 'prop-types'
import { useMenuState, Menu, MenuItem, MenuButton } from 'reakit/Menu'

import { ArrowDown } from 'components/icons'
import Typography from 'components/Typography'

const Arrow = styled(ArrowDown)`
  position: absolute;
  right: 0;
  top: calc(50% - 3px);
  transition: transform 300ms;
  width: 9px;
`

const SelectIndexesButton = styled(MenuButton)`
  position: relative;
  padding: 12px 32px 12px 12px;
  height: 48px;
  background-color: white;
  display: flex;
  align-items: center;
  min-width: 260px;
  border-color: ${(p) => p.theme.colors.gray[10]};
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  box-shadow: 0px 4px 6px ${Color('#000').alpha(0.04)};
  transition: border-color 300ms;
  outline: none;
  color: ${(p) => p.theme.colors.gray[0]};
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  cursor: pointer;

  ${(p) =>
    p.visible &&
    css`
      ${Arrow} {
        transform: rotate(180deg);
      }
    `};

  &:hover,
  &:focus,
  &[aria-expanded='true'] {
    border-color: ${(p) => p.theme.colors.main.default};
  }

  svg {
    margin-right: 16px;
    color: ${(p) => p.theme.colors.main.default};
    flex-shrink: 0;
  }
`

const IndexesListContainer = styled(Menu)`
  min-width: 218px;
  display: flex;
  flex-direction: column;
  outline: none;
  border-width: 1px;
  border-style: solid;
  border-color: ${(p) => p.theme.colors.gray[10]};
  border-radius: 8px;
  box-shadow: 0px 4px 6px ${Color('#000').alpha(0.04)};
  overflow: hidden;
  max-height: 180px;
  overflow: auto;
`

const IndexItem = styled(MenuItem)`
  background-color: white;
  height: 40px;
  border: 0;
  outline: none;
  transition: background-color 300ms;
  padding: 6px 18px;
  text-align: left;
  color: ${(p) => p.theme.colors.gray[2]};

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: ${(p) => p.theme.colors.gray[10]};
  }

  ${(p) =>
    p.$selected &&
    css`
      span:first-child {
        font-weight: 600;
      }
      span:nth-child(2) {
        color: ${p.theme.colors.gray[5]};
      }
    `}
`

const IndexId = styled(Typography)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const TextToDisplay = ({ option, currentOption }) => (
  <>
    <IndexId variant="typo4" color={currentOption ? 'gray.0' : 'gray.2'} mr={2}>
      {option ? option.uid : 'Select an index'}
    </IndexId>{' '}
    {option?.stats && (
      <Typography variant="typo6" color="gray.7" mt="1px">
        {option.stats.numberOfDocuments.toLocaleString()}
      </Typography>
    )}
  </>
)

const Select = ({
  options,
  icon,
  currentOption,
  onChange,
  noOptionComponent,
  ...props
}) => {
  const menu = useMenuState()
  return (
    <>
      <SelectIndexesButton {...menu} {...props}>
        {icon || null}
        <TextToDisplay option={currentOption} currentOption />
        <Arrow />
      </SelectIndexesButton>
      <IndexesListContainer {...menu} aria-label="Indexes" style={{ top: 8 }}>
        {options?.length
          ? options.map((data, index) => (
              <IndexItem
                {...menu}
                key={index}
                id={data.uid}
                type="button"
                onClick={() => {
                  onChange(data)
                  menu.hide()
                }}
                $selected={currentOption?.uid === data.uid}
              >
                <TextToDisplay option={data} />
              </IndexItem>
            ))
          : noOptionComponent}
      </IndexesListContainer>
    </>
  )
}

Select.propTypes = {
  /**
   * List of options to appear
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string,
      stats: PropTypes.shape({
        numberOfDocuments: PropTypes.number,
      }),
    })
  ),
  /**
   * Icon you want to appear inside the select button, on the left
   */
  icon: PropTypes.node,
  /**
   * The current option to be displayed
   */
  currentOption: PropTypes.shape({
    uid: PropTypes.string,
    stats: PropTypes.shape({
      numberOfDocuments: PropTypes.number,
    }),
  }),
  /**
   * Function used to change the current option, triggered on click on an option
   */
  onChange: PropTypes.func,
  /**
   * Component to display if select has no options
   */
  noOptionComponent: PropTypes.node,
}

export default Select
