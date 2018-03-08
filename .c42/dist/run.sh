#!/bin/sh

docker build -t direccte . && docker run -p :80 --restart=always direccte
