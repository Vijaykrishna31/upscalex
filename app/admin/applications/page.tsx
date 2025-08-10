"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Download,
  Eye,
  Check,
  X,
  MoreHorizontal,
  ArrowLeft,
  FileText,
  Users,
  Clock,
  Mail,
  Phone,
} from "lucide-react"
import Link from "next/link"

export default function AdminApplications() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedApplication, setSelectedApplication] = useState<any>(null)

  const applications = [
    {
      id: 1,
      applicantName: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
      serviceType: "1-on-1 Mentorship",
      status: "pending",
      appliedDate: "Dec 20, 2024",
      experience: "2-5 years",
      motivation: "Looking to scale my startup and need guidance on product-market fit...",
      documents: ["resume.pdf"],
    },
    {
      id: 2,
      applicantName: "Sarah Smith",
      email: "sarah@example.com",
      phone: "+91 98765 43211",
      serviceType: "Startup Bootcamp",
      status: "approved",
      appliedDate: "Dec 19, 2024",
      experience: "5-10 years",
      motivation: "Want to transition from corporate to entrepreneurship...",
      documents: ["resume.pdf", "business_plan.pdf"],
    },
    {
      id: 3,
      applicantName: "Mike Johnson",
      email: "mike@example.com",
      phone: "+91 98765 43212",
      serviceType: "Tech Internship",
      status: "rejected",
      appliedDate: "Dec 18, 2024",
      experience: "0-2 years",
      motivation: "Recent graduate looking for hands-on experience...",
      documents: ["resume.pdf"],
    },
    {
      id: 4,
      applicantName: "Emily Brown",
      email: "emily@example.com",
      phone: "+91 98765 43213",
      serviceType: "Legal Services",
      status: "pending",
      appliedDate: "Dec 17, 2024",
      experience: "2-5 years",
      motivation: "Need help with company registration and compliance...",
      documents: ["resume.pdf", "company_details.pdf"],
    },
  ]

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || app.serviceType === filterType
    const matchesStatus = filterStatus === "all" || app.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const handleStatusChange = (applicationId: number, newStatus: string) => {
    console.log(`Changing application ${applicationId} status to ${newStatus}`)
    // Implement status change logic
  }

  const ApplicationDetailsModal = ({ application }: { application: any }) => (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Application Details</DialogTitle>
        <DialogDescription>Review application from {application.applicantName}</DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        {/* Applicant Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Applicant Information</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium">Name:</span>
                <span>{application.applicantName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{application.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{application.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>Applied: {application.appliedDate}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Application Details</h4>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Service:</span>
                <span className="ml-2">{application.serviceType}</span>
              </div>
              <div>
                <span className="font-medium">Experience:</span>
                <span className="ml-2">{application.experience}</span>
              </div>
              <div>
                <span className="font-medium">Status:</span>
                <Badge
                  className="ml-2"
                  variant={
                    application.status === "approved"
                      ? "default"
                      : application.status === "pending"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {application.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div>
          <h4 className="font-semibold mb-3">Motivation</h4>
          <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{application.motivation}</p>
        </div>

        {/* Documents */}
        <div>
          <h4 className="font-semibold mb-3">Documents</h4>
          <div className="space-y-2">
            {application.documents.map((doc: string, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>{doc}</span>
                </div>
                <Button size="sm" variant="outline">
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-4 border-t">
          {application.status === "pending" && (
            <>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleStatusChange(application.id, "approved")}
              >
                <Check className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleStatusChange(application.id, "rejected")}>
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </>
          )}
          <Button size="sm" variant="outline">
            <Mail className="h-4 w-4 mr-1" />
            Contact Applicant
          </Button>
        </div>
      </div>
    </DialogContent>
  )

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
                <h1 className="text-xl font-bold">Application Management</h1>
                <p className="text-sm text-gray-600">Review and manage all applications</p>
              </div>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Applications
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold">{applications.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold">{applications.filter((a) => a.status === "pending").length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold">{applications.filter((a) => a.status === "approved").length}</p>
                </div>
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approval Rate</p>
                  <p className="text-2xl font-bold">
                    {Math.round(
                      (applications.filter((a) => a.status === "approved").length / applications.length) * 100,
                    )}
                    %
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search applications by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="1-on-1 Mentorship">Mentorship</SelectItem>
                  <SelectItem value="Startup Bootcamp">Bootcamp</SelectItem>
                  <SelectItem value="Tech Internship">Internship</SelectItem>
                  <SelectItem value="Legal Services">Legal Services</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Applications ({filteredApplications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Applicant</th>
                    <th className="text-left p-4">Service</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Applied Date</th>
                    <th className="text-left p-4">Experience</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((application) => (
                    <tr key={application.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{application.applicantName}</p>
                          <p className="text-sm text-gray-600">{application.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{application.serviceType}</Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            application.status === "approved"
                              ? "default"
                              : application.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {application.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{application.appliedDate}</td>
                      <td className="p-4 text-sm">{application.experience}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedApplication(application)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            {selectedApplication && <ApplicationDetailsModal application={selectedApplication} />}
                          </Dialog>
                          {application.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleStatusChange(application.id, "approved")}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStatusChange(application.id, "rejected")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="outline">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Contact Applicant
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Download Documents
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
