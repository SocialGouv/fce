#!/bin/sh

if [ -z "${WATCH}" ]; then
    npm run start
else
    npm run watch
fi
