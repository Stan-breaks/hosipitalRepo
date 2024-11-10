import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Star,
  Search,
  Hospital,
  User,
  FileText,
  MapPin,
  Bell,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AppointmentType {
  id: string;
  date: string;
  time: string;
  doctorName?: string;
  patientName?: string;
  status: "scheduled" | "completed" | "cancelled";
  reason: string;
  hospitalName: string;
  location: string;
}

interface HospitalType {
  id: string;
  name: string;
  location: string;
  rating: number;
  specialties: string[];
  verified: boolean;
}

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
  {
    id: "2",
    date: "2024-11-10",
    time: "10:30 AM",
    doctorName: "Dr. Sarah Wanjiku",
    patientName: "Jane Muthoni",
    status: "completed",
    reason: "Follow-up",
    hospitalName: "Nairobi Hospital",
    location: "Nairobi",
  },
  {
    id: "3",
    date: "2024-11-11",
    time: "02:00 PM",
    doctorName: "Dr. Sarah Wanjiku",
    patientName: "Mike Odhiambo",
    status: "cancelled",
    reason: "Consultation",
    hospitalName: "Nairobi Hospital",
    location: "Nairobi",
  },
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
  {
    id: "2",
    name: "Aga Khan University Hospital",
    location: "Nairobi",
    rating: 4.7,
    specialties: ["Oncology", "Surgery", "Internal Medicine"],
    verified: true,
  },
];

// Status Badge component
const StatusBadge = ({ status }: { status: AppointmentType["status"] }) => {
  const variants = {
    scheduled: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm ${variants[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Rating Stars component
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

// Patient Dashboard
const PatientDashboard = () => {
  const [appointments] = useState<AppointmentType[]>(mockAppointments);
  const [nearbyHospitals] = useState<HospitalType[]>(mockHospitals);

  return (
    <div className="p-6 space-y-6">
      {/* Search Section */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600">
        <CardContent className="p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-2 flex items-center shadow-lg">
              <input
                type="text"
                placeholder="Search for hospitals, doctors, or specialties..."
                className="flex-1 p-2 border-none focus:outline-none"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center space-x-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {appointments.filter((a) => a.status === "scheduled").length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-x-2">
            <Hospital className="h-6 w-6 text-purple-600" />
            <CardTitle className="text-lg">Saved Hospitals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-x-2">
            <FileText className="h-6 w-6 text-green-600" />
            <CardTitle className="text-lg">Medical Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Records
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Nearby Hospitals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Nearby Verified Hospitals</CardTitle>
          <Button variant="outline">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyHospitals.map((hospital) => (
              <Card key={hospital.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {hospital.name}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {hospital.location}
                      </div>
                      <RatingStars rating={hospital.rating} />
                      <div className="mt-2 flex flex-wrap gap-1">
                        {hospital.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    {hospital.verified && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                        Verified
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Appointments</CardTitle>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Calendar className="mr-2 h-4 w-4" />
            Book Appointment
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.doctorName}</TableCell>
                  <TableCell>{appointment.hospitalName}</TableCell>
                  <TableCell>{appointment.location}</TableCell>
                  <TableCell>
                    <StatusBadge status={appointment.status} />
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Doctor Dashboard
const DoctorDashboard = () => {
  const [appointments] = useState<AppointmentType[]>(mockAppointments);
  const [stats] = useState({
    todayAppointments: 3,
    pendingReviews: 2,
    totalPatients: 150,
    rating: 4.8,
  });

  return (
    <div className="p-6 space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center space-x-2">
            <Clock className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-lg">Today's Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {stats.todayAppointments}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-x-2">
            <Bell className="h-6 w-6 text-amber-600" />
            <CardTitle className="text-lg">Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">
              {stats.pendingReviews}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-x-2">
            <User className="h-6 w-6 text-green-600" />
            <CardTitle className="text-lg">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {stats.totalPatients}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-x-2">
            <Star className="h-6 w-6 text-yellow-600" />
            <CardTitle className="text-lg">Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <p className="text-3xl font-bold text-yellow-600 mr-2">
                {stats.rating}
              </p>
              <RatingStars rating={stats.rating} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Today's Schedule</CardTitle>
          <Button variant="outline">Manage Availability</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.reason}</TableCell>d
                  <TableCell>
                    <StatusBadge status={appointment.status} />
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={appointment.status !== "scheduled"}
                    >
                      Start Session
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export { PatientDashboard, DoctorDashboard };
