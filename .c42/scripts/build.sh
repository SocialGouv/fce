#!/bin/bash

function dcRun
{
  docker-compose run --rm $@
}

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd $DIR/../..

echo
echo "==============="
echo "COPY ENV FILE"
echo "==============="

cp -rv src/client/.env.$1 src/client/.env

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
mkdir -p ./dist

cp -rv .c42/dist/.docker.$1 ./dist
mv ./dist/.docker.$1 ./dist/.docker

cp -rv .c42/dist/docker-compose.yml.$1 ./dist/docker-compose.yml
mv ./dist/docker-compose.yml.$1 ./dist/docker-compose.yml

cp -rv .c42/dist/scripts/importSirene.sh ./dist/importSirene.sh
cp -rv .c42/dist/scripts/importCsv.sh ./dist/importCsv.sh

cp -rv .c42/dist/config ./dist/config
mv ./dist/config ./dist/.docker/config

cp -rv .c42/dist/monitoring.yml ./dist/monitoring.yml
mv ./dist/monitoring.yml ./dist/monitoring.yml

cp -rv src/frentreprise ./dist
cp -rv src/server/build/. ./dist
cp -rv src/server/migrations/. ./dist/migrations
cp -rv src/server/src/shell/. ./dist/shell
cp -rv src/client/build/. ./dist/htdocs
cp -rv src/server/src/shell/monthImport.sh ./dist
cp -rv src/server/scripts ./dist/scripts
cp -rv src/server/src/Exceptions ./dist/Exceptions
cp -rv src/server/src/db ./dist/db

sed -i 's/\.\.\/frentreprise/.\/frentreprise/g' ./dist/package.json
chmod 755 ./dist/*.sh

echo
echo "Done!"
echo
