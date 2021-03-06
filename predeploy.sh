#!/bin/bash

npm run build
cp package.json package.json.orig
echo "Travis tag: $TRAVIS_TAG"
if [[ "$TRAVIS_TAG" -eq "" ]]; then
  json -If package.json -e "this.version += '-build.$TRAVIS_BUILD_NUMBER'"
fi
