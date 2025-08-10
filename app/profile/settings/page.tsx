"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { Settings, Bell, Shield, Eye, EyeOff, Trash2, Download, AlertTriangle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function ProfileSettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("notifications")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: true,
    applications: true,
    mentorship: true,
    events: false,
  })
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    allowConnections: true,
  })
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Load saved settings if they exist
      const savedNotifications = localStorage.getItem(`notifications_${parsedUser.id}`)
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications))
      }

      const savedPrivacy = localStorage.getItem(`privacy_${parsedUser.id}`)
      if (savedPrivacy) {
        setPrivacy(JSON.parse(savedPrivacy))
      }
    } else {
      router.push("/login")
    }
  }, [router])

  const handleNotificationChange = (key: string, value: boolean) => {
    const newNotifications = { ...notifications, [key]: value }
    setNotifications(newNotifications)
    if (user) {
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(newNotifications))
    }
  }

  const handlePrivacyChange = (key: string, value: string | boolean) => {
    const newPrivacy = { ...privacy, [key]: value }
    setPrivacy(newPrivacy)
    if (user) {
      localStorage.setItem(`privacy_${user.id}`, JSON.stringify(newPrivacy))
    }
  }

  const handlePasswordChange = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      })
      return
    }

    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }

    if (passwords.new.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    if (passwords.current !== user.password) {
      toast({
        title: "Error",
        description: "Current password is incorrect.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user password
      const updatedUser = { ...user, password: passwords.new }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Update in registered users list
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const userIndex = registeredUsers.findIndex((u: any) => u.id === user.id)
      if (userIndex !== -1) {
        registeredUsers[userIndex] = updatedUser
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))
      }

      toast({
        title: "Success",
        description: "Password updated successfully.",
      })

      setPasswords({ current: "", new: "", confirm: "" })
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

  const handleExportData = () => {
    const dataToExport = {
      profile: user,
      notifications,
      privacy,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `upscalex-profile-${user.username}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Success",
      description: "Your data has been exported successfully.",
    })
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Remove user from registered users
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const filteredUsers = registeredUsers.filter((u: any) => u.id !== user.id)
      localStorage.setItem("registeredUsers", JSON.stringify(filteredUsers))

      // Clear user session
      localStorage.removeItem("user")
      localStorage.removeItem(`notifications_${user.id}`)
      localStorage.removeItem(`privacy_${user.id}`)

      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
      })

      router.push("/")
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to access settings</h2>
          <Button asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your account preferences and privacy settings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-500">Receive browser push notifications</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Marketing Emails</Label>
                      <p className="text-sm text-gray-500">Receive updates about new features and events</p>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Application Updates</Label>
                      <p className="text-sm text-gray-500">Get notified about your application status</p>
                    </div>
                    <Switch
                      checked={notifications.applications}
                      onCheckedChange={(checked) => handleNotificationChange("applications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mentorship Notifications</Label>
                      <p className="text-sm text-gray-500">Notifications about mentorship sessions</p>
                    </div>
                    <Switch
                      checked={notifications.mentorship}
                      onCheckedChange={(checked) => handleNotificationChange("mentorship", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Event Reminders</Label>
                      <p className="text-sm text-gray-500">Reminders about upcoming events</p>
                    </div>
                    <Switch
                      checked={notifications.events}
                      onCheckedChange={(checked) => handleNotificationChange("events", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Profile Visibility</Label>
                  <Select
                    value={privacy.profileVisibility}
                    onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                      <SelectItem value="members">Members Only - Only UpscaleX members can see</SelectItem>
                      <SelectItem value="private">Private - Only you can see your profile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Email Address</Label>
                      <p className="text-sm text-gray-500">Allow others to see your email address</p>
                    </div>
                    <Switch
                      checked={privacy.showEmail}
                      onCheckedChange={(checked) => handlePrivacyChange("showEmail", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Phone Number</Label>
                      <p className="text-sm text-gray-500">Allow others to see your phone number</p>
                    </div>
                    <Switch
                      checked={privacy.showPhone}
                      onCheckedChange={(checked) => handlePrivacyChange("showPhone", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Direct Messages</Label>
                      <p className="text-sm text-gray-500">Let other members send you messages</p>
                    </div>
                    <Switch
                      checked={privacy.allowMessages}
                      onCheckedChange={(checked) => handlePrivacyChange("allowMessages", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Connection Requests</Label>
                      <p className="text-sm text-gray-500">Let others send you connection requests</p>
                    </div>
                    <Switch
                      checked={privacy.allowConnections}
                      onCheckedChange={(checked) => handlePrivacyChange("allowConnections", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Current Password</Label>
                      <Input
                        type="password"
                        value={passwords.current}
                        onChange={(e) => setPasswords((prev) => ({ ...prev, current: e.target.value }))}
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>New Password</Label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={passwords.new}
                            onChange={(e) => setPasswords((prev) => ({ ...prev, new: e.target.value }))}
                            placeholder="Enter new password"
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
                      <div>
                        <Label>Confirm New Password</Label>
                        <Input
                          type="password"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords((prev) => ({ ...prev, confirm: e.target.value }))}
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                    <Button onClick={handlePasswordChange} disabled={isLoading}>
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Login Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-gray-600">Active now • This device</p>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Export Data</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Download a copy of your profile data, settings, and activity.
                  </p>
                  <Button onClick={handleExportData} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export My Data
                  </Button>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h3>
                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-800">Delete Account</h4>
                        <p className="text-sm text-red-700 mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button onClick={handleDeleteAccount} variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete My Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Back to Profile Button */}
        <div className="flex justify-start pt-6">
          <Button variant="outline" asChild>
            <Link href="/profile">← Back to Profile</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
