"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lightbulb, Award, Briefcase, GraduationCap, DollarSign } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const userTypes = [
  {
    id: "mentor",
    title: "Mentor",
    description: "Share your expertise and guide aspiring entrepreneurs",
    icon: Award,
    color: "blue",
  },
  {
    id: "investor",
    title: "Investor",
    description: "Discover and invest in promising startups",
    icon: DollarSign,
    color: "green",
  },
  {
    id: "freelancer",
    title: "Freelancer",
    description: "Offer your services to growing startups",
    icon: Briefcase,
    color: "purple",
  },
  {
    id: "startup",
    title: "Startup",
    description: "Get mentorship and resources to scale your business",
    icon: Lightbulb,
    color: "yellow",
  },
  {
    id: "student",
    title: "Student",
    description: "Access internships, bootcamps, and career guidance",
    icon: GraduationCap,
    color: "indigo",
  },
]

export default function JoinPage() {
  const [selectedType, setSelectedType] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    experience: "",
    skills: "",
    bio: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", { type: selectedType, ...formData })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Join Our Community</h1>
            <p className="text-xl text-gray-600 mb-8">
              Become part of India's fastest-growing entrepreneurial ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* User Type Selection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Role</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
              {userTypes.map((type) => {
                const IconComponent = type.icon
                const isSelected = selectedType === type.id
                return (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                          type.color === "blue"
                            ? "bg-blue-100"
                            : type.color === "green"
                              ? "bg-green-100"
                              : type.color === "purple"
                                ? "bg-purple-100"
                                : type.color === "yellow"
                                  ? "bg-yellow-100"
                                  : "bg-indigo-100"
                        }`}
                      >
                        <IconComponent
                          className={`h-8 w-8 ${
                            type.color === "blue"
                              ? "text-blue-600"
                              : type.color === "green"
                                ? "text-green-600"
                                : type.color === "purple"
                                  ? "text-purple-600"
                                  : type.color === "yellow"
                                    ? "text-yellow-600"
                                    : "text-indigo-600"
                          }`}
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Registration Form */}
            {selectedType && (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    Join as {userTypes.find((t) => t.id === selectedType)?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn Profile</Label>
                        <Input
                          id="linkedin"
                          placeholder="https://linkedin.com/in/yourprofile"
                          value={formData.linkedin}
                          onChange={(e) => handleInputChange("linkedin", e.target.value)}
                        />
                      </div>
                    </div>

                    {selectedType === "mentor" && (
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience *</Label>
                        <Select onValueChange={(value) => handleInputChange("experience", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="4-7">4-7 years</SelectItem>
                            <SelectItem value="8-15">8-15 years</SelectItem>
                            <SelectItem value="15+">15+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {(selectedType === "freelancer" || selectedType === "mentor") && (
                      <div className="space-y-2">
                        <Label htmlFor="skills">Skills/Expertise *</Label>
                        <Input
                          id="skills"
                          placeholder="e.g., Marketing, Development, Design"
                          value={formData.skills}
                          onChange={(e) => handleInputChange("skills", e.target.value)}
                          required
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="bio">Tell us about yourself *</Label>
                      <Textarea
                        id="bio"
                        placeholder="Share your background, goals, and what you hope to achieve..."
                        value={formData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        required
                        className="min-h-[100px]"
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Submit Application
                    </Button>
                  </form>
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
