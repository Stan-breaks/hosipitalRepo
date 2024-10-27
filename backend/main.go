package main

import (
	"context"
	"database/sql"
	"fmt"
	"hopitalDir/internal/db"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPassword, dbHost, dbPort, dbName)
	dbConn, err := sql.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}
	defer dbConn.Close()

	queries := db.New(dbConn)
	ctx := context.Background()
	user, err := queries.GetUserByEmail(ctx, "jane.doe@example.com")
	if err != nil {
		panic(err)
	}

	fmt.Printf("User: %s\n", user.FullName)
}
