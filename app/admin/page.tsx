"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Calendar,
  Briefcase,
  Settings,
  TrendingUp,
  DollarSign,
  UserPlus,
  Activity,
  ExternalLink,
  BarChart3,
  PieChart,
  Globe,
  Shield,
  Clock,
} from "lucide-react"

interface DashboardStats {
  totalUsers: number
  newUsersThisMonth: number
  totalEvents: number
  upcomingEvents: number
  totalApplications: number
  pendingApplications: number
  totalServices: number
  activeServices: number
  revenue: number
  revenueGrowth: number
}

interface RecentActivity {
  id: string
  type: "user_registration" | "event_registration" | "application_submitted" | "service_booking"
  user: string
  description: string
  timestamp: string
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 1247,
    newUsersThisMonth: 89,
    totalEvents: 45,
    upcomingEvents: 12,
    totalApplications: 234,
    pendingApplications: 18,
    totalServices: 8,
    activeServices: 6,
    revenue: 125000,
    revenueGrowth: 12.5,
  })

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "user_registration",
      user: "Priya Sharma",
      description: "New user registered as Startup Founder",
      timestamp: "2 minutes ago",
    },
    {
      id: "2",
      type: "event_registration",
      user: "Rahul Kumar",
      description: 'Registered for "Startup Pitch Workshop"',
      timestamp: "15 minutes ago",
    },
    {
      id: "3",
      type: "application_submitted",
      user: "Anita Patel",
      description: "Applied for 1-on-1 Mentorship program",
      timestamp: "1 hour ago",
    },
    {
      id: "4",
      type: "service_booking",
      user: "Vikram Singh",
      description: "Booked Legal Services consultation",
      timestamp: "2 hours ago",
    },
    {
      id: "5",
      type: "user_registration",
      user: "Meera Reddy",
      description: "New user registered as Student",
      timestamp: "3 hours ago",
    },
  ])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_registration":
        return <UserPlus className="h-4 w-4 text-green-600" />
      case "event_registration":
        return <Calendar className="h-4 w-4 text-blue-600" />
      case "application_submitted":
        return <Briefcase className="h-4 w-4 text-orange-600" />
      case "service_booking":
        return <DollarSign className="h-4 w-4 text-purple-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityBadgeColor = (type: string) => {
    switch (type) {
      case "user_registration":
        return "bg-green-100 text-green-800"
      case "event_registration":
        return "bg-blue-100 text-blue-800"
      case "application_submitted":
        return "bg-orange-100 text-orange-800"
      case "service_booking":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-lg p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16 border-2 border-white">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback className="bg-white text-red-600 text-lg font-bold">
                {user?.name ? getInitials(user.name) : "AD"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {user?.firstName || user?.name || "Admin"}!
              </h1>
              <p className="text-red-100 flex items-center gap-2 mt-1">
                <Shield className="h-4 w-4" />
                {user?.designation || "Administrator"} • {user?.department || "Admin Panel"}
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-red-100">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatTime(currentTime)}
                </div>
                <span>•</span>
                <span>{formatDate(currentTime)}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Link href="/" target="_blank" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Visit Website
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Link href="/admin/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{stats.newUsersThisMonth}</span> this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">{stats.upcomingEvents} upcoming events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-600">{stats.pendingApplications} pending</span> review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(stats.revenue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{stats.revenueGrowth}%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest user activities and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{activity.user}</span>
                      <Badge className={`text-xs ${getActivityBadgeColor(activity.type)}`}>
                        {activity.type.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/analytics">
                View All Activity
                <TrendingUp className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/admin/users">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/admin/events">
                <Calendar className="h-4 w-4 mr-2" />
                Manage Events
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/admin/applications">
                <Briefcase className="h-4 w-4 mr-2" />
                Review Applications
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/admin/services">
                <Settings className="h-4 w-4 mr-2" />
                Manage Services
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/admin/analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              User Growth
            </CardTitle>
            <CardDescription>Monthly user registration trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization would go here</p>
                <p className="text-sm text-gray-400">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              User Distribution
            </CardTitle>
            <CardDescription>Breakdown by user types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Startups</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div className="w-3/5 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">60%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Students</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div className="w-1/4 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">25%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mentors</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div className="w-1/10 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">10%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Investors</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div className="w-1/20 h-2 bg-orange-600 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
