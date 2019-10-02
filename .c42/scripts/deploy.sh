#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd $DIR/../..

SSH_HOST=commit42@$(dig +short commit42.fr)
RELEASEN=$(date +%Y%m%d%H%M%S)

KEEP_RELEASES=2

echo "Creating folders"

ssh $SSH_HOST 'bash -s' <<'CMD'
 mkdir -p ~/deployment/fce/releases
CMD

echo "Creating release"
rsync -avzP dist/. $SSH_HOST:~/deployment/fce/releases/$RELEASEN

ssh $SSH_HOST KEEP_RELEASES=$KEEP_RELEASES RELEASEN=$RELEASEN 'bash -s' <<'CMD'
echo "Link server .env"
ln -nfs ~/deployment/fce/shared/.env ~/deployment/fce/releases/$RELEASEN/.env

echo "Launching npm install"
cd ~/deployment/fce/releases/$RELEASEN && npm install

echo "Launching migrations"
cd ~/deployment/fce/releases/$RELEASEN && node ./shell/run.js Migrations

echo "Linking release"
ln -nfs ~/deployment/fce/releases/$RELEASEN ~/deployment/fce/current;

echo "Killing old instance"
ps -ef | grep node | grep "fce" | grep -v grep | awk "{print \$2}" | xargs kill -9

echo "Cleaning old releases"
cd ~/deployment/fce/releases;

RELEASES=$(ls -d */ | sort -r);
COUNT=$(echo "$RELEASES" | wc -l);

if [ "$COUNT" -gt "$KEEP_RELEASES" ]; then
    echo "$RELEASES" | tail -n -$(($COUNT-2)) | xargs rm -rvf;
fi
CMD

echo
echo "Done!"
echo
