"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  User,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Video,
  MapPin,
  Phone,
  Star,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function BookNow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [consultationType, setConsultationType] = useState("in-person")

  const doctor = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 127,
    image: "/placeholder.svg?height=120&width=120",
    location: "Manhattan Medical Center",
    fee: 150,
    verified: true,
  }

  const steps = [
    { id: 1, name: "Select Service", icon: User },
    { id: 2, name: "Choose Date & Time", icon: Calendar },
    { id: 3, name: "Patient Details", icon: User },
    { id: 4, name: "Payment", icon: CreditCard },
    { id: 5, name: "Confirmation", icon: CheckCircle },
  ]

  const availableDates = [
    { date: "2024-01-15", day: "Mon", dayNum: "15", available: true },
    { date: "2024-01-16", day: "Tue", dayNum: "16", available: true },
    { date: "2024-01-17", day: "Wed", dayNum: "17", available: false },
    { date: "2024-01-18", day: "Thu", dayNum: "18", available: true },
    { date: "2024-01-19", day: "Fri", dayNum: "19", available: true },
    { date: "2024-01-20", day: "Sat", dayNum: "20", available: true },
    { date: "2024-01-21", day: "Sun", dayNum: "21", available: false },
  ]

  const timeSlots = [
    { time: "09:00 AM", available: true },
    { time: "09:30 AM", available: false },
    { time: "10:00 AM", available: true },
    { time: "10:30 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "11:30 AM", available: true },
    { time: "02:00 PM", available: true },
    { time: "02:30 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "03:30 PM", available: false },
    { time: "04:00 PM", available: true },
    { time: "04:30 PM", available: true },
  ]

  const services = [
    {
      id: "consultation",
      name: "General Consultation",
      duration: "30 minutes",
      price: 150,
      description: "Comprehensive health assessment and consultation",
    },
    {
      id: "follow-up",
      name: "Follow-up Visit",
      duration: "15 minutes",
      price: 75,
      description: "Follow-up consultation for existing patients",
    },
    {
      id: "specialist",
      name: "Specialist Consultation",
      duration: "45 minutes",
      price: 200,
      description: "Detailed specialist consultation with treatment plan",
    },
  ]

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step.id ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"
            }`}
          >
            <step.icon className="w-5 h-5" />
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-2 ${currentStep > step.id ? "bg-blue-600" : "bg-gray-300"}`} />
          )}
        </div>
      ))}
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Service</h2>
              <p className="text-gray-600">Choose the type of consultation you need</p>
            </div>

            <div className="grid gap-4">
              {services.map((service) => (
                <Card key={service.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            {service.duration}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">${service.price}</div>
                        <Button className="mt-2">Select</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Consultation Type</h3>
              <RadioGroup value={consultationType} onValueChange={setConsultationType}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="in-person" id="in-person" />
                  <Label htmlFor="in-person" className="flex items-center cursor-pointer">
                    <MapPin className="w-4 h-4 mr-2" />
                    In-Person Visit
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="video" id="video" />
                  <Label htmlFor="video" className="flex items-center cursor-pointer">
                    <Video className="w-4 h-4 mr-2" />
                    Video Consultation
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="phone" id="phone" />
                  <Label htmlFor="phone" className="flex items-center cursor-pointer">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Consultation
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Date & Time</h2>
              <p className="text-gray-600">Select your preferred appointment slot</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Date Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Available Dates</h3>
                <div className="grid grid-cols-7 gap-2">
                  {availableDates.map((date) => (
                    <button
                      key={date.date}
                      onClick={() => setSelectedDate(date.date)}
                      disabled={!date.available}
                      className={`p-3 text-center rounded-lg border transition-colors ${
                        selectedDate === date.date
                          ? "bg-blue-600 text-white border-blue-600"
                          : date.available
                            ? "hover:bg-blue-50 border-gray-200"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <div className="text-xs font-medium">{date.day}</div>
                      <div className="text-lg font-bold">{date.dayNum}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Available Times</h3>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 text-center rounded-lg border transition-colors ${
                        selectedTime === slot.time
                          ? "bg-blue-600 text-white border-blue-600"
                          : slot.available
                            ? "hover:bg-blue-50 border-gray-200"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {selectedDate && selectedTime && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-blue-900">Selected Appointment</h4>
                      <p className="text-blue-700">
                        {new Date(selectedDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        at {selectedTime}
                      </p>
                    </div>
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Details</h2>
              <p className="text-gray-600">Please provide your information</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <input
                    id="firstName"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <input
                    id="lastName"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <input
                    id="dob"
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <Label htmlFor="reason">Reason for Visit</Label>
                  <textarea
                    id="reason"
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your concern"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Information</h2>
              <p className="text-gray-600">Secure payment processing</p>
            </div>

            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Appointment Summary</h3>
                  <Badge className="bg-white text-blue-600">Confirmed</Badge>
                </div>
                <div className="space-y-2 text-blue-100">
                  <p>Service: General Consultation</p>
                  <p>Date: {selectedDate && new Date(selectedDate).toLocaleDateString()}</p>
                  <p>Time: {selectedTime}</p>
                  <p>Type: {consultationType}</p>
                </div>
                <Separator className="my-4 bg-blue-400" />
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>Total Amount:</span>
                  <span>${doctor.fee}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <input
                  id="cardNumber"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <input
                    id="expiry"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <input
                    id="cvv"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <input
                  id="cardName"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter cardholder name"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
              <p className="text-gray-600">Your appointment has been successfully booked</p>
            </div>

            <Card className="text-left">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Appointment Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-medium">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedDate && new Date(selectedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium capitalize">{consultationType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-medium">#APT-2024-001</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">Add to Calendar</Button>
              <Button>View My Appointments</Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Book Appointment</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Doctor Info Card */}
        <Card className="mb-8 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                  <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {doctor.verified && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{doctor.name}</h2>
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-gray-500 ml-1">({doctor.reviews})</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{doctor.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">${doctor.fee}</div>
                <p className="text-gray-600 text-sm">Consultation Fee</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Indicator */}
        <StepIndicator />

        {/* Step Content */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-8">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < 5 ? (
            <Button
              onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
