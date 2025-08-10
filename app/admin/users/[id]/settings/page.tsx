"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, Save, Upload, User, Shield, AlertTriangle, Trash2, RotateCcw, Key } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function UserSettings() {
  const params = useParams()
  const userId = params.id

  const [user, setUser] = useState({
    id: userId,
    username: "john_doe",
    email: "john@example.com",
    name: "John Doe",
    phone: "+91 98765 43210",
    bio: "Passionate entrepreneur building the next big thing",
    role: "startup",
    status: "active",
    verified: true,
    avatar: "/placeholder.svg?height=100&width=100",

    // Role-specific data
    company: "TechStart Inc",
    position: "Founder & CEO",
    skills: ["React", "Node.js", "Python"],
    experience: "5+ years",
    location: "Chennai, Tamil Nadu",
    website: "https://techstart.com",

    // Account settings
    canLogin: true,
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,

    // Security
    twoFactorEnabled: false,
    lastLogin: "2024-01-15 10:30 AM",
    loginAttempts: 0,

    // Timestamps
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  })

  const handleSave = () => {
    console.log("Saving user settings:", user)
    // Implement save logic
  }

  const handleInputChange = (field: string, value: any) => {
    setUser((prev) => ({ ...prev, [field]: value }))
  }

  const handleResetPassword = () => {
    console.log("Resetting password for user:", userId)
    // Implement password reset logic
  }

  const handleSuspendUser = () => {
    setUser((prev) => ({ ...prev, status: "suspended" }))
    console.log("User suspended:", userId)
  }

  const handleDeleteUser = () => {
    console.log("Deleting user:", userId)
    // Implement delete logic
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/users">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Users
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">User Settings</h1>
                <p className="text-sm text-gray-600">Manage {user.name}'s account settings</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={user.status === "active" ? "default" : "destructive"}>{user.status}</Badge>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="danger">Danger Zone</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Avatar
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={user.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={user.name} onChange={(e) => handleInputChange("name", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={user.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={user.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                {/* Role-specific fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={user.role} onValueChange={(value) => handleInputChange("role", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="mentor">Mentor</SelectItem>
                        <SelectItem value="investor">Investor</SelectItem>
                        <SelectItem value="freelancer">Freelancer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={user.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>
                </div>

                {user.role === "startup" && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={user.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        value={user.position}
                        onChange={(e) => handleInputChange("position", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={user.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Input
                      id="experience"
                      value={user.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Account Status</h3>
                      <p className="text-sm text-gray-600">Current account status</p>
                    </div>
                    <Select value={user.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Verified</h3>
                      <p className="text-sm text-gray-600">Email verification status</p>
                    </div>
                    <Switch
                      checked={user.verified}
                      onCheckedChange={(checked) => handleInputChange("verified", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Can Login</h3>
                      <p className="text-sm text-gray-600">Allow user to login</p>
                    </div>
                    <Switch
                      checked={user.canLogin}
                      onCheckedChange={(checked) => handleInputChange("canLogin", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Send email notifications</p>
                    </div>
                    <Switch
                      checked={user.emailNotifications}
                      onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-gray-600">Send SMS notifications</p>
                    </div>
                    <Switch
                      checked={user.smsNotifications}
                      onCheckedChange={(checked) => handleInputChange("smsNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing Emails</h3>
                      <p className="text-sm text-gray-600">Send marketing emails</p>
                    </div>
                    <Switch
                      checked={user.marketingEmails}
                      onCheckedChange={(checked) => handleInputChange("marketingEmails", checked)}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-4">Account Information</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Created:</span>
                      <span className="ml-2">{user.createdAt}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="ml-2">{user.updatedAt}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Login:</span>
                      <span className="ml-2">{user.lastLogin}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Login Attempts:</span>
                      <span className="ml-2">{user.loginAttempts}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Enable 2FA for this user</p>
                    </div>
                    <Switch
                      checked={user.twoFactorEnabled}
                      onCheckedChange={(checked) => handleInputChange("twoFactorEnabled", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Reset Password</h3>
                      <p className="text-sm text-gray-600">Send password reset email to user</p>
                    </div>
                    <Button variant="outline" onClick={handleResetPassword}>
                      <Key className="h-4 w-4 mr-2" />
                      Reset Password
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Clear Login Attempts</h3>
                      <p className="text-sm text-gray-600">Reset failed login attempt counter</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleInputChange("loginAttempts", 0)}
                      disabled={user.loginAttempts === 0}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Clear Attempts
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-4">Security Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Password Last Changed:</span>
                      <span>2024-01-10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Failed Login Attempts:</span>
                      <span>{user.loginAttempts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Locked:</span>
                      <span>{user.loginAttempts >= 5 ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Danger Zone */}
          <TabsContent value="danger">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                    <div>
                      <h3 className="font-medium">Suspend User</h3>
                      <p className="text-sm text-gray-600">Temporarily disable user account</p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="border-yellow-300 text-yellow-700 bg-transparent">
                          Suspend User
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Suspend User Account</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will temporarily disable the user's account. They won't be able to login until
                            reactivated.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleSuspendUser}>Suspend User</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-orange-50">
                    <div>
                      <h3 className="font-medium">Reset User Data</h3>
                      <p className="text-sm text-gray-600">Clear all user data except basic profile</p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="border-orange-300 text-orange-700 bg-transparent">
                          Reset Data
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Reset User Data</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete all user data including applications, events, and activity
                            history. Only basic profile information will be retained.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-orange-600 hover:bg-orange-700">
                            Reset Data
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <h3 className="font-medium">Delete User</h3>
                      <p className="text-sm text-gray-600">Permanently delete user account and all data</p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete User
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete User Account</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the user account and all
                            associated data including applications, events, and activity history.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteUser}>
                            Delete User
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
