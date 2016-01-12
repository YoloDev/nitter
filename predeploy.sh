#!/bin/bash

npm run build
cp package.json package.json.orig
json -If package.json -e "this.version += '-build.$TRAVIS_BUILD_NUMBER'"
