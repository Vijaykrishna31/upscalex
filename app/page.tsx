"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Award, Briefcase, TrendingUp, Star } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const stats = [
  { label: "Active Users", value: "10,000+", icon: Users },
  { label: "Success Stories", value: "500+", icon: Award },
  { label: "Services Offered", value: "25+", icon: Briefcase },
  { label: "Growth Rate", value: "150%", icon: TrendingUp },
]

const featuredServices = [
  {
    id: "1",
    title: "1-on-1 Mentorship",
    description: "Get personalized guidance from industry experts",
    cost: "Free",
    category: "mentorship",
    isPopular: true,
  },
  {
    id: "2",
    title: "Startup Bootcamp",
    description: "Intensive program for early-stage entrepreneurs",
    cost: "₹5,000",
    category: "bootcamp",
    isNew: true,
  },
  {
    id: "3",
    title: "Funding Connect",
    description: "Connect with angel investors and VCs",
    cost: "Free",
    category: "funding",
    isPopular: true,
  },
]

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Founder, TechStart",
    content: "UpscaleX helped me connect with the right mentors and secure my first round of funding.",
    rating: 5,
  },
  {
    name: "Rahul Kumar",
    role: "Student, IIT Delhi",
    content: "The internship program gave me real-world experience and helped me land my dream job.",
    rating: 5,
  },
  {
    name: "Anita Patel",
    role: "CEO, GreenTech Solutions",
    content: "The legal services were comprehensive and helped us navigate complex compliance requirements.",
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              🚀 India's #1 Entrepreneurship Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Scale Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Startup Dreams
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with mentors, access funding, join bootcamps, and get the support you need to build successful
              startups. Join 10,000+ entrepreneurs already scaling with UpscaleX.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
              >
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3 bg-transparent">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Featured Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular services designed to accelerate your entrepreneurial journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <div className="flex gap-2">
                      {service.isPopular && <Badge className="bg-yellow-500 hover:bg-yellow-600">Popular</Badge>}
                      {service.isNew && <Badge variant="secondary">New</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">{service.cost}</span>
                    <Button asChild>
                      <Link href={`/apply?service=${service.id}&category=${service.category}`}>Apply Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from entrepreneurs who have scaled their startups with UpscaleX
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Scale Your Startup?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of entrepreneurs who are building successful businesses with UpscaleX
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/signup">Start Your Journey</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/contact">Talk to Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
