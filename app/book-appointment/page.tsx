"use client"

import { useState } from "react"
import {
  Calendar,
  User,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  AlertCircle,
  CheckCircle,
  Star,
  Award,
  Video,
  FileText,
  Activity,
  Users,
  ArrowLeft,
  ArrowRight,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function BookAppointmentDetailed() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {},
    medicalHistory: {},
    insurance: {},
    preferences: {},
    emergency: {},
  })

  const doctor = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    subSpecialty: "Interventional Cardiology",
    rating: 4.9,
    reviews: 127,
    experience: 15,
    image: "/placeholder.svg?height=120&width=120",
    location: "Manhattan Medical Center",
    address: "123 Medical Plaza, New York, NY 10001",
    fee: 150,
    verified: true,
    languages: ["English", "Spanish"],
    education: "Harvard Medical School",
    certifications: ["Board Certified Cardiologist", "Fellow of American College of Cardiology"],
  }

  const steps = [
    { id: 1, name: "Personal Information", icon: User, description: "Basic details and contact info" },
    { id: 2, name: "Medical History", icon: FileText, description: "Health background and conditions" },
    { id: 3, name: "Insurance & Payment", icon: CreditCard, description: "Insurance details and payment method" },
    { id: 4, name: "Appointment Preferences", icon: Calendar, description: "Date, time, and consultation type" },
    { id: 5, name: "Emergency Contact", icon: Phone, description: "Emergency contact information" },
    { id: 6, name: "Review & Confirm", icon: CheckCircle, description: "Review all details before booking" },
  ]

  const medicalConditions = [
    "Diabetes",
    "Hypertension",
    "Heart Disease",
    "Asthma",
    "Arthritis",
    "Depression",
    "Anxiety",
    "Allergies",
    "Cancer",
    "Kidney Disease",
  ]

  const medications = [
    "Aspirin",
    "Metformin",
    "Lisinopril",
    "Atorvastatin",
    "Metoprolol",
    "Amlodipine",
    "Omeprazole",
    "Levothyroxine",
    "Albuterol",
    "Warfarin",
  ]

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                currentStep >= step.id
                  ? "bg-blue-600 border-blue-600 text-white"
                  : currentStep === step.id - 1
                    ? "border-blue-300 text-blue-600"
                    : "border-gray-300 text-gray-400"
              }`}
            >
              <step.icon className="w-5 h-5" />
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-colors ${
                  currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">{steps[currentStep - 1]?.name}</h2>
        <p className="text-gray-600 text-sm">{steps[currentStep - 1]?.description}</p>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your personal information is encrypted and secure. We comply with HIPAA regulations.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </Label>
                    <Input id="firstName" placeholder="John" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name *
                    </Label>
                    <Input id="lastName" placeholder="Doe" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number *
                  </Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="dob" className="text-sm font-medium">
                    Date of Birth *
                  </Label>
                  <Input id="dob" type="date" className="mt-1" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="gender" className="text-sm font-medium">
                    Gender
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address
                  </Label>
                  <Textarea id="address" placeholder="123 Main St, City, State, ZIP" className="mt-1" rows={3} />
                </div>

                <div>
                  <Label htmlFor="occupation" className="text-sm font-medium">
                    Occupation
                  </Label>
                  <Input id="occupation" placeholder="Software Engineer" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="maritalStatus" className="text-sm font-medium">
                    Marital Status
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <Alert>
              <Activity className="h-4 w-4" />
              <AlertDescription>
                Please provide accurate medical information to help your doctor provide the best care.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Current Medical Conditions</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-4">
                    {medicalConditions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox id={condition} />
                        <Label htmlFor={condition} className="text-sm font-normal">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="allergies" className="text-sm font-medium">
                    Allergies (Food, Drug, Environmental)
                  </Label>
                  <Textarea id="allergies" placeholder="List any known allergies..." className="mt-1" rows={3} />
                </div>

                <div>
                  <Label htmlFor="surgeries" className="text-sm font-medium">
                    Previous Surgeries
                  </Label>
                  <Textarea
                    id="surgeries"
                    placeholder="List any previous surgeries with dates..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Current Medications</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-4">
                    {medications.map((medication) => (
                      <div key={medication} className="flex items-center space-x-2">
                        <Checkbox id={medication} />
                        <Label htmlFor={medication} className="text-sm font-normal">
                          {medication}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Custom Medication
                  </Button>
                </div>

                <div>
                  <Label htmlFor="familyHistory" className="text-sm font-medium">
                    Family Medical History
                  </Label>
                  <Textarea
                    id="familyHistory"
                    placeholder="Any significant family medical history..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Lifestyle Factors</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="smoking" />
                      <Label htmlFor="smoking" className="text-sm font-normal">
                        Current or former smoker
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="alcohol" />
                      <Label htmlFor="alcohol" className="text-sm font-normal">
                        Regular alcohol consumption
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exercise" />
                      <Label htmlFor="exercise" className="text-sm font-normal">
                        Regular exercise routine
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="reasonForVisit" className="text-sm font-medium">
                Primary Reason for This Visit *
              </Label>
              <Textarea
                id="reasonForVisit"
                placeholder="Please describe your symptoms or reason for consultation..."
                className="mt-1"
                rows={4}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Insurance Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="insuranceProvider" className="text-sm font-medium">
                        Insurance Provider
                      </Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select your insurance provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aetna">Aetna</SelectItem>
                          <SelectItem value="bluecross">Blue Cross Blue Shield</SelectItem>
                          <SelectItem value="cigna">Cigna</SelectItem>
                          <SelectItem value="humana">Humana</SelectItem>
                          <SelectItem value="kaiser">Kaiser Permanente</SelectItem>
                          <SelectItem value="united">United Healthcare</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="none">No Insurance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="policyNumber" className="text-sm font-medium">
                          Policy Number
                        </Label>
                        <Input id="policyNumber" placeholder="Policy #" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="groupNumber" className="text-sm font-medium">
                          Group Number
                        </Label>
                        <Input id="groupNumber" placeholder="Group #" className="mt-1" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subscriberName" className="text-sm font-medium">
                        Primary Subscriber Name
                      </Label>
                      <Input id="subscriberName" placeholder="If different from patient" className="mt-1" />
                    </div>

                    <div>
                      <Label htmlFor="relationship" className="text-sm font-medium">
                        Relationship to Subscriber
                      </Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="self">Self</SelectItem>
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="child">Child</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Information
                  </h3>

                  <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm opacity-90">Consultation Fee</span>
                        <Badge className="bg-white text-blue-600">Insurance Accepted</Badge>
                      </div>
                      <div className="text-2xl font-bold">${doctor.fee}</div>
                      <p className="text-sm opacity-90 mt-1">Final amount may vary based on insurance coverage</p>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Payment Method</Label>
                      <RadioGroup defaultValue="insurance">
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="insurance" id="insurance" />
                          <Label htmlFor="insurance" className="flex items-center cursor-pointer">
                            <Shield className="w-4 h-4 mr-2" />
                            Use Insurance (Recommended)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center cursor-pointer">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Credit/Debit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="cash" id="cash" />
                          <Label htmlFor="cash" className="flex items-center cursor-pointer">
                            <Users className="w-4 h-4 mr-2" />
                            Pay at Visit
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber" className="text-sm font-medium">
                          Card Number
                        </Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry" className="text-sm font-medium">
                            Expiry Date
                          </Label>
                          <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-sm font-medium">
                            CVV
                          </Label>
                          <Input id="cvv" placeholder="123" className="mt-1" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName" className="text-sm font-medium">
                          Cardholder Name
                        </Label>
                        <Input id="cardName" placeholder="Name on card" className="mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Preferred Appointment Time
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Preferred Days</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                          <div key={day} className="flex items-center space-x-2">
                            <Checkbox id={day} />
                            <Label htmlFor={day} className="text-sm font-normal">
                              {day}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-3 block">Preferred Time Slots</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="morning" />
                          <Label htmlFor="morning" className="text-sm font-normal">
                            Morning (8:00 AM - 12:00 PM)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="afternoon" />
                          <Label htmlFor="afternoon" className="text-sm font-normal">
                            Afternoon (12:00 PM - 5:00 PM)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="evening" />
                          <Label htmlFor="evening" className="text-sm font-normal">
                            Evening (5:00 PM - 8:00 PM)
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="urgency" className="text-sm font-medium">
                        How soon do you need this appointment?
                      </Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">As soon as possible</SelectItem>
                          <SelectItem value="week">Within a week</SelectItem>
                          <SelectItem value="month">Within a month</SelectItem>
                          <SelectItem value="flexible">I'm flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Video className="w-5 h-5 mr-2" />
                    Consultation Preferences
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Consultation Type</Label>
                      <RadioGroup defaultValue="in-person">
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="in-person" id="in-person-pref" />
                          <div className="flex-1">
                            <Label htmlFor="in-person-pref" className="flex items-center cursor-pointer font-medium">
                              <MapPin className="w-4 h-4 mr-2" />
                              In-Person Visit
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">
                              Visit the doctor's office for physical examination
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="video-call" id="video-call" />
                          <div className="flex-1">
                            <Label htmlFor="video-call" className="flex items-center cursor-pointer font-medium">
                              <Video className="w-4 h-4 mr-2" />
                              Video Consultation
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">
                              Secure video call from the comfort of your home
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="phone-call" id="phone-call" />
                          <div className="flex-1">
                            <Label htmlFor="phone-call" className="flex items-center cursor-pointer font-medium">
                              <Phone className="w-4 h-4 mr-2" />
                              Phone Consultation
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">Traditional phone call consultation</p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="language" className="text-sm font-medium">
                        Preferred Language
                      </Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctor.languages.map((lang) => (
                            <SelectItem key={lang} value={lang.toLowerCase()}>
                              {lang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="specialRequests" className="text-sm font-medium">
                        Special Requests or Accommodations
                      </Label>
                      <Textarea
                        id="specialRequests"
                        placeholder="Any special needs, accessibility requirements, or requests..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Emergency contact information is required for all appointments and will only be used in case of medical
                emergencies.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Primary Emergency Contact
                </h3>

                <div>
                  <Label htmlFor="emergencyName" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input id="emergencyName" placeholder="Emergency contact name" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="emergencyRelationship" className="text-sm font-medium">
                    Relationship *
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="emergencyPhone" className="text-sm font-medium">
                    Phone Number *
                  </Label>
                  <Input id="emergencyPhone" type="tel" placeholder="+1 (555) 123-4567" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="emergencyEmail" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input id="emergencyEmail" type="email" placeholder="emergency@example.com" className="mt-1" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Secondary Emergency Contact
                </h3>

                <div>
                  <Label htmlFor="emergencyName2" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input id="emergencyName2" placeholder="Secondary contact name" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="emergencyRelationship2" className="text-sm font-medium">
                    Relationship
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="emergencyPhone2" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input id="emergencyPhone2" type="tel" placeholder="+1 (555) 123-4567" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="emergencyEmail2" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input id="emergencyEmail2" type="email" placeholder="secondary@example.com" className="mt-1" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Information</h3>

              <div>
                <Label htmlFor="physicianName" className="text-sm font-medium">
                  Primary Care Physician
                </Label>
                <Input id="physicianName" placeholder="Dr. John Smith" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="physicianPhone" className="text-sm font-medium">
                  Primary Care Physician Phone
                </Label>
                <Input id="physicianPhone" type="tel" placeholder="+1 (555) 123-4567" className="mt-1" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="consentEmergency" />
                <Label htmlFor="consentEmergency" className="text-sm font-normal">
                  I consent to my emergency contacts being notified in case of a medical emergency during my appointment
                </Label>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Information</h2>
              <p className="text-gray-600">Please review all details before confirming your appointment</p>
            </div>

            <div className="grid gap-6">
              {/* Doctor Information */}
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-900">
                    <User className="w-5 h-5 mr-2" />
                    Doctor Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                      <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-gray-500 ml-1">({doctor.reviews})</span>
                        </div>
                        <Badge variant="secondary">{doctor.experience} years</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">${doctor.fee}</div>
                      <p className="text-gray-600 text-sm">Consultation Fee</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Name:</span>
                      <span className="ml-2">John Doe</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Email:</span>
                      <span className="ml-2">john.doe@example.com</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Phone:</span>
                      <span className="ml-2">+1 (555) 123-4567</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Date of Birth:</span>
                      <span className="ml-2">January 15, 1990</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Appointment Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Appointment Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Type:</span>
                      <span className="ml-2">In-Person Visit</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Urgency:</span>
                      <span className="ml-2">Within a week</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Language:</span>
                      <span className="ml-2">English</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Preferred Time:</span>
                      <span className="ml-2">Morning, Afternoon</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card className="border-2 border-yellow-200 bg-yellow-50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm font-normal">
                        I agree to the{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </a>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hipaa" />
                      <Label htmlFor="hipaa" className="text-sm font-normal">
                        I acknowledge that I have received and understand the{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          HIPAA Privacy Notice
                        </a>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cancellation" />
                      <Label htmlFor="cancellation" className="text-sm font-normal">
                        I understand the{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          cancellation policy
                        </a>{" "}
                        and agree to provide 24-hour notice for cancellations
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="communication" />
                      <Label htmlFor="communication" className="text-sm font-normal">
                        I consent to receive appointment reminders and health-related communications via email and SMS
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Book Detailed Appointment</h1>
            </div>
            <div className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Doctor Info Card */}
        <Card className="mb-8 shadow-xl border-0 bg-gradient-to-r from-white to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                  <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {doctor.verified && (
                  <div className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
                <p className="text-blue-600 font-semibold text-lg">{doctor.specialty}</p>
                <p className="text-gray-600">{doctor.subSpecialty}</p>
                <div className="flex items-center space-x-6 mt-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-gray-500 ml-1">({doctor.reviews} reviews)</span>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {doctor.experience} years experience
                  </Badge>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{doctor.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">${doctor.fee}</div>
                <p className="text-gray-600">Consultation Fee</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {doctor.languages.map((lang) => (
                    <Badge key={lang} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Indicator */}
        <StepIndicator />

        {/* Step Content */}
        <Card className="shadow-xl border-0 bg-white">
          <CardContent className="p-8">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            size="lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < 6 ? (
            <Button
              onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              size="lg"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm Appointment
            </Button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
