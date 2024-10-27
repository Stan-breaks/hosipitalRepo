-- Select a particular user by email
-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = ?;

-- Select all users
-- name: GetAllUsers :many
SELECT * FROM users;

-- Select all hospitals
-- name: GetAllHospitals :many
SELECT * FROM hospitals;

-- Select all doctors in a specific hospital
-- name: GetDoctorsByHospital :many
SELECT * FROM doctors WHERE hospital_id = ?;

-- Select all reviews for a specific hospital
-- name: GetReviewsByHospital :many
SELECT * FROM reviews WHERE hospital_id = ?;

-- Select services offered by a specific hospital
-- name: GetServicesByHospital :many
SELECT * FROM services WHERE hospital_id = ?;

-- Insert a new user
-- name: CreateUser :exec
INSERT INTO users (email, full_name, phone_number, role, created_at, updated_at)
VALUES (?, ?, ?, ?, NOW(), NOW());

-- Insert a new hospital
-- name: CreateHospital :exec
INSERT INTO hospitals (name, location, level, rating, phone, email, address, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW());

-- Insert a new doctor
-- name: CreateDoctor :exec
INSERT INTO doctors (name, hospital_id, license_number, phone, email, status, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, 'active', NOW(), NOW());

-- Insert a new review
-- name: CreateReview :exec
INSERT INTO reviews (hospital_id, user_id, rating, comment, created_at)
VALUES (?, ?, ?, ?, NOW());

-- Insert a new service
-- name: CreateService :exec
INSERT INTO services (name, description, price, hospital_id)
VALUES (?, ?, ?, ?);

