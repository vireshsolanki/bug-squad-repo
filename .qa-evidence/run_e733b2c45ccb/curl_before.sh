#!/usr/bin/env bash
set -euo pipefail

# Set AUTH_TOKEN in your shell before running this script.
AUTH_TOKEN="${AUTH_TOKEN:-}"

curl -i -sS -X GET -H "X-Auth-Token: $AUTH_TOKEN" http://localhost:33527/api/users
curl -i -sS -X GET -H "X-Auth-Token: $AUTH_TOKEN" http://localhost:33527/api/users
