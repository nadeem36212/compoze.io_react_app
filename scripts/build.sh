#!/usr/bin/env bash

set -eo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/.."
ENVIRONMENTS_DIR="${PROJECT_DIR}/environments"

ENVIRONMENT=$1

ENV_FILE=./environments/$ENVIRONMENT.env

if [ -f "$ENV_FILE" ]; then
    echo "Building for $ENVIRONMENT"
    env-cmd -f "${ENV_FILE}" npm run-script build
else
    echo "$ENVIRONMENT is invalid, no configuration found in environments directory"
    echo "$ENV_FILE does not exist."
fi


