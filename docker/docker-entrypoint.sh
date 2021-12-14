#!/usr/bin/env sh
set -e

if [ $# -gt 0 ]
then
    exec "$@"
else

    # Run build production
    npm run build || true

    # Execute nginx
    exec nginx
fi
