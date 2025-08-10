"use client"
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, MessageSquare, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Contact Us</h1>
            <p className="text-xl text-gray-600 mb-8">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-gray-600 text-lg mb-8">
                  We're here to help you succeed. Whether you have questions about our services, need support, or want
                  to explore partnership opportunities, don't hesitate to reach out.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email Us</h3>
                      <p className="text-gray-600">hello@upscalex.com</p>
                      <p className="text-gray-600">support@upscalex.com</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Call Us</h3>
                      <p className="text-gray-600">+91 98765 43210</p>
                      <p className="text-gray-600">Mon-Fri 9AM-6PM IST</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Visit Us</h3>
                      <p className="text-gray-600">Koramangala, Bangalore</p>
                      <p className="text-gray-600">Karnataka, India 560034</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">WhatsApp</h3>
                      <p className="text-gray-600">+91 98765 43210</p>
                      <p className="text-gray-600">Quick support & queries</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                    <Facebook className="h-5 w-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center cursor-pointer hover:bg-sky-600 transition-colors">
                    <Twitter className="h-5 w-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-800 transition-colors">
                    <Linkedin className="h-5 w-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-pink-700 transition-colors">
                    <Instagram className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
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

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select onValueChange={(value) => handleInputChange("subject", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="services">Services Question</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">How do I apply for mentorship?</h3>
                <p className="text-gray-600">
                  Visit our Services page and click on the mentorship program that suits your needs. Fill out the
                  application form and we'll match you with a suitable mentor.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Are your services free?</h3>
                <p className="text-gray-600">
                  We offer both free and paid services. Basic mentorship and some workshops are free, while specialized
                  services like legal support have associated costs.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">How can I become a mentor?</h3>
                <p className="text-gray-600">
                  Go to our Join page and select "Mentor" as your role. Fill out the application with your experience
                  and expertise, and our team will review your application.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Do you offer international support?</h3>
                <p className="text-gray-600">
                  Currently, we focus on the Indian market, but we're expanding. International startups can still access
                  our online resources and virtual mentorship programs.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
