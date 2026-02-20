const baseUrl =
  import.meta.env.VITE_MEILI_SERVER_ADDRESS ||
  (import.meta.env.DEV ? 'http://localhost:7700' : window.location.origin)

export default baseUrl
