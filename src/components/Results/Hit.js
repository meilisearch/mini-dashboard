/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import ReactJson from 'react-json-view'

import { jsonTheme } from 'theme'
import { DocumentMedium } from 'components/icons'
import Button from 'components/Button'
import Box from 'components/Box'
import Card from 'components/Card'
import Typography from 'components/Typography'
import Highlight from './Highlight'

const EmptyImage = styled.div`
  width: 100%;
  height: 264px;
  background-color: ${(p) => p.theme.colors.main.light};
  border-radius: 10px;
`

const Img = styled.img`
  max-height: 100%;
  width: 100%;
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

const HitValue = styled(Highlight)`
  grid-column: 2 / 4;
`

const ContentContainer = styled.div`
  width: 100%;
`

const Hr = styled.hr`
  border-color: ${(p) => p.theme.colors.gray[10]};
  background-color: ${(p) => p.theme.colors.gray[10]};
  border-style: solid;
  border-top: 0;
`

const ObjectValue = ({ objectKey, value }) => {
  const [toggled, setToggled] = React.useState(false)
  return (
    <>
      <HitKey variant="typo10" color="gray.6">
        {`${objectKey} : `}
      </HitKey>
      <div>
        <Button
          variant="grayscale"
          size="small"
          toggable
          mb={2}
          icon={<DocumentMedium style={{ height: 22 }} />}
          onClick={() => setToggled((prevToggled) => !prevToggled)}
          aria-expanded={toggled}
        >
          json
        </Button>
        {toggled && (
          <ReactJson
            src={JSON.parse(value)}
            name={null}
            collapsed={3}
            enableClipboard={false}
            displayObjectSize={false}
            displayDataTypes={false}
            displayArrayKey={false}
            theme={jsonTheme}
            style={{ fontSize: 12 }}
          />
        )}
      </div>
    </>
  )
}

const isObject = (value) => {
  try {
    const data = JSON.parse(value)
    return data.constructor.name === 'Object'
  } catch (err) {
    return false
  }
}

function Hit({ hit, imageKey }) {
  const [displayMore, setDisplayMore] = React.useState(false)
  const documentProperties = Object.entries(hit._highlightResult)
  return (
    <CustomCard>
      <Box width={240} mr={4} flexShrink={0}>
        {hit[imageKey] ? <Img src={hit[imageKey] || null} /> : <EmptyImage />}
      </Box>
      <ContentContainer>
        {documentProperties
          .slice(0, displayMore ? hit.length : 6)
          .map(([key, value], index) => (
            <div key={key}>
              <Grid>
                {isObject(value.value) ? (
                  <ObjectValue objectKey={key} value={value.value} />
                ) : (
                  <>
                    <HitKey
                      variant="typo10"
                      color="gray.6"
                    >{`${key} : `}</HitKey>
                    <HitValue
                      variant="typo11"
                      color="gray.2"
                      attribute={key}
                      hit={hit}
                    />
                  </>
                )}
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
