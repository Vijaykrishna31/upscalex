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
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  X,
  AlertCircle,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  FileUp,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

const services = [
  { id: "mentorship-1on1", title: "1-on-1 Mentorship", category: "mentorship" },
  { id: "legal-services", title: "Legal Services for Startups", category: "legal" },
  { id: "tech-internship", title: "Tech Internship Program", category: "internship" },
  { id: "startup-bootcamp", title: "Startup Bootcamp", category: "bootcamp" },
  { id: "funding-connect", title: "Funding Connect", category: "funding" },
  { id: "scaling-workshop", title: "Business Scaling Workshop", category: "workshop" },
]

interface FileUpload {
  file: File
  progress: number
  status: "pending" | "uploading" | "completed" | "error"
  id: string
}

function ApplyPageContent() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([])
  const [notifications, setNotifications] = useState<string[]>([])

  const [formData, setFormData] = useState({
    // Step 1: Service Selection
    serviceId: "",
    serviceCategory: "",

    // Step 2: Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
    experience: "",
    linkedin: "",
    website: "",

    // Step 3: Application Details
    motivation: "",
    goals: "",
    expectations: "",
    availability: "",
    previousExperience: "",

    // Step 4: Additional Information
    hearAboutUs: "",
    additionalInfo: "",
    agreeToTerms: false,
    subscribeToUpdates: false,
  })

  // Initialize form with URL parameters - Fixed to prevent infinite loops
  useEffect(() => {
    const serviceParam = searchParams.get("service")
    const categoryParam = searchParams.get("category")

    if (serviceParam && !formData.serviceId) {
      setSelectedService(serviceParam)
      setFormData((prev) => ({
        ...prev,
        serviceId: serviceParam,
        serviceCategory: categoryParam || "",
      }))
    }
  }, [searchParams, formData.serviceId]) // Added formData.serviceId to dependency array

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotifications((prev) => [...prev, message])
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1))
    }, 3000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach((file) => {
      const fileUpload: FileUpload = {
        file,
        progress: 0,
        status: "pending",
        id: Math.random().toString(36).substr(2, 9),
      }

      setUploadedFiles((prev) => [...prev, fileUpload])

      // Simulate file upload
      simulateFileUpload(fileUpload.id)
    })
  }

  const simulateFileUpload = (fileId: string) => {
    setUploadedFiles((prev) =>
      prev.map((file) => (file.id === fileId ? { ...file, status: "uploading" as const } : file)),
    )

    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setUploadedFiles((prev) =>
          prev.map((file) => (file.id === fileId ? { ...file, progress: 100, status: "completed" as const } : file)),
        )
        showNotification("File uploaded successfully!")
      } else {
        setUploadedFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, progress } : file)))
      }
    }, 200)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.serviceId
      case 2:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone && formData.experience)
      case 3:
        return !!(formData.motivation && formData.goals && formData.availability)
      case 4:
        return formData.agreeToTerms
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    } else {
      showNotification("Please fill in all required fields", "error")
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      showNotification("Please complete all required fields and accept the terms", "error")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success notification
      showNotification("Application submitted successfully!")

      // Redirect to success page
      setCurrentStep(5)
    } catch (error) {
      showNotification("Failed to submit application. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedServiceData = services.find((s) => s.id === selectedService)

  const steps = [
    { number: 1, title: "Service Selection", description: "Choose your service" },
    { number: 2, title: "Personal Info", description: "Your details" },
    { number: 3, title: "Application", description: "Tell us more" },
    { number: 4, title: "Review & Submit", description: "Final review" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-20 right-4 z-50 space-y-2">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-right"
            >
              {notification}
            </div>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Apply for Services</h1>
            <p className="text-xl text-gray-600 mb-8">
              Take the next step in your entrepreneurial journey with our comprehensive application process
            </p>
            {selectedServiceData && (
              <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
                Applying for: {selectedServiceData.title}
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            {currentStep <= 4 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                          currentStep >= step.number ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {currentStep > step.number ? <CheckCircle className="h-6 w-6" /> : step.number}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`flex-1 h-1 mx-4 ${currentStep > step.number ? "bg-blue-600" : "bg-gray-200"}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{steps[currentStep - 1]?.title}</h2>
                  <p className="text-gray-600">{steps[currentStep - 1]?.description}</p>
                </div>
              </div>
            )}

            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Select a Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    {services.map((service) => (
                      <Card
                        key={service.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedService === service.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                        }`}
                        onClick={() => {
                          setSelectedService(service.id)
                          handleInputChange("serviceId", service.id)
                          handleInputChange("serviceCategory", service.category)
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <Checkbox checked={selectedService === service.id} readOnly />
                            <div>
                              <h3 className="font-semibold text-lg">{service.title}</h3>
                              <Badge variant="secondary" className="mt-1">
                                {service.category}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleNext} disabled={!selectedService}>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Personal Information</CardTitle>
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

                  <div className="space-y-2">
                    <Label htmlFor="experience">
                      Experience Level <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("experience", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                        <SelectItem value="experienced">Experienced (5+ years)</SelectItem>
                        <SelectItem value="expert">Expert (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange("linkedin", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website/Portfolio</Label>
                      <Input
                        id="website"
                        placeholder="https://yourwebsite.com"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevious}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <Button onClick={handleNext}>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Application Details */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Application Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="motivation">
                      Why are you applying for this service? <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="motivation"
                      placeholder="Tell us about your motivation and what you hope to achieve..."
                      value={formData.motivation}
                      onChange={(e) => handleInputChange("motivation", e.target.value)}
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goals">
                      What are your specific goals? <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="goals"
                      placeholder="Describe your short-term and long-term goals..."
                      value={formData.goals}
                      onChange={(e) => handleInputChange("goals", e.target.value)}
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expectations">What do you expect from this service?</Label>
                    <Textarea
                      id="expectations"
                      placeholder="Share your expectations and how this service will help you..."
                      value={formData.expectations}
                      onChange={(e) => handleInputChange("expectations", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">
                      Availability <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("availability", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time (40+ hours/week)</SelectItem>
                        <SelectItem value="part-time">Part-time (20-40 hours/week)</SelectItem>
                        <SelectItem value="weekends">Weekends only</SelectItem>
                        <SelectItem value="flexible">Flexible schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previousExperience">Previous relevant experience</Label>
                    <Textarea
                      id="previousExperience"
                      placeholder="Describe any previous experience relevant to this service..."
                      value={formData.previousExperience}
                      onChange={(e) => handleInputChange("previousExperience", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  {/* File Upload Section */}
                  <div className="space-y-4">
                    <Label>Upload Documents (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <FileUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
                        <p className="text-gray-600 mb-4">Resume, Portfolio, or any relevant documents</p>
                        <p className="text-sm text-gray-500">
                          Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
                        </p>
                      </label>
                    </div>

                    {/* Uploaded Files */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label>Uploaded Files</Label>
                        {uploadedFiles.map((fileUpload) => (
                          <div key={fileUpload.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium truncate">{fileUpload.file.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(fileUpload.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              {fileUpload.status === "uploading" && (
                                <Progress value={fileUpload.progress} className="h-2" />
                              )}
                              {fileUpload.status === "completed" && (
                                <div className="flex items-center text-green-600 text-sm">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Uploaded successfully
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevious}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <Button onClick={handleNext}>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Review & Submit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Application Summary */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4">Application Summary</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Service:</span>{" "}
                        {services.find((s) => s.id === formData.serviceId)?.title}
                      </div>
                      <div>
                        <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {formData.email}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {formData.phone}
                      </div>
                      <div>
                        <span className="font-medium">Experience:</span> {formData.experience}
                      </div>
                      <div>
                        <span className="font-medium">Availability:</span> {formData.availability}
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
                      <Select onValueChange={(value) => handleInputChange("hearAboutUs", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google">Google Search</SelectItem>
                          <SelectItem value="social-media">Social Media</SelectItem>
                          <SelectItem value="friend">Friend/Colleague</SelectItem>
                          <SelectItem value="event">Event/Workshop</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Any additional information you'd like to share..."
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>

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
                        id="subscribeToUpdates"
                        checked={formData.subscribeToUpdates}
                        onCheckedChange={(checked) => handleInputChange("subscribeToUpdates", checked)}
                      />
                      <Label htmlFor="subscribeToUpdates" className="text-sm">
                        Subscribe to updates and newsletters about new services and events
                      </Label>
                    </div>
                  </div>

                  {!formData.agreeToTerms && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Please accept the terms and conditions to proceed with your application.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevious}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.agreeToTerms || isSubmitting}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <CheckCircle className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 5: Success */}
            {currentStep === 5 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Application Submitted!</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Thank you for your application. We'll review it and get back to you within 2-3 business days.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg mb-8">
                    <p className="text-sm text-blue-800">
                      <strong>What's next?</strong>
                      <br />• You'll receive a confirmation email shortly
                      <br />• Our team will review your application
                      <br />• We'll contact you within 2-3 business days
                      <br />• Check your dashboard for application status updates
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Button asChild className="w-full sm:w-auto">
                      <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="outline" asChild>
                        <Link href="/services">Browse More Services</Link>
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

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <ApplyPageContent />
    </Suspense>
  )
}
