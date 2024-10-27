import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, MapPin, Star, Phone, Clock, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { SearchFilters, Hospital } from "../types/search";

const HospitalSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    type: "all",
    level: "all",
    rating: 0,
    insurance: "all",
    services: [],
  });

  const { data: hospitals, isLoading } = useQuery({
    queryKey: ["hospitals", searchQuery, filters],
    queryFn: async () => {
      // Replace with actual API call
      const response = await fetch(
        `/api/hospitals?search=${searchQuery}&filters=${JSON.stringify(filters)}`,
      );
      return response.json();
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search hospitals by name, location, or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Hospitals</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Hospital Type</label>
                <Select
                  value={filters.type}
                  onValueChange={(value) =>
                    setFilters({ ...filters, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="missionary">Missionary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Level</label>
                <Select
                  value={filters.level}
                  onValueChange={(value) =>
                    setFilters({ ...filters, level: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="1">Level 1</SelectItem>
                    <SelectItem value="2">Level 2</SelectItem>
                    <SelectItem value="3">Level 3</SelectItem>
                    <SelectItem value="4">Level 4</SelectItem>
                    <SelectItem value="5">Level 5</SelectItem>
                    <SelectItem value="6">Level 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Rating</label>
                <Slider
                  value={[filters.rating]}
                  min={0}
                  max={5}
                  step={0.5}
                  onValueChange={([value]) =>
                    setFilters({ ...filters, rating: value })
                  }
                />
                <div className="text-sm text-gray-500">
                  {filters.rating} stars and above
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? // Loading skeleton
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg" />
                <CardContent className="space-y-2 p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </CardContent>
              </Card>
            ))
          : // Actual results
            hospitals?.map((hospital: Hospital) => (
              <Card
                key={hospital.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={hospital.image || "/api/placeholder/400/200"}
                  alt={hospital.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{hospital.name}</h3>
                    <Badge
                      variant={
                        hospital.type === "public" ? "secondary" : "outline"
                      }
                    >
                      {hospital.type}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {hospital.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      {hospital.rating} ({hospital.totalReviews} reviews)
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {hospital.contact}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {hospital.operatingHours}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {hospital.services.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                    {hospital.services.length > 3 && (
                      <Badge variant="secondary">
                        +{hospital.services.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <Button className="w-full mt-4">View Details</Button>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default HospitalSearch;
