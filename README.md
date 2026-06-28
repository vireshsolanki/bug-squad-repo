# bug-squad-repo `php-api`

Minimal PHP benchmark app for backend bug resolution.

## Run

```bash
cp .env.example .env
php -S 127.0.0.1:8003 -t public
```

## Real-flow benchmark ideas

1. `Profile API redirects to /login instead of returning JSON 401`
2. `Missing profile id returns 500 instead of 404 JSON`

## Runtime config

- Demo credentials come from `.env`
- `DATABASE_URL` is present for env-sensitive runs
