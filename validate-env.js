/* eslint-disable no-console */

const requiredEnv = ['REACT_APP_API_URL', 'REACT_APP_ANOTHER_ENV_VAR']

const missingEnv = requiredEnv.filter((env) => !process.env[env])

if (missingEnv.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnv.join(', ')}`
  )
  process.exit(1)
}
console.log('All required environment variables are set.')
