package main

import (
	"database/sql"
	"fmt"
	"hopitalDir/internal/db"
	"hopitalDir/routes"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func main() {
	// 1. Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	// 2. Set up database connection
	dbConn, err := setupDatabase()
	if err != nil {
		log.Fatalf("Failed to setup database: %v", err)
	}
	defer dbConn.Close()

	// 3. Initialize database queries
	queries := db.New(dbConn)

	// 4. Set up the router with our database queries
	router := routes.NewRouter(queries)

	// 5. Start the server
	port := ":8080"
	log.Printf("Server starting on http://localhost%s", port)
	if err := http.ListenAndServe(port, router.Handler()); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}

func setupDatabase() (*sql.DB, error) {
	// Get database configuration from environment variables
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	// Create database connection string
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s",
		dbUser, dbPassword, dbHost, dbPort, dbName)

	// Open database connection
	return sql.Open("mysql", dsn)
}
