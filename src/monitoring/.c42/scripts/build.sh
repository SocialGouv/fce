#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd $DIR/../..

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
echo "============"
echo "Packaging..."
echo "============"
mkdir -p ./dist


cp -rv ./grafana ./dist/grafana
cp -rv ./prometheus.yml ./dist/prometheus.yml
cp -rv ./docker-compose.yml ./dist/docker-compose.yml

echo
echo "Done!"
echo
