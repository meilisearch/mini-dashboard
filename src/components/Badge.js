import styled from 'styled-components'

const Badge = styled.span`
  background-color: ${(p) => p.theme.colors.main.lighter};
  color: ${(p) => p.theme.colors.main.dark};
  height: 16px;
  border-radius: 5px;
  padding: 0 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 22px;
  font-weight: 400;
  letter-spacing: 0.03em;
`

export default Badge
