"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Heart,
  Activity,
  Pill,
  Download,
  Share2,
  Plus,
  Search,
  Filter,
  ArrowLeft,
  AlertCircle,
  BarChart2,
  Stethoscope,
  Syringe,
  Thermometer,
  Droplet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BackButton } from "@/components/BackButton"

export default function HealthRecordsPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>("vitals")
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null)

  // Mock health records data
  const healthRecords = {
    vitals: [
      {
        id: 1,
        type: "Blood Pressure",
        value: "120/80 mmHg",
        date: "2024-01-15",
        status: "normal",
        history: [
          { date: "2024-01-15", value: "120/80 mmHg" },
          { date: "2023-12-15", value: "118/78 mmHg" },
          { date: "2023-11-15", value: "122/82 mmHg" },
          { date: "2023-10-15", value: "125/85 mmHg" },
        ],
        icon: <Heart className="w-5 h-5 text-red-500" />,
      },
      {
        id: 2,
        type: "Heart Rate",
        value: "72 bpm",
        date: "2024-01-15",
        status: "normal",
        history: [
          { date: "2024-01-15", value: "72 bpm" },
          { date: "2023-12-15", value: "75 bpm" },
          { date: "2023-11-15", value: "70 bpm" },
          { date: "2023-10-15", value: "68 bpm" },
        ],
        icon: <Activity className="w-5 h-5 text-pink-500" />,
      },
      {
        id: 3,
        type: "Temperature",
        value: "98.6°F",
        date: "2024-01-15",
        status: "normal",
        history: [
          { date: "2024-01-15", value: "98.6°F" },
          { date: "2023-12-15", value: "98.4°F" },
          { date: "2023-11-15", value: "98.8°F" },
          { date: "2023-10-15", value: "99.0°F" },
        ],
        icon: <Thermometer className="w-5 h-5 text-orange-500" />,
      },
      {
        id: 4,
        type: "Blood Glucose",
        value: "95 mg/dL",
        date: "2024-01-15",
        status: "normal",
        history: [
          { date: "2024-01-15", value: "95 mg/dL" },
          { date: "2023-12-15", value: "98 mg/dL" },
          { date: "2023-11-15", value: "92 mg/dL" },
          { date: "2023-10-15", value: "90 mg/dL" },
        ],
        icon: <Droplet className="w-5 h-5 text-blue-500" />,
      },
    ],
    medications: [
      {
        id: 1,
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "2023-10-01",
        endDate: "2024-04-01",
        prescribedBy: "Dr. Sarah Johnson",
        status: "active",
        instructions: "Take in the morning with food",
        refillsRemaining: 2,
        nextRefillDate: "2024-02-01",
      },
      {
        id: 2,
        name: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once daily",
        startDate: "2023-09-15",
        endDate: "2024-03-15",
        prescribedBy: "Dr. Sarah Johnson",
        status: "active",
        instructions: "Take in the evening",
        refillsRemaining: 1,
        nextRefillDate: "2024-01-25",
      },
      {
        id: 3,
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "Three times daily",
        startDate: "2023-12-10",
        endDate: "2023-12-20",
        prescribedBy: "Dr. Michael Chen",
        status: "completed",
        instructions: "Take with food. Complete full course.",
        refillsRemaining: 0,
        nextRefillDate: null,
      },
    ],
    labResults: [
      {
        id: 1,
        name: "Complete Blood Count (CBC)",
        date: "2024-01-10",
        orderedBy: "Dr. Sarah Johnson",
        status: "completed",
        results: [
          { name: "White Blood Cells", value: "7.5", unit: "K/uL", range: "4.5-11.0", status: "normal" },
          { name: "Red Blood Cells", value: "5.2", unit: "M/uL", range: "4.5-5.9", status: "normal" },
          { name: "Hemoglobin", value: "14.2", unit: "g/dL", range: "13.5-17.5", status: "normal" },
          { name: "Hematocrit", value: "42", unit: "%", range: "41-50", status: "normal" },
          { name: "Platelets", value: "250", unit: "K/uL", range: "150-450", status: "normal" },
        ],
      },
      {
        id: 2,
        name: "Lipid Panel",
        date: "2023-12-05",
        orderedBy: "Dr. Sarah Johnson",
        status: "completed",
        results: [
          { name: "Total Cholesterol", value: "195", unit: "mg/dL", range: "<200", status: "normal" },
          { name: "HDL Cholesterol", value: "45", unit: "mg/dL", range: ">40", status: "normal" },
          { name: "LDL Cholesterol", value: "130", unit: "mg/dL", range: "<130", status: "borderline" },
          { name: "Triglycerides", value: "150", unit: "mg/dL", range: "<150", status: "normal" },
        ],
      },
      {
        id: 3,
        name: "Comprehensive Metabolic Panel",
        date: "2023-11-20",
        orderedBy: "Dr. Sarah Johnson",
        status: "completed",
        results: [
          { name: "Glucose", value: "95", unit: "mg/dL", range: "70-99", status: "normal" },
          { name: "Calcium", value: "9.5", unit: "mg/dL", range: "8.5-10.2", status: "normal" },
          { name: "Sodium", value: "140", unit: "mmol/L", range: "136-145", status: "normal" },
          { name: "Potassium", value: "4.0", unit: "mmol/L", range: "3.5-5.1", status: "normal" },
          { name: "CO2", value: "24", unit: "mmol/L", range: "23-29", status: "normal" },
          { name: "Chloride", value: "102", unit: "mmol/L", range: "98-107", status: "normal" },
          { name: "BUN", value: "15", unit: "mg/dL", range: "7-20", status: "normal" },
          { name: "Creatinine", value: "0.9", unit: "mg/dL", range: "0.6-1.2", status: "normal" },
          { name: "Albumin", value: "4.0", unit: "g/dL", range: "3.4-5.4", status: "normal" },
          { name: "Total Protein", value: "7.0", unit: "g/dL", range: "6.0-8.3", status: "normal" },
          { name: "ALP", value: "70", unit: "U/L", range: "44-147", status: "normal" },
          { name: "ALT", value: "25", unit: "U/L", range: "7-55", status: "normal" },
          { name: "AST", value: "20", unit: "U/L", range: "8-48", status: "normal" },
          { name: "Bilirubin", value: "0.8", unit: "mg/dL", range: "0.1-1.2", status: "normal" },
        ],
      },
    ],
    immunizations: [
      {
        id: 1,
        name: "Influenza (Flu) Vaccine",
        date: "2023-10-15",
        administeredBy: "Dr. Emily Rodriguez",
        location: "Manhattan Medical Center",
        lotNumber: "FL2023-456",
        nextDueDate: "2024-10-15",
        status: "completed",
      },
      {
        id: 2,
        name: "COVID-19 Vaccine (Booster)",
        date: "2023-09-01",
        administeredBy: "Dr. Michael Chen",
        location: "Community Vaccination Center",
        lotNumber: "CV2023-789",
        nextDueDate: null,
        status: "completed",
      },
      {
        id: 3,
        name: "Tetanus, Diphtheria, Pertussis (Tdap)",
        date: "2020-05-10",
        administeredBy: "Dr. Sarah Johnson",
        location: "Manhattan Medical Center",
        lotNumber: "TD2020-123",
        nextDueDate: "2030-05-10",
        status: "completed",
      },
    ],
    allergies: [
      {
        id: 1,
        allergen: "Penicillin",
        reaction: "Rash, Hives",
        severity: "Moderate",
        diagnosedDate: "2018-03-15",
        notes: "Avoid all penicillin-based antibiotics",
      },
      {
        id: 2,
        allergen: "Peanuts",
        reaction: "Swelling, Difficulty breathing",
        severity: "Severe",
        diagnosedDate: "2010-07-22",
        notes: "Carries EpiPen at all times",
      },
    ],
    conditions: [
      {
        id: 1,
        name: "Hypertension",
        diagnosedDate: "2022-08-10",
        diagnosedBy: "Dr. Sarah Johnson",
        status: "active",
        treatment: "Medication (Lisinopril), Diet, Exercise",
        notes: "Well-controlled with current treatment plan",
      },
      {
        id: 2,
        name: "Hyperlipidemia",
        diagnosedDate: "2022-09-15",
        diagnosedBy: "Dr. Sarah Johnson",
        status: "active",
        treatment: "Medication (Atorvastatin), Diet",
        notes: "Monitoring cholesterol levels every 3 months",
      },
    ],
  }

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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

              <h1 className="text-xl font-semibold text-gray-900">Health Records</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search records" className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Record
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          {/* Sidebar */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card className="shadow-lg border-0 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileText className="w-5 h-5 mr-2" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={expandedSection === "vitals" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => toggleSection("vitals")}
                >
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Vital Signs
                </Button>
                <Button
                  variant={expandedSection === "medications" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => toggleSection("medications")}
                >
                  <Pill className="w-5 h-5 mr-2 text-green-500" />
                  Medications
                </Button>
                <Button
                  variant={expandedSection === "labs" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => toggleSection("labs")}
                >
                  <BarChart2 className="w-5 h-5 mr-2 text-blue-500" />
                  Lab Results
                </Button>
                <Button
                  variant={expandedSection === "immunizations" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => toggleSection("immunizations")}
                >
                  <Syringe className="w-5 h-5 mr-2 text-purple-500" />
                  Immunizations
                </Button>
                <Button
                  variant={expandedSection === "allergies" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => toggleSection("allergies")}
                >
                  <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                  Allergies
                </Button>
                <Button
                  variant={expandedSection === "conditions" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => toggleSection("conditions")}
                >
                  <Stethoscope className="w-5 h-5 mr-2 text-indigo-500" />
                  Conditions
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="lg:col-span-3 space-y-6">
            {/* Vital Signs */}
            {expandedSection === "vitals" && (
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Heart className="w-6 h-6 mr-2 text-red-500" />
                    Vital Signs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {healthRecords.vitals.map((vital) => (
                      <motion.div
                        key={vital.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                        onClick={() => setSelectedRecord(vital)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {vital.icon}
                            <h3 className="font-semibold ml-2">{vital.type}</h3>
                          </div>
                          <Badge
                            className={
                              vital.status === "normal"
                                ? "bg-green-100 text-green-700"
                                : vital.status === "high"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }
                          >
                            {vital.status}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{vital.value}</div>
                        <div className="text-sm text-gray-500">Last updated: {formatDate(vital.date)}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Medications */}
            {expandedSection === "medications" && (
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Pill className="w-6 h-6 mr-2 text-green-500" />
                    Medications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {healthRecords.medications.map((medication) => (
                      <motion.div key={medication.id} whileHover={{ scale: 1.01 }} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold">{medication.name}</h3>
                              <Badge
                                className={
                                  medication.status === "active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-700"
                                }
                              >
                                {medication.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Dosage:</span>
                                <span className="ml-2 font-medium">{medication.dosage}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Frequency:</span>
                                <span className="ml-2 font-medium">{medication.frequency}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Prescribed by:</span>
                                <span className="ml-2 font-medium">{medication.prescribedBy}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Refills remaining:</span>
                                <span className="ml-2 font-medium">{medication.refillsRemaining}</span>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">{medication.instructions}</div>
                            {medication.nextRefillDate && (
                              <div className="mt-2 text-sm">
                                <span className="text-gray-500">Next refill:</span>
                                <span className="ml-2 font-medium">{formatDate(medication.nextRefillDate)}</span>
                              </div>
                            )}
                          </div>
                          <Button variant="outline" size="sm">
                            Request Refill
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lab Results */}
            {expandedSection === "labs" && (
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <BarChart2 className="w-6 h-6 mr-2 text-blue-500" />
                    Lab Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {healthRecords.labResults.map((lab) => (
                      <motion.div key={lab.id} whileHover={{ scale: 1.01 }} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{lab.name}</h3>
                            <div className="text-sm text-gray-500">
                              {formatDate(lab.date)} • Ordered by {lab.orderedBy}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="w-4 h-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {lab.results.map((result, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm">{result.name}</span>
                                <Badge
                                  className={
                                    result.status === "normal"
                                      ? "bg-green-100 text-green-700"
                                      : result.status === "high"
                                        ? "bg-red-100 text-red-700"
                                        : result.status === "low"
                                          ? "bg-blue-100 text-blue-700"
                                          : "bg-yellow-100 text-yellow-700"
                                  }
                                >
                                  {result.status}
                                </Badge>
                              </div>
                              <div className="text-lg font-bold">
                                {result.value} {result.unit}
                              </div>
                              <div className="text-xs text-gray-500">Range: {result.range}</div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Immunizations */}
            {expandedSection === "immunizations" && (
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Syringe className="w-6 h-6 mr-2 text-purple-500" />
                    Immunizations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {healthRecords.immunizations.map((immunization) => (
                      <motion.div key={immunization.id} whileHover={{ scale: 1.01 }} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">{immunization.name}</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Date administered:</span>
                                <span className="ml-2 font-medium">{formatDate(immunization.date)}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Administered by:</span>
                                <span className="ml-2 font-medium">{immunization.administeredBy}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Location:</span>
                                <span className="ml-2 font-medium">{immunization.location}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Lot number:</span>
                                <span className="ml-2 font-medium">{immunization.lotNumber}</span>
                              </div>
                            </div>
                            {immunization.nextDueDate && (
                              <div className="mt-2 text-sm">
                                <span className="text-gray-500">Next due:</span>
                                <span className="ml-2 font-medium">{formatDate(immunization.nextDueDate)}</span>
                              </div>
                            )}
                          </div>
                          <Badge className="bg-green-100 text-green-700">{immunization.status}</Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Allergies */}
            {expandedSection === "allergies" && (
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <AlertCircle className="w-6 h-6 mr-2 text-orange-500" />
                    Allergies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {healthRecords.allergies.map((allergy) => (
                      <motion.div key={allergy.id} whileHover={{ scale: 1.01 }} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold">{allergy.allergen}</h3>
                              <Badge
                                className={
                                  allergy.severity === "Severe"
                                    ? "bg-red-100 text-red-700"
                                    : allergy.severity === "Moderate"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-green-100 text-green-700"
                                }
                              >
                                {allergy.severity}
                              </Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-gray-500">Reaction:</span>
                                <span className="ml-2 font-medium">{allergy.reaction}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Diagnosed:</span>
                                <span className="ml-2 font-medium">{formatDate(allergy.diagnosedDate)}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Notes:</span>
                                <span className="ml-2 font-medium">{allergy.notes}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Conditions */}
            {expandedSection === "conditions" && (
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Stethoscope className="w-6 h-6 mr-2 text-indigo-500" />
                    Medical Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {healthRecords.conditions.map((condition) => (
                      <motion.div key={condition.id} whileHover={{ scale: 1.01 }} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold">{condition.name}</h3>
                              <Badge
                                className={
                                  condition.status === "active"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-gray-100 text-gray-700"
                                }
                              >
                                {condition.status}
                              </Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-gray-500">Diagnosed:</span>
                                <span className="ml-2 font-medium">{formatDate(condition.diagnosedDate)}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Diagnosed by:</span>
                                <span className="ml-2 font-medium">{condition.diagnosedBy}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Treatment:</span>
                                <span className="ml-2 font-medium">{condition.treatment}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Notes:</span>
                                <span className="ml-2 font-medium">{condition.notes}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Record Detail Dialog */}
      {selectedRecord && (
        <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {selectedRecord.icon}
                <span className="ml-2">{selectedRecord.type} History</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Current Value</span>
                  <div className="text-2xl font-bold">{selectedRecord.value}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Status</span>
                  <div>
                    <Badge
                      className={
                        selectedRecord.status === "normal"
                          ? "bg-green-100 text-green-700"
                          : selectedRecord.status === "high"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {selectedRecord.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-3">Historical Data</h4>
                <div className="space-y-2">
                  {selectedRecord.history.map((entry: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">{formatDate(entry.date)}</span>
                      <span className="font-medium">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
