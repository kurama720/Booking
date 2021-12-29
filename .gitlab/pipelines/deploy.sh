#!/bin/bash

set -o pipefail  # trace ERR through pipes
set -o errtrace  # trace ERR through 'time command' and other functions
set -o nounset   ## set -u : exit the script if you try to use an uninitialised variable
set -o errexit   ## set -e : exit the script if any statement returns a non-true return value

REMOTE=$REMOTE_USER@$REMOTE_HOST


apt-get update -y && apt-get install -y rsync
rsync -atv --delete --progress ./ $REMOTE:$REMOTE_TARGET

ssh -t ${REMOTE} "cd ${REMOTE_TARGET} && echo -e '$ENV' > .env && COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.production.yml up -d --build"
