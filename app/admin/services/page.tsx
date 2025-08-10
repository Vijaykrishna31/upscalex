"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus, Edit, Trash2, MoreHorizontal, ArrowLeft, Users, DollarSign, FileText, Eye } from "lucide-react"
import Link from "next/link"

export default function AdminServices() {
  const [services, setServices] = useState([
    {
      id: 1,
      title: "1-on-1 Mentorship",
      category: "Mentorship",
      cost: "Free",
      whoCanApply: "Startups, Students",
      description: "Get personalized guidance from industry experts",
      status: "active",
      applicants: 156,
      createdDate: "Dec 1, 2024",
    },
    {
      id: 2,
      title: "Legal Services for Startups",
      category: "Legal",
      cost: "₹15,000",
      whoCanApply: "Startups",
      description: "Company registration, compliance, and legal documentation",
      status: "active",
      applicants: 89,
      createdDate: "Nov 28, 2024",
    },
    {
      id: 3,
      title: "Tech Internship Program",
      category: "Internship",
      cost: "Free",
      whoCanApply: "Students",
      description: "3-6 month internships with top startups",
      status: "active",
      applicants: 234,
      createdDate: "Nov 25, 2024",
    },
    {
      id: 4,
      title: "Startup Bootcamp",
      category: "Bootcamp",
      cost: "₹5,000",
      whoCanApply: "Entrepreneurs",
      description: "Intensive 2-week program covering all aspects of startup building",
      status: "inactive",
      applicants: 67,
      createdDate: "Nov 20, 2024",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<any>(null)
  const [newService, setNewService] = useState({
    title: "",
    category: "",
    cost: "",
    whoCanApply: "",
    description: "",
    status: "active",
  })

  const handleAddService = () => {
    const service = {
      id: Date.now(),
      ...newService,
      applicants: 0,
      createdDate: new Date().toLocaleDateString(),
    }
    setServices([...services, service])
    setNewService({
      title: "",
      category: "",
      cost: "",
      whoCanApply: "",
      description: "",
      status: "active",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditService = (service: any) => {
    setEditingService(service)
    setNewService({
      title: service.title,
      category: service.category,
      cost: service.cost,
      whoCanApply: service.whoCanApply,
      description: service.description,
      status: service.status,
    })
  }

  const handleUpdateService = () => {
    setServices(services.map((service) => (service.id === editingService.id ? { ...service, ...newService } : service)))
    setEditingService(null)
    setNewService({
      title: "",
      category: "",
      cost: "",
      whoCanApply: "",
      description: "",
      status: "active",
    })
  }

  const handleDeleteService = (id: number) => {
    setServices(services.filter((service) => service.id !== id))
  }

  const ServiceForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Service Title *</Label>
        <Input
          id="title"
          value={newService.title}
          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
          placeholder="Enter service title"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={newService.category}
            onValueChange={(value) => setNewService({ ...newService, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mentorship">Mentorship</SelectItem>
              <SelectItem value="Legal">Legal</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
              <SelectItem value="Bootcamp">Bootcamp</SelectItem>
              <SelectItem value="Funding">Funding</SelectItem>
              <SelectItem value="Workshop">Workshop</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cost">Cost *</Label>
          <Input
            id="cost"
            value={newService.cost}
            onChange={(e) => setNewService({ ...newService, cost: e.target.value })}
            placeholder="e.g., Free, ₹5,000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="whoCanApply">Who Can Apply *</Label>
        <Input
          id="whoCanApply"
          value={newService.whoCanApply}
          onChange={(e) => setNewService({ ...newService, whoCanApply: e.target.value })}
          placeholder="e.g., Startups, Students, Entrepreneurs"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          placeholder="Describe the service..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status *</Label>
        <Select value={newService.status} onValueChange={(value) => setNewService({ ...newService, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-2 pt-4">
        <Button onClick={isEdit ? handleUpdateService : handleAddService} className="flex-1">
          {isEdit ? "Update Service" : "Add Service"}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (isEdit) {
              setEditingService(null)
            } else {
              setIsAddDialogOpen(false)
            }
            setNewService({
              title: "",
              category: "",
              cost: "",
              whoCanApply: "",
              description: "",
              status: "active",
            })
          }}
          className="flex-1 bg-transparent"
        >
          Cancel
        </Button>
      </div>
    </div>
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
                <h1 className="text-xl font-bold">Service Management</h1>
                <p className="text-sm text-gray-600">Manage all platform services</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                  <DialogDescription>Create a new service for the platform</DialogDescription>
                </DialogHeader>
                <ServiceForm />
              </DialogContent>
            </Dialog>
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
                  <p className="text-sm font-medium text-gray-600">Total Services</p>
                  <p className="text-2xl font-bold">{services.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Services</p>
                  <p className="text-2xl font-bold">{services.filter((s) => s.status === "active").length}</p>
                </div>
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                  <p className="text-2xl font-bold">{services.reduce((sum, s) => sum + s.applicants, 0)}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold">₹2.5L</p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline">{service.category}</Badge>
                      <Badge variant={service.status === "active" ? "default" : "secondary"}>{service.status}</Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditService(service)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Service
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteService(service.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Service
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{service.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Cost:</span>
                    <span className="font-semibold text-green-600">{service.cost}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Applicants:</span>
                    <span className="font-semibold">{service.applicants}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Who can apply:</span>
                    <span className="text-sm">{service.whoCanApply}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Created:</span>
                    <span className="text-sm">{service.createdDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Service Dialog */}
        <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
              <DialogDescription>Update service information</DialogDescription>
            </DialogHeader>
            <ServiceForm isEdit={true} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
