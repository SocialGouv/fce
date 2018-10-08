#!/bin/bash

function dcRun
{
  CMD="docker-compose run --rm"
  ARG="$1"
  eval ${CMD} ${ARG}
}

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd $DIR/../..

echo
echo "============================"
echo "INSTALLATION OF THE PROJECT "
echo "============================"

#Install docker-compose.yml
.c42/scripts/docker-install.sh

echo
echo "Install yarn"
echo "------------"
dcRun "front yarn install"
dcRun "server yarn install"
echo
echo "Start docker"
echo "------------"
docker-compose up -d

echo
echo "Done!"
echo