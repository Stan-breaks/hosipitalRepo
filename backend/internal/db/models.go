// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package db

import (
	"database/sql"
	"database/sql/driver"
	"fmt"
)

type UsersRole string

const (
	UsersRolePatient       UsersRole = "patient"
	UsersRoleDoctor        UsersRole = "doctor"
	UsersRoleHospitalAdmin UsersRole = "hospital_admin"
	UsersRoleSystemAdmin   UsersRole = "system_admin"
)

func (e *UsersRole) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = UsersRole(s)
	case string:
		*e = UsersRole(s)
	default:
		return fmt.Errorf("unsupported scan type for UsersRole: %T", src)
	}
	return nil
}

type NullUsersRole struct {
	UsersRole UsersRole `json:"users_role"`
	Valid     bool      `json:"valid"` // Valid is true if UsersRole is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullUsersRole) Scan(value interface{}) error {
	if value == nil {
		ns.UsersRole, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.UsersRole.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullUsersRole) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.UsersRole), nil
}

type Doctor struct {
	ID            int32          `json:"id"`
	Name          string         `json:"name"`
	HospitalID    sql.NullInt32  `json:"hospital_id"`
	LicenseNumber string         `json:"license_number"`
	Phone         sql.NullString `json:"phone"`
	Email         sql.NullString `json:"email"`
	Status        sql.NullString `json:"status"`
	CreatedAt     sql.NullTime   `json:"created_at"`
	UpdatedAt     sql.NullTime   `json:"updated_at"`
}

type Hospital struct {
	ID        int32          `json:"id"`
	Name      string         `json:"name"`
	Location  string         `json:"location"`
	Level     string         `json:"level"`
	Rating    sql.NullString `json:"rating"`
	Phone     sql.NullString `json:"phone"`
	Email     sql.NullString `json:"email"`
	Address   sql.NullString `json:"address"`
	CreatedAt sql.NullTime   `json:"created_at"`
	UpdatedAt sql.NullTime   `json:"updated_at"`
}

type Review struct {
	ID         int32          `json:"id"`
	HospitalID sql.NullInt32  `json:"hospital_id"`
	UserID     int32          `json:"user_id"`
	Rating     int32          `json:"rating"`
	Comment    sql.NullString `json:"comment"`
	CreatedAt  sql.NullTime   `json:"created_at"`
}

type Service struct {
	ID          int32          `json:"id"`
	Name        string         `json:"name"`
	Description sql.NullString `json:"description"`
	Price       sql.NullString `json:"price"`
	HospitalID  sql.NullInt32  `json:"hospital_id"`
}

type User struct {
	ID          int32          `json:"id"`
	Email       string         `json:"email"`
	FullName    string         `json:"full_name"`
	PhoneNumber sql.NullString `json:"phone_number"`
	Role        UsersRole      `json:"role"`
	CreatedAt   sql.NullTime   `json:"created_at"`
	UpdatedAt   sql.NullTime   `json:"updated_at"`
}