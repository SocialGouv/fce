#!/bin/sh

npm run gulp & PIDGULP=$!
npm run start & PIDSRV=$!

wait $PIDGULP
wait $PIDSRV