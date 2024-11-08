package handlers

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"hopitalDir/internal/db"
	"log"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type UserHandler struct {
	Queries   *db.Queries
	jwtSecret []byte
	tokenExp  time.Duration
}

func NewUserHandler(queries *db.Queries, jwtSecret []byte) *UserHandler {
	return &UserHandler{
		Queries:   queries,
		jwtSecret: jwtSecret,
		tokenExp:  24 * time.Hour, // Token expires in 24 hours
	}
}

type loginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
}

type registerRequest struct {
	Fullname string `json:"fullname" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Phone    string `json:"phone" validate:"required"`
	Password string `json:"password" validate:"required,min=8"`
}

type doctorRegisterRequest struct {
	Name          string         `json:"name" validate:"required"`
	HospitalID    sql.NullInt32  `json:"hospital_id" validate:"required"`
	SpecialtyID   sql.NullInt32  `json:"specialty_id" validate:"required"`
	LicenseNumber string         `json:"license_number" validate:"required"`
	Phone         sql.NullString `json:"phone" validate:"required"`
	Password      sql.NullString `json:"password" validate:"required,min=8"`
	Email         sql.NullString `json:"email" validate:"required,email"`
	Status        string         `json:"status" validate:"required"`
}

func (h *UserHandler) Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	user, err := h.Queries.GetUserByEmail(ctx, req.Email)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}
		log.Printf("Database error: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Compare hashed password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Generate JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"exp":     time.Now().Add(h.tokenExp).Unix(),
	})

	tokenString, err := token.SignedString(h.jwtSecret)
	if err != nil {
		log.Printf("Token signing error: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"token":   tokenString,
		"message": "Login successful",
	})
}

func (h *UserHandler) RegisterUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req registerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Hash password before storing
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Password hashing error: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	req.Password = string(hashedPassword)

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	// Check if email already exists
	_, err = h.Queries.GetUserByEmail(ctx, req.Email)
	if err == nil {
		http.Error(w, "Email already registered", http.StatusConflict)
		return
	} else if !errors.Is(err, sql.ErrNoRows) {
		log.Printf("Database error: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	if err := h.Queries.CreateUser(ctx, req); err != nil {
		log.Printf("User creation error: %v", err)
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	// Generate JWT token for the new user
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": req.Email,
		"exp":   time.Now().Add(h.tokenExp).Unix(),
	})

	tokenString, err := token.SignedString(h.jwtSecret)
	if err != nil {
		log.Printf("Token signing error: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"token":   tokenString,
		"message": "Registration successful",
	})
}

func (h *UserHandler) RegisterDoctor(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req doctorRegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Hash password before storing
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password.String), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Password hashing error: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	req.Password = sql.NullString{
		String: string(hashedPassword),
		Valid:  true,
	}

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	// Check if email already exists
	if req.Email.Valid {
		_, err = h.Queries.GetDoctorByEmail(ctx, req.Email.String)
		if err == nil {
			http.Error(w, "Email already registered", http.StatusConflict)
			return
		} else if !errors.Is(err, sql.ErrNoRows) {
			log.Printf("Database error: %v", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}
	}

	if err := h.Queries.CreateDoctor(ctx, req); err != nil {
		log.Printf("Doctor creation error: %v", err)
		http.Error(w, "Failed to create doctor", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Doctor registration successful",
	})
}
