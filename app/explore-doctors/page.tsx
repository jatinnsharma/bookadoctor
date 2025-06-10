"use client"

import { useState } from "react"
import {
  Search,
  Star,
  MapPin,
  Clock,
  Filter,
  Grid3X3,
  List,
  Heart,
  Award,
  Calendar,
  Video,
  Phone,
  ArrowLeft,
  SlidersHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"
import { BackButton } from "@/components/BackButton"

export default function ExploreDoctors() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(true)
  const [priceRange, setPriceRange] = useState([50, 300])
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      subSpecialty: "Interventional Cardiology",
      rating: 4.9,
      reviews: 127,
      experience: 15,
      image: "/placeholder.svg?height=150&width=150",
      location: "Manhattan Medical Center",
      distance: "2.3 miles",
      nextAvailable: "Today 3:00 PM",
      consultationFee: 150,
      languages: ["English", "Spanish"],
      verified: true,
      awards: ["Top Doctor 2023", "Patient Choice Award"],
      education: "Harvard Medical School",
      acceptsInsurance: true,
      telemedicine: true,
      about:
        "Dr. Johnson specializes in complex cardiac procedures with over 15 years of experience in interventional cardiology.",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      subSpecialty: "Cosmetic Dermatology",
      rating: 4.8,
      reviews: 89,
      experience: 12,
      image: "/placeholder.svg?height=150&width=150",
      location: "Skin Health Institute",
      distance: "1.8 miles",
      nextAvailable: "Tomorrow 10:00 AM",
      consultationFee: 120,
      languages: ["English", "Mandarin"],
      verified: true,
      awards: ["Excellence in Dermatology"],
      education: "Johns Hopkins University",
      acceptsInsurance: true,
      telemedicine: false,
      about: "Specializing in both medical and cosmetic dermatology with a focus on advanced skin treatments.",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      subSpecialty: "Developmental Pediatrics",
      rating: 4.9,
      reviews: 156,
      experience: 18,
      image: "/placeholder.svg?height=150&width=150",
      location: "Children's Health Center",
      distance: "3.1 miles",
      nextAvailable: "Today 4:30 PM",
      consultationFee: 100,
      languages: ["English", "Spanish", "Portuguese"],
      verified: true,
      awards: ["Best Pediatrician 2023", "Community Service Award"],
      education: "Stanford Medical School",
      acceptsInsurance: true,
      telemedicine: true,
      about: "Dedicated to providing comprehensive pediatric care with special focus on child development.",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      subSpecialty: "Sports Medicine",
      rating: 4.7,
      reviews: 203,
      experience: 20,
      image: "/placeholder.svg?height=150&width=150",
      location: "Sports Medicine Clinic",
      distance: "4.2 miles",
      nextAvailable: "Next Week",
      consultationFee: 200,
      languages: ["English"],
      verified: true,
      awards: ["Sports Medicine Excellence"],
      education: "Mayo Clinic",
      acceptsInsurance: true,
      telemedicine: false,
      about: "Expert in sports-related injuries and orthopedic surgery with extensive experience treating athletes.",
    },
  ]

  const specialties = [
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Orthopedics",
    "Neurology",
    "Psychiatry",
    "Gynecology",
    "Ophthalmology",
  ]

  const languages = ["English", "Spanish", "Mandarin", "French", "Portuguese", "Arabic"]

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setSelectedSpecialties([...selectedSpecialties, specialty])
    } else {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty))
    }
  }

  const DoctorCard = ({ doctor, isListView = false }: { doctor: any; isListView?: boolean }) => (
    <Card
      className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-md ${isListView ? "flex-row" : ""}`}
    >
      <CardHeader className={`${isListView ? "flex-row space-y-0 space-x-6 items-start" : "text-center"}`}>
        <div className={`relative ${isListView ? "flex-shrink-0" : ""}`}>
          <Avatar className={`${isListView ? "w-24 h-24" : "w-32 h-32 mx-auto"} border-4 border-white shadow-lg`}>
            <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
            <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {doctor.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {doctor.verified && (
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        <div className={`${isListView ? "flex-1" : "mt-4"}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-blue-600 font-semibold text-lg">{doctor.specialty}</p>
              <p className="text-gray-600 text-sm">{doctor.subSpecialty}</p>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="font-semibold">{doctor.rating}</span>
                <span className="text-gray-500 ml-1">({doctor.reviews})</span>
              </div>
              <Badge variant="secondary">{doctor.experience} years exp</Badge>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span>
                {doctor.location} • {doctor.distance}
              </span>
            </div>

            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-1 text-green-600" />
              <span className="text-green-600 font-medium">Next: {doctor.nextAvailable}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {doctor.languages.map((lang: string) => (
            <Badge key={lang} variant="outline" className="text-xs">
              {lang}
            </Badge>
          ))}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">{doctor.about}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {doctor.telemedicine && (
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                <Video className="w-3 h-3 mr-1" />
                Video
              </Badge>
            )}
            {doctor.acceptsInsurance && (
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Insurance</Badge>
            )}
          </div>
          <span className="text-2xl font-bold text-gray-900">${doctor.consultationFee}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="w-full">
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Calendar className="w-4 h-4 mr-2" />
            Book
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BackButton />

              <h1 className="text-2xl font-bold text-gray-900">Explore Doctors</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Toggle pressed={viewMode === "grid"} onPressedChange={() => setViewMode("grid")}>
                  <Grid3X3 className="w-4 h-4" />
                </Toggle>
                <Toggle pressed={viewMode === "list"} onPressedChange={() => setViewMode("list")}>
                  <List className="w-4 h-4" />
                </Toggle>
              </div>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <Card className="sticky top-24 shadow-lg border-0">
                <CardHeader>
                  <h2 className="text-lg font-semibold flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Filters
                  </h2>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search */}
                  <div className="space-y-2">
                    <Label>Search Doctors</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input placeholder="Doctor name or condition" className="pl-10" />
                    </div>
                  </div>

                  <Separator />

                  {/* Location */}
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input placeholder="City, state, or zip code" className="pl-10" />
                    </div>
                  </div>

                  <Separator />

                  {/* Specialties */}
                  <div className="space-y-3">
                    <Label>Specialties</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {specialties.map((specialty) => (
                        <div key={specialty} className="flex items-center space-x-2">
                          <Checkbox
                            id={specialty}
                            checked={selectedSpecialties.includes(specialty)}
                            onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked as boolean)}
                          />
                          <Label htmlFor={specialty} className="text-sm font-normal">
                            {specialty}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Price Range */}
                  <div className="space-y-3">
                    <Label>Consultation Fee Range</Label>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={500}
                        min={50}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Availability */}
                  <div className="space-y-3">
                    <Label>Availability</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Available Today</SelectItem>
                        <SelectItem value="tomorrow">Available Tomorrow</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Additional Filters */}
                  <div className="space-y-3">
                    <Label>Additional Options</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="telemedicine" />
                        <Label htmlFor="telemedicine" className="text-sm font-normal">
                          Telemedicine Available
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="insurance" />
                        <Label htmlFor="insurance" className="text-sm font-normal">
                          Accepts Insurance
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="verified" />
                        <Label htmlFor="verified" className="text-sm font-normal">
                          Verified Doctors Only
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{doctors.length} doctors found</h2>
                <p className="text-gray-600">Showing results for your search criteria</p>
              </div>

              <Select defaultValue="rating">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="distance">Nearest First</SelectItem>
                  <SelectItem value="availability">Soonest Available</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Doctor Cards */}
            <div className={`${viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "space-y-6"}`}>
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} isListView={viewMode === "list"} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2 mt-12">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="default">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
