"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { toast } from "@/hooks/use-toast"
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Trash2,
  UserX,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  Briefcase,
  DollarSign,
  MessageSquare,
  Key,
  LogIn,
  Download,
  Plus,
} from "lucide-react"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  userType: "startup" | "student" | "mentor" | "investor" | "freelancer" | "professional"
  status: "active" | "inactive" | "suspended"
  joinDate: string
  lastActive: string
  location: string
  profilePicture?: string
  companyName?: string
  university?: string
  verified: boolean
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      firstName: "Priya",
      lastName: "Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 9876543210",
      userType: "startup",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-01-20",
      location: "Chennai, Tamil Nadu",
      companyName: "TechStart Solutions",
      verified: true,
    },
    {
      id: "2",
      firstName: "Rahul",
      lastName: "Kumar",
      email: "rahul.kumar@example.com",
      phone: "+91 9876543211",
      userType: "student",
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "2024-01-19",
      location: "Coimbatore, Tamil Nadu",
      university: "Anna University",
      verified: true,
    },
    {
      id: "3",
      firstName: "Anita",
      lastName: "Patel",
      email: "anita.patel@example.com",
      phone: "+91 9876543212",
      userType: "mentor",
      status: "active",
      joinDate: "2024-01-05",
      lastActive: "2024-01-18",
      location: "Madurai, Tamil Nadu",
      companyName: "Innovation Labs",
      verified: true,
    },
    {
      id: "4",
      firstName: "Vikram",
      lastName: "Singh",
      email: "vikram.singh@example.com",
      phone: "+91 9876543213",
      userType: "investor",
      status: "inactive",
      joinDate: "2023-12-20",
      lastActive: "2024-01-10",
      location: "Trichy, Tamil Nadu",
      companyName: "Capital Ventures",
      verified: false,
    },
    {
      id: "5",
      firstName: "Meera",
      lastName: "Reddy",
      email: "meera.reddy@example.com",
      phone: "+91 9876543214",
      userType: "freelancer",
      status: "suspended",
      joinDate: "2023-11-30",
      lastActive: "2024-01-05",
      location: "Salem, Tamil Nadu",
      verified: true,
    },
  ])

  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.includes(searchTerm),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter)
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((user) => user.userType === typeFilter)
    }

    setFilteredUsers(filtered)
  }, [users, searchTerm, statusFilter, typeFilter])

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case "startup":
        return <Building className="h-4 w-4" />
      case "student":
        return <GraduationCap className="h-4 w-4" />
      case "mentor":
        return <Users className="h-4 w-4" />
      case "investor":
        return <DollarSign className="h-4 w-4" />
      case "freelancer":
        return <Briefcase className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "startup":
        return "bg-blue-100 text-blue-800"
      case "student":
        return "bg-green-100 text-green-800"
      case "mentor":
        return "bg-purple-100 text-purple-800"
      case "investor":
        return "bg-orange-100 text-orange-800"
      case "freelancer":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: newStatus as any } : user)))

      toast({
        title: "Status Updated",
        description: `User status has been changed to ${newStatus}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      setUsers((prev) => prev.filter((user) => user.id !== userId))

      toast({
        title: "User Deleted",
        description: "User has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user.",
        variant: "destructive",
      })
    }
  }

  const handleLoginAsUser = (user: User) => {
    toast({
      title: "Login as User",
      description: `Logging in as ${user.firstName} ${user.lastName}...`,
    })
    // Implement login as user functionality
  }

  const handleSendMessage = (user: User) => {
    toast({
      title: "Message Sent",
      description: `Message sent to ${user.firstName} ${user.lastName}.`,
    })
    // Implement send message functionality
  }

  const handleResetPassword = async (user: User) => {
    try {
      toast({
        title: "Password Reset",
        description: `Password reset email sent to ${user.email}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send password reset email.",
        variant: "destructive",
      })
    }
  }

  const exportUsers = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Type", "Status", "Join Date", "Location"],
      ...filteredUsers.map((user) => [
        `${user.firstName} ${user.lastName}`,
        user.email,
        user.phone,
        user.userType,
        user.status,
        user.joinDate,
        user.location,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "users.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Users className="h-8 w-8" />
            User Management
          </h1>
          <p className="text-gray-600">Manage and monitor all platform users</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button onClick={exportUsers} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button asChild>
            <Link href="/admin/users/create">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600">{users.filter((u) => u.status === "active").length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-red-600">
                  {users.filter((u) => u.status === "suspended").length}
                </p>
              </div>
              <UserX className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New This Month</p>
                <p className="text-2xl font-bold text-blue-600">
                  {users.filter((u) => new Date(u.joinDate).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="startup">Startup</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="mentor">Mentor</SelectItem>
                <SelectItem value="investor">Investor</SelectItem>
                <SelectItem value="freelancer">Freelancer</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Manage user accounts, permissions, and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.profilePicture || "/placeholder.svg"} alt={user.firstName} />
                          <AvatarFallback>
                            {user.firstName[0]}
                            {user.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {user.firstName} {user.lastName}
                            {user.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.companyName || user.university || "Individual"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Phone className="h-3 w-3" />
                          {user.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getUserTypeColor(user.userType)}>
                        <div className="flex items-center gap-1">
                          {getUserTypeIcon(user.userType)}
                          {user.userType}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        {user.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-sm">{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleLoginAsUser(user)}>
                            <LogIn className="h-4 w-4 mr-2" />
                            Login as User
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleSendMessage(user)}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleResetPassword(user)}>
                            <Key className="h-4 w-4 mr-2" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(user.id, "suspended")}
                              className="text-orange-600"
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(user.id, "active")}
                              className="text-green-600"
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              Activate User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete User</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {user.firstName} {user.lastName}? This action cannot
                                  be undone and will permanently remove all user data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
