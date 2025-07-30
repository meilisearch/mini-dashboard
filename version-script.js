/*
 * The following script changes the version of the mini-dashboard
 * in the file `src/version.js
 */

import fs, { readFileSync } from 'fs'

// Fetch the current version in the package.json
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'))
const { version } = packageJson

// Creates content of the version.js file
const versionFile = `export default '${version}'\n`
// Write the content inside ./src/version.js
fs.writeFileSync('./src/version/version.js', versionFile)
