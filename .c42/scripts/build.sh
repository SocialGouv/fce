#!/bin/bash
# ROOT/scripts/build.sh

function run
{
  CMD="docker-compose run --rm"
  ARG="$1"
  eval ${CMD} ${ARG}
}

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd $DIR/../..

echo
echo "==============="
echo "BUILD A RELEASE"
echo "==============="

echo
echo "Current directory: `pwd`"

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
run "frentreprise yarn"
run "server yarn"
run "front yarn"

echo
echo "==========="
echo "Building..."
echo "==========="
run "frentreprise yarn build"
run "server yarn upgrade frentreprise"
run "server yarn build"
run "front yarn build"

echo
echo "============"
echo "Packaging..."
echo "============"
cp -r .c42/dist ./dist
cp -r server/build ./dist
cp -r client/build ./dist/htdocs
chmod 755 ./dist/run.sh
chmod 755 ./dist/install.sh

echo
echo "Done!"