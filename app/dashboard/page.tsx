"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { User, FileText, Calendar, MessageSquare, Settings, Upload } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

// Add this hook at the top of the component
const useAuth = () => {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return { user }
}

// Then in the component, replace the hardcoded user data:
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h2>
          <Button asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  const applications = [
    {
      id: 1,
      type: "1-on-1 Mentorship",
      status: "approved",
      appliedDate: "Dec 15, 2024",
      mentor: "Sarah Johnson",
      nextSession: "Dec 25, 2024",
    },
    {
      id: 2,
      type: "Startup Bootcamp",
      status: "pending",
      appliedDate: "Dec 18, 2024",
      mentor: null,
      nextSession: null,
    },
    {
      id: 3,
      type: "Funding Connect",
      status: "rejected",
      appliedDate: "Dec 10, 2024",
      mentor: null,
      nextSession: null,
    },
  ]

  const notifications = [
    {
      id: 1,
      title: "Mentorship Session Scheduled",
      message: "Your next session with Sarah Johnson is scheduled for Dec 25, 2024",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Application Update",
      message: "Your Startup Bootcamp application is under review",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      title: "New Event Available",
      message: "AI Startup Summit 2025 registration is now open",
      time: "2 days ago",
      read: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Dashboard Header */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
                <p className="text-gray-600">
                  {user.userType} • Member since {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">1 approved, 1 pending, 1 rejected</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Mentorship Sessions</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">Next session: Dec 25</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <Progress value={85} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Mentorship session completed</p>
                        <p className="text-sm text-gray-600">Dec 20, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Applied for Startup Bootcamp</p>
                        <p className="text-sm text-gray-600">Dec 18, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Profile updated</p>
                        <p className="text-sm text-gray-600">Dec 15, 2024</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">Mentorship Session</p>
                        <p className="text-sm text-gray-600">with Sarah Johnson</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Dec 25</p>
                        <p className="text-sm text-gray-600">2:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <p className="font-medium">AI Startup Summit</p>
                        <p className="text-sm text-gray-600">Networking Event</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Jan 15</p>
                        <p className="text-sm text-gray-600">10:00 AM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{app.type}</h3>
                          <p className="text-sm text-gray-600">Applied: {app.appliedDate}</p>
                          {app.mentor && <p className="text-sm text-gray-600">Mentor: {app.mentor}</p>}
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              app.status === "approved"
                                ? "default"
                                : app.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {app.status}
                          </Badge>
                          {app.nextSession && <p className="text-sm text-gray-600 mt-1">Next: {app.nextSession}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border rounded-lg ${!notification.read ? "bg-blue-50 border-blue-200" : ""}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">{notification.time}</p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-auto"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <p className="mt-1 p-2 border rounded">John Doe</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="mt-1 p-2 border rounded">john@example.com</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <p className="mt-1 p-2 border rounded">+91 98765 43210</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Company</label>
                      <p className="mt-1 p-2 border rounded">TechStart Inc.</p>
                    </div>
                  </div>
                  <Button>Update Profile</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Support Tab */}
            <TabsContent value="support" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Support & Help</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-4">
                      <MessageSquare className="h-8 w-8 text-blue-600 mb-3" />
                      <h3 className="font-semibold mb-2">Live Chat</h3>
                      <p className="text-sm text-gray-600 mb-4">Get instant help from our support team</p>
                      <Button variant="outline" className="w-full bg-transparent">
                        Start Chat
                      </Button>
                    </Card>
                    <Card className="p-4">
                      <FileText className="h-8 w-8 text-green-600 mb-3" />
                      <h3 className="font-semibold mb-2">Help Center</h3>
                      <p className="text-sm text-gray-600 mb-4">Browse our knowledge base and FAQs</p>
                      <Button variant="outline" className="w-full bg-transparent">
                        Visit Help Center
                      </Button>
                    </Card>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <p className="text-sm text-gray-600">Email: support@upscalex.com</p>
                    <p className="text-sm text-gray-600">Phone: +91 98765 43210</p>
                    <p className="text-sm text-gray-600">Hours: Mon-Fri 9AM-6PM IST</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}
