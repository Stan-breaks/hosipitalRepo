// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: queries.sql

package db

import (
	"context"
	"database/sql"
)

const createDoctor = `-- name: CreateDoctor :exec
INSERT INTO doctors (name, hospital_id, license_number, phone, email, status, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, 'active', NOW(), NOW())
`

type CreateDoctorParams struct {
	Name          string         `json:"name"`
	HospitalID    sql.NullInt32  `json:"hospital_id"`
	LicenseNumber string         `json:"license_number"`
	Phone         sql.NullString `json:"phone"`
	Email         sql.NullString `json:"email"`
}

// Insert a new doctor
func (q *Queries) CreateDoctor(ctx context.Context, arg CreateDoctorParams) error {
	_, err := q.exec(ctx, q.createDoctorStmt, createDoctor,
		arg.Name,
		arg.HospitalID,
		arg.LicenseNumber,
		arg.Phone,
		arg.Email,
	)
	return err
}

const createHospital = `-- name: CreateHospital :exec
INSERT INTO hospitals (name, location, level, rating, phone, email, address, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
`

type CreateHospitalParams struct {
	Name     string         `json:"name"`
	Location string         `json:"location"`
	Level    string         `json:"level"`
	Rating   sql.NullString `json:"rating"`
	Phone    sql.NullString `json:"phone"`
	Email    sql.NullString `json:"email"`
	Address  sql.NullString `json:"address"`
}

// Insert a new hospital
func (q *Queries) CreateHospital(ctx context.Context, arg CreateHospitalParams) error {
	_, err := q.exec(ctx, q.createHospitalStmt, createHospital,
		arg.Name,
		arg.Location,
		arg.Level,
		arg.Rating,
		arg.Phone,
		arg.Email,
		arg.Address,
	)
	return err
}

const createReview = `-- name: CreateReview :exec
INSERT INTO reviews (hospital_id, user_id, rating, comment, created_at)
VALUES (?, ?, ?, ?, NOW())
`

type CreateReviewParams struct {
	HospitalID sql.NullInt32  `json:"hospital_id"`
	UserID     int32          `json:"user_id"`
	Rating     int32          `json:"rating"`
	Comment    sql.NullString `json:"comment"`
}

// Insert a new review
func (q *Queries) CreateReview(ctx context.Context, arg CreateReviewParams) error {
	_, err := q.exec(ctx, q.createReviewStmt, createReview,
		arg.HospitalID,
		arg.UserID,
		arg.Rating,
		arg.Comment,
	)
	return err
}

const createService = `-- name: CreateService :exec
INSERT INTO services (name, description, price, hospital_id)
VALUES (?, ?, ?, ?)
`

type CreateServiceParams struct {
	Name        string         `json:"name"`
	Description sql.NullString `json:"description"`
	Price       sql.NullString `json:"price"`
	HospitalID  sql.NullInt32  `json:"hospital_id"`
}

// Insert a new service
func (q *Queries) CreateService(ctx context.Context, arg CreateServiceParams) error {
	_, err := q.exec(ctx, q.createServiceStmt, createService,
		arg.Name,
		arg.Description,
		arg.Price,
		arg.HospitalID,
	)
	return err
}

const createUser = `-- name: CreateUser :exec
INSERT INTO users (email, full_name, phone_number, role, created_at, updated_at)
VALUES (?, ?, ?, ?, NOW(), NOW())
`

type CreateUserParams struct {
	Email       string         `json:"email"`
	FullName    string         `json:"full_name"`
	PhoneNumber sql.NullString `json:"phone_number"`
	Role        UsersRole      `json:"role"`
}

// Insert a new user
func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) error {
	_, err := q.exec(ctx, q.createUserStmt, createUser,
		arg.Email,
		arg.FullName,
		arg.PhoneNumber,
		arg.Role,
	)
	return err
}

const getAllHospitals = `-- name: GetAllHospitals :many
SELECT id, name, location, level, rating, phone, email, address, created_at, updated_at FROM hospitals
`

// Select all hospitals
func (q *Queries) GetAllHospitals(ctx context.Context) ([]Hospital, error) {
	rows, err := q.query(ctx, q.getAllHospitalsStmt, getAllHospitals)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Hospital
	for rows.Next() {
		var i Hospital
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Location,
			&i.Level,
			&i.Rating,
			&i.Phone,
			&i.Email,
			&i.Address,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getAllUsers = `-- name: GetAllUsers :many
SELECT id, email, full_name, phone_number, role, created_at, updated_at FROM users
`

// Select all users
func (q *Queries) GetAllUsers(ctx context.Context) ([]User, error) {
	rows, err := q.query(ctx, q.getAllUsersStmt, getAllUsers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.ID,
			&i.Email,
			&i.FullName,
			&i.PhoneNumber,
			&i.Role,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getDoctorsByHospital = `-- name: GetDoctorsByHospital :many
SELECT id, name, hospital_id, license_number, phone, email, status, created_at, updated_at FROM doctors WHERE hospital_id = ?
`

// Select all doctors in a specific hospital
func (q *Queries) GetDoctorsByHospital(ctx context.Context, hospitalID sql.NullInt32) ([]Doctor, error) {
	rows, err := q.query(ctx, q.getDoctorsByHospitalStmt, getDoctorsByHospital, hospitalID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Doctor
	for rows.Next() {
		var i Doctor
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.HospitalID,
			&i.LicenseNumber,
			&i.Phone,
			&i.Email,
			&i.Status,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getReviewsByHospital = `-- name: GetReviewsByHospital :many
SELECT id, hospital_id, user_id, rating, comment, created_at FROM reviews WHERE hospital_id = ?
`

// Select all reviews for a specific hospital
func (q *Queries) GetReviewsByHospital(ctx context.Context, hospitalID sql.NullInt32) ([]Review, error) {
	rows, err := q.query(ctx, q.getReviewsByHospitalStmt, getReviewsByHospital, hospitalID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Review
	for rows.Next() {
		var i Review
		if err := rows.Scan(
			&i.ID,
			&i.HospitalID,
			&i.UserID,
			&i.Rating,
			&i.Comment,
			&i.CreatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getServicesByHospital = `-- name: GetServicesByHospital :many
SELECT id, name, description, price, hospital_id FROM services WHERE hospital_id = ?
`

// Select services offered by a specific hospital
func (q *Queries) GetServicesByHospital(ctx context.Context, hospitalID sql.NullInt32) ([]Service, error) {
	rows, err := q.query(ctx, q.getServicesByHospitalStmt, getServicesByHospital, hospitalID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Service
	for rows.Next() {
		var i Service
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Description,
			&i.Price,
			&i.HospitalID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getUserByEmail = `-- name: GetUserByEmail :one
SELECT id, email, full_name, phone_number, role, created_at, updated_at FROM users WHERE email = ?
`

// Select a particular user by email
func (q *Queries) GetUserByEmail(ctx context.Context, email string) (User, error) {
	row := q.queryRow(ctx, q.getUserByEmailStmt, getUserByEmail, email)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.FullName,
		&i.PhoneNumber,
		&i.Role,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}