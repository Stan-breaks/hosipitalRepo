// routes/handlers/user_handler.go
package handlers

import (
	"context"
	"database/sql"
	"encoding/json"
	"hopitalDir/internal/db"
	"log"
	"net/http"
)

// UserHandler contains the dependencies for user-related handlers
type UserHandler struct {
	Queries *db.Queries
}

// NewUserHandler creates a new UserHandler instance
func NewUserHandler(queries *db.Queries) *UserHandler {
	return &UserHandler{
		Queries: queries,
	}
}

// Login handles user authentication
func (h *UserHandler) Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var loginRequest struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&loginRequest); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// TODO: Implement actual login logic here
	// For now, we'll just return a success response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"token":   "your-auth-token",
		"message": "Login successful",
	})
}

// GetUser handles GET requests for user information
func (h *UserHandler) GetUser(w http.ResponseWriter, req *http.Request) {
	if req.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	email := req.URL.Query().Get("email")
	if email == "" {
		http.Error(w, "Email parameter is required", http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	user, err := h.Queries.GetUserByEmail(ctx, email)

	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "User not found", http.StatusNotFound)
			return
		}
		log.Printf("Database error: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"id":        user.ID,
		"fullName":  user.FullName,
		"email":     user.Email,
		"createdAt": user.CreatedAt,
	})
}
