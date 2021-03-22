/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'

import Card from 'components/Card'
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

const HitKey = styled.div`
  grid-column: 1 / 2;
  color: ${(p) => p.theme.colors.gray[5]};
  text-transform: uppercase;
  font-size: 12px;
`

const HitValue = styled(Highlight)`
  grid-column: 2 / 4;
  color: ${(p) => p.theme.colors.gray[2]};
  font-size: 15px;
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
              <HitKey style={{ fontWeight: 'bold' }}>{`${key} : `}</HitKey>
              <HitValue attribute={key} hit={hit} />
            </Grid>
            {index !== objectArray.length - 1 && <Hr />}
          </div>
        ))}
      </ContentContainer>
    </CustomCard>
  )
}

export default Hit
