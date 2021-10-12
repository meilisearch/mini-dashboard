/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import ReactJson from 'react-json-view'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { jsonTheme } from 'theme'
import { DocumentMedium } from 'components/icons'
import Button from 'components/Button'
import Box from 'components/Box'
import Card from 'components/Card'
import BaseLink from 'components/Link'
import Typography from 'components/Typography'
import Highlight from './Highlight'

const EmptyImage = styled.div`
  width: 100%;
  height: 264px;
  background-color: ${(p) => p.theme.colors.main.light};
  border-radius: 10px;
`

const CustomCard = styled(Card)`
  display: flex;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  word-break: break-all;
`

const HitKey = styled(Typography)`
  grid-column: 1 / 2;
`

const HitValue = styled.div`
  grid-column: 2 / 4;
  word-break: break-word;
`

const ContentContainer = styled.div`
  width: 100%;
`

const Link = styled(BaseLink)`
  transition: color 300ms;
  text-decoration: underline;
  color: ${(p) => p.theme.colors.gray[2]};
  &:hover,
  &:focus {
    outline: none;
    color: ${(p) => p.theme.colors.gray[0]};
  }
`

const Hr = styled.hr`
  border-color: ${(p) => p.theme.colors.gray[10]};
  background-color: ${(p) => p.theme.colors.gray[10]};
  border-style: solid;
  border-top: 0;
`

const isObject = (value) => value.trim().match(/^{(.*?)}$/)
const isArray = (value) => {
  try {
    const parsedValue = JSON.parse(value)
    return Array.isArray(parsedValue)
  } catch {
    return false
  }
}

// A button component with certain styles set, Which used to indicate "Toggle" operations.
const ToggleButton = (props) => {
  const { children, onClick = () => {}, toggled } = props

  return (
    <Button
      variant="grayscale"
      size="small"
      toggable
      mb={2}
      icon={<DocumentMedium style={{ height: 22 }} />}
      onClick={onClick}
      aria-expanded={toggled}
      {...props}
    >
      {children}
    </Button>
  )
}

// Component to represent valid Object/Arrays in Expandable/Collapsable view.
const JsonRepresentor = (props) => {
  const { value, attribute, hit } = props

  const [toggled, setToggled] = React.useState(false)

  // Parsing provided values into JS data structure & Calculating relevant props.
  let parsedValue = ''
  let toggleButtonCalculatedProps = {}
  let reactJsonCalculatedProps = {}

  try {
    parsedValue = JSON.parse(value)

    if (Array.isArray(parsedValue)) {
      toggleButtonCalculatedProps = {
        ...toggleButtonCalculatedProps,
        title: 'array',
      }

      reactJsonCalculatedProps = {
        ...reactJsonCalculatedProps,
        groupArraysAfterLength: 20,
        displayArrayKey: true,
      }
    } else if (isObject(value)) {
      toggleButtonCalculatedProps = {
        ...toggleButtonCalculatedProps,
        title: 'json',
      }

      reactJsonCalculatedProps = {
        ...reactJsonCalculatedProps,
        displayArrayKey: false,
      }
    } else {
      throw new Error('Unsupported Type')
    }
  } catch (err) {
    // As a graceful fallback, displaying un-parsable/invalid value in default value style.
    return (
      <Highlight
        variant="typo11"
        color="gray.2"
        attribute={attribute}
        hit={hit}
      />
    )
  }

  return (
    <>
      <ToggleButton
        onClick={() => setToggled((prevToggled) => !prevToggled)}
        toggled={toggled}
      >
        {toggleButtonCalculatedProps.title}
      </ToggleButton>

      {toggled && (
        <ReactJson
          src={parsedValue}
          name={null}
          collapsed={3}
          enableClipboard={false}
          displayObjectSize={false}
          displayDataTypes={false}
          displayArrayKey={false}
          theme={jsonTheme}
          style={{ fontSize: 12 }}
          {...reactJsonCalculatedProps}
        />
      )}
    </>
  )
}

const FieldValue = ({ value, hit, objectKey }) => {
  // Handling Objects & Arrays Values
  if (isObject(value) || isArray(value)) {
    return <JsonRepresentor value={value} hit={hit} objectKey={objectKey} />
  }

  // Handling Links
  if (value.match(/^https?:\/\/[^\s]+$/)) {
    return (
      <Link href={hit[objectKey]}>
        <Highlight hit={hit} attribute={objectKey} />
      </Link>
    )
  }

  return (
    <Highlight
      variant="typo11"
      color="gray.2"
      attribute={objectKey}
      hit={hit}
    />
  )
}

function Hit({ hit, imageKey }) {
  const [displayMore, setDisplayMore] = React.useState(false)
  const documentProperties = Object.entries(hit._highlightResult)
  return (
    <CustomCard>
      <Box width={240} mr={4} flexShrink={0}>
        {hit[imageKey] ? (
          <LazyLoadImage
            src={hit[imageKey] || null}
            width="100%"
            style={{ borderRadius: 10 }}
          />
        ) : (
          <EmptyImage />
        )}
      </Box>
      <ContentContainer>
        {documentProperties
          .slice(0, displayMore ? hit.length : 6)
          .map(([key, value], index) => (
            <div key={key}>
              <Grid>
                <HitKey variant="typo10" color="gray.6">
                  {key}
                </HitKey>
                <HitValue>
                  <FieldValue value={value.value} hit={hit} objectKey={key} />
                </HitValue>
              </Grid>
              <Hr />
            </div>
          ))}
        {documentProperties.length > 6 && !displayMore && (
          <Grid>
            <HitKey variant="typo10" color="gray.6">
              ...
            </HitKey>
            <div>
              <Button
                variant="link"
                size="small"
                toggable
                onClick={() => setDisplayMore(true)}
              >
                Show more
              </Button>
            </div>
          </Grid>
        )}
      </ContentContainer>
    </CustomCard>
  )
}

export default Hit
