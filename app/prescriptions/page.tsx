"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Pill,
  Calendar,
  AlertCircle,
  RefreshCw,
  Download,
  Share2,
  Search,
  Filter,
  ArrowLeft,
  Bell,
  MapPin,
  Truck,
  ShoppingCart,
  Eye,
  FileText,
  Printer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BackButton } from "@/components/BackButton"

export default function PrescriptionsPage() {
  const [selectedPrescription, setSelectedPrescription] = useState<any | null>(null)
  const [showRefillDialog, setShowRefillDialog] = useState(false)
  const [showPharmacyDialog, setShowPharmacyDialog] = useState(false)

  // Mock prescriptions data
  const prescriptions = [
    {
      id: 1,
      name: "Lisinopril",
      genericName: "Lisinopril",
      strength: "10mg",
      form: "Tablet",
      quantity: 30,
      refillsRemaining: 2,
      totalRefills: 5,
      prescribedDate: "2023-10-01",
      expirationDate: "2024-04-01",
      lastFilled: "2024-01-01",
      nextRefillDate: "2024-02-01",
      prescribedBy: {
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        image: "/placeholder.svg?height=50&width=50",
      },
      instructions: "Take one tablet by mouth once daily in the morning with food",
      indication: "High Blood Pressure",
      status: "active",
      pharmacy: {
        name: "CVS Pharmacy",
        address: "123 Main St, New York, NY 10001",
        phone: "(555) 123-4567",
      },
      sideEffects: ["Dizziness", "Dry cough", "Fatigue", "Headache"],
      interactions: ["Potassium supplements", "NSAIDs", "Lithium"],
      cost: {
        copay: 10,
        insurance: "Blue Cross Blue Shield",
        totalCost: 45,
      },
    },
    {
      id: 2,
      name: "Atorvastatin",
      genericName: "Atorvastatin Calcium",
      strength: "20mg",
      form: "Tablet",
      quantity: 30,
      refillsRemaining: 1,
      totalRefills: 5,
      prescribedDate: "2023-09-15",
      expirationDate: "2024-03-15",
      lastFilled: "2023-12-15",
      nextRefillDate: "2024-01-25",
      prescribedBy: {
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        image: "/placeholder.svg?height=50&width=50",
      },
      instructions: "Take one tablet by mouth once daily in the evening",
      indication: "High Cholesterol",
      status: "active",
      pharmacy: {
        name: "CVS Pharmacy",
        address: "123 Main St, New York, NY 10001",
        phone: "(555) 123-4567",
      },
      sideEffects: ["Muscle pain", "Liver problems", "Digestive issues"],
      interactions: ["Grapefruit juice", "Warfarin", "Digoxin"],
      cost: {
        copay: 15,
        insurance: "Blue Cross Blue Shield",
        totalCost: 60,
      },
    },
    {
      id: 3,
      name: "Amoxicillin",
      genericName: "Amoxicillin",
      strength: "500mg",
      form: "Capsule",
      quantity: 21,
      refillsRemaining: 0,
      totalRefills: 0,
      prescribedDate: "2023-12-10",
      expirationDate: "2023-12-20",
      lastFilled: "2023-12-10",
      nextRefillDate: null,
      prescribedBy: {
        name: "Dr. Michael Chen",
        specialty: "Family Medicine",
        image: "/placeholder.svg?height=50&width=50",
      },
      instructions: "Take one capsule by mouth three times daily with food for 7 days",
      indication: "Bacterial Infection",
      status: "completed",
      pharmacy: {
        name: "Walgreens",
        address: "456 Oak Ave, New York, NY 10002",
        phone: "(555) 987-6543",
      },
      sideEffects: ["Nausea", "Diarrhea", "Stomach upset"],
      interactions: ["Birth control pills", "Warfarin"],
      cost: {
        copay: 5,
        insurance: "Blue Cross Blue Shield",
        totalCost: 25,
      },
    },
  ]

  const pharmacies = [
    {
      id: 1,
      name: "CVS Pharmacy",
      address: "123 Main St, New York, NY 10001",
      phone: "(555) 123-4567",
      hours: "Mon-Fri: 8AM-10PM, Sat-Sun: 9AM-9PM",
      distance: "0.5 miles",
      rating: 4.2,
      services: ["Drive-thru", "24/7 Pharmacy", "Delivery", "Immunizations"],
    },
    {
      id: 2,
      name: "Walgreens",
      address: "456 Oak Ave, New York, NY 10002",
      phone: "(555) 987-6543",
      hours: "Mon-Fri: 7AM-11PM, Sat-Sun: 8AM-10PM",
      distance: "0.8 miles",
      rating: 4.0,
      services: ["Drive-thru", "Delivery", "Immunizations", "Health Clinic"],
    },
    {
      id: 3,
      name: "Rite Aid",
      address: "789 Pine St, New York, NY 10003",
      phone: "(555) 456-7890",
      hours: "Mon-Fri: 8AM-9PM, Sat-Sun: 9AM-8PM",
      distance: "1.2 miles",
      rating: 3.8,
      services: ["Drive-thru", "Delivery", "Wellness+"],
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDaysUntilRefill = (nextRefillDate: string) => {
    const today = new Date()
    const refillDate = new Date(nextRefillDate)
    const diffTime = refillDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BackButton />

              <h1 className="text-xl font-semibold text-gray-900">Prescriptions</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search prescriptions" className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" onClick={() => setShowPharmacyDialog(true)}>
                <MapPin className="w-4 h-4 mr-2" />
                Find Pharmacy
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Pill className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                    <RefreshCw className="w-6 h-6" />
                    <span>Refill All</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Bell className="w-6 h-6" />
                    <span>Set Reminders</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Truck className="w-6 h-6" />
                    <span>Track Delivery</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <FileText className="w-6 h-6" />
                    <span>Prescription History</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Prescription Alerts */}
          <motion.div variants={itemVariants}>
            <Alert className="border-orange-200 bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Refill Reminder:</strong> Atorvastatin is due for refill in 3 days.
                <Button variant="link" className="p-0 ml-2 text-orange-600 underline">
                  Refill now
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Prescriptions List */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active">Active Prescriptions</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="all">All Prescriptions</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {prescriptions
                    .filter((prescription) => prescription.status === "active")
                    .map((prescription) => (
                      <motion.div
                        key={prescription.id}
                        whileHover={{ scale: 1.02 }}
                        className="cursor-pointer"
                        onClick={() => setSelectedPrescription(prescription)}
                      >
                        <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                  <Pill className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold">{prescription.name}</h3>
                                  <p className="text-sm text-gray-600">
                                    {prescription.strength} {prescription.form}
                                  </p>
                                </div>
                              </div>
                              <Badge
                                className={
                                  prescription.refillsRemaining > 0
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }
                              >
                                {prescription.refillsRemaining} refills left
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Prescribed by:</span>
                                <div className="flex items-center mt-1">
                                  <Avatar className="w-6 h-6 mr-2">
                                    <AvatarImage src={prescription.prescribedBy.image || "/placeholder.svg"} />
                                    <AvatarFallback className="text-xs">
                                      {prescription.prescribedBy.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">{prescription.prescribedBy.name}</span>
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-500">Pharmacy:</span>
                                <p className="font-medium mt-1">{prescription.pharmacy.name}</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Refill Progress</span>
                                <span>
                                  {prescription.totalRefills - prescription.refillsRemaining} of{" "}
                                  {prescription.totalRefills} used
                                </span>
                              </div>
                              <Progress
                                value={
                                  ((prescription.totalRefills - prescription.refillsRemaining) /
                                    prescription.totalRefills) *
                                  100
                                }
                                className="h-2"
                              />
                            </div>

                            {prescription.nextRefillDate && (
                              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                                  <span className="text-sm">
                                    Next refill: {formatDate(prescription.nextRefillDate)}
                                  </span>
                                </div>
                                <span className="text-sm font-medium text-blue-600">
                                  {getDaysUntilRefill(prescription.nextRefillDate)} days
                                </span>
                              </div>
                            )}

                            <div className="flex space-x-2">
                              <Button
                                className="flex-1"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setShowRefillDialog(true)
                                }}
                                disabled={prescription.refillsRemaining === 0}
                              >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Refill
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {prescriptions
                    .filter((prescription) => prescription.status === "completed")
                    .map((prescription) => (
                      <motion.div
                        key={prescription.id}
                        whileHover={{ scale: 1.02 }}
                        className="cursor-pointer"
                        onClick={() => setSelectedPrescription(prescription)}
                      >
                        <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow opacity-75">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
                                  <Pill className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold">{prescription.name}</h3>
                                  <p className="text-sm text-gray-600">
                                    {prescription.strength} {prescription.form}
                                  </p>
                                </div>
                              </div>
                              <Badge className="bg-gray-100 text-gray-700">Completed</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Prescribed by:</span>
                                <p className="font-medium mt-1">{prescription.prescribedBy.name}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Completed:</span>
                                <p className="font-medium mt-1">{formatDate(prescription.expirationDate)}</p>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button variant="outline" className="flex-1">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <Printer className="w-4 h-4 mr-2" />
                                Print
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {prescriptions.map((prescription) => (
                    <motion.div
                      key={prescription.id}
                      whileHover={{ scale: 1.02 }}
                      className="cursor-pointer"
                      onClick={() => setSelectedPrescription(prescription)}
                    >
                      <Card
                        className={`shadow-lg border-0 hover:shadow-xl transition-shadow ${prescription.status === "completed" ? "opacity-75" : ""
                          }`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-12 h-12 rounded-lg flex items-center justify-center ${prescription.status === "active"
                                    ? "bg-gradient-to-br from-blue-500 to-purple-600"
                                    : "bg-gray-400"
                                  }`}
                              >
                                <Pill className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold">{prescription.name}</h3>
                                <p className="text-sm text-gray-600">
                                  {prescription.strength} {prescription.form}
                                </p>
                              </div>
                            </div>
                            <Badge
                              className={
                                prescription.status === "active"
                                  ? prescription.refillsRemaining > 0
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-700"
                              }
                            >
                              {prescription.status === "active"
                                ? `${prescription.refillsRemaining} refills left`
                                : "Completed"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Prescribed by:</span>
                              <p className="font-medium mt-1">{prescription.prescribedBy.name}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">
                                {prescription.status === "active" ? "Pharmacy:" : "Completed:"}
                              </span>
                              <p className="font-medium mt-1">
                                {prescription.status === "active"
                                  ? prescription.pharmacy.name
                                  : formatDate(prescription.expirationDate)}
                              </p>
                            </div>
                          </div>

                          {prescription.status === "active" && (
                            <>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Refill Progress</span>
                                  <span>
                                    {prescription.totalRefills - prescription.refillsRemaining} of{" "}
                                    {prescription.totalRefills} used
                                  </span>
                                </div>
                                <Progress
                                  value={
                                    ((prescription.totalRefills - prescription.refillsRemaining) /
                                      prescription.totalRefills) *
                                    100
                                  }
                                  className="h-2"
                                />
                              </div>

                              <div className="flex space-x-2">
                                <Button
                                  className="flex-1"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setShowRefillDialog(true)
                                  }}
                                  disabled={prescription.refillsRemaining === 0}
                                >
                                  <RefreshCw className="w-4 h-4 mr-2" />
                                  Refill
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                              </div>
                            </>
                          )}

                          {prescription.status === "completed" && (
                            <div className="flex space-x-2">
                              <Button variant="outline" className="flex-1">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <Printer className="w-4 h-4 mr-2" />
                                Print
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>

      {/* Prescription Detail Dialog */}
      {selectedPrescription && (
        <Dialog open={!!selectedPrescription} onOpenChange={() => setSelectedPrescription(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Pill className="w-6 h-6 mr-2" />
                {selectedPrescription.name} - Prescription Details
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Medication Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Brand Name:</span>
                      <p className="font-medium">{selectedPrescription.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Generic Name:</span>
                      <p className="font-medium">{selectedPrescription.genericName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Strength & Form:</span>
                      <p className="font-medium">
                        {selectedPrescription.strength} {selectedPrescription.form}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Quantity:</span>
                      <p className="font-medium">{selectedPrescription.quantity}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Indication:</span>
                      <p className="font-medium">{selectedPrescription.indication}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Prescription Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Prescribed Date:</span>
                      <p className="font-medium">{formatDate(selectedPrescription.prescribedDate)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Expiration Date:</span>
                      <p className="font-medium">{formatDate(selectedPrescription.expirationDate)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Last Filled:</span>
                      <p className="font-medium">{formatDate(selectedPrescription.lastFilled)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Refills:</span>
                      <p className="font-medium">
                        {selectedPrescription.refillsRemaining} of {selectedPrescription.totalRefills} remaining
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Status:</span>
                      <Badge
                        className={
                          selectedPrescription.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }
                      >
                        {selectedPrescription.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{selectedPrescription.instructions}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Prescribing Doctor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={selectedPrescription.prescribedBy.image || "/placeholder.svg"} />
                        <AvatarFallback>
                          {selectedPrescription.prescribedBy.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedPrescription.prescribedBy.name}</p>
                        <p className="text-sm text-gray-600">{selectedPrescription.prescribedBy.specialty}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pharmacy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-medium">{selectedPrescription.pharmacy.name}</p>
                    <p className="text-sm text-gray-600">{selectedPrescription.pharmacy.address}</p>
                    <p className="text-sm text-gray-600">{selectedPrescription.pharmacy.phone}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Side Effects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {selectedPrescription.sideEffects.map((effect: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700">
                          • {effect}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Drug Interactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {selectedPrescription.interactions.map((interaction: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700">
                          • {interaction}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cost Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Your Copay:</span>
                      <p className="text-lg font-bold text-green-600">${selectedPrescription.cost.copay}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Total Cost:</span>
                      <p className="text-lg font-bold">${selectedPrescription.cost.totalCost}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Insurance:</span>
                      <p className="font-medium">{selectedPrescription.cost.insurance}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-3">
                <Button className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refill Prescription
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Doctor
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Refill Dialog */}
      <Dialog open={showRefillDialog} onOpenChange={setShowRefillDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Refill Prescription</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="pharmacy">Select Pharmacy</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose pharmacy" />
                </SelectTrigger>
                <SelectContent>
                  {pharmacies.map((pharmacy) => (
                    <SelectItem key={pharmacy.id} value={pharmacy.id.toString()}>
                      {pharmacy.name} - {pharmacy.distance}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="delivery">Delivery Option</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select delivery option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pickup">Pickup at pharmacy</SelectItem>
                  <SelectItem value="delivery">Home delivery (+$5)</SelectItem>
                  <SelectItem value="express">Express delivery (+$15)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Special Instructions</Label>
              <Textarea
                id="notes"
                placeholder="Any special instructions for the pharmacy..."
                className="mt-1"
                rows={3}
              />
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your prescription will be ready for pickup in 2-4 hours. You'll receive a text notification when it's
                ready.
              </AlertDescription>
            </Alert>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowRefillDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowRefillDialog(false)}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Request Refill
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pharmacy Finder Dialog */}
      <Dialog open={showPharmacyDialog} onOpenChange={setShowPharmacyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Find Nearby Pharmacies</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Enter your address or zip code" className="pl-10" />
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {pharmacies.map((pharmacy) => (
                <Card key={pharmacy.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{pharmacy.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{pharmacy.address}</p>
                        <p className="text-sm text-gray-600">{pharmacy.phone}</p>
                        <p className="text-sm text-gray-600 mt-2">{pharmacy.hours}</p>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {pharmacy.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-medium mr-1">{pharmacy.rating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-xs ${i < Math.floor(pharmacy.rating) ? "text-yellow-400" : "text-gray-300"
                                  }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-blue-600 font-medium">{pharmacy.distance}</p>
                        <Button size="sm" className="mt-2">
                          Select Pharmacy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
