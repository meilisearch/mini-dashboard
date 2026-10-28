#!/bin/sh

# Guards against source maps leaking into the production bundle, which would
# expose the original source code to anyone opening the browser devtools.
# Vite keeps `build.sourcemap` disabled, this makes sure it stays that way.

build_dir='build'

if [ ! -d "$build_dir" ]; then
  echo "Error: '$build_dir' not found, run 'yarn build' first."
  exit 1
fi

map_files=$(find "$build_dir" -name '*.map')
if [ -n "$map_files" ]; then
  echo 'Error: source map files found in the production build:'
  echo "$map_files"
  exit 1
fi

map_refs=$(grep -rl 'sourceMappingURL' "$build_dir")
if [ -n "$map_refs" ]; then
  echo 'Error: sourceMappingURL references found in the production build:'
  echo "$map_refs"
  exit 1
fi

echo 'OK: no source maps in the production build.'
exit 0
