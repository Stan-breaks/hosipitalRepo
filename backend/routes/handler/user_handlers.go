// routes/handlers/user_handler.go
package handlers

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
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
	fmt.Println("/auth/login")
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
	ctx := context.Background()
	user, err := h.Queries.GetUserByEmail(ctx, loginRequest.Email)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Invalid email", http.StatusUnauthorized)
			return
		}
		log.Printf("Database error: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	if user.Password != loginRequest.Password {
		http.Error(w, "Invalid password", http.StatusUnauthorized)
		return
	}
	// For now, we'll just return a success response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"token":   "your-auth-token",
		"message": "Login successful",
	})
}

// Register
func (h *UserHandler) RegisterUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		fmt.Println("/auth/register " + string(http.StatusMethodNotAllowed))
		return
	}
	var registerRequest struct {
		Fullname string `json:"fullname"`
		Email    string `json:"email"`
		Phone    string `json:"phone"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&registerRequest); err != nil {
		http.Error(w, "Invalid requests body", http.StatusBadRequest)
		fmt.Println("/auth/register " + string(http.StatusBadRequest))
		return
	}
	ctx := context.Background()
	err := h.Queries.CreateUser(ctx, registerRequest)
	if err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		fmt.Println(err.Error())
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"token":   "your-auth-token",
		"message": "Registration successful",
	})
	fmt.Println("/auth/register " + string(http.StatusOK))

}

func (h *UserHandler) RegisterDoctor(w http.ResponseWriter, r *http.Request) {
	fmt.Println("auth/registerDoctor")
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var registerRequest struct {
		Name          string         `json:"name"`
		HospitalID    sql.NullInt32  `json:"hospital_id"`
		SpecialtyID   sql.NullInt32  `json:"specialty_id"`
		LicenseNumber string         `json:"license_number"`
		Phone         sql.NullString `json:"phone"`
		Password      sql.NullString `json:"password"`
		Email         sql.NullString `json:"email"`
		Status        string         `json:"status"`
	}
	if err := json.NewDecoder(r.Body).Decode(&registerRequest); err != nil {
		http.Error(w, "Invalid requests body", http.StatusBadRequest)
		return
	}
	ctx := context.Background()
	err := h.Queries.CreateDoctor(ctx, registerRequest)
	if err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"token":   "your-auth-token",
		"message": "Registration successful",
	})
}
