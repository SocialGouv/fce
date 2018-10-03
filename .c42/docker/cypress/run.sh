#!/bin/sh

./node_modules/.bin/cypress install
./node_modules/.bin/cypress run --browser chrome --env host=http://127.0.0.1:3000
