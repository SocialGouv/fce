#!/bin/sh

yarn install./node_modules/.bin/cypress install
./node_modules/.bin/cypress install
./node_modules/.bin/cypress run --browser chrome
