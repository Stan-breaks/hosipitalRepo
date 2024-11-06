// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: queries.sql

package db

import (
	"context"
	"database/sql"
	"time"
)

const createDoctor = `-- name: CreateDoctor :exec
INSERT INTO doctors (name, hospital_id, specialty_id, license_number, phone, password, email, status)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`

type CreateDoctorParams struct {
	Name          string         `json:"name"`
	HospitalID    sql.NullInt32  `json:"hospital_id"`
	SpecialtyID   sql.NullInt32  `json:"specialty_id"`
	LicenseNumber string         `json:"license_number"`
	Phone         sql.NullString `json:"phone"`
	Password      sql.NullString `json:"password"`
	Email         sql.NullString `json:"email"`
	Status        string         `json:"status"`
}

// Create a new doctor
func (q *Queries) CreateDoctor(ctx context.Context, arg CreateDoctorParams) error {
	_, err := q.exec(ctx, q.createDoctorStmt, createDoctor,
		arg.Name,
		arg.HospitalID,
		arg.SpecialtyID,
		arg.LicenseNumber,
		arg.Phone,
		arg.Password,
		arg.Email,
		arg.Status,
	)
	return err
}

const createHospital = `-- name: CreateHospital :exec
INSERT INTO hospitals (name, location, level, rating, phone, email, address)
VALUES (?, ?, ?, ?, ?, ?, ?)
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

// Create a new hospital
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
INSERT INTO reviews (hospital_id, user_id, rating, comment)
VALUES (?, ?, ?, ?)
`

type CreateReviewParams struct {
	HospitalID sql.NullInt32  `json:"hospital_id"`
	UserID     int32          `json:"user_id"`
	Rating     int32          `json:"rating"`
	Comment    sql.NullString `json:"comment"`
}

// Create a new review
func (q *Queries) CreateReview(ctx context.Context, arg CreateReviewParams) error {
	_, err := q.exec(ctx, q.createReviewStmt, createReview,
		arg.HospitalID,
		arg.UserID,
		arg.Rating,
		arg.Comment,
	)
	return err
}

const createSpecialty = `-- name: CreateSpecialty :exec
INSERT INTO specialties (name, description)
VALUES (?, ?)
`

type CreateSpecialtyParams struct {
	Name        string         `json:"name"`
	Description sql.NullString `json:"description"`
}

// Create a new specialty
func (q *Queries) CreateSpecialty(ctx context.Context, arg CreateSpecialtyParams) error {
	_, err := q.exec(ctx, q.createSpecialtyStmt, createSpecialty, arg.Name, arg.Description)
	return err
}

const createUser = `-- name: CreateUser :exec
INSERT INTO users (fullname, email, phone, password)
VALUES (?, ?, ?, ?)
`

type CreateUserParams struct {
	Fullname string         `json:"fullname"`
	Email    sql.NullString `json:"email"`
	Phone    sql.NullString `json:"phone"`
	Password sql.NullString `json:"password"`
}

// Create a new user
func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) error {
	_, err := q.exec(ctx, q.createUserStmt, createUser,
		arg.Fullname,
		arg.Email,
		arg.Phone,
		arg.Password,
	)
	return err
}

const deleteDoctor = `-- name: DeleteDoctor :exec
DELETE FROM doctors 
WHERE id = ?
`

// Delete a doctor
func (q *Queries) DeleteDoctor(ctx context.Context, id int32) error {
	_, err := q.exec(ctx, q.deleteDoctorStmt, deleteDoctor, id)
	return err
}

const deleteHospital = `-- name: DeleteHospital :exec
DELETE FROM hospitals 
WHERE id = ?
`

// Delete a hospital
func (q *Queries) DeleteHospital(ctx context.Context, id int32) error {
	_, err := q.exec(ctx, q.deleteHospitalStmt, deleteHospital, id)
	return err
}

const deleteSpecialty = `-- name: DeleteSpecialty :exec
DELETE FROM specialties 
WHERE id = ?
`

// Delete a specialty
func (q *Queries) DeleteSpecialty(ctx context.Context, id int32) error {
	_, err := q.exec(ctx, q.deleteSpecialtyStmt, deleteSpecialty, id)
	return err
}

const deleteUser = `-- name: DeleteUser :exec
DELETE FROM users 
WHERE id = ?
`

// Delete a user
func (q *Queries) DeleteUser(ctx context.Context, id int32) error {
	_, err := q.exec(ctx, q.deleteUserStmt, deleteUser, id)
	return err
}

const getDoctorByName = `-- name: GetDoctorByName :one
SELECT id, name, hospital_id, specialty_id, license_number, phone, email, status, created_at, updated_at 
FROM doctors 
WHERE name = ?
`

type GetDoctorByNameRow struct {
	ID            int32          `json:"id"`
	Name          string         `json:"name"`
	HospitalID    sql.NullInt32  `json:"hospital_id"`
	SpecialtyID   sql.NullInt32  `json:"specialty_id"`
	LicenseNumber string         `json:"license_number"`
	Phone         sql.NullString `json:"phone"`
	Email         sql.NullString `json:"email"`
	Status        string         `json:"status"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
}

// Get a doctor by Name
func (q *Queries) GetDoctorByName(ctx context.Context, name string) (GetDoctorByNameRow, error) {
	row := q.queryRow(ctx, q.getDoctorByNameStmt, getDoctorByName, name)
	var i GetDoctorByNameRow
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.HospitalID,
		&i.SpecialtyID,
		&i.LicenseNumber,
		&i.Phone,
		&i.Email,
		&i.Status,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getHospitalByName = `-- name: GetHospitalByName :one
SELECT id, name, location, level, rating, phone, email, address, created_at, updated_at 
FROM hospitals 
WHERE name = ?
`

// Get a hospital by Name
func (q *Queries) GetHospitalByName(ctx context.Context, name string) (Hospital, error) {
	row := q.queryRow(ctx, q.getHospitalByNameStmt, getHospitalByName, name)
	var i Hospital
	err := row.Scan(
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
	)
	return i, err
}

const getSpecialtyByName = `-- name: GetSpecialtyByName :one
SELECT id, name, description, created_at 
FROM specialties 
WHERE name = ?
`

// Get a specialty by Name
func (q *Queries) GetSpecialtyByName(ctx context.Context, name string) (Specialty, error) {
	row := q.queryRow(ctx, q.getSpecialtyByNameStmt, getSpecialtyByName, name)
	var i Specialty
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Description,
		&i.CreatedAt,
	)
	return i, err
}

const getUserByEmail = `-- name: GetUserByEmail :one
SELECT id, fullname, email, phone, created_at, updated_at 
FROM users 
WHERE email = ?
`

type GetUserByEmailRow struct {
	ID        int32          `json:"id"`
	Fullname  string         `json:"fullname"`
	Email     sql.NullString `json:"email"`
	Phone     sql.NullString `json:"phone"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
}

// Get a user by Email
func (q *Queries) GetUserByEmail(ctx context.Context, email sql.NullString) (GetUserByEmailRow, error) {
	row := q.queryRow(ctx, q.getUserByEmailStmt, getUserByEmail, email)
	var i GetUserByEmailRow
	err := row.Scan(
		&i.ID,
		&i.Fullname,
		&i.Email,
		&i.Phone,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const listDoctors = `-- name: ListDoctors :many
SELECT id, name, hospital_id, specialty_id, license_number, phone, email, status, created_at, updated_at 
FROM doctors
`

type ListDoctorsRow struct {
	ID            int32          `json:"id"`
	Name          string         `json:"name"`
	HospitalID    sql.NullInt32  `json:"hospital_id"`
	SpecialtyID   sql.NullInt32  `json:"specialty_id"`
	LicenseNumber string         `json:"license_number"`
	Phone         sql.NullString `json:"phone"`
	Email         sql.NullString `json:"email"`
	Status        string         `json:"status"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
}

// Get all doctors
func (q *Queries) ListDoctors(ctx context.Context) ([]ListDoctorsRow, error) {
	rows, err := q.query(ctx, q.listDoctorsStmt, listDoctors)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ListDoctorsRow
	for rows.Next() {
		var i ListDoctorsRow
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.HospitalID,
			&i.SpecialtyID,
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

const listHospitalReviews = `-- name: ListHospitalReviews :many
SELECT id, hospital_id, user_id, rating, comment, created_at 
FROM reviews 
WHERE hospital_id = ?
`

// Get all reviews for a hospital
func (q *Queries) ListHospitalReviews(ctx context.Context, hospitalID sql.NullInt32) ([]Review, error) {
	rows, err := q.query(ctx, q.listHospitalReviewsStmt, listHospitalReviews, hospitalID)
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

const listHospitals = `-- name: ListHospitals :many
SELECT id, name, location, level, rating, phone, email, address, created_at, updated_at 
FROM hospitals
`

// Get all hospitals
func (q *Queries) ListHospitals(ctx context.Context) ([]Hospital, error) {
	rows, err := q.query(ctx, q.listHospitalsStmt, listHospitals)
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

const listSpecialties = `-- name: ListSpecialties :many
SELECT id, name, description, created_at 
FROM specialties
`

// Get all specialties
func (q *Queries) ListSpecialties(ctx context.Context) ([]Specialty, error) {
	rows, err := q.query(ctx, q.listSpecialtiesStmt, listSpecialties)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Specialty
	for rows.Next() {
		var i Specialty
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Description,
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

const listUsers = `-- name: ListUsers :many
SELECT id, fullname, email, phone, created_at, updated_at 
FROM users
`

type ListUsersRow struct {
	ID        int32          `json:"id"`
	Fullname  string         `json:"fullname"`
	Email     sql.NullString `json:"email"`
	Phone     sql.NullString `json:"phone"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
}

// Get all users
func (q *Queries) ListUsers(ctx context.Context) ([]ListUsersRow, error) {
	rows, err := q.query(ctx, q.listUsersStmt, listUsers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ListUsersRow
	for rows.Next() {
		var i ListUsersRow
		if err := rows.Scan(
			&i.ID,
			&i.Fullname,
			&i.Email,
			&i.Phone,
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

const updateDoctor = `-- name: UpdateDoctor :exec
UPDATE doctors 
SET name = ?, hospital_id = ?, specialty_id = ?, license_number = ?, phone = ?,password = ?, email = ?, status = ?, updated_at = CURRENT_TIMESTAMP 
WHERE id = ?
`

type UpdateDoctorParams struct {
	Name          string         `json:"name"`
	HospitalID    sql.NullInt32  `json:"hospital_id"`
	SpecialtyID   sql.NullInt32  `json:"specialty_id"`
	LicenseNumber string         `json:"license_number"`
	Phone         sql.NullString `json:"phone"`
	Password      sql.NullString `json:"password"`
	Email         sql.NullString `json:"email"`
	Status        string         `json:"status"`
	ID            int32          `json:"id"`
}

// Update a doctor's details
func (q *Queries) UpdateDoctor(ctx context.Context, arg UpdateDoctorParams) error {
	_, err := q.exec(ctx, q.updateDoctorStmt, updateDoctor,
		arg.Name,
		arg.HospitalID,
		arg.SpecialtyID,
		arg.LicenseNumber,
		arg.Phone,
		arg.Password,
		arg.Email,
		arg.Status,
		arg.ID,
	)
	return err
}

const updateHospital = `-- name: UpdateHospital :exec
UPDATE hospitals 
SET name = ?, location = ?, level = ?, rating = ?, phone = ?, email = ?, address = ?, updated_at = CURRENT_TIMESTAMP 
WHERE id = ?
`

type UpdateHospitalParams struct {
	Name     string         `json:"name"`
	Location string         `json:"location"`
	Level    string         `json:"level"`
	Rating   sql.NullString `json:"rating"`
	Phone    sql.NullString `json:"phone"`
	Email    sql.NullString `json:"email"`
	Address  sql.NullString `json:"address"`
	ID       int32          `json:"id"`
}

// Update a hospital's details
func (q *Queries) UpdateHospital(ctx context.Context, arg UpdateHospitalParams) error {
	_, err := q.exec(ctx, q.updateHospitalStmt, updateHospital,
		arg.Name,
		arg.Location,
		arg.Level,
		arg.Rating,
		arg.Phone,
		arg.Email,
		arg.Address,
		arg.ID,
	)
	return err
}

const updateSpecialty = `-- name: UpdateSpecialty :exec
UPDATE specialties 
SET name = ?, description = ?, created_at = CURRENT_TIMESTAMP 
WHERE id = ?
`

type UpdateSpecialtyParams struct {
	Name        string         `json:"name"`
	Description sql.NullString `json:"description"`
	ID          int32          `json:"id"`
}

// Update a specialty's details
func (q *Queries) UpdateSpecialty(ctx context.Context, arg UpdateSpecialtyParams) error {
	_, err := q.exec(ctx, q.updateSpecialtyStmt, updateSpecialty, arg.Name, arg.Description, arg.ID)
	return err
}

const updateUser = `-- name: UpdateUser :exec
UPDATE users 
SET fullname = ?, email = ?, phone = ?, password = ?, updated_at = CURRENT_TIMESTAMP 
WHERE id = ?
`

type UpdateUserParams struct {
	Fullname string         `json:"fullname"`
	Email    sql.NullString `json:"email"`
	Phone    sql.NullString `json:"phone"`
	Password sql.NullString `json:"password"`
	ID       int32          `json:"id"`
}

// Update a user's details
func (q *Queries) UpdateUser(ctx context.Context, arg UpdateUserParams) error {
	_, err := q.exec(ctx, q.updateUserStmt, updateUser,
		arg.Fullname,
		arg.Email,
		arg.Phone,
		arg.Password,
		arg.ID,
	)
	return err
}
