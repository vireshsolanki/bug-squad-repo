# bug-squad-repo `rust-api`

Minimal Axum benchmark app for backend bug resolution.

## Run

```bash
cp .env.example .env
cargo run
```

## Real-flow benchmark ideas

1. `Reports API redirects to /login instead of returning JSON 401 for missing auth`
2. `Missing report id returns 500 instead of 404 JSON`

## Runtime config

- Credentials and auth token come from `.env`
- `DATABASE_URL` is present for infra-sensitive validation
