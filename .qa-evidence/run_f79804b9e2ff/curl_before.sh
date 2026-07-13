#!/usr/bin/env bash
set -euo pipefail

# Set COOKIE_HEADER to a full Cookie header value, for example:
# COOKIE_HEADER="auth-token=...; user-id=..."
COOKIE_HEADER="${COOKIE_HEADER:-}"

curl -i -sS -X GET http://localhost:3000/api/products
curl -i -sS -X GET -H "Cookie: $COOKIE_HEADER" http://localhost:3000/api/products
curl -i -sS -X GET -H "Cookie: $COOKIE_HEADER" http://localhost:3000/api/products
