"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Users, Scale, BookOpen, Briefcase, DollarSign, FileText, MapPin } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

const services = [
  {
    id: "mentorship-1on1",
    title: "1-on-1 Mentorship",
    category: "mentorship",
    cost: "Free",
    duration: "3 months",
    whoCanApply: ["Startups", "Students"],
    description: "Get personalized guidance from industry experts to accelerate your growth",
    longDescription:
      "Our 1-on-1 mentorship program connects you with experienced entrepreneurs and industry leaders who provide personalized guidance tailored to your specific needs and challenges.",
    benefits: [
      "Weekly 1-hour sessions",
      "Direct access to mentor",
      "Personalized action plans",
      "Network introductions",
    ],
    requirements: [
      "Active startup or business idea",
      "Commitment to weekly sessions",
      "Willingness to implement feedback",
    ],
    icon: Users,
    isNew: false,
    isPopular: true,
    maxParticipants: 50,
    currentParticipants: 42,
    location: "Online",
    mode: "online",
    rating: 4.8,
    reviews: 156,
  },
  {
    id: "legal-services",
    title: "Legal Services for Startups",
    category: "legal",
    cost: "₹15,000",
    duration: "1-2 weeks",
    whoCanApply: ["Startups"],
    description: "Company registration, compliance, and legal documentation support",
    longDescription:
      "Comprehensive legal services covering everything from company incorporation to ongoing compliance requirements, handled by experienced corporate lawyers.",
    benefits: ["Company registration", "Legal documentation", "Compliance guidance", "Ongoing support"],
    requirements: ["Valid business plan", "Required documents", "Compliance readiness"],
    icon: FileText,
    isNew: true,
    isPopular: false,
    maxParticipants: 20,
    currentParticipants: 8,
    location: "Mumbai, Delhi, Bangalore",
    mode: "hybrid",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "tech-internship",
    title: "Tech Internship Program",
    category: "internship",
    cost: "Free",
    duration: "3-6 months",
    whoCanApply: ["Students"],
    description: "Hands-on internships with top startups and tech companies",
    longDescription:
      "Gain real-world experience through our carefully curated internship program with leading startups and established tech companies.",
    benefits: [
      "Real project experience",
      "Mentorship included",
      "Certificate of completion",
      "Job placement assistance",
    ],
    requirements: ["Currently enrolled student", "Basic technical skills", "Available for full-time internship"],
    icon: BookOpen,
    isNew: false,
    isPopular: true,
    maxParticipants: 100,
    currentParticipants: 78,
    location: "Bangalore, Hyderabad, Pune",
    mode: "offline",
    rating: 4.7,
    reviews: 234,
  },
  {
    id: "startup-bootcamp",
    title: "Startup Bootcamp",
    category: "bootcamp",
    cost: "₹5,000",
    duration: "2 weeks",
    whoCanApply: ["Entrepreneurs"],
    description: "Intensive program covering all aspects of startup building",
    longDescription:
      "A comprehensive 2-week intensive program that covers everything from ideation to scaling, designed for serious entrepreneurs ready to build their startups.",
    benefits: ["Comprehensive curriculum", "Expert instructors", "Peer networking", "Pitch practice"],
    requirements: [
      "Serious commitment",
      "Business idea or early-stage startup",
      "Available for full-time participation",
    ],
    icon: Briefcase,
    isNew: false,
    isPopular: false,
    maxParticipants: 30,
    currentParticipants: 25,
    location: "Mumbai",
    mode: "offline",
    rating: 4.6,
    reviews: 67,
  },
  {
    id: "funding-connect",
    title: "Funding Connect",
    category: "funding",
    cost: "Free",
    duration: "Ongoing",
    whoCanApply: ["Startups"],
    description: "Connect with angel investors, VCs, and funding opportunities",
    longDescription:
      "Access our network of investors and funding opportunities. Get matched with the right investors based on your industry, stage, and funding requirements.",
    benefits: ["Investor introductions", "Pitch deck review", "Due diligence support", "Negotiation guidance"],
    requirements: [
      "Scalable business model",
      "Traction or MVP",
      "Clear funding requirements",
      "Professional pitch deck",
    ],
    icon: DollarSign,
    isNew: true,
    isPopular: true,
    maxParticipants: 200,
    currentParticipants: 156,
    location: "Pan India",
    mode: "hybrid",
    rating: 4.5,
    reviews: 123,
  },
  {
    id: "scaling-workshop",
    title: "Business Scaling Workshop",
    category: "workshop",
    cost: "₹2,500",
    duration: "1 day",
    whoCanApply: ["Growing Startups"],
    description: "Learn strategies to scale your business effectively",
    longDescription:
      "A focused workshop for startups that have achieved product-market fit and are ready to scale their operations, team, and revenue.",
    benefits: ["Scaling strategies", "Operational excellence", "Team building", "Growth hacking techniques"],
    requirements: ["Existing business with revenue", "Growth mindset", "Scaling challenges"],
    icon: Scale,
    isNew: false,
    isPopular: false,
    maxParticipants: 40,
    currentParticipants: 32,
    location: "Delhi",
    mode: "offline",
    rating: 4.4,
    reviews: 45,
  },
]

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCost, setSelectedCost] = useState("all")

  const categories = ["all", "mentorship", "legal", "internship", "bootcamp", "funding", "workshop"]
  const costFilters = ["all", "free", "paid"]

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    const matchesCost =
      selectedCost === "all" ||
      (selectedCost === "free" && service.cost === "Free") ||
      (selectedCost === "paid" && service.cost !== "Free")
    return matchesSearch && matchesCategory && matchesCost
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Services</h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive support for your entrepreneurial journey - from ideation to scaling
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/apply">Apply for Services</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCost} onValueChange={setSelectedCost}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Cost" />
                </SelectTrigger>
                <SelectContent>
                  {costFilters.map((cost) => (
                    <SelectItem key={cost} value={cost}>
                      {cost === "all" ? "All" : cost.charAt(0).toUpperCase() + cost.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredServices.map((service) => {
              const IconComponent = service.icon
              const progressPercentage = (service.currentParticipants / service.maxParticipants) * 100

              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                            {service.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            {service.isNew && <Badge variant="secondary">New</Badge>}
                            {service.isPopular && <Badge className="bg-yellow-500 hover:bg-yellow-600">Popular</Badge>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{service.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Cost:</span>
                        <span className="font-semibold text-green-600">{service.cost}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-medium">{service.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Mode:</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span className="font-medium capitalize">{service.mode}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Participants:</span>
                        <span className="font-medium">
                          {service.currentParticipants}/{service.maxParticipants}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium ml-1">{service.rating}</span>
                      </div>
                      <span className="text-gray-500">({service.reviews} reviews)</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button asChild className="flex-1">
                        <Link href={`/apply?service=${service.id}&category=${service.category}`}>Apply Now</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href={`/services/${service.id}`}>Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search criteria or browse all services.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedCost("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Choose the service that best fits your needs and take the next step in your entrepreneurial journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/contact">Need Help Choosing?</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
