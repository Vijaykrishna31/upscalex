"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Download,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("30d")

  const stats = [
    { title: "Total Revenue", value: "₹12.5L", change: "+18%", trend: "up" },
    { title: "New Users", value: "2,847", change: "+12%", trend: "up" },
    { title: "Active Events", value: "12", change: "+15%", trend: "up" },
    { title: "Conversion Rate", value: "3.2%", change: "-2%", trend: "down" },
  ]

  const userGrowthData = [
    { month: "Jul", users: 1200 },
    { month: "Aug", users: 1450 },
    { month: "Sep", users: 1680 },
    { month: "Oct", users: 1920 },
    { month: "Nov", users: 2150 },
    { month: "Dec", users: 2847 },
  ]

  const servicePopularity = [
    { service: "1-on-1 Mentorship", applications: 456, percentage: 35 },
    { service: "Tech Internship", applications: 324, percentage: 25 },
    { service: "Startup Bootcamp", applications: 234, percentage: 18 },
    { service: "Legal Services", applications: 156, percentage: 12 },
    { service: "Funding Connect", applications: 130, percentage: 10 },
  ]

  const userTypeDistribution = [
    { type: "Startups", count: 1245, percentage: 44 },
    { type: "Students", count: 856, percentage: 30 },
    { type: "Mentors", count: 423, percentage: 15 },
    { type: "Investors", count: 201, percentage: 7 },
    { type: "Freelancers", count: 122, percentage: 4 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Analytics & Reports</h1>
                <p className="text-sm text-gray-600">Platform insights and performance metrics</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change} from last period
                    </p>
                  </div>
                  <TrendingUp className={`h-8 w-8 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                User Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">User Growth Chart</p>
                  <p className="text-sm text-gray-400">Interactive chart showing user growth over time</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-6 gap-2">
                {userGrowthData.map((data, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-500">{data.month}</div>
                    <div className="text-sm font-semibold">{data.users}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                User Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userTypeDistribution.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-blue-${(index + 1) * 100}`}></div>
                      <span className="text-sm font-medium">{type.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{type.count}</div>
                      <div className="text-xs text-gray-500">{type.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Service Popularity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Service Popularity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {servicePopularity.map((service, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{service.service}</span>
                      <span className="text-gray-600">{service.applications} applications</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${service.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Platform Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">156</div>
                    <div className="text-sm text-gray-600">New signups today</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">23</div>
                    <div className="text-sm text-gray-600">Events this month</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">89%</div>
                    <div className="text-sm text-gray-600">User satisfaction</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <DollarSign className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-600">₹45K</div>
                    <div className="text-sm text-gray-600">Revenue this week</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
