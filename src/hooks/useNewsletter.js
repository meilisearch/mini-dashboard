import version from '../version/version'

const PORTAL_ID = process.env.REACT_APP_HUBSPOT_PORTAL_ID || '25945010'
const FORM_GUID =
  process.env.REACT_APP_HUBSPOT_FORM_GUID ||
  '991e2a09-77c2-4428-9242-ebf26bfc6c64'

const PAGE_NAME =
  process.env.NODE_ENV === 'development'
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
