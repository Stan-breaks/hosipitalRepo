export interface AppointmentType {
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

export interface HospitalType {
  id: string;
  name: string;
  location: string;
  rating: number;
  specialties: string[];
  verified: boolean;
}

export interface DoctorType {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  experience: string;
  availability: string;
}

export interface PatientType {
  name: string;
  age: number;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  appointments: AppointmentType[];
  documents: Array<{
    id: string;
    name: string;
    date: string;
  }>;
}

export interface ReviewType {
  id: string;
  hospitalId: string;
  userName: string;
  date: string;
  helpful: number;
  rating: number;
  comment: string;
}

interface Distribution {
  [key: number]: number;
}

export interface StatsType {
  average: number;
  total: number;
  distribution: Distribution;
}
