"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Phone,
  MessageSquare,
  Settings,
  X,
  Maximize2,
  Minimize2,
  Send,
  PlusCircle,
  FileText,
  Camera,
  Volume2,
  VolumeX,
  ArrowLeft,
  Clock,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"

export default function TelemedicinePage() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      sender: "doctor",
      text: "Hello! How are you feeling today?",
      time: "10:02 AM",
    },
    {
      id: 2,
      sender: "patient",
      text: "I've been experiencing some chest pain and shortness of breath.",
      time: "10:03 AM",
    },
    {
      id: 3,
      sender: "doctor",
      text: "I'm sorry to hear that. Can you describe the pain? Is it sharp, dull, or pressure-like?",
      time: "10:04 AM",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [callStatus, setCallStatus] = useState<"connecting" | "connected" | "ended">("connecting")
  const [callDuration, setCallDuration] = useState(0)
  const [volume, setVolume] = useState(80)

  const videoRef = useRef<HTMLVideoElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Mock doctor data
  const doctor = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "/placeholder.svg?height=150&width=150",
  }

  useEffect(() => {
    // Simulate connecting and then connected
    const connectingTimeout = setTimeout(() => {
      setCallStatus("connected")
    }, 2000)

    return () => clearTimeout(connectingTimeout)
  }, [])

  useEffect(() => {
    // Update call duration every second when connected
    let interval: NodeJS.Timeout
    if (callStatus === "connected") {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [callStatus])

  useEffect(() => {
    // Scroll to bottom of chat when new messages arrive
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isChatOpen])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "patient",
          text: newMessage,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setNewMessage("")

      // Simulate doctor response after a delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "doctor",
            text: "Thank you for sharing that information. Based on your symptoms, I recommend...",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ])
      }, 3000)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const endCall = () => {
    setCallStatus("ended")
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
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Telemedicine Consultation</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                className={callStatus === "connected" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
              >
                {callStatus === "connecting"
                  ? "Connecting..."
                  : callStatus === "connected"
                    ? "Connected"
                    : "Call Ended"}
              </Badge>
              {callStatus === "connected" && (
                <Badge variant="outline" className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatDuration(callDuration)}
                </Badge>
              )}
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
          {/* Main Video Area */}
          <motion.div variants={itemVariants} className={`${isChatOpen ? "lg:col-span-2" : "lg:col-span-3"}`}>
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="relative bg-black aspect-video w-full">
                {callStatus === "connecting" ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    >
                      <Avatar className="w-24 h-24 border-4 border-white/20">
                        <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                        <AvatarFallback className="text-3xl bg-blue-600">
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <h2 className="text-xl font-semibold mt-4">{doctor.name}</h2>
                    <p className="text-blue-300">{doctor.specialty}</p>
                    <div className="mt-6 flex items-center">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-blue-400 mr-2"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      />
                      <span>Connecting to secure video call...</span>
                    </div>
                  </div>
                ) : callStatus === "ended" ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gray-900">
                    <Phone className="w-16 h-16 text-red-500 mb-4" />
                    <h2 className="text-2xl font-semibold">Call Ended</h2>
                    <p className="text-gray-400 mt-2">Duration: {formatDuration(callDuration)}</p>
                    <div className="mt-8">
                      <Button className="bg-blue-600 hover:bg-blue-700">Return to Dashboard</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg?height=720&width=1280"
                      autoPlay
                      muted
                    />

                    {/* Doctor info overlay */}
                    <div className="absolute top-4 left-4 flex items-center bg-black/50 rounded-lg p-2 text-white">
                      <Avatar className="w-10 h-10 mr-3">
                        <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                        <AvatarFallback className="bg-blue-600">
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{doctor.name}</div>
                        <div className="text-xs text-blue-300">{doctor.specialty}</div>
                      </div>
                    </div>

                    {/* Self view */}
                    <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-900 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                      <div className="relative w-full h-full">
                        <img
                          src="/placeholder.svg?height=180&width=240"
                          alt="Self view"
                          className="w-full h-full object-cover"
                        />
                        {isVideoOff && (
                          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                            <User className="w-8 h-8 text-white/50" />
                          </div>
                        )}
                        <div className="absolute bottom-2 right-2">
                          {isMuted && (
                            <Badge className="bg-red-500 text-white">
                              <MicOff className="w-3 h-3" />
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {callStatus === "connected" && (
                <div className="bg-gray-900 p-4">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            className={`rounded-full p-3 ${isMuted ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-800 text-white hover:bg-gray-700"}`}
                            onClick={() => setIsMuted(!isMuted)}
                          >
                            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isMuted ? "Unmute" : "Mute"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            className={`rounded-full p-3 ${isVideoOff ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-800 text-white hover:bg-gray-700"}`}
                            onClick={() => setIsVideoOff(!isVideoOff)}
                          >
                            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isVideoOff ? "Turn on camera" : "Turn off camera"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full p-3 bg-gray-800 text-white hover:bg-gray-700"
                            onClick={() => setIsChatOpen(!isChatOpen)}
                          >
                            <MessageSquare className="w-6 h-6" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Chat</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="lg"
                          className="rounded-full p-3 bg-gray-800 text-white hover:bg-gray-700"
                        >
                          <Settings className="w-6 h-6" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Call Settings</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span>Speaker Volume</span>
                              <span>{volume}%</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <VolumeX className="w-4 h-4 text-gray-500" />
                              <Slider
                                value={[volume]}
                                onValueChange={(value) => setVolume(value[0])}
                                max={100}
                                step={1}
                              />
                              <Volume2 className="w-4 h-4 text-gray-500" />
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <h4 className="font-medium">Video Input</h4>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="FaceTime HD Camera" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="facetime">FaceTime HD Camera</SelectItem>
                                <SelectItem value="external">External Webcam</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium">Audio Input</h4>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Built-in Microphone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="builtin">Built-in Microphone</SelectItem>
                                <SelectItem value="headset">Headset Microphone</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium">Audio Output</h4>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Built-in Speakers" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="speakers">Built-in Speakers</SelectItem>
                                <SelectItem value="headphones">Headphones</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full p-3 bg-gray-800 text-white hover:bg-gray-700"
                            onClick={toggleFullscreen}
                          >
                            {isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Button
                      size="lg"
                      className="rounded-full p-3 bg-red-600 text-white hover:bg-red-700"
                      onClick={endCall}
                    >
                      <Phone className="w-6 h-6 rotate-135" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {callStatus === "connected" && (
              <motion.div variants={itemVariants} className="mt-6 space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="w-5 h-5 mr-2" />
                      Consultation Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="symptoms">
                      <TabsList className="w-full">
                        <TabsTrigger value="symptoms" className="flex-1">
                          Symptoms
                        </TabsTrigger>
                        <TabsTrigger value="diagnosis" className="flex-1">
                          Diagnosis
                        </TabsTrigger>
                        <TabsTrigger value="treatment" className="flex-1">
                          Treatment
                        </TabsTrigger>
                        <TabsTrigger value="followup" className="flex-1">
                          Follow-up
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="symptoms" className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-start space-x-2">
                            <Badge className="mt-1">Primary</Badge>
                            <div>
                              <p className="font-medium">Chest pain and shortness of breath</p>
                              <p className="text-sm text-gray-600">
                                Patient reports intermittent chest pain that worsens with exertion. Describes it as a
                                pressure-like sensation.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Badge variant="outline" className="mt-1">
                              Secondary
                            </Badge>
                            <div>
                              <p className="font-medium">Fatigue</p>
                              <p className="text-sm text-gray-600">
                                Patient reports feeling more tired than usual for the past 2 weeks.
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="mt-2">
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add Symptom
                          </Button>
                        </div>
                      </TabsContent>
                      <TabsContent value="diagnosis" className="p-4">
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">
                            Based on the symptoms described, possible diagnoses include:
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></div>
                              <div>
                                <p className="font-medium">Angina Pectoris</p>
                                <p className="text-sm text-gray-600">
                                  Chest pain caused by reduced blood flow to the heart muscle.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></div>
                              <div>
                                <p className="font-medium">Anxiety</p>
                                <p className="text-sm text-gray-600">Can cause chest pain and shortness of breath.</p>
                              </div>
                            </li>
                          </ul>
                          <p className="text-sm text-gray-600 mt-4">Further tests recommended to confirm diagnosis.</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="treatment" className="p-4">
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">Recommended treatment plan:</p>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 mr-2"></div>
                              <div>
                                <p className="font-medium">Diagnostic Testing</p>
                                <p className="text-sm text-gray-600">ECG and stress test to evaluate heart function.</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 mr-2"></div>
                              <div>
                                <p className="font-medium">Medication</p>
                                <p className="text-sm text-gray-600">
                                  Consider nitroglycerin for acute chest pain if diagnosis confirms angina.
                                </p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </TabsContent>
                      <TabsContent value="followup" className="p-4">
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">Follow-up recommendations:</p>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 mr-2"></div>
                              <div>
                                <p className="font-medium">In-person appointment</p>
                                <p className="text-sm text-gray-600">
                                  Schedule within 1 week for physical examination and ECG.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 mr-2"></div>
                              <div>
                                <p className="font-medium">Stress Test</p>
                                <p className="text-sm text-gray-600">
                                  Schedule at Manhattan Medical Center within 2 weeks.
                                </p>
                              </div>
                            </li>
                          </ul>
                          <Button className="mt-2">Schedule Follow-up</Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>

          {/* Chat Panel */}
          {isChatOpen && callStatus === "connected" && (
            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="lg:col-span-1">
              <Card className="shadow-xl border-0 h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-lg">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Chat
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsChatOpen(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "patient" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "patient" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p>{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === "patient" ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                </CardContent>
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[60px]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button className="h-[60px] px-3" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="flex justify-between mt-2">
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <PlusCircle className="w-4 h-4 mr-1" />
                      Attach
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <Camera className="w-4 h-4 mr-1" />
                      Photo
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
