"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Star,
  Calendar,
  Users,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"

export default function DoctorAppointmentLanding() {
  const { t, isRTL } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")

  const featuredDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.9,
      reviews: 127,
      experience: "15 years",
      image: "/placeholder.svg?height=120&width=120",
      available: "Today",
      fee: "$150",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      rating: 4.8,
      reviews: 89,
      experience: "12 years",
      image: "/placeholder.svg?height=120&width=120",
      available: "Tomorrow",
      fee: "$120",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      rating: 4.9,
      reviews: 156,
      experience: "18 years",
      image: "/placeholder.svg?height=120&width=120",
      available: "Today",
      fee: "$100",
    },
  ]

  const testimonials = [
    {
      name: "Jennifer Smith",
      rating: 5,
      comment: "Amazing platform! Booking was so easy and Dr. Johnson was fantastic.",
      date: "2 days ago",
    },
    {
      name: "Robert Wilson",
      rating: 5,
      comment: "Great experience with telemedicine. Very convenient and professional.",
      date: "1 week ago",
    },
    {
      name: "Maria Garcia",
      rating: 4,
      comment: "Found the perfect pediatrician for my kids. Highly recommend!",
      date: "2 weeks ago",
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
    "ENT",
    "General Medicine",
  ]

  return (
    <div className={`min-h-screen bg-white ${isRTL ? "rtl" : "ltr"}`}>
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">MediBook</span>
              </div>
            </div>

            <div className="hidden md:block">
              <div className={`ml-10 flex items-baseline space-x-4 ${isRTL ? "space-x-reverse" : ""}`}>
                <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  {t("nav.findDoctors")}
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  {t("nav.howItWorks")}
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  {t("nav.about")}
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  {t("nav.contact")}
                </a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <LanguageSwitcher />

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">{t("nav.login")}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Welcome Back</DialogTitle>
                  </DialogHeader>
                  <LoginForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>{t("nav.signup")}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create Your Account</DialogTitle>
                  </DialogHeader>
                  <SignupForm />
                </DialogContent>
              </Dialog>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <LanguageSwitcher />
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#" className="text-gray-900 block px-3 py-2 text-base font-medium">
                {t("nav.findDoctors")}
              </a>
              <a href="#" className="text-gray-500 block px-3 py-2 text-base font-medium">
                {t("nav.howItWorks")}
              </a>
              <a href="#" className="text-gray-500 block px-3 py-2 text-base font-medium">
                {t("nav.about")}
              </a>
              <a href="#" className="text-gray-500 block px-3 py-2 text-base font-medium">
                {t("nav.contact")}
              </a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3 space-x-3">
                  <Button variant="ghost" className="w-full">
                    {t("nav.login")}
                  </Button>
                  <Button className="w-full">{t("nav.signup")}</Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">{t("hero.title")}</h1>
                <p className="text-xl text-gray-600 leading-relaxed">{t("hero.subtitle")}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-3">
                  {t("hero.bookNow")}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  {t("hero.exploreDoctors")}
                </Button>
              </div>

              <div className={`flex items-center space-x-8 text-sm text-gray-600 ${isRTL ? "space-x-reverse" : ""}`}>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>{t("hero.verifiedDoctors")}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span>{t("hero.support247")}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Doctor consultation"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-indigo-200 rounded-full opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Doctor Search Bar */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg border p-8"
          >
            <h2 className="text-2xl font-bold text-center mb-8">{t("search.findPerfectDoctor")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specialty">{t("search.specialty")}</Label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("search.selectSpecialty")} />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty.toLowerCase()}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">{t("search.location")}</Label>
                <div className="relative">
                  <MapPin className={`absolute top-3 w-4 h-4 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} />
                  <Input placeholder={t("search.enterLocation")} className={isRTL ? "pr-10" : "pl-10"} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">{t("search.availability")}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={t("search.anyTime")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">{t("search.today")}</SelectItem>
                    <SelectItem value="tomorrow">{t("search.tomorrow")}</SelectItem>
                    <SelectItem value="this-week">{t("search.thisWeek")}</SelectItem>
                    <SelectItem value="next-week">{t("search.nextWeek")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="w-full">
                  <Search className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t("search.search")}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("doctors.featuredDoctors")}</h2>
            <p className="text-lg text-gray-600">{t("doctors.topRatedProfessionals")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                      <AvatarFallback>
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className={`font-medium ${isRTL ? "mr-1" : "ml-1"}`}>{doctor.rating}</span>
                        <span className={`text-gray-500 ${isRTL ? "mr-1" : "ml-1"}`}>
                          ({doctor.reviews} {t("doctors.reviews")})
                        </span>
                      </div>
                      <Badge variant="secondary">{doctor.experience}</Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-green-600">
                        <Clock className={`w-4 h-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                        <span>
                          {t("doctors.available")} {doctor.available}
                        </span>
                      </div>
                      <span className="font-semibold text-lg">{doctor.fee}</span>
                    </div>

                    <Button className="w-full">{t("doctors.bookAppointment")}</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("howItWorks.title")}</h2>
            <p className="text-lg text-gray-600">{t("howItWorks.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: t("howItWorks.searchDoctor.title"),
                description: t("howItWorks.searchDoctor.description"),
                icon: Search,
              },
              {
                step: "2",
                title: t("howItWorks.bookAppointment.title"),
                description: t("howItWorks.bookAppointment.description"),
                icon: Calendar,
              },
              {
                step: "3",
                title: t("howItWorks.getConsultation.title"),
                description: t("howItWorks.getConsultation.description"),
                icon: Users,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("testimonials.title")}</h2>
            <p className="text-lg text-gray-600">{t("testimonials.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{testimonial.name}</span>
                      <span className="text-sm text-gray-500">{testimonial.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">{t("cta.title")}</h2>
            <p className="text-xl text-blue-100">{t("cta.subtitle")}</p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              {t("cta.getStarted")}
              <ArrowRight className={`w-5 h-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xl font-bold ${isRTL ? "mr-2" : "ml-2"}`}>MediBook</span>
              </div>
              <p className="text-gray-400">{t("footer.description")}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    {t("footer.findDoctors")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    {t("footer.bookAppointment")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    {t("footer.telemedicine")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    {t("footer.healthRecords")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.support")}</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    {t("footer.helpCenter")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    {t("footer.contactUs")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    {t("footer.privacyPolicy")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    {t("footer.termsOfService")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.contactInfo")}</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <Phone className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Mail className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  <span>support@medibook.com</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <MapPin className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  <span>123 Medical St, Health City</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 MediBook. {t("footer.allRightsReserved")}.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Login Form Component
function LoginForm() {
  const { t } = useLanguage()

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{t("forms.email")}</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{t("forms.password")}</Label>
        <Input id="password" type="password" />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-sm">
          {t("forms.rememberMe")}
        </Label>
      </div>
      <Button className="w-full">{t("nav.login")}</Button>
      <div className="text-center">
        <a href="#" className="text-sm text-blue-600 hover:underline">
          {t("forms.forgotPassword")}
        </a>
      </div>
    </div>
  )
}

// Signup Form Component
function SignupForm() {
  const { t } = useLanguage()

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t("forms.firstName")}</Label>
          <Input id="firstName" placeholder="John" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t("forms.lastName")}</Label>
          <Input id="lastName" placeholder="Doe" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t("forms.email")}</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">{t("forms.phone")}</Label>
        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{t("forms.password")}</Label>
        <Input id="password" type="password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="userType">{t("forms.iAmA")}</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select user type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="patient">{t("forms.patient")}</SelectItem>
            <SelectItem value="doctor">{t("forms.doctor")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms" className="text-sm">
          {t("forms.agreeToTerms")}{" "}
          <a href="#" className="text-blue-600 hover:underline">
            {t("footer.termsOfService")}
          </a>{" "}
          {t("forms.and")}{" "}
          <a href="#" className="text-blue-600 hover:underline">
            {t("footer.privacyPolicy")}
          </a>
        </Label>
      </div>
      <Button className="w-full">{t("forms.createAccount")}</Button>
    </div>
  )
}
