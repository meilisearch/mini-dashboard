/** @const {string} Name of the query parameter that controls banner visibility */
const QUERY_PARAM_NAME = 'cloud_banner'

/**
 * Checks if the cloud banner should be enabled based on URL query parameters
 * @returns {boolean} True if banner should be shown, false if explicitly disabled via query param
 */
const isBannerEnabled = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const cloudBannerQueryParam = urlParams.get(QUERY_PARAM_NAME)
  return cloudBannerQueryParam !== 'false'
}

export default isBannerEnabled
