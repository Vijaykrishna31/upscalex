"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, Search, Star, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

const currentEvents = [
  {
    id: "ai-bootcamp-2024",
    title: "AI Startup Bootcamp",
    shortInfo: "Intensive 5-day program for AI entrepreneurs",
    description:
      "Learn to build AI-powered startups with hands-on workshops, expert mentorship, and real-world projects. Perfect for entrepreneurs looking to leverage AI in their business.",
    date: "Dec 20-24, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "Bangalore, India",
    venue: "Tech Park Convention Center",
    poster: "bg-gradient-to-r from-blue-500 to-purple-600",
    attendees: 45,
    maxAttendees: 50,
    status: "ongoing",
    category: "bootcamp",
    price: 5000,
    currency: "INR",
    organizer: "UpscaleX Team",
    rating: 4.8,
    reviews: 23,
    tags: ["AI", "Machine Learning", "Startup", "Technology"],
    speakers: [
      { name: "Dr. Priya Sharma", company: "AI Innovations", role: "CTO" },
      { name: "Rahul Kumar", company: "TechStart", role: "Founder" },
    ],
  },
  {
    id: "investor-pitch-night",
    title: "Investor Pitch Night",
    shortInfo: "Present your startup to top VCs and angel investors",
    description:
      "Exclusive opportunity to pitch your startup to a panel of leading investors. Get feedback, make connections, and potentially secure funding for your venture.",
    date: "Dec 22, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Mumbai, India",
    venue: "Business Hub Auditorium",
    poster: "bg-gradient-to-r from-green-500 to-blue-600",
    attendees: 28,
    maxAttendees: 30,
    status: "ongoing",
    category: "funding",
    price: 0,
    currency: "INR",
    organizer: "Mumbai Startup Network",
    rating: 4.9,
    reviews: 15,
    tags: ["Funding", "Investors", "Pitch", "Networking"],
    speakers: [
      { name: "Anita Patel", company: "Venture Capital Partners", role: "Managing Partner" },
      { name: "Suresh Gupta", company: "Angel Network", role: "Investment Director" },
    ],
  },
]

const upcomingEvents = [
  {
    id: "fintech-summit-2025",
    title: "Fintech Innovation Summit",
    shortInfo: "Explore the future of financial technology",
    description:
      "Join industry leaders, fintech startups, and investors to explore the latest trends in financial technology, blockchain, and digital payments.",
    date: "Jan 15, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "Delhi, India",
    venue: "India Expo Mart",
    poster: "bg-gradient-to-r from-purple-500 to-pink-600",
    attendees: 0,
    maxAttendees: 100,
    status: "upcoming",
    category: "conference",
    price: 2500,
    currency: "INR",
    organizer: "Fintech Association India",
    rating: 0,
    reviews: 0,
    tags: ["Fintech", "Blockchain", "Digital Payments", "Innovation"],
    speakers: [
      { name: "Vikram Singh", company: "PayTech Solutions", role: "CEO" },
      { name: "Meera Joshi", company: "Blockchain Ventures", role: "Founder" },
    ],
  },
  {
    id: "women-entrepreneurs-meetup",
    title: "Women Entrepreneurs Meetup",
    shortInfo: "Networking and mentorship for women in business",
    description:
      "Empowering women entrepreneurs through networking, mentorship sessions, and inspiring talks from successful female business leaders.",
    date: "Jan 20, 2025",
    time: "2:00 PM - 6:00 PM",
    location: "Pune, India",
    venue: "Women's Business Center",
    poster: "bg-gradient-to-r from-pink-500 to-red-600",
    attendees: 12,
    maxAttendees: 40,
    status: "upcoming",
    category: "networking",
    price: 0,
    currency: "INR",
    organizer: "Women in Business Network",
    rating: 0,
    reviews: 0,
    tags: ["Women", "Entrepreneurship", "Networking", "Mentorship"],
    speakers: [
      { name: "Kavya Reddy", company: "FemTech Innovations", role: "Founder & CEO" },
      { name: "Shreya Agarwal", company: "Women's Fund", role: "Managing Director" },
    ],
  },
  {
    id: "tech-legal-workshop",
    title: "Tech Startup Legal Workshop",
    shortInfo: "Navigate legal challenges for tech startups",
    description:
      "Comprehensive workshop covering intellectual property, data privacy, compliance, and legal structures for technology startups.",
    date: "Jan 25, 2025",
    time: "11:00 AM - 4:00 PM",
    location: "Hyderabad, India",
    venue: "Legal Hub Conference Room",
    poster: "bg-gradient-to-r from-indigo-500 to-blue-600",
    attendees: 8,
    maxAttendees: 25,
    status: "upcoming",
    category: "workshop",
    price: 1500,
    currency: "INR",
    organizer: "Tech Legal Associates",
    rating: 0,
    reviews: 0,
    tags: ["Legal", "Technology", "Compliance", "IP"],
    speakers: [
      { name: "Adv. Rajesh Kumar", company: "Tech Law Firm", role: "Senior Partner" },
      { name: "Priya Nair", company: "IP Solutions", role: "Legal Consultant" },
    ],
  },
  {
    id: "ecommerce-masterclass",
    title: "E-commerce Growth Masterclass",
    shortInfo: "Scale your e-commerce business effectively",
    description:
      "Learn advanced strategies for e-commerce growth, including digital marketing, supply chain optimization, and customer retention.",
    date: "Feb 1, 2025",
    time: "9:00 AM - 1:00 PM",
    location: "Chennai, India",
    venue: "Digital Commerce Center",
    poster: "bg-gradient-to-r from-yellow-500 to-orange-600",
    attendees: 5,
    maxAttendees: 35,
    status: "upcoming",
    category: "workshop",
    price: 3000,
    currency: "INR",
    organizer: "E-commerce Excellence",
    rating: 0,
    reviews: 0,
    tags: ["E-commerce", "Digital Marketing", "Growth", "Scaling"],
    speakers: [
      { name: "Arjun Patel", company: "E-comm Giants", role: "Growth Director" },
      { name: "Sneha Iyer", company: "Digital Marketing Pro", role: "Strategy Head" },
    ],
  },
]

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("current")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const categories = ["all", "bootcamp", "workshop", "networking", "funding", "conference"]
  const locations = ["all", "Bangalore", "Mumbai", "Delhi", "Pune", "Hyderabad", "Chennai"]

  const filterEvents = (events: typeof currentEvents) => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
      const matchesLocation = selectedLocation === "all" || event.location.includes(selectedLocation)

      return matchesSearch && matchesCategory && matchesLocation
    })
  }

  const EventCard = ({ event }: { event: any }) => {
    const progressPercentage = (event.attendees / event.maxAttendees) * 100
    const isFull = event.attendees >= event.maxAttendees

    return (
      <Card className="hover:shadow-lg transition-shadow group">
        <div className={`h-48 ${event.poster} rounded-t-lg relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all" />
          <div className="absolute top-4 left-4">
            <Badge variant={event.status === "ongoing" ? "default" : "secondary"} className="bg-white/90 text-gray-900">
              {event.status === "ongoing" ? "Live Now" : "Upcoming"}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 text-gray-900 capitalize">{event.category}</Badge>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <div className="text-2xl font-bold">{event.price === 0 ? "Free" : `₹${event.price.toLocaleString()}`}</div>
          </div>
        </div>

        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{event.title}</CardTitle>
            {event.rating > 0 && (
              <div className="flex items-center space-x-1 text-sm">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{event.rating}</span>
                <span className="text-gray-500">({event.reviews})</span>
              </div>
            )}
          </div>
          <p className="text-gray-600">{event.shortInfo}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>
                {event.attendees}/{event.maxAttendees} attendees
                {isFull && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    Full
                  </Badge>
                )}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                progressPercentage >= 90 ? "bg-red-500" : progressPercentage >= 70 ? "bg-yellow-500" : "bg-blue-600"
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{event.tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Speakers */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="text-sm">
              <span className="font-medium text-gray-700">Speakers: </span>
              <span className="text-gray-600">{event.speakers.map((speaker: any) => speaker.name).join(", ")}</span>
            </div>
          )}

          <div className="flex space-x-2">
            <Button asChild className="flex-1" disabled={isFull}>
              <Link href={`/events/register?event=${event.id}`}>
                {event.status === "ongoing" ? "Join Now" : isFull ? "Event Full" : "Register"}
                {!isFull && <ArrowRight className="ml-2 h-4 w-4" />}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/events/${event.id}`}>Details</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Events & Workshops</h1>
            <p className="text-xl text-gray-600 mb-8">
              Join our community events, bootcamps, and networking sessions to accelerate your growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/events/register">Register for Events</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Host an Event</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search events, topics, or speakers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-40">
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
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location === "all" ? "All Cities" : location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="current" className="flex items-center space-x-2">
                <span>Current Events</span>
                <Badge variant="secondary">{currentEvents.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="flex items-center space-x-2">
                <span>Upcoming Events</span>
                <Badge variant="secondary">{upcomingEvents.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Live Events</h2>
                <p className="text-gray-600">Join these ongoing events and workshops</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {filterEvents(currentEvents).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {filterEvents(currentEvents).length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No current events found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search criteria or check upcoming events.</p>
                  <Button variant="outline" onClick={() => setActiveTab("upcoming")}>
                    View Upcoming Events
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Upcoming Events</h2>
                <p className="text-gray-600">Register for these exciting upcoming events</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filterEvents(upcomingEvents).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {filterEvents(upcomingEvents).length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming events found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search criteria or check current events.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                      setSelectedLocation("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't Miss Out!</h2>
          <p className="text-xl mb-8 opacity-90">Subscribe to get notified about new events and workshops</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input placeholder="Enter your email" className="bg-white text-gray-900 placeholder-gray-500" />
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
