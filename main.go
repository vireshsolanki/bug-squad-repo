package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
)

type order struct {
	ID     string  `json:"id"`
	Status string  `json:"status"`
	Total  float64 `json:"total"`
}

var orders = map[string]order{
	"ord_1": {ID: "ord_1", Status: "paid", Total: 125.50},
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("<html><body>Login required</body></html>"))
	})
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]any{
			"app":                 fallback(os.Getenv("APP_NAME"), "Bug Squad Go API"),
			"database_configured": os.Getenv("DATABASE_URL") != "",
		})
	})
	mux.HandleFunc("/api/login", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			writeJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "Method not allowed"})
			return
		}
		var payload map[string]string
		_ = json.NewDecoder(r.Body).Decode(&payload)
		if payload["email"] == fallback(os.Getenv("ADMIN_EMAIL"), "admin@example.com") &&
			payload["password"] == fallback(os.Getenv("ADMIN_PASSWORD"), "password123") {
			writeJSON(w, http.StatusOK, map[string]string{
				"token":   fallback(os.Getenv("AUTH_TOKEN"), "go-demo-token"),
				"user_id": "usr_1",
			})
			return
		}
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "Invalid credentials"})
	})
	mux.HandleFunc("/api/orders/", func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("X-Auth-Token") != fallback(os.Getenv("AUTH_TOKEN"), "go-demo-token") {
			// Intentional bug: API callers should receive JSON 401 instead of HTML redirect.
			http.Redirect(w, r, "/login", http.StatusFound)
			return
		}

		id := strings.TrimPrefix(r.URL.Path, "/api/orders/")
		item, ok := orders[id]
		if !ok {
			// Intentional bug: missing orders should be 404, not 500.
			writeJSON(w, http.StatusNotFound, map[string]string{"error": "Order not found"})
			return
		}
		writeJSON(w, http.StatusOK, item)
	})

	log.Println("go-api listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func fallback(value string, defaultValue string) string {
	if value == "" {
		return defaultValue
	}
	return value
}