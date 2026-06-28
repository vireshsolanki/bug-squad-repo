# bug-squad-repo `python-flask`

Minimal Flask benchmark app for backend and env-sensitive bug resolution.

## Run

```bash
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
flask --app app run --port 5001
```

## Real-flow benchmark ideas

1. `Unauthenticated API users endpoint redirects to /login instead of returning JSON 401`
2. `User detail endpoint returns 500 instead of 404 when user id is missing`

## Runtime config

- Login credentials come from `.env`
- API token comes from `.env`
- `DATABASE_URL` is expected from `.env` for production-like runs
