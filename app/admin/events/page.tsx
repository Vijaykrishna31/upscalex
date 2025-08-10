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
import { Plus, Edit, Trash2, MoreHorizontal, ArrowLeft, Calendar, Users, MapPin, Clock, Eye } from "lucide-react"
import Link from "next/link"

export default function AdminEvents() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "AI Startup Bootcamp",
      description: "Intensive 5-day program for AI entrepreneurs",
      date: "2025-01-15",
      time: "09:00",
      location: "Bangalore, India",
      maxAttendees: 50,
      currentAttendees: 45,
      status: "upcoming",
      category: "Bootcamp",
      cost: "₹5,000",
      createdDate: "Dec 1, 2024",
    },
    {
      id: 2,
      title: "Investor Pitch Night",
      description: "Present your startup to top VCs and angel investors",
      date: "2024-12-22",
      time: "18:00",
      location: "Mumbai, India",
      maxAttendees: 30,
      currentAttendees: 28,
      status: "ongoing",
      category: "Networking",
      cost: "Free",
      createdDate: "Nov 28, 2024",
    },
    {
      id: 3,
      title: "Tech Networking Meetup",
      description: "Connect with fellow entrepreneurs and tech enthusiasts",
      date: "2024-12-10",
      time: "19:00",
      location: "Delhi, India",
      maxAttendees: 100,
      currentAttendees: 67,
      status: "completed",
      category: "Networking",
      cost: "Free",
      createdDate: "Nov 20, 2024",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<any>(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxAttendees: "",
    category: "",
    cost: "",
    status: "upcoming",
  })

  const handleAddEvent = () => {
    const event = {
      id: Date.now(),
      ...newEvent,
      maxAttendees: Number.parseInt(newEvent.maxAttendees),
      currentAttendees: 0,
      createdDate: new Date().toLocaleDateString(),
    }
    setEvents([...events, event])
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      maxAttendees: "",
      category: "",
      cost: "",
      status: "upcoming",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditEvent = (event: any) => {
    setEditingEvent(event)
    setNewEvent({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      maxAttendees: event.maxAttendees.toString(),
      category: event.category,
      cost: event.cost,
      status: event.status,
    })
  }

  const handleUpdateEvent = () => {
    setEvents(
      events.map((event) =>
        event.id === editingEvent.id
          ? { ...event, ...newEvent, maxAttendees: Number.parseInt(newEvent.maxAttendees) }
          : event,
      ),
    )
    setEditingEvent(null)
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      maxAttendees: "",
      category: "",
      cost: "",
      status: "upcoming",
    })
  }

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const EventForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Event Title *</Label>
        <Input
          id="title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          placeholder="Enter event title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          placeholder="Describe the event..."
          className="min-h-[100px]"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time *</Label>
          <Input
            id="time"
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
          placeholder="e.g., Bangalore, India"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="maxAttendees">Max Attendees *</Label>
          <Input
            id="maxAttendees"
            type="number"
            value={newEvent.maxAttendees}
            onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: e.target.value })}
            placeholder="e.g., 50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={newEvent.category} onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bootcamp">Bootcamp</SelectItem>
              <SelectItem value="Workshop">Workshop</SelectItem>
              <SelectItem value="Networking">Networking</SelectItem>
              <SelectItem value="Conference">Conference</SelectItem>
              <SelectItem value="Webinar">Webinar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cost">Cost *</Label>
          <Input
            id="cost"
            value={newEvent.cost}
            onChange={(e) => setNewEvent({ ...newEvent, cost: e.target.value })}
            placeholder="e.g., Free, ₹1,000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status *</Label>
        <Select value={newEvent.status} onValueChange={(value) => setNewEvent({ ...newEvent, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-2 pt-4">
        <Button onClick={isEdit ? handleUpdateEvent : handleAddEvent} className="flex-1">
          {isEdit ? "Update Event" : "Create Event"}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (isEdit) {
              setEditingEvent(null)
            } else {
              setIsAddDialogOpen(false)
            }
            setNewEvent({
              title: "",
              description: "",
              date: "",
              time: "",
              location: "",
              maxAttendees: "",
              category: "",
              cost: "",
              status: "upcoming",
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
                <h1 className="text-xl font-bold">Event Management</h1>
                <p className="text-sm text-gray-600">Manage all platform events</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>Add a new event to the platform</DialogDescription>
                </DialogHeader>
                <EventForm />
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
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold">{events.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                  <p className="text-2xl font-bold">{events.filter((e) => e.status === "upcoming").length}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Attendees</p>
                  <p className="text-2xl font-bold">{events.reduce((sum, e) => sum + e.currentAttendees, 0)}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Attendance</p>
                  <p className="text-2xl font-bold">
                    {Math.round(
                      (events.reduce((sum, e) => sum + e.currentAttendees / e.maxAttendees, 0) / events.length) * 100,
                    )}
                    %
                  </p>
                </div>
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline">{event.category}</Badge>
                      <Badge
                        variant={
                          event.status === "upcoming"
                            ? "default"
                            : event.status === "ongoing"
                              ? "secondary"
                              : event.status === "completed"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {event.status}
                      </Badge>
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
                      <DropdownMenuItem onClick={() => handleEditEvent(event)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Event
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="h-4 w-4 mr-2" />
                        Manage Attendees
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteEvent(event.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Event
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{event.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>
                      {event.currentAttendees}/{event.maxAttendees} attendees
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Cost: <span className="font-semibold text-green-600">{event.cost}</span>
                  </span>
                  <span className="text-gray-500">Created: {event.createdDate}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Event Dialog */}
        <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
              <DialogDescription>Update event information</DialogDescription>
            </DialogHeader>
            <EventForm isEdit={true} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
