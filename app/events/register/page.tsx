"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building,
  AlertCircle,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { toast } from "sonner"

// Mock events data (in real app, this would come from API)
const events = [
  {
    id: "ai-bootcamp-2024",
    title: "AI Startup Bootcamp",
    date: "Dec 20-24, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "Bangalore, India",
    venue: "Tech Park Convention Center",
    price: 5000,
    maxAttendees: 50,
    currentAttendees: 45,
    category: "bootcamp",
    organizer: "UpscaleX Team",
    description: "Intensive 5-day program for AI entrepreneurs",
    requirements: ["Laptop required", "Basic programming knowledge", "Business idea or concept"],
    includes: ["All meals", "Course materials", "Certificate", "Networking sessions"],
  },
  {
    id: "investor-pitch-night",
    title: "Investor Pitch Night",
    date: "Dec 22, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Mumbai, India",
    venue: "Business Hub Auditorium",
    price: 0,
    maxAttendees: 30,
    currentAttendees: 28,
    category: "funding",
    organizer: "Mumbai Startup Network",
    description: "Present your startup to top VCs and angel investors",
    requirements: ["Prepared pitch deck", "Business plan", "Financial projections"],
    includes: ["Networking dinner", "Investor feedback", "Follow-up sessions"],
  },
]

function EventRegistrationContent() {
  const searchParams = useSearchParams()
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    designation: "",

    // Event Specific
    dietaryRequirements: "",
    specialNeeds: "",
    tshirtSize: "",

    // Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",

    // Additional
    hearAboutEvent: "",
    expectations: "",
    agreeToTerms: false,
    agreeToPhotos: false,

    // Payment (for paid events)
    paymentMethod: "",
  })

  useEffect(() => {
    const eventParam = searchParams.get("event")
    if (eventParam) {
      const event = events.find((e) => e.id === eventParam)
      if (event) {
        setSelectedEvent(event)
      }
    }
  }, [searchParams])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone)
      case 2:
        return !!(formData.emergencyName && formData.emergencyPhone && formData.emergencyRelation)
      case 3:
        if (selectedEvent?.price > 0) {
          return !!formData.paymentMethod
        }
        return formData.agreeToTerms
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    } else {
      toast.error("Please fill in all required fields")
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast.error("Please complete all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Registration successful!")
      setCurrentStep(4) // Success step
    } catch (error) {
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!selectedEvent) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link href="/events">Browse All Events</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const isFull = selectedEvent.currentAttendees >= selectedEvent.maxAttendees
  const spotsLeft = selectedEvent.maxAttendees - selectedEvent.currentAttendees

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button variant="outline" asChild className="mb-6 bg-transparent">
              <Link href="/events">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </Button>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{selectedEvent.title}</h1>
                  <p className="text-gray-600 mb-4">{selectedEvent.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span>
                        {selectedEvent.currentAttendees}/{selectedEvent.maxAttendees} registered
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center lg:text-right">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {selectedEvent.price === 0 ? "Free" : `₹${selectedEvent.price.toLocaleString()}`}
                  </div>
                  <Badge variant={isFull ? "destructive" : spotsLeft <= 5 ? "secondary" : "default"}>
                    {isFull ? "Event Full" : spotsLeft <= 5 ? `Only ${spotsLeft} spots left` : "Available"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {isFull ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold mb-4">Event is Full</h2>
                  <p className="text-gray-600 mb-8">
                    Unfortunately, this event has reached its maximum capacity. You can join the waitlist to be notified
                    if spots become available.
                  </p>
                  <div className="space-y-4">
                    <Button className="w-full sm:w-auto">Join Waitlist</Button>
                    <div>
                      <Button variant="outline" asChild>
                        <Link href="/events">Browse Other Events</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : currentStep <= 3 ? (
              <>
                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                            currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                        </div>
                        {step < 3 && (
                          <div className={`flex-1 h-1 mx-4 ${currentStep > step ? "bg-blue-600" : "bg-gray-200"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">
                      {currentStep === 1 && "Personal Information"}
                      {currentStep === 2 && "Additional Details"}
                      {currentStep === 3 && "Review & Payment"}
                    </h2>
                  </div>
                </div>

                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">
                            First Name <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              id="firstName"
                              placeholder="Enter your first name"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange("firstName", e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">
                            Last Name <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              id="lastName"
                              placeholder="Enter your last name"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange("lastName", e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              id="phone"
                              placeholder="+91 9876543210"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company/Organization</Label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              id="company"
                              placeholder="Your company name"
                              value={formData.company}
                              onChange={(e) => handleInputChange("company", e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="designation">Designation</Label>
                          <Input
                            id="designation"
                            placeholder="Your role/position"
                            value={formData.designation}
                            onChange={(e) => handleInputChange("designation", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleNext}>Continue</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 2: Additional Details */}
                {currentStep === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyName">
                            Emergency Contact Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="emergencyName"
                            placeholder="Contact person name"
                            value={formData.emergencyName}
                            onChange={(e) => handleInputChange("emergencyName", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyPhone">
                            Emergency Contact Phone <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="emergencyPhone"
                            placeholder="+91 9876543210"
                            value={formData.emergencyPhone}
                            onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyRelation">
                            Relationship <span className="text-red-500">*</span>
                          </Label>
                          <Select onValueChange={(value) => handleInputChange("emergencyRelation", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="parent">Parent</SelectItem>
                              <SelectItem value="spouse">Spouse</SelectItem>
                              <SelectItem value="sibling">Sibling</SelectItem>
                              <SelectItem value="friend">Friend</SelectItem>
                              <SelectItem value="colleague">Colleague</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dietaryRequirements">Dietary Requirements</Label>
                          <Textarea
                            id="dietaryRequirements"
                            placeholder="Any dietary restrictions or preferences..."
                            value={formData.dietaryRequirements}
                            onChange={(e) => handleInputChange("dietaryRequirements", e.target.value)}
                            className="min-h-[80px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="specialNeeds">Special Needs/Accessibility</Label>
                          <Textarea
                            id="specialNeeds"
                            placeholder="Any special accommodations needed..."
                            value={formData.specialNeeds}
                            onChange={(e) => handleInputChange("specialNeeds", e.target.value)}
                            className="min-h-[80px]"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tshirtSize">T-Shirt Size</Label>
                          <Select onValueChange={(value) => handleInputChange("tshirtSize", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="xs">XS</SelectItem>
                              <SelectItem value="s">S</SelectItem>
                              <SelectItem value="m">M</SelectItem>
                              <SelectItem value="l">L</SelectItem>
                              <SelectItem value="xl">XL</SelectItem>
                              <SelectItem value="xxl">XXL</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hearAboutEvent">How did you hear about this event?</Label>
                          <Select onValueChange={(value) => handleInputChange("hearAboutEvent", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select source" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="website">Website</SelectItem>
                              <SelectItem value="social-media">Social Media</SelectItem>
                              <SelectItem value="email">Email Newsletter</SelectItem>
                              <SelectItem value="friend">Friend/Colleague</SelectItem>
                              <SelectItem value="search">Search Engine</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expectations">What do you hope to gain from this event?</Label>
                        <Textarea
                          id="expectations"
                          placeholder="Share your expectations and goals..."
                          value={formData.expectations}
                          onChange={(e) => handleInputChange("expectations", e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCurrentStep(1)}>
                          Previous
                        </Button>
                        <Button onClick={handleNext}>Continue</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 3: Review & Payment */}
                {currentStep === 3 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Review & {selectedEvent.price > 0 ? "Payment" : "Confirmation"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Registration Summary */}
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-4">Registration Summary</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Event:</span> {selectedEvent.title}
                          </div>
                          <div>
                            <span className="font-medium">Date:</span> {selectedEvent.date}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span> {selectedEvent.time}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span> {selectedEvent.location}
                          </div>
                          <div>
                            <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> {formData.email}
                          </div>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="space-y-4">
                        <h4 className="font-semibold">What's Included:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {selectedEvent.includes.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div className="space-y-4">
                        <h4 className="font-semibold">Requirements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {selectedEvent.requirements.map((req: string, index: number) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Payment Section (for paid events) */}
                      {selectedEvent.price > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold">Payment Details</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center text-lg font-semibold">
                              <span>Total Amount:</span>
                              <span className="text-green-600">₹{selectedEvent.price.toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Payment Method <span className="text-red-500">*</span>
                            </Label>
                            <Select onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="card">Credit/Debit Card</SelectItem>
                                <SelectItem value="upi">UPI</SelectItem>
                                <SelectItem value="netbanking">Net Banking</SelectItem>
                                <SelectItem value="wallet">Digital Wallet</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      {/* Terms and Conditions */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                          />
                          <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                            I agree to the{" "}
                            <Link href="/terms" className="text-blue-600 hover:underline">
                              Terms and Conditions
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-blue-600 hover:underline">
                              Privacy Policy
                            </Link>
                            <span className="text-red-500 ml-1">*</span>
                          </Label>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeToPhotos"
                            checked={formData.agreeToPhotos}
                            onCheckedChange={(checked) => handleInputChange("agreeToPhotos", checked)}
                          />
                          <Label htmlFor="agreeToPhotos" className="text-sm">
                            I consent to being photographed/recorded during the event for promotional purposes
                          </Label>
                        </div>
                      </div>

                      {!formData.agreeToTerms && (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Please accept the terms and conditions to complete your registration.
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCurrentStep(2)}>
                          Previous
                        </Button>
                        <Button
                          onClick={handleSubmit}
                          disabled={!formData.agreeToTerms || isSubmitting}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {isSubmitting ? (
                            "Processing..."
                          ) : selectedEvent.price > 0 ? (
                            <>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Pay & Register
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Complete Registration
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              /* Success Step */
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Registration Successful!</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    You're all set for {selectedEvent.title}. We've sent a confirmation email with all the details.
                  </p>

                  <div className="bg-blue-50 p-6 rounded-lg mb-8 text-left">
                    <h3 className="font-semibold mb-4">What's Next?</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li>• Check your email for confirmation and event details</li>
                      <li>• Add the event to your calendar</li>
                      <li>• Join our event WhatsApp group (link in email)</li>
                      <li>• Prepare any required materials mentioned in the requirements</li>
                      {selectedEvent.price > 0 && <li>• Your payment receipt has been emailed to you</li>}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <Button asChild className="w-full sm:w-auto">
                      <Link href="/dashboard">View in Dashboard</Link>
                    </Button>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="outline" asChild>
                        <Link href="/events">Browse More Events</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/">Back to Home</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function EventRegistrationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventRegistrationContent />
    </Suspense>
  )
}
