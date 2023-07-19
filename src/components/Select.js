import React, { useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Typography from 'components/Typography'
import DropdownSelect, { createFilter, components } from 'react-select'
import Color from 'color'
import { FixedSizeList } from 'react-window'
import { isEmpty, isNil } from 'lodash'

const IndexId = styled(Typography)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const IndexList = styled(DropdownSelect)`
  margin: 0px 20px;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  outline: none;
  box-shadow: 0px 4px 6px ${Color('#000').alpha(0.04)};
  max-height: 180px;
  border-radius: 8px;

  .react-select {
    &__control {
      svg {
        padding-left: 8px;
        color: ${(p) => p.theme.colors.main.default};
        height: 24px;
        width: 24px;
      }
      border: none;
      max-height: fit-content;
      border-radius: 8px;
      height: 100%;
      border-width: 1px;
      border-style: solid;
      border-color: ${(p) => p.theme.colors.gray[10]};

      &:hover {
        border-color: ${(p) => p.theme.colors.main.default};
        box-shadow: 0px 4px 6px ${Color('#000').alpha(0.04)};
      }

      &--is-focused {
        border-color: ${(p) => p.theme.colors.main.default};
        box-shadow: 0px 4px 6px ${Color('#000').alpha(0.04)};
      }
    }

    &__indicator-separator {
      display: none;
    }
    &__dropdown-indicator {
      svg {
        height: 24px;
        width: 24px;
      }
    }

    &__option {
      &:hover {
        background-color: ${(p) => p.theme.colors.main.light};
      }

      &--is-focused {
        background-color: ${(p) => p.theme.colors.main.light};
      }

      &--is-selected:not(span span) {
        background-color: ${Color('#E41359').alpha(0.8)};
      }
    }
  }
`

const TextToDisplay = ({ option, currentOption }) => {
  const isCurrentSelectedOption = option?.uid === currentOption?.uid
  return (
    <>
      <IndexId
        variant="typo4"
        color={isCurrentSelectedOption ? 'gray.1' : 'gray.2'}
        mr={2}
      >
        {option ? option.uid : `Select an index`}
      </IndexId>{' '}
      {option?.stats && (
        <Typography
          variant="typo6"
          color={isCurrentSelectedOption ? 'gray.8' : 'gray.7'}
          mt="1px"
        >
          {option.stats.numberOfDocuments.toLocaleString()}
        </Typography>
      )}
    </>
  )
}

const MenuList = (props) => {
  // Height of each option.
  const { options, children, maxHeight, getValue } = props
  const height = 35
  const [value] = getValue()
  const initialOffset = options.indexOf(value) * height

  if (isEmpty(options)) {
    return <div> {children} </div>
  }

  return (
    <FixedSizeList
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </FixedSizeList>
  )
}

const Control = ({ children, icon, ...props }) => (
  <components.Control {...props}>
    {icon} {children}
  </components.Control>
)

const Select = ({
  options,
  onChange,
  noOptionComponent,
  icon,
  currentOption,
}) => {
  const renderSelectControl = (props) => <Control icon={icon} {...props} />

  const renderMenuList = (props) => <MenuList {...props} />

  const getOptions = () => {
    if (isEmpty(options) || isNil(options)) {
      return []
    }
    return options
  }

  const MemoizedSelect = useMemo(
    () => (
      <IndexList
        className="react-select-container"
        classNamePrefix="react-select"
        components={{
          MenuList: renderMenuList,
          Control: renderSelectControl,
        }}
        options={getOptions()}
        getOptionLabel={(option) => (
          <TextToDisplay option={option} currentOption={currentOption} />
        )}
        getOptionValue={(option) => option}
        filterOption={createFilter({
          ignoreCase: true,
          ignoreAccents: false,
          stringify: (option) => option.data.uid,
        })}
        onChange={(data) => onChange(data)}
        placeholder={<TextToDisplay option={undefined} />}
        noOptionsMessage={() => noOptionComponent}
        value={currentOption}
        isSearchable
      />
    ),
    [options, currentOption]
  )

  return MemoizedSelect
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

Select.defaultProps = {
  options: null,
  icon: null,
  currentOption: null,
  onChange: null,
  noOptionComponent: null,
}

export default Select
