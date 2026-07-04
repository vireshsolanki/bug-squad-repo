use std::{collections::HashMap, env, net::SocketAddr};

use axum::{
    extract::{Path, State},
    http::{HeaderMap, StatusCode},
    response::{Html, IntoResponse, Redirect},
    routing::{get, post},
    Json, Router,
};
use dotenvy::dotenv;
use serde::{Deserialize, Serialize};

#[derive(Clone)]
struct AppState {
    auth_token: String,
    admin_email: String,
    admin_password: String,
    app_name: String,
    database_url: String,
    reports: HashMap<String, Report>,
}

#[derive(Clone, Serialize)]
struct Report {
    id: String,
    status: String,
}

#[derive(Deserialize)]
struct LoginRequest {
    email: String,
    password: String,
}

#[tokio::main]
async fn main() {
    dotenv().ok();

    let mut reports = HashMap::new();
    reports.insert(
        "rpt_1".to_string(),
        Report {
            id: "rpt_1".to_string(),
            status: "ready".to_string(),
        },
    );

    let state = AppState {
        auth_token: env::var("AUTH_TOKEN").unwrap_or_else(|_| "rust-demo-token".to_string()),
        admin_email: env::var("ADMIN_EMAIL").unwrap_or_else(|_| "admin@example.com".to_string()),
        admin_password: env::var("ADMIN_PASSWORD").unwrap_or_else(|_| "password123".to_string()),
        app_name: env::var("APP_NAME").unwrap_or_else(|_| "Bug Squad Rust API".to_string()),
        database_url: env::var("DATABASE_URL").unwrap_or_default(),
        reports,
    };

    let app = Router::new()
        .route("/login", get(login_page))
        .route("/healthz", get(healthz))
        .route("/api/login", post(api_login))
        .route("/api/reports/:id", get(report_detail))
        .with_state(state);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3002));
    println!("rust-api listening on {addr}");
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn login_page() -> Html<&'static str> {
    Html("<html><body>Login required</body></html>")
}

async fn healthz(State(state): State<AppState>) -> Json<serde_json::Value> {
    Json(serde_json::json!({
        "app": state.app_name,
        "database_configured": !state.database_url.is_empty()
    }))
}

async fn api_login(State(state): State<AppState>, Json(payload): Json<LoginRequest>) -> impl IntoResponse {
    if payload.email == state.admin_email && payload.password == state.admin_password {
        return (
            StatusCode::OK,
            Json(serde_json::json!({
                "token": state.auth_token,
                "user_id": "usr_1"
            })),
        );
    }

    (
        StatusCode::UNAUTHORIZED,
        Json(serde_json::json!({"error": "Invalid credentials"})),
    )
}

async fn report_detail(
    State(state): State<AppState>,
    Path(id): Path<String>,
    headers: HeaderMap,
) -> impl IntoResponse {
    let token = headers
        .get("x-auth-token")
        .and_then(|value| value.to_str().ok())
        .unwrap_or("");

    // Intentional bug: backend API should return JSON 401 rather than redirecting HTML clients.
    if token != state.auth_token {
        return Redirect::temporary("/login").into_response();
    }

    let Some(report) = state.reports.get(&id) else {
        // Fix: Return 404 JSON for missing report
        return (
            StatusCode::NOT_FOUND,
            Json(serde_json::json!({"error": "Report not found"})),
        )
            .into_response();
    };

    (StatusCode::OK, Json(report)).into_response()
}