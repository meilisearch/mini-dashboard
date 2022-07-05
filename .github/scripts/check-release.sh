#!/bin/sh

# Checking if current tag matches the package version
current_tag=$(echo $GITHUB_REF | tr -d 'refs/tags/v')
file_tag=$(grep '"version":' package.json | cut -d ':' -f 2- | tr -d ' ' | tr -d '"' | tr -d ',')

package_file_tag=$(grep '"version":' package.json | cut -d ':' -f 2- | tr -d ' ' | tr -d '"' | tr -d ',')
package_file_name='package.json'
version_file_tag=$(grep "export default" src/version/version.js | cut -d " " -f 3- | tr -d " " | tr -d "'")
version_file_name='src/version/version.js'

if [ "$current_tag" != "$file_tag" ]; then
  echo "Error: the current tag does not match the version in package file(s)."
  echo "$package_file_name: $current_tag vs $package_file_tag"
  echo "$version_file_name: $current_tag vs $version_file_tag"
  exit 1
fi

echo 'OK'
exit 0
