"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Phone, Building, GraduationCap, Briefcase } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface FormData {
  // Basic Information
  firstName: string
  lastName: string
  username: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  userType: string

  // Common Additional Fields
  city: string
  state: string
  linkedin: string
  bio: string

  // Startup Specific
  companyName: string
  companyStage: string
  industry: string
  teamSize: string
  fundingStage: string
  businessModel: string

  // Student Specific
  collegeName: string
  course: string
  graduationYear: string
  currentYear: string
  skills: string
  internshipPreference: string

  // Mentor Specific
  currentCompany: string
  designation: string
  experience: string
  expertise: string
  mentorshipAreas: string
  availability: string

  // Investor Specific
  investmentFocus: string
  investmentRange: string
  portfolioSize: string
  investmentStage: string
  sectors: string

  // Freelancer Specific
  profession: string
  serviceOffered: string
  experienceLevel: string
  hourlyRate: string
  portfolio: string
  availability_freelancer: string

  agreeToTerms: boolean
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    // Basic Information
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "",

    // Common Additional Fields
    city: "",
    state: "",
    linkedin: "",
    bio: "",

    // Startup Specific
    companyName: "",
    companyStage: "",
    industry: "",
    teamSize: "",
    fundingStage: "",
    businessModel: "",

    // Student Specific
    collegeName: "",
    course: "",
    graduationYear: "",
    currentYear: "",
    skills: "",
    internshipPreference: "",

    // Mentor Specific
    currentCompany: "",
    designation: "",
    experience: "",
    expertise: "",
    mentorshipAreas: "",
    availability: "",

    // Investor Specific
    investmentFocus: "",
    investmentRange: "",
    portfolioSize: "",
    investmentStage: "",
    sectors: "",

    // Freelancer Specific
    profession: "",
    serviceOffered: "",
    experienceLevel: "",
    hourlyRate: "",
    portfolio: "",
    availability_freelancer: "",

    agreeToTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const checkUsernameExists = (username: string): boolean => {
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    return existingUsers.some((user: any) => user.username.toLowerCase() === username.toLowerCase())
  }

  const checkEmailExists = (email: string): boolean => {
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    return existingUsers.some((user: any) => user.email.toLowerCase() === email.toLowerCase())
  }

  const handleNext = () => {
    setError("")

    if (currentStep === 1) {
      // Validate required fields
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.username ||
        !formData.email ||
        !formData.phone ||
        !formData.userType ||
        !formData.city ||
        !formData.state
      ) {
        setError("Please fill in all required fields")
        return
      }

      // Check if username already exists
      if (checkUsernameExists(formData.username)) {
        setError("Username already exists. Please choose a different username.")
        return
      }

      // Check if email already exists
      if (checkEmailExists(formData.email)) {
        setError("Email already registered. Please use a different email or login instead.")
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address")
        return
      }

      // Validate username format (alphanumeric and underscore only)
      const usernameRegex = /^[a-zA-Z0-9_]+$/
      if (!usernameRegex.test(formData.username)) {
        setError("Username can only contain letters, numbers, and underscores")
        return
      }

      if (formData.username.length < 3) {
        setError("Username must be at least 3 characters long")
        return
      }
    }

    setCurrentStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create comprehensive user data
      const userData = {
        id: Date.now(),
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        role: "user",
        userType: formData.userType,
        avatar: "/placeholder.svg?height=40&width=40",
        password: formData.password, // In real app, this should be hashed
        profile: {
          city: formData.city,
          state: formData.state,
          linkedin: formData.linkedin,
          bio: formData.bio,
          // Add category-specific data
          ...(formData.userType === "startup" && {
            companyName: formData.companyName,
            companyStage: formData.companyStage,
            industry: formData.industry,
            teamSize: formData.teamSize,
            fundingStage: formData.fundingStage,
            businessModel: formData.businessModel,
          }),
          ...(formData.userType === "student" && {
            collegeName: formData.collegeName,
            course: formData.course,
            graduationYear: formData.graduationYear,
            currentYear: formData.currentYear,
            skills: formData.skills,
            internshipPreference: formData.internshipPreference,
          }),
          ...(formData.userType === "mentor" && {
            currentCompany: formData.currentCompany,
            designation: formData.designation,
            experience: formData.experience,
            expertise: formData.expertise,
            mentorshipAreas: formData.mentorshipAreas,
            availability: formData.availability,
          }),
          ...(formData.userType === "investor" && {
            investmentFocus: formData.investmentFocus,
            investmentRange: formData.investmentRange,
            portfolioSize: formData.portfolioSize,
            investmentStage: formData.investmentStage,
            sectors: formData.sectors,
          }),
          ...(formData.userType === "freelancer" && {
            profession: formData.profession,
            serviceOffered: formData.serviceOffered,
            experienceLevel: formData.experienceLevel,
            hourlyRate: formData.hourlyRate,
            portfolio: formData.portfolio,
            availability: formData.availability_freelancer,
          }),
        },
        createdAt: new Date().toISOString(),
        status: "active",
      }

      // Store user in registered users list
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      existingUsers.push(userData)
      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers))

      // Auto-login the user
      localStorage.setItem("user", JSON.stringify(userData))

      // Show success message and redirect to profile
      alert("Account created successfully! Welcome to UpscaleX!")
      router.push("/profile")
    } catch (error) {
      console.error("Signup failed:", error)
      setError("Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const renderCategorySpecificFields = () => {
    switch (formData.userType) {
      case "startup":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Startup Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select onValueChange={(value) => handleInputChange("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="fintech">Fintech</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="food">Food & Beverage</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyStage">Company Stage *</Label>
                <Select onValueChange={(value) => handleInputChange("companyStage", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">Idea Stage</SelectItem>
                    <SelectItem value="prototype">Prototype</SelectItem>
                    <SelectItem value="mvp">MVP</SelectItem>
                    <SelectItem value="early-revenue">Early Revenue</SelectItem>
                    <SelectItem value="growth">Growth Stage</SelectItem>
                    <SelectItem value="scale">Scale Stage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size *</Label>
                <Select onValueChange={(value) => handleInputChange("teamSize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Just me</SelectItem>
                    <SelectItem value="2-5">2-5 members</SelectItem>
                    <SelectItem value="6-10">6-10 members</SelectItem>
                    <SelectItem value="11-25">11-25 members</SelectItem>
                    <SelectItem value="25+">25+ members</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fundingStage">Funding Stage</Label>
                <Select onValueChange={(value) => handleInputChange("fundingStage", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select funding stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bootstrapped">Bootstrapped</SelectItem>
                    <SelectItem value="pre-seed">Pre-seed</SelectItem>
                    <SelectItem value="seed">Seed</SelectItem>
                    <SelectItem value="series-a">Series A</SelectItem>
                    <SelectItem value="series-b">Series B</SelectItem>
                    <SelectItem value="later-stage">Later Stage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessModel">Business Model</Label>
                <Select onValueChange={(value) => handleInputChange("businessModel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="b2b">B2B</SelectItem>
                    <SelectItem value="b2c">B2C</SelectItem>
                    <SelectItem value="b2b2c">B2B2C</SelectItem>
                    <SelectItem value="marketplace">Marketplace</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case "student":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Academic Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="collegeName">College/University *</Label>
                <Input
                  id="collegeName"
                  placeholder="Enter college name"
                  value={formData.collegeName}
                  onChange={(e) => handleInputChange("collegeName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course/Degree *</Label>
                <Input
                  id="course"
                  placeholder="e.g., B.Tech Computer Science"
                  value={formData.course}
                  onChange={(e) => handleInputChange("course", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentYear">Current Year *</Label>
                <Select onValueChange={(value) => handleInputChange("currentYear", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st Year</SelectItem>
                    <SelectItem value="2nd">2nd Year</SelectItem>
                    <SelectItem value="3rd">3rd Year</SelectItem>
                    <SelectItem value="4th">4th Year</SelectItem>
                    <SelectItem value="final">Final Year</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="graduationYear">Graduation Year *</Label>
                <Select onValueChange={(value) => handleInputChange("graduationYear", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2028">2028</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills & Technologies</Label>
              <Input
                id="skills"
                placeholder="e.g., Python, React, Machine Learning"
                value={formData.skills}
                onChange={(e) => handleInputChange("skills", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="internshipPreference">Internship Preference</Label>
              <Select onValueChange={(value) => handleInputChange("internshipPreference", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Technology/Software</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="any">Open to any</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "mentor":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <User className="h-5 w-5 mr-2" />
              Professional Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentCompany">Current Company *</Label>
                <Input
                  id="currentCompany"
                  placeholder="Enter company name"
                  value={formData.currentCompany}
                  onChange={(e) => handleInputChange("currentCompany", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  placeholder="e.g., Senior Software Engineer"
                  value={formData.designation}
                  onChange={(e) => handleInputChange("designation", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience *</Label>
                <Select onValueChange={(value) => handleInputChange("experience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-5">2-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10-15">10-15 years</SelectItem>
                    <SelectItem value="15+">15+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability">Availability *</Label>
                <Select onValueChange={(value) => handleInputChange("availability", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2-hours">1-2 hours/week</SelectItem>
                    <SelectItem value="3-5-hours">3-5 hours/week</SelectItem>
                    <SelectItem value="5-10-hours">5-10 hours/week</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expertise">Areas of Expertise *</Label>
              <Input
                id="expertise"
                placeholder="e.g., Product Management, Marketing, Technology"
                value={formData.expertise}
                onChange={(e) => handleInputChange("expertise", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mentorshipAreas">Mentorship Areas</Label>
              <Textarea
                id="mentorshipAreas"
                placeholder="What specific areas would you like to mentor in?"
                value={formData.mentorshipAreas}
                onChange={(e) => handleInputChange("mentorshipAreas", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>
        )

      case "investor":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Investment Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investmentFocus">Investment Focus *</Label>
                <Select onValueChange={(value) => handleInputChange("investmentFocus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="early-stage">Early Stage</SelectItem>
                    <SelectItem value="growth-stage">Growth Stage</SelectItem>
                    <SelectItem value="late-stage">Late Stage</SelectItem>
                    <SelectItem value="all-stages">All Stages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="investmentRange">Investment Range *</Label>
                <Select onValueChange={(value) => handleInputChange("investmentRange", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5L">₹1-5 Lakhs</SelectItem>
                    <SelectItem value="5-25L">₹5-25 Lakhs</SelectItem>
                    <SelectItem value="25L-1Cr">₹25 Lakhs - 1 Crore</SelectItem>
                    <SelectItem value="1-5Cr">₹1-5 Crores</SelectItem>
                    <SelectItem value="5Cr+">₹5+ Crores</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="portfolioSize">Portfolio Size</Label>
                <Select onValueChange={(value) => handleInputChange("portfolioSize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-5">0-5 investments</SelectItem>
                    <SelectItem value="5-15">5-15 investments</SelectItem>
                    <SelectItem value="15-30">15-30 investments</SelectItem>
                    <SelectItem value="30+">30+ investments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="investmentStage">Preferred Stage</Label>
                <Select onValueChange={(value) => handleInputChange("investmentStage", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-seed">Pre-seed</SelectItem>
                    <SelectItem value="seed">Seed</SelectItem>
                    <SelectItem value="series-a">Series A</SelectItem>
                    <SelectItem value="series-b">Series B</SelectItem>
                    <SelectItem value="later">Later Stage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sectors">Preferred Sectors</Label>
              <Input
                id="sectors"
                placeholder="e.g., Technology, Healthcare, Fintech"
                value={formData.sectors}
                onChange={(e) => handleInputChange("sectors", e.target.value)}
              />
            </div>
          </div>
        )

      case "freelancer":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Professional Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profession">Profession *</Label>
                <Select onValueChange={(value) => handleInputChange("profession", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select profession" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="marketer">Digital Marketer</SelectItem>
                    <SelectItem value="writer">Content Writer</SelectItem>
                    <SelectItem value="consultant">Business Consultant</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level *</Label>
                <Select onValueChange={(value) => handleInputChange("experienceLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                    <SelectItem value="expert">Expert (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceOffered">Services Offered *</Label>
              <Textarea
                id="serviceOffered"
                placeholder="Describe the services you offer..."
                value={formData.serviceOffered}
                onChange={(e) => handleInputChange("serviceOffered", e.target.value)}
                required
                className="min-h-[80px]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                <Select onValueChange={(value) => handleInputChange("hourlyRate", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500-1000">₹500-1000</SelectItem>
                    <SelectItem value="1000-2000">₹1000-2000</SelectItem>
                    <SelectItem value="2000-5000">₹2000-5000</SelectItem>
                    <SelectItem value="5000+">₹5000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability_freelancer">Availability</Label>
                <Select onValueChange={(value) => handleInputChange("availability_freelancer", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="project-based">Project-based</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio/Website URL</Label>
              <Input
                id="portfolio"
                placeholder="https://yourportfolio.com"
                value={formData.portfolio}
                onChange={(e) => handleInputChange("portfolio", e.target.value)}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex items-center justify-center py-16">
        <div className="w-full max-w-4xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
              <p className="text-gray-600">Join the UpscaleX community today</p>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center mt-6">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
                  >
                    1
                  </div>
                  <div className={`w-16 h-1 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
                  >
                    2
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">{error}</div>
              )}

              {currentStep === 1 ? (
                // Step 1: Basic Information
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="firstName"
                          placeholder="Enter first name"
                          className="pl-10"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="lastName"
                          placeholder="Enter last name"
                          className="pl-10"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="username"
                        placeholder="Choose a unique username"
                        className="pl-10"
                        value={formData.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500">This will be used to login to your account</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userType">I am a *</Label>
                    <Select onValueChange={(value) => handleInputChange("userType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup Founder</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="mentor">Mentor</SelectItem>
                        <SelectItem value="investor">Investor</SelectItem>
                        <SelectItem value="freelancer">Freelancer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        placeholder="Enter your state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button onClick={handleNext} className="w-full" size="lg">
                    Continue
                  </Button>
                </div>
              ) : (
                // Step 2: Category-specific information + Password
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category-specific fields */}
                  {renderCategorySpecificFields()}

                  <Separator />

                  {/* Common additional fields */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Additional Information</h3>

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
                      <Label htmlFor="bio">Bio/About Yourself</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself, your goals, and what you hope to achieve..."
                        value={formData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Password fields */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Security</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create password"
                            className="pl-10 pr-10"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500">Minimum 6 characters</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            className="pl-10 pr-10"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 bg-transparent"
                    >
                      Back
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </div>
                </form>
              )}

              {currentStep === 1 && (
                <>
                  <div className="relative">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                      Or continue with
                    </span>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link href="/login" className="text-blue-600 hover:underline font-medium">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
