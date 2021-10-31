#!/bin/bash
set -euxo pipefail

pwd
ls -la

where yarn

yarn install && yarn build
yarn dotenv:test
yarn typeorm migration:run
yarn start:worker:goal
# yarn start:worker:challenge
yarn start