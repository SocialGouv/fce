#!/bin/bash
echo "Install n8n modules locally"

ln -s `pwd` $HOME/.n8n

sudo npm install -g n8n-node-dev

sudo npm install -g oauth-1.0a