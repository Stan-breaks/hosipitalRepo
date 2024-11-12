-- name: GetHospital :one
SELECT * FROM hospitals
WHERE id = ? LIMIT 1;

-- name: ListHospitals :many
SELECT * FROM hospitals
ORDER BY name;

-- name: ListHospitalsByLocation :many
SELECT * FROM hospitals
WHERE location = ?
ORDER BY rating DESC;

-- name: CreateHospital :execresult
INSERT INTO hospitals (
    name, location, level, rating, phone, email, address
) VALUES (
    ?, ?, ?, ?, ?, ?, ?
);

-- name: UpdateHospital :exec
UPDATE hospitals 
SET name = ?, location = ?, level = ?, rating = ?, 
    phone = ?, email = ?, address = ?
WHERE id = ?;

-- name: DeleteHospital :exec
DELETE FROM hospitals WHERE id = ?;

-- name: GetDoctor :one
SELECT d.*, h.name as hospital_name, s.name as specialty_name
FROM doctors d
JOIN hospitals h ON d.hospital_id = h.id
JOIN specialties s ON d.specialty_id = s.id
WHERE d.id = ? LIMIT 1;

-- name: GetDoctorByEmail :one
SELECT * FROM doctors
WHERE email = ? LIMIT 1;

-- name: ListDoctors :many
SELECT d.*, h.name as hospital_name, s.name as specialty_name
FROM doctors d
JOIN hospitals h ON d.hospital_id = h.id
JOIN specialties s ON d.specialty_id = s.id
ORDER BY d.name;

-- name: CreateDoctor :execresult
INSERT INTO doctors (
    name, hospital_id, specialty_id, license_number,
    phone, email, password, status
) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?
);

-- name: GetAppointments :many
SELECT 
    a.*,
    d.name as doctor_name,
    u.fullname as patient_name
FROM appointments a
JOIN doctors d ON a.doctor_id = d.id
JOIN users u ON a.user_id = u.id
WHERE a.date = ?;

-- name: GetDoctorAppointments :many
SELECT 
    a.*,
    u.fullname as patient_name
FROM appointments a
JOIN users u ON a.user_id = u.id
WHERE a.doctor_id = ? AND a.date BETWEEN ? AND ?
ORDER BY a.date, a.time;

-- name: CreateAppointment :execresult
INSERT INTO appointments (
    date, time, doctor_id, user_id, status, reason
) VALUES (
    ?, ?, ?, ?, ?, ?
);

-- name: UpdateAppointmentStatus :exec
UPDATE appointments 
SET status = ?
WHERE id = ?;

-- name: GetUserAppointments :many
SELECT 
    a.*,
    d.name as doctor_name,
    h.name as hospital_name
FROM appointments a
JOIN doctors d ON a.doctor_id = d.id
JOIN hospitals h ON d.hospital_id = h.id
WHERE a.user_id = ?
ORDER BY a.date DESC, a.time DESC;

-- name: CreateUser :execresult
INSERT INTO users (
    fullname, email, phone, password
) VALUES (
    ?, ?, ?, ?
);

-- name: GetUser :one
SELECT * FROM users
WHERE id = ? LIMIT 1;

-- name: GetUserByEmail :one
SELECT * FROM users
WHERE email = ? LIMIT 1;

-- name: CreateReview :execresult
INSERT INTO reviews (
    hospital_id, user_id, rating, comment
) VALUES (
    ?, ?, ?, ?
);

-- name: GetHospitalReviews :many
SELECT 
    r.*,
    u.fullname as reviewer_name
FROM reviews r
JOIN users u ON r.user_id = u.id
WHERE r.hospital_id = ?
ORDER BY r.created_at DESC;

-- name: GetHospitalSpecialties :many
SELECT 
    s.*
FROM specialties s
JOIN hospital_specialties hs ON s.id = hs.specialty_id
WHERE hs.hospital_id = ?;

-- name: AddHospitalSpecialty :exec
INSERT INTO hospital_specialties (
    hospital_id, specialty_id
) VALUES (
    ?, ?
);

-- name: GetDoctorsBySpecialty :many
SELECT 
    d.*,
    h.name as hospital_name
FROM doctors d
JOIN hospitals h ON d.hospital_id = h.id
WHERE d.specialty_id = ? AND d.status = 'active'
ORDER BY d.name;

-- name: GetHospitalStats :one
SELECT 
    COUNT(DISTINCT d.id) as doctor_count,
    COUNT(DISTINCT s.id) as specialty_count,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(DISTINCT r.id) as review_count
FROM hospitals h
LEFT JOIN doctors d ON h.id = d.hospital_id
LEFT JOIN hospital_specialties hs ON h.id = hs.hospital_id
LEFT JOIN specialties s ON hs.specialty_id = s.id
LEFT JOIN reviews r ON h.id = r.hospital_id
WHERE h.id = ?
GROUP BY h.id;
