import version from '../version/version'
import getCookie from '../utils/getCookie'

const PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID
const FORM_GUID = import.meta.env.VITE_HUBSPOT_FORM_GUID

const PAGE_NAME = import.meta.env.DEV
  ? `Mini-dashboard (dev)`
  : `Mini-dashboard v${version}`

function getContext({ pageName }) {
  const context = {
    pageName,
    pageUri: typeof window !== 'undefined' ? window.location.href : undefined,
  }

  // The `hubspotutk` cookie is set by HubSpot's tracking code and ties this
  // submission to the visitor's tracked activity and the right contact record.
  // Only include `hutk` when the cookie actually exists — HubSpot rejects an
  // empty value with INVALID_HUTK, so a cookieless submission must omit it.
  const hutk = getCookie('hubspotutk')
  if (hutk) context.hutk = hutk

  return context
}

function getBody({ email, pageName }) {
  return {
    fields: [
      {
        objectTypeId: '0-1',
        name: 'email',
        value: email,
      },
    ],
    context: getContext({ pageName }),
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: 'I agree to allow Meilisearch to store and process my personal data.',
        communications: [
          {
            value: true,
            subscriptionTypeId: 999,
            text: 'I agree to receive marketing communications from Meilisearch.',
          },
        ],
      },
    },
  }
}

export default function useNewsletter() {
  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`

  const subscribe = (email) =>
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        getBody({
          email,
          pageName: PAGE_NAME,
        })
      ),
    })

  return { subscribe }
}
