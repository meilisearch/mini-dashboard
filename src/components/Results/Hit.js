import React, { useEffect } from 'react'
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
  align-items: flex-start;
  flex-wrap: wrap;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr; /* Adjust based on your preference */
  grid-gap: 10px;
`

const HitKey = styled(Typography)`
  grid-column: 1 / 2;
`

const HitValue = styled.div`
  grid-column: 2 / 4;
  overflow-wrap: break-word; /* Recommended for natural word breaks */
`

const ContentContainer = styled.div`
  margin-top: 16px;
  width: 100%;
  overflow: hidden;
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
  const [imageErrors, setImageErrors] = React.useState({})

  useEffect(() => {
    if (!hit._highlightResult) {
      // eslint-disable-next-line no-console
      console.warn('Your hits have no field. Please check your index settings.')
    }
  }, [hit._highlightResult])

  // Handler to set an image as errored out.
  const handleImageError = (hitId) => {
    setImageErrors((prevState) => ({ ...prevState, [hitId]: true }))
  }

  const hasFields = !!hit._highlightResult
  const documentProperties = hasFields
    ? Object.entries(hit._highlightResult)
    : []

  return (
    <CustomCard>
      <Box width={240} mr={4} flexShrink={0}>
        {hit[imageKey] && !imageErrors[hit[imageKey]] ? (
          <LazyLoadImage
            src={hit[imageKey]}
            effect="blur"
            width="100%"
            height="264px"
            style={{ borderRadius: 10, objectFit: 'cover' }}
            onError={() => {
              handleImageError(hit[imageKey])
            }}
            visibleByDefault="true"
          />
        ) : (
          <EmptyImage />
        )}
      </Box>
      <ContentContainer>
        {hasFields &&
          documentProperties
            .slice(0, displayMore ? documentProperties.length : 6)
            .map(([field]) => (
              <div key={field}>
                <Grid>
                  <HitKey variant="typo10" color="gray.6">
                    {field}
                  </HitKey>
                  <HitValue>
                    <FieldValue hit={hit} objectKey={field} />
                  </HitValue>
                </Grid>
                <Hr />
              </div>
            ))}
        {documentProperties.length > 6 && !displayMore && (
          <Button variant="link" onClick={() => setDisplayMore(true)}>
            Show more
          </Button>
        )}
      </ContentContainer>
    </CustomCard>
  )
}

export default Hit
