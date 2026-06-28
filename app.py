from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, jsonify, redirect, request


load_dotenv()

APP_NAME = os.getenv("APP_NAME", "")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@example.com")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "password123")
AUTH_TOKEN = os.getenv("AUTH_TOKEN", "python-demo-token")
DATABASE_URL = os.getenv("DATABASE_URL", "")

USERS = {
    "usr_1": {"id": "usr_1", "email": ADMIN_EMAIL, "role": "admin"},
    "usr_2": {"id": "usr_2", "email": "ops@example.com", "role": "operator"},
}


def create_app() -> Flask:
    app = Flask(__name__)

    @app.get("/login")
    def login_page():
        return "<html><body>Login required</body></html>"

    @app.get("/healthz")
    def healthz():
        return jsonify(
            {
                "app": APP_NAME or "Bug Squad Python API",
                "database_configured": bool(DATABASE_URL),
                "data_dir_exists": Path("data").exists(),
            }
        )

    @app.post("/api/login")
    def login():
        payload = request.get_json(silent=True) or {}
        email = payload.get("email", "")
        password = payload.get("password", "")

        if email == ADMIN_EMAIL and password == ADMIN_PASSWORD:
            return jsonify({"token": AUTH_TOKEN, "user_id": "usr_1"})

        return jsonify({"error": "Invalid credentials"}), 401

    @app.get("/api/users/<user_id>")
    def user_detail(user_id: str):
        token = request.headers.get("X-Auth-Token", "")

        # Intentional bug: API callers should get JSON 401, not an HTML redirect.
        if token != AUTH_TOKEN:
            return redirect("/login")

        user = USERS.get(user_id)
        if user is None:
            return jsonify({"error": "User not found"}), 404

        return jsonify(user)

    return app


app = create_app()
