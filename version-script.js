/*
 * The following script changes the version of the mini-dashboard
 * in the file `src/version.js
 */

const fs = require('fs')

// Fetch the current version in the package.json
const { version } = require('./package.json')

// Creates content of the version.js file
const versionFile = `export default '${version}'\n`
// Write the content inside ./src/version.js
fs.writeFileSync('./src/utils/version.js', versionFile)
