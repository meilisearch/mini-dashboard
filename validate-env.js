/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const envFiles = [
  '.env',
  '.env.local',
  process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : null,
  process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}.local` : null,
].filter(Boolean)

envFiles.forEach((envFile) => {
  const envPath = path.resolve(process.cwd(), envFile)
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath })
  }
})

const requiredEnv = ['VITE_HUBSPOT_PORTAL_ID', 'VITE_HUBSPOT_FORM_GUID']

const missingEnv = requiredEnv.filter((env) => !process.env[env])

if (missingEnv.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnv.join(', ')}`
  )
  process.exit(1)
}
console.log('All required environment variables are set.')
