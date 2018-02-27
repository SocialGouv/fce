#!/bin/sh

if [ -z "${NODEMON}" ]; then
    npm run nodemon
else
    npm run start
fi
