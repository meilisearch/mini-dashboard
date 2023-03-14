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

const isObject = (value) => {
  try {
    return typeof value === 'object' && !Array.isArray(value) && value !== null
  } catch (e) {
    return false
  }
}

const isArray = (value) => {
  try {
    return Array.isArray(value)
  } catch {
    return false
  }
}

// A button component with certain styles set, Which used to indicate "Toggle" operations.
const ToggleButton = ({ onClick = () => {}, toggled, ...props }) => (
  <Button
    variant="grayscale"
    size="small"
    toggable
    mb={2}
    icon={<DocumentMedium style={{ height: 22 }} />}
    onClick={onClick}
    aria-expanded={toggled}
    {...props}
  />
)

// Component to represent valid Object/Arrays in Expandable/Collapsable view.
const JsonRepresentor = ({
  value,
  attribute,
  hit,
  title,
  reactJsonOptions = {},
}) => {
  const [toggled, setToggled] = React.useState(false)

  return value ? (
    <>
      <ToggleButton
        onClick={() => setToggled((prevToggled) => !prevToggled)}
        toggled={toggled}
      >
        {title}
      </ToggleButton>

      {toggled && (
        <ReactJson
          src={value}
          name={null}
          collapsed={3}
          enableClipboard={false}
          displayObjectSize={false}
          displayDataTypes={false}
          displayArrayKey={false}
          theme={jsonTheme}
          style={{ fontSize: 12 }}
          {...reactJsonOptions}
        />
      )}
    </>
  ) : (
    <Highlight
      variant="typo11"
      color="gray.2"
      attribute={attribute}
      hit={hit}
    />
  )
}

function getFieldValueType(value) {
  if (isArray(value)) {
    return 'array'
  }
  if (isObject(value)) {
    return 'object'
  }

  return typeof value
}

const FieldValue = ({ hit, objectKey }) => {
  const fieldValueType = getFieldValueType(hit[objectKey])

  if (fieldValueType === 'array') {
    return (
      <JsonRepresentor
        value={hit[objectKey]}
        hit={hit}
        attribute={objectKey}
        title="array"
        reactJsonOptions={{ groupArraysAfterLength: 20, displayArrayKey: true }}
      />
    )
  }

  if (fieldValueType === 'object') {
    return (
      <JsonRepresentor
        value={hit[objectKey]}
        hit={hit}
        attribute={objectKey}
        title="json"
        reactJsonOptions={{ displayArrayKey: false }}
      />
    )
  }

  // Wrap link in <a> tag
  if (
    fieldValueType === 'string' &&
    hit[objectKey].match(/^https?:\/\/[^\s]+$/)
  ) {
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

const Hit = ({ hit, imageKey }) => {
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
        {Object.keys(hit._highlightResult)
          .slice(0, displayMore ? Object.keys(hit).length : 6)
          .map((key) => (
            <div key={key}>
              <Grid>
                <HitKey variant="typo10" color="gray.6">
                  {key}
                </HitKey>
                <HitValue>
                  <FieldValue hit={hit} objectKey={key} />
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
