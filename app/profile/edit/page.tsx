"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { User, MapPin, Briefcase, Camera, Save, Eye, EyeOff, Bell, Shield, Globe } from "lucide-react"

interface UserProfile {
  // Basic Info
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  profilePicture: string
  bio: string

  // Address
  address: string
  city: string
  state: string
  pincode: string
  country: string

  // Professional Info
  userType: string
  companyName?: string
  designation?: string
  experience?: string
  skills?: string[]
  education?: string
  university?: string
  graduationYear?: string
  course?: string

  // Startup specific
  startupName?: string
  startupStage?: string
  industry?: string
  fundingStatus?: string
  teamSize?: string

  // Investor specific
  investmentRange?: string
  investmentStage?: string
  portfolioSize?: string

  // Social Links
  linkedin: string
  twitter: string
  github: string
  website: string

  // Preferences
  emailNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
  profileVisibility: string

  // Account
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ProfileEditPage() {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    dateOfBirth: "1995-06-15",
    gender: "male",
    profilePicture: "",
    bio: "Passionate entrepreneur building the next big thing in tech.",
    address: "123 Tech Street",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600001",
    country: "India",
    userType: "startup",
    companyName: "TechStart Inc",
    designation: "Founder & CEO",
    experience: "5",
    skills: ["React", "Node.js", "Python", "Leadership"],
    startupName: "TechStart Inc",
    startupStage: "seed",
    industry: "Technology",
    fundingStatus: "seeking",
    teamSize: "5-10",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    github: "https://github.com/johndoe",
    website: "https://johndoe.com",
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    profileVisibility: "public",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("profileDraft", JSON.stringify(profile))
    }, 1000)

    return () => clearTimeout(timer)
  }, [profile])

  // Load saved draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("profileDraft")
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft)
        setProfile((prev) => ({ ...prev, ...parsedDraft }))
      } catch (error) {
        console.error("Error loading saved draft:", error)
      }
    }
  }, [])

  const handleInputChange = (field: keyof UserProfile, value: string | boolean | string[]) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSkillsChange = (skillsString: string) => {
    const skillsArray = skillsString
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill)
    handleInputChange("skills", skillsArray)
  }

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        handleInputChange("profilePicture", e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Clear draft after successful save
      localStorage.removeItem("profileDraft")

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    if (profile.newPassword !== profile.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }

    if (profile.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Password Updated",
        description: "Your password has been successfully changed.",
      })

      // Clear password fields
      handleInputChange("currentPassword", "")
      handleInputChange("newPassword", "")
      handleInputChange("confirmPassword", "")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderRoleSpecificFields = () => {
    switch (profile.userType) {
      case "startup":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startupName">Startup Name</Label>
              <Input
                id="startupName"
                value={profile.startupName || ""}
                onChange={(e) => handleInputChange("startupName", e.target.value)}
                placeholder="Enter your startup name"
              />
            </div>
            <div>
              <Label htmlFor="startupStage">Startup Stage</Label>
              <Select
                value={profile.startupStage || ""}
                onValueChange={(value) => handleInputChange("startupStage", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea Stage</SelectItem>
                  <SelectItem value="mvp">MVP</SelectItem>
                  <SelectItem value="seed">Seed Stage</SelectItem>
                  <SelectItem value="series-a">Series A</SelectItem>
                  <SelectItem value="series-b">Series B</SelectItem>
                  <SelectItem value="growth">Growth Stage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={profile.industry || ""}
                onChange={(e) => handleInputChange("industry", e.target.value)}
                placeholder="e.g., Technology, Healthcare"
              />
            </div>
            <div>
              <Label htmlFor="fundingStatus">Funding Status</Label>
              <Select
                value={profile.fundingStatus || ""}
                onValueChange={(value) => handleInputChange("fundingStatus", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select funding status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bootstrapped">Bootstrapped</SelectItem>
                  <SelectItem value="seeking">Seeking Funding</SelectItem>
                  <SelectItem value="funded">Recently Funded</SelectItem>
                  <SelectItem value="not-seeking">Not Seeking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="teamSize">Team Size</Label>
              <Select value={profile.teamSize || ""} onValueChange={(value) => handleInputChange("teamSize", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Just me</SelectItem>
                  <SelectItem value="2-5">2-5 people</SelectItem>
                  <SelectItem value="5-10">5-10 people</SelectItem>
                  <SelectItem value="10-25">10-25 people</SelectItem>
                  <SelectItem value="25+">25+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "student":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="education">Current Education</Label>
              <Input
                id="education"
                value={profile.education || ""}
                onChange={(e) => handleInputChange("education", e.target.value)}
                placeholder="e.g., B.Tech Computer Science"
              />
            </div>
            <div>
              <Label htmlFor="university">University/College</Label>
              <Input
                id="university"
                value={profile.university || ""}
                onChange={(e) => handleInputChange("university", e.target.value)}
                placeholder="Enter your institution name"
              />
            </div>
            <div>
              <Label htmlFor="graduationYear">Expected Graduation</Label>
              <Input
                id="graduationYear"
                type="number"
                value={profile.graduationYear || ""}
                onChange={(e) => handleInputChange("graduationYear", e.target.value)}
                placeholder="2024"
              />
            </div>
            <div>
              <Label htmlFor="course">Course/Major</Label>
              <Input
                id="course"
                value={profile.course || ""}
                onChange={(e) => handleInputChange("course", e.target.value)}
                placeholder="e.g., Computer Science"
              />
            </div>
          </div>
        )

      case "investor":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="investmentRange">Investment Range</Label>
              <Select
                value={profile.investmentRange || ""}
                onValueChange={(value) => handleInputChange("investmentRange", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select investment range" />
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
            <div>
              <Label htmlFor="investmentStage">Preferred Investment Stage</Label>
              <Select
                value={profile.investmentStage || ""}
                onValueChange={(value) => handleInputChange("investmentStage", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                  <SelectItem value="seed">Seed</SelectItem>
                  <SelectItem value="series-a">Series A</SelectItem>
                  <SelectItem value="series-b">Series B</SelectItem>
                  <SelectItem value="growth">Growth Stage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="portfolioSize">Portfolio Size</Label>
              <Input
                id="portfolioSize"
                value={profile.portfolioSize || ""}
                onChange={(e) => handleInputChange("portfolioSize", e.target.value)}
                placeholder="Number of investments"
              />
            </div>
          </div>
        )

      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={profile.companyName || ""}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                placeholder="Enter your company name"
              />
            </div>
            <div>
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                value={profile.designation || ""}
                onChange={(e) => handleInputChange("designation", e.target.value)}
                placeholder="Your job title"
              />
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                value={profile.experience || ""}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                placeholder="Years"
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
        <p className="text-gray-600">Update your personal information and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your basic personal details and profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.profilePicture || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback className="text-lg">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="profilePicture" className="cursor-pointer">
                    <div className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                      <Camera className="h-4 w-4" />
                      Change Photo
                    </div>
                    <Input
                      id="profilePicture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePictureChange}
                    />
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF (max 5MB)</p>
                </div>
              </div>

              <Separator />

              {/* Basic Info Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={profile.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>

              <Separator />

              {/* Address */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter your street address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profile.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Enter your city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={profile.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="Enter your state"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      value={profile.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      placeholder="Enter PIN code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={profile.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      placeholder="Enter your country"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Professional Information
              </CardTitle>
              <CardDescription>Share your professional background and expertise</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="userType">I am a</Label>
                <Select value={profile.userType} onValueChange={(value) => handleInputChange("userType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup Founder</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="mentor">Mentor</SelectItem>
                    <SelectItem value="investor">Investor</SelectItem>
                    <SelectItem value="freelancer">Freelancer</SelectItem>
                    <SelectItem value="professional">Working Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {renderRoleSpecificFields()}

              <Separator />

              <div>
                <Label htmlFor="skills">Skills</Label>
                <Input
                  id="skills"
                  value={profile.skills?.join(", ") || ""}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  placeholder="Enter skills separated by commas"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Social Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={profile.linkedin}
                      onChange={(e) => handleInputChange("linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={profile.twitter}
                      onChange={(e) => handleInputChange("twitter", e.target.value)}
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={profile.github}
                      onChange={(e) => handleInputChange("github", e.target.value)}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Account Security
              </CardTitle>
              <CardDescription>Manage your account security and password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={profile.currentPassword}
                    onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={profile.newPassword}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={profile.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <Button
                onClick={handlePasswordChange}
                disabled={isLoading || !profile.currentPassword || !profile.newPassword}
                className="w-full md:w-auto"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={profile.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={profile.smsNotifications}
                    onCheckedChange={(checked) => handleInputChange("smsNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-gray-500">Receive updates about new features and events</p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={profile.marketingEmails}
                    onCheckedChange={(checked) => handleInputChange("marketingEmails", checked)}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <Label htmlFor="profileVisibility">Profile Visibility</Label>
                <Select
                  value={profile.profileVisibility}
                  onValueChange={(value) => handleInputChange("profileVisibility", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                    <SelectItem value="members">Members Only - Only UpscaleX members can see</SelectItem>
                    <SelectItem value="private">Private - Only you can see your profile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end gap-4 pt-6">
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isLoading} className="min-w-[120px]">
          {isLoading ? (
            "Saving..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
