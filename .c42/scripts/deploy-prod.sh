#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd $DIR/../..

SSH_HOST=fce@$(dig +short 164.131.131.239)
RELEASEN=$(date +%Y%m%d%H%M%S)

KEEP_RELEASES=3

echo "Creating folders"

ssh $SSH_HOST 'bash -s' <<'CMD'
 mkdir -p ~/production/releases
CMD

echo "Creating release"
rsync -avzP dist/. $SSH_HOST:~/production/releases/$RELEASEN

ssh $SSH_HOST KEEP_RELEASES=$KEEP_RELEASES RELEASEN=$RELEASEN 'bash -s' <<'CMD'
echo "Link server .env"
ln -nfs ~/production/shared/.env ~/production/releases/$RELEASEN/.env

echo "Launching npm install"
cd ~/production/releases/$RELEASEN && npm install

echo "Linking release"
ln -nfs ~/production/releases/$RELEASEN ~/production/current;

echo "Killing old instance"
ps -ef | grep node | grep "fce" | grep -v grep | awk "{print \$2}" | xargs kill -9

echo "Cleaning old releases"
cd ~/production/releases;

RELEASES=$(ls -d */ | sort -r);
COUNT=$(echo "$RELEASES" | wc -l);

if [ "$COUNT" -gt "$KEEP_RELEASES" ]; then
    echo "$RELEASES" | tail -n -$(($COUNT-2)) | xargs rm -rvf;
fi
CMD

echo
echo "Done!"
echo
