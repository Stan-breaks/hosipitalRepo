package main

import (
	"database/sql"
	"fmt"
	"hopitalDir/internal/db"
	"hopitalDir/routes"
	"io"
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
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/?charset=utf8mb4,utf8", dbUser, dbPassword, dbHost, dbPort)

	// Open database connection
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}
	defer db.Close()

	// Create the database
	_, err = db.Exec("CREATE DATABASE IF NOT EXISTS " + dbName)
	if err != nil {
		return nil, err
	}

	// Initialize the database with the schema
	_, err = db.Exec("USE " + dbName)
	if err != nil {
		return nil, err
	}

	schemaFile, err := os.Open("db/schema/schema.sql")
	if err != nil {
		return nil, err
	}
	defer schemaFile.Close()

	schema, err := io.ReadAll(schemaFile)
	if err != nil {
		return nil, err
	}

	_, err = db.Exec(string(schema))
	if err != nil {
		return nil, err
	}

	// Reconnect to the database with the new schema
	dsn = fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPassword, dbHost, dbPort, dbName)
	return sql.Open("mysql", dsn)
}
