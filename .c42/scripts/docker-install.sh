#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd $DIR/../..


echo "Installation of docker-compose.yml"
echo "----------------------------------"

if [ -e ".c42/docker-compose.yml" ] && [ -e "docker-compose.yml" ]
then
    echo
    echo "docker-compose.yml is already present"
    echo
else
    echo
    echo "copying docker-compose.yml"
    echo
    cp .c42/docker-compose.yml.dist .c42/docker-compose.yml
    ln -s .c42/docker-compose.yml docker-compose.yml
    answer=""
    until [ "$answer" = "y" ] || [ "$answer" = "n" ]
    do
        read -p "Do you want to edit docker-compose.yml? [y/N]" answer
        answer=${answer,,}
    done
    if [ "$answer" = "y" ]
    then
        "${EDITOR:-vim}" docker-compose.yml
        break
    fi
fi

docker-compose build

echo
echo "Done!"
echo