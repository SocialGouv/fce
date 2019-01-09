#!/bin/bash

function dcRun
{
  docker-compose run --rm $@
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
echo "==============="
echo "BUILD A RELEASE"
echo "==============="

if [ -d "dist" ]
then
  echo
  echo "Removing old build..."
  rm -rf dist/
fi

echo
echo "=========================="
echo "Installing dependencies..."
echo "=========================="
dcRun frentreprise yarn
dcRun server yarn
dcRun front yarn

echo
echo "==========="
echo "Building..."
echo "==========="
dcRun frentreprise yarn build
dcRun server yarn upgrade frentreprise
dcRun server yarn build
dcRun front yarn build

echo
echo "============"
echo "Packaging..."
echo "============"
cp -rv .c42/dist ./dist
cp -rv src/server/frentreprise/. .
cp -rv src/server/build/. ./dist
cp -rv src/client/build/. ./dist/htdocs
chmod 755 ./dist/*.sh

echo
echo "Done!"
echo
