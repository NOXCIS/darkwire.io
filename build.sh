#!/bin/bash

api_host=$API_HOST

if [[ "$HEROKU_APP_NAME" =~ "-pr-" ]]
then
  api_host=""
fi

echo "building client..."
cd client
yarn 
yarn build 
yarn cache clean 
yarn autoclean --force

cd ../

echo "building server..."
cd server
yarn 
yarn build 
yarn cache clean
yarn autoclean --force
