"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  MapPin,
  Video,
  Filter,
  Plus,
  X,
  Check,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { BackButton } from "@/components/BackButton"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null)
  const [calendarView, setCalendarView] = useState<"month" | "week" | "day">("month")
  const [showAddAppointment, setShowAddAppointment] = useState(false)

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      title: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: new Date(2024, 0, 15, 10, 0),
      endTime: new Date(2024, 0, 15, 10, 30),
      type: "in-person",
      location: "Manhattan Medical Center",
      status: "confirmed",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      title: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: new Date(2024, 0, 18, 14, 0),
      endTime: new Date(2024, 0, 18, 14, 45),
      type: "video",
      location: "Telemedicine",
      status: "confirmed",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 3,
      title: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      date: new Date(2024, 0, 22, 9, 0),
      endTime: new Date(2024, 0, 22, 9, 30),
      type: "in-person",
      location: "Children's Health Center",
      status: "pending",
      image: "/placeholder.svg?height=50&width=50",
    },
  ]

  const getMonthDays = (year: number, month: number) => {
    const date = new Date(year, month, 1)
    const days = []
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()

    // Add days from previous month to fill the first week
    const prevMonthDays = new Date(year, month, 0).getDate()
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      })
    }

    // Add days of current month
    while (date.getMonth() === month) {
      days.push({
        date: new Date(date),
        isCurrentMonth: true,
      })
      date.setDate(date.getDate() + 1)
    }

    // Add days from next month to complete the last week
    const lastDay = days[days.length - 1].date.getDay()
    for (let i = 1; i < 7 - lastDay; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      })
    }

    return days
  }

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(
      (appointment) =>
        appointment.date.getDate() === date.getDate() &&
        appointment.date.getMonth() === date.getMonth() &&
        appointment.date.getFullYear() === date.getFullYear(),
    )
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  }

  const handleAppointmentClick = (appointment: any) => {
    setSelectedAppointment(appointment)
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

              <h1 className="text-xl font-semibold text-gray-900">Appointment Calendar</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddAppointment(true)}
                className="flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <h3 className="font-medium">
                    {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={handleNextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="py-1">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {getMonthDays(currentDate.getFullYear(), currentDate.getMonth()).map((day, index) => {
                    const hasAppointment = appointments.some(
                      (appointment) =>
                        appointment.date.getDate() === day.date.getDate() &&
                        appointment.date.getMonth() === day.date.getMonth() &&
                        appointment.date.getFullYear() === day.date.getFullYear(),
                    )

                    const isToday =
                      day.date.getDate() === new Date().getDate() &&
                      day.date.getMonth() === new Date().getMonth() &&
                      day.date.getFullYear() === new Date().getFullYear()

                    const isSelected =
                      selectedDate &&
                      day.date.getDate() === selectedDate.getDate() &&
                      day.date.getMonth() === selectedDate.getMonth() &&
                      day.date.getFullYear() === selectedDate.getFullYear()

                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDateClick(day.date)}
                        className={`relative p-2 rounded-full text-sm ${!day.isCurrentMonth
                            ? "text-gray-400"
                            : isSelected
                              ? "bg-blue-600 text-white"
                              : isToday
                                ? "bg-blue-100 text-blue-600 font-semibold"
                                : "text-gray-900 hover:bg-gray-100"
                          }`}
                      >
                        {day.date.getDate()}
                        {hasAppointment && day.isCurrentMonth && (
                          <span
                            className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-blue-600"
                              }`}
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">View</h3>
                  <Tabs
                    value={calendarView}
                    onValueChange={(value) => setCalendarView(value as "month" | "week" | "day")}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="month">Month</TabsTrigger>
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="day">Day</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">Upcoming Appointments</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {appointments
                      .filter((appointment) => appointment.date > new Date())
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .slice(0, 3)
                      .map((appointment) => (
                        <motion.div
                          key={appointment.id}
                          whileHover={{ scale: 1.02 }}
                          className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => handleAppointmentClick(appointment)}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={appointment.image || "/placeholder.svg"} alt={appointment.title} />
                              <AvatarFallback>
                                {appointment.title
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{appointment.title}</p>
                              <p className="text-xs text-gray-500">
                                {appointment.date.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}{" "}
                                • {formatTime(appointment.date)}
                              </p>
                            </div>
                            <Badge
                              className={
                                appointment.type === "video"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-blue-100 text-blue-700"
                              }
                            >
                              {appointment.type === "video" ? (
                                <Video className="w-3 h-3 mr-1" />
                              ) : (
                                <MapPin className="w-3 h-3 mr-1" />
                              )}
                              {appointment.type === "video" ? "Video" : "In-person"}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <User className="w-5 h-5 mr-2" />
                  My Doctors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      name: "Dr. Sarah Johnson",
                      specialty: "Cardiologist",
                      image: "/placeholder.svg?height=50&width=50",
                    },
                    {
                      name: "Dr. Michael Chen",
                      specialty: "Dermatologist",
                      image: "/placeholder.svg?height=50&width=50",
                    },
                    {
                      name: "Dr. Emily Rodriguez",
                      specialty: "Pediatrician",
                      image: "/placeholder.svg?height=50&width=50",
                    },
                  ].map((doctor, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <Avatar className="w-10 h-10 mr-3">
                        <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                        <AvatarFallback>
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{doctor.name}</p>
                        <p className="text-sm text-gray-500">{doctor.specialty}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Calendar */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="lg:col-span-3 space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center text-xl">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Monthly View
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="font-medium">
                    {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleNextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())} className="ml-2">
                    Today
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                      <div key={day} className="bg-white p-2 text-center text-sm font-medium text-gray-700">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
                    {getMonthDays(currentDate.getFullYear(), currentDate.getMonth()).map((day, index) => {
                      const dayAppointments = getAppointmentsForDate(day.date)
                      const isToday =
                        day.date.getDate() === new Date().getDate() &&
                        day.date.getMonth() === new Date().getMonth() &&
                        day.date.getFullYear() === new Date().getFullYear()

                      return (
                        <div
                          key={index}
                          className={`min-h-[100px] bg-white p-2 cursor-pointer hover:bg-gray-50 ${!day.isCurrentMonth ? "bg-gray-50" : ""
                            } ${isToday ? "ring-2 ring-blue-500 ring-inset" : ""}`}
                          onClick={() => handleDateClick(day.date)}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span
                              className={`text-sm font-medium ${!day.isCurrentMonth ? "text-gray-400" : isToday ? "text-blue-600" : "text-gray-900"
                                }`}
                            >
                              {day.date.getDate()}
                            </span>
                            {dayAppointments.length > 0 && <Badge className="text-xs">{dayAppointments.length}</Badge>}
                          </div>
                          <div className="space-y-1">
                            {dayAppointments.slice(0, 2).map((appointment) => (
                              <motion.div
                                key={appointment.id}
                                whileHover={{ scale: 1.02 }}
                                className={`text-xs p-1 rounded truncate cursor-pointer ${appointment.type === "video"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-blue-100 text-blue-700"
                                  }`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleAppointmentClick(appointment)
                                }}
                              >
                                {formatTime(appointment.date)} - {appointment.title}
                              </motion.div>
                            ))}
                            {dayAppointments.length > 2 && (
                              <div className="text-xs text-gray-500 pl-1">+{dayAppointments.length - 2} more</div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appointment Details */}
            {selectedAppointment && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CalendarIcon className="w-5 h-5 mr-2" />
                        Appointment Details
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedAppointment(null)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={selectedAppointment.image || "/placeholder.svg"}
                          alt={selectedAppointment.title}
                        />
                        <AvatarFallback className="text-lg">
                          {selectedAppointment.title
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{selectedAppointment.title}</h3>
                        <p className="text-blue-600">{selectedAppointment.specialty}</p>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="space-y-1">
                            <div className="text-sm text-gray-500">Date & Time</div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-gray-400" />
                              <span>
                                {selectedAppointment.date.toLocaleDateString("en-US", {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="pl-6">
                              {formatTime(selectedAppointment.date)} - {formatTime(selectedAppointment.endTime)}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="text-sm text-gray-500">Location</div>
                            <div className="flex items-center">
                              {selectedAppointment.type === "video" ? (
                                <Video className="w-4 h-4 mr-2 text-purple-600" />
                              ) : (
                                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                              )}
                              <span>{selectedAppointment.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="text-sm text-gray-500">Status</div>
                          <Badge
                            className={
                              selectedAppointment.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            <Check className="w-3 h-3 mr-1" />
                            {selectedAppointment.status === "confirmed" ? "Confirmed" : "Pending"}
                          </Badge>
                        </div>

                        <div className="flex space-x-3 mt-6">
                          <Button className="flex-1">
                            {selectedAppointment.type === "video" ? (
                              <>
                                <Video className="w-4 h-4 mr-2" />
                                Join Video Call
                              </>
                            ) : (
                              <>
                                <MapPin className="w-4 h-4 mr-2" />
                                Get Directions
                              </>
                            )}
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Reschedule
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Add Appointment Dialog */}
      <Dialog open={showAddAppointment} onOpenChange={setShowAddAppointment}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="doctor">Select Doctor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-johnson">Dr. Sarah Johnson</SelectItem>
                  <SelectItem value="dr-chen">Dr. Michael Chen</SelectItem>
                  <SelectItem value="dr-rodriguez">Dr. Emily Rodriguez</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <input type="date" id="date" className="w-full p-2 border rounded-md" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <input type="time" id="time" className="w-full p-2 border rounded-md" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Appointment Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-person">In-Person Visit</SelectItem>
                  <SelectItem value="video">Video Consultation</SelectItem>
                  <SelectItem value="phone">Phone Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                className="w-full p-2 border rounded-md"
                rows={3}
                placeholder="Add any notes or symptoms"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddAppointment(false)}>
              Cancel
            </Button>
            <Button>Schedule Appointment</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
