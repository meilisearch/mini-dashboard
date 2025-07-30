const baseUrl =
  import.meta.env.REACT_APP_MEILI_SERVER_ADDRESS ||
  (import.meta.env.MODE === 'development'
    ? 'http://0.0.0.0:7700'
    : window.location.origin)

export default baseUrl
