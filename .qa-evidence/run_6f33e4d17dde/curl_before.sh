#!/usr/bin/env bash
set -euo pipefail

# Set AUTH_TOKEN in your shell before running this script.
AUTH_TOKEN="${AUTH_TOKEN:-}"

curl -i -sS -X GET http://localhost:3000/api/products/prod_1
curl -i -sS -X GET -H "X-Auth-Token: $AUTH_TOKEN" http://localhost:3000/api/products/prod_1
