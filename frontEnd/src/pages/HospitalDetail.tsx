import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Phone, Clock, Star, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HospitalDetail = () => {
  const { id } = useParams();
  const { data: hospital, isLoading } = useQuery({
    queryKey: ["hospital", id],
    queryFn: async () => {
      // Replace with actual API call
      const response = await fetch(`/api/hospitals/${id}`);
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-64 mb-8 rounded-lg overflow-hidden">
        <img
          src={hospital.image || "/api/placeholder/1200/400"}
          alt={hospital.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{hospital.name}</h1>
          <div className="flex items-center gap-4">
            <Badge className="bg-white/20 backdrop-blur-sm">
              Level {hospital.level}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span>
                {hospital.rating} ({hospital.totalReviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <MapPin className="h-5 w-5 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Location</div>
              <div className="font-medium">{hospital.location}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Phone className="h-5 w-5 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Contact</div>
              <div className="font-medium">{hospital.contact}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Clock className="h-5 w-5 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Hours</div>
              <div className="font-medium">{hospital.operatingHours}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Shield className="h-5 w-5 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Type</div>
              <div className="font-medium">{hospital.type}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About {hospital.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{hospital.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hospital.facilities?.map((facility: string) => (
                  <div key={facility} className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    {facility}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Insurance Accepted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {hospital.insuranceAccepted?.map((insurance: string) => (
                  <Badge key={insurance} variant="outline">
                    {insurance}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="doctors">
          {/* Doctors list component */}
        </TabsContent>

        <TabsContent value="services">
          {/* Services list component */}
        </TabsContent>

        <TabsContent value="reviews">{/* Reviews component */}</TabsContent>
      </Tabs>

      {/* Appointment CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Ready to book an appointment?</h3>
            <p className="text-sm text-gray-600">
              Choose from available time slots
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetail;
