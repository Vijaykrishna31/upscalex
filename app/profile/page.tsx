"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  Briefcase,
  Globe,
  Edit,
  Settings,
  Star,
  Award,
  Target,
  TrendingUp,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/login")
    }
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
          <Button asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  const renderUserTypeSpecificInfo = () => {
    switch (user.userType) {
      case "startup":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Startup Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {user.profile?.companyName && (
                <div>
                  <Label>Company Name</Label>
                  <p className="font-medium">{user.profile.companyName}</p>
                </div>
              )}
              {user.profile?.industry && (
                <div>
                  <Label>Industry</Label>
                  <p className="font-medium">{user.profile.industry}</p>
                </div>
              )}
              {user.profile?.companyStage && (
                <div>
                  <Label>Company Stage</Label>
                  <Badge variant="secondary">{user.profile.companyStage}</Badge>
                </div>
              )}
              {user.profile?.teamSize && (
                <div>
                  <Label>Team Size</Label>
                  <p className="font-medium">{user.profile.teamSize}</p>
                </div>
              )}
              {user.profile?.fundingStage && (
                <div>
                  <Label>Funding Stage</Label>
                  <Badge variant="outline">{user.profile.fundingStage}</Badge>
                </div>
              )}
              {user.profile?.businessModel && (
                <div>
                  <Label>Business Model</Label>
                  <p className="font-medium">{user.profile.businessModel}</p>
                </div>
              )}
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
              {user.profile?.collegeName && (
                <div>
                  <Label>College/University</Label>
                  <p className="font-medium">{user.profile.collegeName}</p>
                </div>
              )}
              {user.profile?.course && (
                <div>
                  <Label>Course</Label>
                  <p className="font-medium">{user.profile.course}</p>
                </div>
              )}
              {user.profile?.currentYear && (
                <div>
                  <Label>Current Year</Label>
                  <Badge variant="secondary">{user.profile.currentYear}</Badge>
                </div>
              )}
              {user.profile?.graduationYear && (
                <div>
                  <Label>Graduation Year</Label>
                  <p className="font-medium">{user.profile.graduationYear}</p>
                </div>
              )}
              {user.profile?.skills && (
                <div className="md:col-span-2">
                  <Label>Skills</Label>
                  <p className="font-medium">{user.profile.skills}</p>
                </div>
              )}
              {user.profile?.internshipPreference && (
                <div>
                  <Label>Internship Preference</Label>
                  <Badge variant="outline">{user.profile.internshipPreference}</Badge>
                </div>
              )}
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
              {user.profile?.currentCompany && (
                <div>
                  <Label>Current Company</Label>
                  <p className="font-medium">{user.profile.currentCompany}</p>
                </div>
              )}
              {user.profile?.designation && (
                <div>
                  <Label>Designation</Label>
                  <p className="font-medium">{user.profile.designation}</p>
                </div>
              )}
              {user.profile?.experience && (
                <div>
                  <Label>Experience</Label>
                  <Badge variant="secondary">{user.profile.experience} years</Badge>
                </div>
              )}
              {user.profile?.availability && (
                <div>
                  <Label>Availability</Label>
                  <Badge variant="outline">{user.profile.availability}</Badge>
                </div>
              )}
              {user.profile?.expertise && (
                <div className="md:col-span-2">
                  <Label>Areas of Expertise</Label>
                  <p className="font-medium">{user.profile.expertise}</p>
                </div>
              )}
              {user.profile?.mentorshipAreas && (
                <div className="md:col-span-2">
                  <Label>Mentorship Areas</Label>
                  <p className="font-medium">{user.profile.mentorshipAreas}</p>
                </div>
              )}
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
              {user.profile?.investmentFocus && (
                <div>
                  <Label>Investment Focus</Label>
                  <Badge variant="secondary">{user.profile.investmentFocus}</Badge>
                </div>
              )}
              {user.profile?.investmentRange && (
                <div>
                  <Label>Investment Range</Label>
                  <p className="font-medium">{user.profile.investmentRange}</p>
                </div>
              )}
              {user.profile?.portfolioSize && (
                <div>
                  <Label>Portfolio Size</Label>
                  <p className="font-medium">{user.profile.portfolioSize}</p>
                </div>
              )}
              {user.profile?.investmentStage && (
                <div>
                  <Label>Preferred Stage</Label>
                  <Badge variant="outline">{user.profile.investmentStage}</Badge>
                </div>
              )}
              {user.profile?.sectors && (
                <div className="md:col-span-2">
                  <Label>Preferred Sectors</Label>
                  <p className="font-medium">{user.profile.sectors}</p>
                </div>
              )}
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
              {user.profile?.profession && (
                <div>
                  <Label>Profession</Label>
                  <Badge variant="secondary">{user.profile.profession}</Badge>
                </div>
              )}
              {user.profile?.experienceLevel && (
                <div>
                  <Label>Experience Level</Label>
                  <Badge variant="outline">{user.profile.experienceLevel}</Badge>
                </div>
              )}
              {user.profile?.hourlyRate && (
                <div>
                  <Label>Hourly Rate</Label>
                  <p className="font-medium">{user.profile.hourlyRate}</p>
                </div>
              )}
              {user.profile?.availability && (
                <div>
                  <Label>Availability</Label>
                  <Badge variant="outline">{user.profile.availability}</Badge>
                </div>
              )}
              {user.profile?.serviceOffered && (
                <div className="md:col-span-2">
                  <Label>Services Offered</Label>
                  <p className="font-medium">{user.profile.serviceOffered}</p>
                </div>
              )}
              {user.profile?.portfolio && (
                <div className="md:col-span-2">
                  <Label>Portfolio</Label>
                  <a
                    href={user.profile.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {user.profile.portfolio}
                  </a>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const Label = ({ children }: { children: React.ReactNode }) => (
    <span className="text-sm text-gray-600 block mb-1">{children}</span>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Profile Header */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-gray-600 text-lg">@{user.username}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="secondary" className="capitalize">
                    {user.userType}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href="/profile/edit">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/profile/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* About Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {user.profile?.bio ? (
                        <p className="text-gray-700 leading-relaxed">{user.profile.bio}</p>
                      ) : (
                        <p className="text-gray-500 italic">No bio added yet. Edit your profile to add one.</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Role-specific Information */}
                  <Card>
                    <CardContent className="pt-6">{renderUserTypeSpecificInfo()}</CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{user.phone}</span>
                        </div>
                      )}
                      {(user.profile?.city || user.profile?.state) && (
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {user.profile.city}
                            {user.profile.city && user.profile.state && ", "}
                            {user.profile.state}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Social Links */}
                  {user.profile?.linkedin && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Social Links</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <a
                          href={user.profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 text-blue-600 hover:underline"
                        >
                          <Globe className="h-4 w-4" />
                          <span className="text-sm">LinkedIn Profile</span>
                        </a>
                      </CardContent>
                    </Card>
                  )}

                  {/* Quick Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Profile Completion</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Applications</span>
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Connections</span>
                        <span className="text-sm font-medium">12</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>First Name</Label>
                        <p className="font-medium">{user.firstName}</p>
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <p className="font-medium">{user.lastName}</p>
                      </div>
                      <div>
                        <Label>Username</Label>
                        <p className="font-medium">@{user.username}</p>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <p className="font-medium">{user.email}</p>
                      </div>
                      {user.phone && (
                        <div>
                          <Label>Phone</Label>
                          <p className="font-medium">{user.phone}</p>
                        </div>
                      )}
                      <div>
                        <Label>User Type</Label>
                        <Badge variant="secondary" className="capitalize">
                          {user.userType}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Location & Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {user.profile?.city && (
                      <div>
                        <Label>City</Label>
                        <p className="font-medium">{user.profile.city}</p>
                      </div>
                    )}
                    {user.profile?.state && (
                      <div>
                        <Label>State</Label>
                        <p className="font-medium">{user.profile.state}</p>
                      </div>
                    )}
                    {user.profile?.linkedin && (
                      <div>
                        <Label>LinkedIn</Label>
                        <a
                          href={user.profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          View Profile
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="pt-6">{renderUserTypeSpecificInfo()}</CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Profile Created</p>
                        <p className="text-sm text-gray-600">
                          You joined UpscaleX on {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Profile Setup Completed</p>
                        <p className="text-sm text-gray-600">You completed your {user.userType} profile setup</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Welcome Badge</h3>
                    <p className="text-sm text-gray-600">Successfully created your UpscaleX profile</p>
                    <Badge variant="secondary" className="mt-2">
                      Earned
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <Star className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Profile Complete</h3>
                    <p className="text-sm text-gray-600">Completed 85% of your profile information</p>
                    <Badge variant="secondary" className="mt-2">
                      In Progress
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">First Connection</h3>
                    <p className="text-sm text-gray-600">Make your first connection on the platform</p>
                    <Badge variant="outline" className="mt-2">
                      Locked
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Active Member</h3>
                    <p className="text-sm text-gray-600">Be active for 30 consecutive days</p>
                    <Badge variant="outline" className="mt-2">
                      Locked
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}
