import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  Search,
  Hospital,
  User,
  MapPin,
  CalendarIcon,
} from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { RatingStars } from "@/components/RatingStars";
import { AppointmentType, HospitalType, DoctorType } from "@/types";

// Mock data
const mockAppointments: AppointmentType[] = [
  {
    id: "1",
    date: "2024-11-10",
    time: "09:00 AM",
    doctorName: "Dr. Sarah Wanjiku",
    patientName: "John Kamau",
    status: "scheduled",
    reason: "Annual Checkup",
    hospitalName: "Nairobi Hospital",
    location: "Nairobi",
  },
  // Add more mock appointments as needed
];

const mockDoctors: DoctorType[] = [
  {
    id: "1",
    name: "Dr. Sarah Wanjiku",
    specialty: "Cardiology",
    hospital: "Nairobi Hospital",
    rating: 4.8,
    experience: "15 years",
    availability: "Mon-Fri",
  },
  // Add more mock doctors as needed
];

const mockHospitals: HospitalType[] = [
  {
    id: "1",
    name: "Nairobi Hospital",
    location: "Nairobi",
    rating: 4.5,
    specialties: ["Cardiology", "Neurology", "Pediatrics"],
    verified: true,
  },
  // Add more mock hospitals as needed
];

export const AppointmentBooking: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Specialty</Label>
            <Select
              value={selectedSpecialty}
              onValueChange={setSelectedSpecialty}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Doctor</Label>
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {mockDoctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Time</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09:00">09:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Reason for Visit</Label>
            <Input placeholder="Brief description of your condition" />
          </div>

          <Button className="w-full">Confirm Booking</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export const DoctorDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Input
          placeholder="Search doctors by name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockDoctors.map((doctor) => (
          <Card key={doctor.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialty}</p>
                  <p className="text-sm text-gray-500">{doctor.hospital}</p>
                  <RatingStars rating={doctor.rating} />
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {doctor.availability}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-1" />
                    {doctor.experience} experience
                  </div>
                </div>
                <Button>Book Appointment</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const HospitalDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Input
          placeholder="Search hospitals by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockHospitals.map((hospital) => (
          <Card key={hospital.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{hospital.name}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {hospital.location}
                    </div>
                  </div>
                  {hospital.verified && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>

                <RatingStars rating={hospital.rating} />

                <div className="flex flex-wrap gap-2">
                  {hospital.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button className="flex-1">Book Appointment</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const AppointmentDetails: React.FC = () => {
  const appointmentDetails = {
    ...mockAppointments[0],
    patientDetails: {
      phone: "+254 123 456 789",
      email: "john.kamau@example.com",
    },
    notes: "Patient has reported recurring headaches for the past week.",
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                {appointmentDetails.date}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                {appointmentDetails.time}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Doctor</Label>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-500" />
                {appointmentDetails.doctorName}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Hospital</Label>
              <div className="flex items-center">
                <Hospital className="h-4 w-4 mr-2 text-gray-500" />
                {appointmentDetails.hospitalName}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <StatusBadge status={appointmentDetails.status} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Reason for Visit</Label>
            <p className="text-gray-700">{appointmentDetails.reason}</p>
          </div>

          <div className="space-y-2">
            <Label>Notes</Label>
            <p className="text-gray-700">{appointmentDetails.notes}</p>
          </div>

          <div className="flex space-x-2">
            {appointmentDetails.status === "scheduled" && (
              <>
                <Button variant="outline" className="flex-1">
                  Reschedule
                </Button>
                <Button variant="destructive" className="flex-1">
                  Cancel Appointment
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
