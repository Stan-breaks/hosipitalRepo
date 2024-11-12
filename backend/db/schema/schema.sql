-- Schema for hospital management system
CREATE TABLE hospitals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    level VARCHAR(50) NOT NULL,
    rating DECIMAL(3, 2),
    phone VARCHAR(50),
    email VARCHAR(255) UNIQUE,  -- Added UNIQUE constraint
    address TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE specialties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,  -- Added UNIQUE constraint
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hospital_specialties (
    hospital_id INT,
    specialty_id INT,
    PRIMARY KEY (hospital_id, specialty_id),
    FOREIGN KEY (hospital_id) REFERENCES hospitals (id) ON DELETE CASCADE,
    FOREIGN KEY (specialty_id) REFERENCES specialties (id) ON DELETE CASCADE
);

CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    hospital_id INT,
    specialty_id INT,
    license_number VARCHAR(100) NOT NULL UNIQUE,  -- Added UNIQUE constraint
    phone VARCHAR(50),
    password VARCHAR(255) NOT NULL,  -- Added NOT NULL constraint
    email VARCHAR(255) UNIQUE NOT NULL,  -- Added UNIQUE and NOT NULL constraints
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (hospital_id) REFERENCES hospitals (id) ON DELETE SET NULL,
    FOREIGN KEY (specialty_id) REFERENCES specialties (id) ON DELETE SET NULL
);
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,  -- Added UNIQUE and NOT NULL constraints
    phone VARCHAR(50),
    password VARCHAR(255) NOT NULL,  -- Added NOT NULL constraint
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_id INT NOT NULL,  -- Added NOT NULL constraint
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hospital_id) REFERENCES hospitals (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);


CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    time TIME NOT NULL,
    doctor_id INT NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'scheduled',
    reason TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Indexes for better query performance
CREATE INDEX idx_hospitals_location ON hospitals (location);
CREATE INDEX idx_hospitals_rating ON hospitals (rating);
CREATE INDEX idx_doctors_hospital ON doctors (hospital_id);
CREATE INDEX idx_doctors_specialty ON doctors (specialty_id);
CREATE INDEX idx_reviews_hospital ON reviews (hospital_id);
CREATE INDEX idx_reviews_user ON reviews (user_id);
CREATE INDEX idx_appointments_date ON appointments (date);
CREATE INDEX idx_appointments_doctor ON appointments (doctor_id);
CREATE INDEX idx_appointments_user ON appointments (user_id);
CREATE INDEX idx_users_email ON users (email);
