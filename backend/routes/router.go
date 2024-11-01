// routes/router.go
package routes

import (
	"hopitalDir/internal/db"
	handlers "hopitalDir/routes/handler"
	"hopitalDir/routes/middleware"
	"net/http"
	"os"
)

// Router holds all the dependencies needed for our routes
type Router struct {
	queries *db.Queries    // Database queries
	mux     *http.ServeMux // HTTP request multiplexer
}

// NewRouter creates and initializes a new Router
func NewRouter(queries *db.Queries) *Router {
	r := &Router{
		queries: queries,
		mux:     http.NewServeMux(),
	}
	// Set up all routes
	r.setupRoutes()
	return r
}

// setupRoutes registers all route handlers
func (r *Router) setupRoutes() {
	// Create handlers
	userHandler := handlers.NewUserHandler(r.queries)

	// Register routes with both CORS and auth middleware
	r.mux.HandleFunc("/user", middleware.CorsMiddleware(r.authMiddleware(userHandler.GetUser)))

	// Add login route with only CORS middleware (no auth required)
	r.mux.HandleFunc("/auth/login", middleware.CorsMiddleware(userHandler.Login))
}

// Handler returns the http.Handler for use by the server
func (r *Router) Handler() http.Handler {
	return r.mux
}

// authMiddleware is a simple authentication middleware
func (r *Router) authMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		// Get the API token from the Authorization header
		token := req.Header.Get("Authorization")

		// Check if token exists and is valid
		expectedToken := os.Getenv("API_TOKEN")
		if token != "Bearer "+expectedToken {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// If authentication is successful, call the next handler
		next(w, req)
	}
}
