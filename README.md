# bug-squad-repo `go-api`

Minimal Go HTTP benchmark app for backend bug resolution.

## Run

```bash
cp .env.example .env
go run .
```

## Real-flow benchmark ideas

1. `Orders API returns 500 instead of 404 for a missing order id`
2. `Unauthenticated metrics API redirects instead of returning JSON 401`

## Runtime config

- Login credentials are environment-driven
- `DATABASE_URL` is present to simulate infra-backed services
