#!/bin/sh

if [ -d "/frentreprise" ]; then
    cd /frentreprise
    npm link
    cd /project
    npm link frentreprise
    npm upgrade frentreprise
    ln -s /frentreprise/dist/frentreprise.js src/frentreprise.js
fi

if [ -z "${WATCH}" ]; then
    npm run start
else
    npm run watch
fi
