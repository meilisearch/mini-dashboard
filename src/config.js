const baseUrl =
  import.meta.env.VITE_MEILI_SERVER_ADDRESS ||
  (import.meta.env.DEV ? 'http://0.0.0.0:7700' : window.location.origin)

export default baseUrl
