import version from '../version/version'

const PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID
const FORM_GUID = import.meta.env.VITE_HUBSPOT_FORM_GUID

const PAGE_NAME = import.meta.env.DEV
  ? `Mini-dashboard (dev)`
  : `Mini-dashboard v${version}`

function getBody({ email, pageName }) {
  return {
    fields: [
      {
        objectTypeId: '0-1',
        name: 'email',
        value: email,
      },
    ],
    context: {
      pageName,
    },
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
