// User Types
export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "startup" | "student" | "mentor" | "investor" | "freelancer" | "admin"
  avatar?: string
  status: "active" | "inactive" | "pending" | "suspended"
  createdAt: string
  updatedAt: string
  profileCompletion: number
  isVerified: boolean
  lastLogin?: string

  // Role-specific fields
  company?: string
  experience?: string
  skills?: string[]
  bio?: string
  linkedin?: string
  website?: string
  location?: string

  // Startup specific
  startupStage?: "idea" | "mvp" | "early" | "growth" | "scale"
  fundingStatus?: "bootstrapped" | "seed" | "series-a" | "series-b" | "later"
  industry?: string
  teamSize?: number

  // Student specific
  university?: string
  course?: string
  graduationYear?: number

  // Mentor specific
  mentorshipAreas?: string[]
  availability?: "full-time" | "part-time" | "weekends"

  // Investor specific
  investmentRange?: string
  investmentStage?: string[]
  portfolioSize?: number
}

// Service Types
export interface Service {
  id: string
  title: string
  description: string
  category: "mentorship" | "legal" | "internship" | "bootcamp" | "funding" | "workshop"
  cost: string
  duration?: string
  whoCanApply: string[]
  requirements?: string[]
  benefits?: string[]
  isActive: boolean
  isPopular: boolean
  isNew: boolean
  maxParticipants?: number
  currentParticipants: number
  startDate?: string
  endDate?: string
  location?: string
  mode: "online" | "offline" | "hybrid"
  instructor?: string
  rating?: number
  reviews?: Review[]
  createdAt: string
  updatedAt: string
}

// Event Types
export interface Event {
  id: string
  title: string
  description: string
  shortInfo: string
  date: string
  time: string
  endTime?: string
  location: string
  mode: "online" | "offline" | "hybrid"
  category: "bootcamp" | "workshop" | "networking" | "funding" | "mentorship" | "conference"
  poster: string
  attendees: number
  maxAttendees: number
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  price: number
  currency: string
  organizer: string
  speakers?: Speaker[]
  agenda?: AgendaItem[]
  tags: string[]
  registrationDeadline?: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

// Application Types
export interface Application {
  id: string
  userId: string
  user: User
  serviceId?: string
  service?: Service
  eventId?: string
  event?: Event
  type: "service" | "event" | "mentorship" | "funding"
  status: "pending" | "approved" | "rejected" | "in-review" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  reviewNotes?: string
  documents?: Document[]
  formData: Record<string, any>
  paymentStatus?: "pending" | "paid" | "failed" | "refunded"
  paymentAmount?: number
}

// Form Types
export interface RegistrationFormData {
  // Basic Info
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string

  // Profile Info
  bio: string
  linkedin?: string
  website?: string
  location: string

  // Role-specific data
  role: User["role"]
  company?: string
  experience?: string
  skills?: string
  university?: string
  course?: string
  graduationYear?: number

  // Preferences
  interests: string[]
  goals: string[]
  availability?: string

  // Terms
  agreeToTerms: boolean
  subscribeToNewsletter: boolean
}

export interface ServiceApplicationFormData {
  applicationType: string
  personalInfo: {
    name: string
    email: string
    phone: string
    company?: string
    experience: string
  }
  motivation: string
  documents: File[]
  additionalInfo?: Record<string, any>
}

export interface EventRegistrationFormData {
  eventId: string
  personalInfo: {
    name: string
    email: string
    phone: string
    company?: string
    designation?: string
  }
  dietaryRequirements?: string
  specialNeeds?: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  paymentInfo?: {
    method: "card" | "upi" | "netbanking"
    transactionId?: string
  }
}

// Supporting Types
export interface Review {
  id: string
  userId: string
  user: Pick<User, "name" | "avatar">
  rating: number
  comment: string
  createdAt: string
}

export interface Speaker {
  id: string
  name: string
  designation: string
  company: string
  bio: string
  avatar?: string
  linkedin?: string
  twitter?: string
}

export interface AgendaItem {
  id: string
  time: string
  title: string
  description: string
  speaker?: string
  duration: number
  type: "session" | "break" | "networking" | "panel"
}

export interface Document {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedAt: string
}

// Filter and Pagination Types
export interface FilterOptions {
  search?: string
  category?: string
  status?: string
  role?: string
  dateRange?: {
    start: string
    end: string
  }
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface PaginationOptions {
  page: number
  limit: number
  total: number
  totalPages: number
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  pagination?: PaginationOptions
}

// Dashboard Types
export interface DashboardStats {
  totalUsers: number
  totalServices: number
  totalEvents: number
  totalApplications: number
  activeUsers: number
  pendingApplications: number
  upcomingEvents: number
  revenue: number
  growthRate: number
}

export interface UserDashboardData {
  user: User
  applications: Application[]
  registeredEvents: Event[]
  recommendations: Service[]
  notifications: Notification[]
  stats: {
    applicationsSubmitted: number
    eventsAttended: number
    profileCompletion: number
    mentorshipSessions?: number
  }
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  isRead: boolean
  actionUrl?: string
  createdAt: string
}

// Settings Types
export interface PlatformSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  supportEmail: string
  socialLinks: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
  }
  features: {
    registrationEnabled: boolean
    paymentEnabled: boolean
    notificationsEnabled: boolean
    maintenanceMode: boolean
  }
  limits: {
    maxFileSize: number
    maxApplicationsPerUser: number
    maxEventsPerMonth: number
  }
}

// Analytics Types
export interface AnalyticsData {
  userGrowth: {
    date: string
    users: number
    newUsers: number
  }[]
  applicationTrends: {
    date: string
    applications: number
    approved: number
    rejected: number
  }[]
  eventAttendance: {
    eventId: string
    eventName: string
    registered: number
    attended: number
  }[]
  revenueData: {
    date: string
    revenue: number
    transactions: number
  }[]
}
