/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'

import Card from 'components/Card'
import Typography from 'components/Typography'
import Highlight from './Highlight'

const Img = styled.div`
  height: 264px;
  width: 240px;
  background-color: ${(p) => p.theme.colors.main.light};
  flex-shrink: 0;
  border-radius: 10px;
  margin-right: ${(p) => p.theme.space[4]}px;
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
`

function Hit({ hit }) {
  const objectArray = Object.entries(hit._highlightResult)

  return (
    <CustomCard>
      <Img />
      <ContentContainer>
        {objectArray.map(([key, value], index) => (
          <div key={index}>
            <Grid key={key}>
              <HitKey variant="typo10" color="gray.6">{`${key} : `}</HitKey>
              <HitValue
                variant="typo11"
                color="gray.2"
                attribute={key}
                hit={hit}
              />
            </Grid>
            {index !== objectArray.length - 1 && <Hr />}
          </div>
        ))}
      </ContentContainer>
    </CustomCard>
  )
}

export default Hit
