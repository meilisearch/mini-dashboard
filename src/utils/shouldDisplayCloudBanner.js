const shouldDisplayCloudBanner = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const cloudBannerQueryParam = urlParams.get('cloud_banner')
  return cloudBannerQueryParam === 'true'
}

export default shouldDisplayCloudBanner
