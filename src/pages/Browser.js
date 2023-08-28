import React from 'react'
import BrowserHeader from 'components/BrowserHeader'
import useLocalStorage from 'hooks/useLocalStorage'
import clientAgents from 'version/client-agents'
import { MeiliSearch as Meilisearch } from 'meilisearch'
import { baseUrl } from 'App'
import ApiKeyContext from 'context/ApiKeyContext'
import styled from 'styled-components'
import { SendRequest, Tools, DocumentBig, Reply } from 'components/icons'
import IconButton from 'components/IconButton'

const CommonIconStyles = `
  position: absolute;
  right: 10px;
`

const SendRequestIconContainer = styled(IconButton)`
  ${CommonIconStyles}
  top: 7px;
`

const ToolsIconContainer = styled(IconButton)`
  ${CommonIconStyles}
  top: 35px;
`

const CommonMenuStyles = `
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const MainMenu = styled.ul`
  ${CommonMenuStyles}
`

const DropdownMenu = styled.div`
  ${CommonMenuStyles}
  position: fixed;
  top: ${(props) => props.mousePosition.y}px;
  left: ${(props) => props.mousePosition.x}px;
  background-color: white;
  border: 1px solid gray;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999;
`

const CommonButtonStyles = `
  color: black;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: rgb(255, 214, 227);
  }
`

const AddRequestBoxButton = styled.button.attrs({ type: 'button' })`
  ${CommonButtonStyles}
  padding: 8px;
  cursor: pointer;
  border: 0.1px solid gray;
`

const DropdownButton = styled.div`
  ${CommonButtonStyles}
  padding: 8px;
`

const MainMenuButton = styled.div`
  ${CommonButtonStyles}
  padding: 4px;
  padding-right: 12px;
  background-color: ${(props) =>
    props.isPressed ? 'transparent' : 'rgb(225, 255, 225)'};
`

const CommonTextStyles = `
  padding-left: 46px;
  padding-top: 0px;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-weight: 500;
  background-color: rgb(250, 251, 254);
  font-size: 20px;
  line-height: 24px;
  caret-color: auto;
  resize: none;
  overflow: none;
  word-wrap: break-word;
  white-space: pre-wrap;
`

const RequestBox = styled.textarea`
  ${CommonTextStyles}
  overflow: hidden;
  resize: none;
  min-height: 40px;
  height: auto;
  transition: height 0.2s ease;

  box-sizing: border-box;
`

const ResponseBox = styled.textarea`
  ${CommonTextStyles}
  word-wrap: break-word;
  overflow: auto;
`

const CommonTextAreaContainerStyles = `
  border: 1px solid rgb(220, 220, 220);
  position: relative;
  padding: 8px;

  ::before {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 44px;
    background-color: rgb(240, 240, 240);
  }
`

const RequestContainer = styled.div`
  ${CommonTextAreaContainerStyles}
  margin-bottom: 5px;
  flex: 1;
`

const ParentRequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
`

const RequestContainerMap = styled.div`
  display: flex;
`

const ResponseContainer = styled.div`
  ${CommonTextAreaContainerStyles}
  transition: width 0.3s;
`

const BrowserAppContainer = styled.div`
  display: flex;
  background-color: ${(p) => p.theme.colors.gray[11]};
  justify-content: space-between;
  height: calc(100vh - 120px);
  border-color: rgb(220, 220, 220);
`

const Browser = () => {
  const apiKey = useLocalStorage('apiKey')[0]
  const [browserRequestWidth, setBrowserRequestWidth] = React.useState('40%')
  const [browserResponseWidth, setBrowserResponseWidth] = React.useState('60%')
  const [requestData, setRequestData] = useLocalStorage('requestData', {
    initialBox: { text: 'GET /health', height: 'auto' },
  })
  const [responseText, setResponseText] = React.useState('')
  const [openDropdownKey, setOpenDropdownKey] = React.useState(-1)
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [numberOfDropDownItems, setNumberOfDropDownItems] = React.useState(0)
  const [isRequestContainerHidden, setRequestContainerHidden] =
    React.useState(false)
  const [isResponseContainerHidden, setResponseContainerHidden] =
    React.useState(false)

  const handleHideRequestContainer = () => {
    if (isRequestContainerHidden === false) {
      setRequestContainerHidden(true)
      setBrowserRequestWidth('0%')
      setBrowserResponseWidth('100%')
    } else {
      setRequestContainerHidden(false)
      setBrowserRequestWidth('40%')
      setBrowserResponseWidth('60%')
    }
  }

  const handleHideResponseContainer = () => {
    if (isResponseContainerHidden === false) {
      setResponseContainerHidden(true)
      setBrowserRequestWidth('100%')
      setBrowserResponseWidth('0%')
    } else {
      setResponseContainerHidden(false)
      setBrowserRequestWidth('40%')
      setBrowserResponseWidth('60%')
    }
  }

  const adjustRequestBoxHeight = (event, key) => {
    const textarea = event.target
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`

    setRequestData((prevData) => ({
      ...prevData,
      [key]: { ...prevData[key], height: `${textarea.scrollHeight}px` },
    }))
  }

  const handleAddRequestBoxClick = () => {
    const newKey = Date.now().toString()
    setRequestData((prevData) => ({
      ...prevData,
      [newKey]: { text: '', height: 'auto' },
    }))
  }

  const handleSetRequestData = (event, key) => {
    setRequestData((prevData) => ({
      ...prevData,
      [key]: { ...prevData[key], text: event.target.value },
    }))
  }

  const handleDeleteRequestBoxClick = (key) => {
    const newData = { ...requestData }
    delete newData[key]
    setRequestData(newData)
  }

  const MSClient = React.useMemo(
    () =>
      new Meilisearch({
        host: baseUrl,
        apiKey,
        clientAgents,
      }),
    [apiKey]
  )

  const dropdownItems = [
    {
      label: 'Delete Request Box',
      onClick: () => handleDeleteRequestBoxClick(openDropdownKey),
    },
  ]

  React.useEffect(() => {
    setNumberOfDropDownItems(dropdownItems.length)
  }, [dropdownItems])

  const handleToolsIconClick = (key) => (event) => {
    const mouseY = event.clientY
    const dropdownMenuHeight = numberOfDropDownItems * 50
    const windowHeight = window.innerHeight

    let adjustedTop = mouseY + 10

    if (mouseY + dropdownMenuHeight > windowHeight) {
      adjustedTop = Math.max(
        mouseY - dropdownMenuHeight + numberOfDropDownItems * 10,
        0
      )
    }

    if (openDropdownKey === key) {
      setOpenDropdownKey(-1)
    } else {
      setOpenDropdownKey(key)
      setMousePosition({ x: event.clientX, y: adjustedTop })
    }
  }

  const handleSendIconClick = async (key) => {
    const textToSend = requestData[key].text

    const lines = textToSend.split('\n')
    const firstLine = lines.shift()
    const jsonObject = lines.join('').trim()
    const requestParts = firstLine.split(' ')
    const firstWord = requestParts[0]

    let response = ''

    const method = firstWord.toLowerCase()
    const requestPath = requestParts[1]
    let requestBody = {}
    requestBody = jsonObject ? JSON.parse(jsonObject) : {}

    try {
      switch (method) {
        case 'get':
          response = await MSClient.httpRequest.get(requestPath)
          break
        case 'post':
          response = await MSClient.httpRequest.post(requestPath, requestBody)
          break
        case 'put':
          response = await MSClient.httpRequest.put(requestPath, requestBody)
          break
        case 'delete':
          response = await MSClient.httpRequest.delete(requestPath, requestBody)
          break
        default:
          // Handle requests not starting with get, post, put or delete
          response = { error: 'You must define one of, GET, POST, PUT, DELETE' }
          break
      }
    } catch (exceptionVar) {
      const errorMessage = exceptionVar.message

      switch (errorMessage.toLowerCase()) {
        case 'not found':
          response = {
            http: {
              status: {
                code: 404,
                error: 'Not Found',
                message: `Bad Url: ${requestParts[1]}`,
              },
              url: `${requestParts[1]}`,
            },
          }
          break
        case 'failed to fetch':
          response = {
            http: {
              status: {
                code: 503,
                error: 'Service Unavailable',
                message: 'Check if Meilisearch is down.',
              },
            },
          }
          break
        default:
          response = { error: exceptionVar.message }
          break
      }
    }

    if (response !== '') {
      setResponseText(JSON.stringify(response, null, 2))
    } else {
      setResponseText('')
    }
  }

  const contextValue = React.useMemo(() => ({ apiKey }), [apiKey])

  React.useEffect(() => {
    const handleGlobalClick = (event) => {
      if (openDropdownKey !== -1 && event.target instanceof Node) {
        setOpenDropdownKey(-1)
      }
    }

    document.addEventListener('click', handleGlobalClick)

    return () => {
      document.removeEventListener('click', handleGlobalClick)
    }
  }, [openDropdownKey])

  return (
    <ApiKeyContext.Provider value={contextValue}>
      {/* Adjust to use the main Header, but the problem with the
         search box in the header would need to be resolved first, ideas
         1. Keep the searchbox and when someone searches move to InstantSearch App
         2. Move the searchbox out of the header */}
      <BrowserHeader client={MSClient} />
      <BrowserAppContainer style={{ display: 'flex' }}>
        <MainMenu>
          <MainMenuButton
            onClick={handleHideRequestContainer}
            isPressed={isRequestContainerHidden}
          >
            <DocumentBig alt="Requests Icon" style={{ width: '40px' }} />
          </MainMenuButton>
          <MainMenuButton
            onClick={handleHideResponseContainer}
            isPressed={isResponseContainerHidden}
          >
            <Reply alt="Reply Icon" style={{ width: '40px', height: '40px' }} />
          </MainMenuButton>
          {/* <MainMenuButton>Contact</MainMenuButton>
          <MainMenuButton>About</MainMenuButton> */}
        </MainMenu>
        <ParentRequestContainer
          style={{
            width: browserRequestWidth,
            display: isRequestContainerHidden ? 'none' : 'block',
          }}
        >
          {Object.keys(requestData).map((key) => (
            <RequestContainerMap key={key}>
              <RequestContainer key={key} style={{ width: '100%' }}>
                <RequestBox
                  value={requestData[key].text}
                  onChange={(e) => {
                    handleSetRequestData(e, key)
                    adjustRequestBoxHeight(e, key)
                  }}
                  onMouseDown={(e) => {
                    adjustRequestBoxHeight(e, key)
                  }}
                  style={{ height: requestData[key].height || 'auto' }}
                />
                <SendRequestIconContainer
                  onClick={() => handleSendIconClick(key)}
                >
                  <SendRequest alt="Send Icon" style={{ width: '20px' }} />
                </SendRequestIconContainer>
                <ToolsIconContainer
                  onClick={handleToolsIconClick(key)}
                  tabIndex={key}
                >
                  <Tools alt="Tools Icon" style={{ width: '20px' }} />
                </ToolsIconContainer>
                {openDropdownKey === key && (
                  <DropdownMenu mousePosition={mousePosition}>
                    {dropdownItems.map((item, itemIndex) => (
                      <DropdownButton key={itemIndex} onClick={item.onClick}>
                        {item.label}
                      </DropdownButton>
                    ))}
                  </DropdownMenu>
                )}
              </RequestContainer>
            </RequestContainerMap>
          ))}
          <AddRequestBoxButton
            onClick={handleAddRequestBoxClick}
            style={{ right: '0px' }}
          >
            Add Request Box
          </AddRequestBoxButton>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </ParentRequestContainer>
        <ResponseContainer
          style={{
            width: browserResponseWidth,
            display: isResponseContainerHidden ? 'none' : 'block',
          }}
        >
          <ResponseBox readOnly value={responseText} />
        </ResponseContainer>
      </BrowserAppContainer>
    </ApiKeyContext.Provider>
  )
}

export default Browser
