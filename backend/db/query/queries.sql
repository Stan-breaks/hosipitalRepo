-- Get all hospitals
-- name: ListHospitals :many
SELECT id, name, location, level, rating, phone, email, address, created_at, updated_at 
FROM hospitals;

-- Get a hospital by Name
-- name: GetHospitalByName :one
SELECT id, name, location, level, rating, phone, email, address, created_at, updated_at 
FROM hospitals 
WHERE name = ?;

-- Create a new hospital
-- name: CreateHospital :exec
INSERT INTO hospitals (name, location, level, rating, phone, email, address)
VALUES (?, ?, ?, ?, ?, ?, ?);

-- Update a hospital's details
-- name: UpdateHospital :exec
UPDATE hospitals 
SET name = ?, location = ?, level = ?, rating = ?, phone = ?, email = ?, address = ?, updated_at = CURRENT_TIMESTAMP 
WHERE id = ?;

-- Delete a hospital
-- name: DeleteHospital :exec
DELETE FROM hospitals 
WHERE id = ?;

-- Get all specialties
-- name: ListSpecialties :many
SELECT id, name, description, created_at 
FROM specialties;

-- Get a specialty by Name
-- name: GetSpecialtyByName :one
SELECT id, name, description, created_at 
FROM specialties 
WHERE name = ?;

-- Create a new specialty
-- name: CreateSpecialty :exec
INSERT INTO specialties (name, description)
VALUES (?, ?);

-- Update a specialty's details
-- name: UpdateSpecialty :exec
UPDATE specialties 
SET name = ?, description = ?, created_at = CURRENT_TIMESTAMP 
WHERE id = ?;

-- Delete a specialty
-- name: DeleteSpecialty :exec
DELETE FROM specialties 
WHERE id = ?;

-- Get all doctors
-- name: ListDoctors :many
SELECT id, name, hospital_id, specialty_id, license_number, phone, email, status, created_at, updated_at 
FROM doctors;

-- Get a doctor by Name
-- name: GetDoctorByName :one
SELECT id, name, hospital_id, specialty_id, license_number, phone, email, status, created_at, updated_at 
FROM doctors 
WHERE name = ?;

-- Create a new doctor
-- name: CreateDoctor :exec
INSERT INTO doctors (name, hospital_id, specialty_id, license_number, phone, password, email, status)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);

-- Update a doctor's details
-- name: UpdateDoctor :exec
UPDATE doctors 
SET name = ?, hospital_id = ?, specialty_id = ?, license_number = ?, phone = ?,password = ?, email = ?, status = ?, updated_at = CURRENT_TIMESTAMP 
WHERE id = ?;

-- Delete a doctor
-- name: DeleteDoctor :exec
DELETE FROM doctors 
WHERE id = ?;

-- Get all reviews for a hospital
-- name: ListHospitalReviews :many
SELECT id, hospital_id, user_id, rating, comment, created_at 
FROM reviews 
WHERE hospital_id = ?;

-- Create a new review
-- name: CreateReview :exec
INSERT INTO reviews (hospital_id, user_id, rating, comment)
VALUES (?, ?, ?, ?);

-- Get all users
-- name: ListUsers :many
SELECT id, fullname, email, phone, created_at, updated_at 
FROM users;

-- Get a user by Email
-- name: GetUserByEmail :one
SELECT id, fullname, email, phone, password, created_at, updated_at 
FROM users 
WHERE email = ?;

-- Create a new user
-- name: CreateUser :exec
INSERT INTO users (fullname, email, phone, password)
VALUES (?, ?, ?, ?);

-- Update a user's details
-- name: UpdateUser :exec
UPDATE users 
SET fullname = ?, email = ?, phone = ?, password = ?, updated_at = CURRENT_TIMESTAMP 
WHERE id = ?;

-- Delete a user
-- name: DeleteUser :exec
DELETE FROM users 
WHERE id = ?;

