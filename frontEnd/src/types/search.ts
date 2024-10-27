export interface Hospital {
  id: string;
  name: string;
  location: string;
  rating: number;
  type: string;
  level: string;
  services: string[];
  insuranceAccepted: string[];
  image: string;
  contact: string;
  operatingHours: string;
  totalReviews: number;
}

export interface SearchFilters {
  type: string;
  level: string;
  rating: number;
  insurance: string;
  services: string[];
}
