"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Star,
  MapPin,
  Calendar,
  Clock,
  Award,
  Heart,
  Share2,
  MessageCircle,
  Phone,
  Video,
  CheckCircle,
  ArrowLeft,
  Stethoscope,
  GraduationCap,
  Languages,
  BadgeIcon as Certificate,
  Clock8,
  Users,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function DoctorProfile({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>("about")

  // Mock doctor data
  const doctor = {
    id: params.id,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    subSpecialty: "Interventional Cardiology",
    rating: 4.9,
    reviews: 127,
    experience: 15,
    image: "/placeholder.svg?height=300&width=300",
    location: "Manhattan Medical Center",
    address: "123 Medical Plaza, New York, NY 10001",
    fee: 150,
    verified: true,
    languages: ["English", "Spanish"],
    education: [
      {
        degree: "MD",
        institution: "Harvard Medical School",
        year: "2008",
      },
      {
        degree: "Residency in Internal Medicine",
        institution: "Massachusetts General Hospital",
        year: "2011",
      },
      {
        degree: "Fellowship in Cardiology",
        institution: "Johns Hopkins Hospital",
        year: "2014",
      },
    ],
    certifications: [
      "Board Certified in Cardiovascular Disease",
      "Fellow of the American College of Cardiology (FACC)",
      "Advanced Cardiac Life Support (ACLS)",
    ],
    awards: ["Top Doctor 2023", "Patient Choice Award", "Research Excellence Award"],
    about:
      "Dr. Johnson is a board-certified cardiologist specializing in interventional cardiology with over 15 years of experience. She focuses on preventive cardiology, coronary artery disease, and structural heart interventions. Her patient-centered approach combines cutting-edge treatments with compassionate care to achieve optimal outcomes.",
    services: [
      "Cardiac Consultation",
      "Echocardiography",
      "Stress Testing",
      "Coronary Angiography",
      "Cardiac Catheterization",
      "Pacemaker Implantation",
      "Heart Failure Management",
      "Preventive Cardiology",
    ],
    availability: {
      monday: ["9:00 AM - 1:00 PM", "2:00 PM - 5:00 PM"],
      tuesday: ["9:00 AM - 1:00 PM", "2:00 PM - 5:00 PM"],
      wednesday: ["9:00 AM - 1:00 PM"],
      thursday: ["9:00 AM - 1:00 PM", "2:00 PM - 5:00 PM"],
      friday: ["9:00 AM - 1:00 PM", "2:00 PM - 5:00 PM"],
      saturday: ["10:00 AM - 2:00 PM"],
      sunday: [],
    },
    insurances: [
      "Blue Cross Blue Shield",
      "Aetna",
      "Cigna",
      "UnitedHealthcare",
      "Medicare",
      "Humana",
      "Kaiser Permanente",
    ],
    patientReviews: [
      {
        name: "Jennifer Smith",
        date: "2 weeks ago",
        rating: 5,
        comment:
          "Dr. Johnson is an exceptional cardiologist. She took the time to explain my condition thoroughly and answered all my questions. Her staff is also very professional and friendly.",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Michael Brown",
        date: "1 month ago",
        rating: 5,
        comment:
          "I've been seeing Dr. Johnson for 3 years now. She's always attentive, knowledgeable, and genuinely cares about her patients. Highly recommend!",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Robert Wilson",
        date: "2 months ago",
        rating: 4,
        comment:
          "Very professional doctor with excellent bedside manner. The wait time can be a bit long sometimes, but the quality of care is worth it.",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    statistics: {
      patientsServed: 5000,
      successRate: 98,
      experienceYears: 15,
      satisfactionRate: 96,
    },
  }

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Doctor Profile</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Doctor Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card className="shadow-xl border-0 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32 relative"></div>
              <div className="px-6 pb-6">
                <div className="flex justify-center">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: -30, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="relative"
                  >
                    <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                      <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-4xl">
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {doctor.verified && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <Award className="w-6 h-6 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                <div className="text-center mt-2">
                  <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
                  <p className="text-blue-600 font-semibold">{doctor.specialty}</p>
                  <p className="text-gray-600 text-sm">{doctor.subSpecialty}</p>

                  <div className="flex items-center justify-center mt-2">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">{doctor.rating}</span>
                      <span className="text-gray-500 ml-1">({doctor.reviews})</span>
                    </div>
                    <Badge variant="secondary" className="ml-3">
                      {doctor.experience} years exp
                    </Badge>
                  </div>

                  <div className="flex items-center justify-center text-gray-600 mt-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{doctor.location}</span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-1 mt-4">
                    {doctor.languages.map((lang) => (
                      <Badge key={lang} variant="outline">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={isLiked ? "text-red-500" : "text-gray-500"}
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`w-5 h-5 mr-1 ${isLiked ? "fill-current" : ""}`} />
                      Save
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <Share2 className="w-5 h-5 mr-1" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <MessageCircle className="w-5 h-5 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Consultation Fee</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-gray-900">${doctor.fee}</span>
                      <span className="text-gray-500 text-sm ml-1">per visit</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Insurance Accepted</Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Available Consultation Types</h3>
                  <div className="space-y-2">
                    <div className="flex items-center p-3 border rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">In-Person Visit</h4>
                        <p className="text-gray-600 text-sm">Visit the doctor at their clinic</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <Video className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Video Consultation</h4>
                        <p className="text-gray-600 text-sm">Consult from the comfort of your home</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right Column - Detailed Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full bg-white p-0 h-auto border-b rounded-none justify-start space-x-6">
                <TabsTrigger
                  value="about"
                  className="py-3 px-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
                >
                  About
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="py-3 px-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="py-3 px-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
                >
                  Services
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="py-3 px-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="availability"
                  className="py-3 px-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none"
                >
                  Availability
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                          <Stethoscope className="w-5 h-5 mr-2" />
                          About Dr. {doctor.name.split(" ")[1]}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <Award className="w-5 h-5 mr-2" />
                          Awards & Recognition
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {doctor.awards.map((award, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start"
                            >
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{award}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <Shield className="w-5 h-5 mr-2" />
                          Insurance Accepted
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {doctor.insurances.map((insurance, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Badge variant="outline" className="bg-blue-50">
                                {insurance}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <Users className="w-5 h-5 mr-2" />
                          Statistics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">
                              {doctor.statistics.patientsServed.toLocaleString()}+
                            </div>
                            <div className="text-gray-600 text-sm">Patients Served</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">{doctor.statistics.successRate}%</div>
                            <div className="text-gray-600 text-sm">Success Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">
                              {doctor.statistics.experienceYears}+
                            </div>
                            <div className="text-gray-600 text-sm">Years Experience</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-600">
                              {doctor.statistics.satisfactionRate}%
                            </div>
                            <div className="text-gray-600 text-sm">Patient Satisfaction</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                          <GraduationCap className="w-5 h-5 mr-2" />
                          Education & Training
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {doctor.education.map((edu, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="relative pl-8 pb-6 border-l-2 border-blue-200 last:pb-0"
                            >
                              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-600"></div>
                              <div className="font-semibold text-gray-900">{edu.degree}</div>
                              <div className="text-blue-600">{edu.institution}</div>
                              <div className="text-gray-600 text-sm">{edu.year}</div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                          <Certificate className="w-5 h-5 mr-2" />
                          Certifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {doctor.certifications.map((cert, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start"
                            >
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{cert}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                          <Languages className="w-5 h-5 mr-2" />
                          Languages Spoken
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-3">
                          {doctor.languages.map((language, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center p-3 bg-blue-50 rounded-lg"
                            >
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <span className="font-semibold text-blue-600">{language[0]}</span>
                              </div>
                              <span className="font-medium">{language}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="services" className="mt-6">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                          <Stethoscope className="w-5 h-5 mr-2" />
                          Services Offered
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {doctor.services.map((service, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center p-3 border rounded-lg"
                            >
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                              </div>
                              <span className="font-medium">{service}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                          <Video className="w-5 h-5 mr-2" />
                          Telemedicine Services
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-gray-700">
                            Dr. Johnson offers comprehensive telemedicine services for patients who prefer remote
                            consultations. Virtual appointments are available for:
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Initial consultations and second opinions</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Follow-up appointments and medication reviews</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Test result discussions and treatment planning</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>Prescription refills and minor health concerns</span>
                            </li>
                          </ul>
                          <div className="mt-4">
                            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                              <Video className="w-4 h-4 mr-2" />
                              Book Telemedicine Appointment
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                          <Star className="w-5 h-5 mr-2 text-yellow-400" />
                          Patient Reviews
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                          <div className="md:w-1/3 flex flex-col items-center justify-center p-6 bg-blue-50 rounded-lg">
                            <div className="text-5xl font-bold text-blue-600">{doctor.rating}</div>
                            <div className="flex items-center my-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < Math.floor(doctor.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-gray-600">Based on {doctor.reviews} reviews</div>
                          </div>

                          <div className="md:w-2/3 space-y-3">
                            <div className="flex items-center">
                              <div className="w-24 text-sm">5 stars</div>
                              <div className="flex-1 mx-2">
                                <Progress value={85} className="h-2" />
                              </div>
                              <div className="w-10 text-sm text-right">85%</div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-24 text-sm">4 stars</div>
                              <div className="flex-1 mx-2">
                                <Progress value={10} className="h-2" />
                              </div>
                              <div className="w-10 text-sm text-right">10%</div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-24 text-sm">3 stars</div>
                              <div className="flex-1 mx-2">
                                <Progress value={5} className="h-2" />
                              </div>
                              <div className="w-10 text-sm text-right">5%</div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-24 text-sm">2 stars</div>
                              <div className="flex-1 mx-2">
                                <Progress value={0} className="h-2" />
                              </div>
                              <div className="w-10 text-sm text-right">0%</div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-24 text-sm">1 star</div>
                              <div className="flex-1 mx-2">
                                <Progress value={0} className="h-2" />
                              </div>
                              <div className="w-10 text-sm text-right">0%</div>
                            </div>
                          </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="space-y-6">
                          {doctor.patientReviews.map((review, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="border-b pb-6 last:border-b-0 last:pb-0"
                            >
                              <div className="flex items-start">
                                <Avatar className="w-12 h-12 mr-4">
                                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                                  <AvatarFallback>
                                    {review.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                    <span className="text-gray-500 text-sm">{review.date}</span>
                                  </div>
                                  <div className="flex items-center my-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <p className="text-gray-700 mt-2">{review.comment}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-6 text-center">
                          <Button variant="outline">View All Reviews</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="availability" className="mt-6">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                          <Clock className="w-5 h-5 mr-2" />
                          Weekly Schedule
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(doctor.availability).map(([day, slots], index) => (
                            <motion.div
                              key={day}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center p-4 border rounded-lg"
                            >
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                                  slots.length > 0 ? "bg-green-100" : "bg-gray-100"
                                }`}
                              >
                                <span
                                  className={`font-semibold ${slots.length > 0 ? "text-green-600" : "text-gray-400"}`}
                                >
                                  {day.slice(0, 3)}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 capitalize">{day}</h4>
                                {slots.length > 0 ? (
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {slots.map((slot, i) => (
                                      <Badge key={i} variant="outline" className="bg-green-50 text-green-700">
                                        <Clock8 className="w-3 h-3 mr-1" />
                                        {slot}
                                      </Badge>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-gray-500 text-sm">Not Available</span>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-6">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            <Calendar className="w-4 h-4 mr-2" />
                            Check Available Slots
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Card className="shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                          <MapPin className="w-5 h-5 mr-2" />
                          Location & Directions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                            <div className="text-gray-500">Map Placeholder</div>
                          </div>
                          <div className="flex items-start">
                            <MapPin className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-gray-900">{doctor.location}</h4>
                              <p className="text-gray-600">{doctor.address}</p>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <Button variant="outline" className="flex-1">
                              Get Directions
                            </Button>
                            <Button variant="outline" className="flex-1">
                              View on Map
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
