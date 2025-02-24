import styled from 'styled-components'

const BodyWrapper = styled.div`
  display: flex;
  flex: 1;
  width: ${({ isRightPanelOpen }) =>
    isRightPanelOpen ? 'calc(100% - 30vw)' : '100%'};
  min-height: calc(100vh - 120px);
  transition: width 0.3s ease-in-out;
`

export default BodyWrapper
