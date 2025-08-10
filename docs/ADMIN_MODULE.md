# Admin Module Documentation

## Overview
The admin module provides comprehensive platform management capabilities including user management, service administration, event coordination, application processing, and system analytics.

## 🏗 Architecture

### File Structure
\`\`\`
app/admin/
├── page.tsx                 # Admin dashboard
├── login/page.tsx          # Admin authentication
├── users/page.tsx          # User management
├── services/page.tsx       # Service management
├── events/page.tsx         # Event management
├── applications/page.tsx   # Application processing
├── analytics/page.tsx      # Analytics dashboard
└── settings/page.tsx       # Platform settings
\`\`\`

## 🎯 Core Features

### 1. Admin Dashboard
**File**: `app/admin/page.tsx`

**Features**:
- Real-time platform statistics
- Quick action buttons
- Recent activity feed
- System alerts and notifications
- Performance metrics overview

**Key Metrics**:
- Total Users: 2,847 (+12%)
- Active Users: 2,234 (+8%)
- Total Services: 24 (+3%)
- Active Events: 12 (+15%)
- Applications: 1,456 (+22%)
- Revenue: ₹12.5L (+18%)

**Code Example**:
\`\`\`typescript
const useAdminAuth = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")

    if (!userData) {
      router.push("/admin/login")
      return
    }

    const parsedUser = JSON.parse(userData)

    if (parsedUser.role !== "admin") {
      router.push("/unauthorized")
      return
    }

    setUser(parsedUser)
    setLoading(false)
  }, [router])

  return { user, loading }
}
\`\`\`

### 2. User Management System
**File**: `app/admin/users/page.tsx`

**Features**:
- Complete user CRUD operations
- Advanced filtering and search
- Bulk operations
- User profile management
- Status control (active/inactive/suspended)

**User Operations**:
- View detailed user profiles
- Edit user information
- Activate/suspend accounts
- Delete users
- Send messages to users
- Export user data

**Filtering Options**:
- By user type (startup, student, mentor, investor, freelancer)
- By status (active, inactive, suspended)
- By location (city, state)
- By registration date

**Code Example**:
\`\`\`typescript
const handleStatusChange = (userId: number, newStatus: string) => {
  setUsers(users.map(user => 
    user.id === userId 
      ? { ...user, status: newStatus }
      : user
  ))
  
  // API call would go here
  console.log(`User ${userId} status changed to ${newStatus}`)
}

const UserDetailsModal = ({ user }: { user: any }) => (
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>User Details</DialogTitle>
    </DialogHeader>
    <div className="space-y-6">
      {/* User information display */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{user.email}</span>
          </div>
          {/* More user details */}
        </div>
      </div>
    </div>
  </DialogContent>
)
\`\`\`

### 3. Service Management
**File**: `app/admin/services/page.tsx`

**Features**:
- Create new services
- Edit existing services
- Delete services
- Manage pricing and eligibility
- Track application metrics

**Service Properties**:
- Title and description
- Category classification
- Cost structure
- Eligibility criteria
- Application tracking
- Status management

**Service Categories**:
- Mentorship
- Legal
- Internship
- Bootcamp
- Funding
- Workshop

**Code Example**:
\`\`\`typescript
const handleAddService = () => {
  const service = {
    id: Date.now(),
    ...newService,
    applicants: 0,
    createdDate: new Date().toLocaleDateString(),
  }
  
  setServices([...services, service])
  setIsAddDialogOpen(false)
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
    {/* More form fields */}
  </div>
)
\`\`\`

### 4. Event Management
**File**: `app/admin/events/page.tsx`

**Features**:
- Create and schedule events
- Manage event details
- Track registrations
- Monitor attendance
- Event analytics

**Event Properties**:
- Title and description
- Date and time
- Location details
- Capacity management
- Registration tracking
- Status monitoring

**Event Status Types**:
- Upcoming
- Ongoing
- Completed
- Cancelled

**Code Example**:
\`\`\`typescript
const handleAddEvent = () => {
  const event = {
    id: Date.now(),
    ...newEvent,
    maxAttendees: parseInt(newEvent.maxAttendees),
    currentAttendees: 0,
    createdDate: new Date().toLocaleDateString(),
  }
  
  setEvents([...events, event])
  setIsAddDialogOpen(false)
}

const EventCard = ({ event }: { event: any }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-lg">{event.title}</CardTitle>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="outline">{event.category}</Badge>
            <Badge variant={getStatusVariant(event.status)}>
              {event.status}
            </Badge>
          </div>
        </div>
      </div>
    </CardHeader>
    {/* Event details */}
  </Card>
)
\`\`\`

### 5. Application Processing
**File**: `app/admin/applications/page.tsx`

**Features**:
- Review submitted applications
- Approve/reject applications
- Document management
- Applicant communication
- Application analytics

**Application Workflow**:
1. Application submission
2. Document review
3. Admin evaluation
4. Approval/rejection decision
5. Applicant notification

**Application Status**:
- Pending review
- Under evaluation
- Approved
- Rejected
- Requires additional information

**Code Example**:
\`\`\`typescript
const handleStatusChange = (applicationId: number, newStatus: string) => {
  setApplications(applications.map(app => 
    app.id === applicationId 
      ? { ...app, status: newStatus }
      : app
  ))
  
  // Send notification to applicant
  sendNotification(applicationId, newStatus)
}

const ApplicationDetailsModal = ({ application }: { application: any }) => (
  <DialogContent className="max-w-3xl">
    <DialogHeader>
      <DialogTitle>Application Details</DialogTitle>
    </DialogHeader>
    <div className="space-y-6">
      {/* Application information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Applicant Information</h4>
          {/* Applicant details */}
        </div>
        <div>
          <h4 className="font-semibold mb-3">Application Details</h4>
          {/* Application details */}
        </div>
      </div>
    </div>
  </DialogContent>
)
\`\`\`

### 6. Analytics Dashboard
**File**: `app/admin/analytics/page.tsx`

**Features**:
- Platform performance metrics
- User growth analytics
- Revenue tracking
- Service popularity analysis
- Event attendance statistics

**Key Analytics**:
- User registration trends
- Service application rates
- Event attendance patterns
- Revenue generation
- Platform engagement metrics

**Visualization Components**:
- User growth charts
- Service popularity graphs
- Revenue trend analysis
- Geographic distribution
- Time-based analytics

### 7. Platform Settings
**File**: `app/admin/settings/page.tsx`

**Features**:
- General platform configuration
- Email system settings
- Notification preferences
- Security configurations
- Platform controls

**Setting Categories**:

#### General Settings
- Platform name and description
- Contact information
- Logo and branding
- Address details

#### Email Configuration
- SMTP server settings
- Email templates
- Notification preferences
- Delivery tracking

#### Security Settings
- Two-factor authentication
- Session timeout
- Password policies
- Access controls

#### Platform Controls
- User registration toggle
- Event creation permissions
- Service applications
- Maintenance mode

**Code Example**:
\`\`\`typescript
const [settings, setSettings] = useState({
  platformName: "UpscaleX",
  platformDescription: "India's premier platform for startups",
  contactEmail: "admin@upscalex.com",
  supportPhone: "+91 98765 43210",
  // Email settings
  smtpServer: "smtp.gmail.com",
  smtpPort: "587",
  // Security settings
  twoFactorAuth: false,
  sessionTimeout: "30",
  // Platform controls
  userRegistration: true,
  maintenanceMode: false,
})

const handleSave = () => {
  // Save settings to backend
  console.log("Saving settings:", settings)
  // Show success notification
}
\`\`\`

## 🔐 Authentication & Security

### Admin Authentication
**File**: `app/admin/login/page.tsx`

**Features**:
- Secure admin login
- Role-based access control
- Session management
- Error handling

**Security Measures**:
- Input validation
- CSRF protection
- Rate limiting
- Secure session storage

**Demo Credentials**:
- Username: `admin`
- Password: `admin123`

### Route Protection
\`\`\`typescript
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAdminAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user || user.role !== 'admin') {
    return <Redirect to="/admin/login" />
  }

  return <>{children}</>
}
\`\`\`

## 📊 Data Management

### State Management
\`\`\`typescript
// User management state
const [users, setUsers] = useState<User[]>([])
const [filteredUsers, setFilteredUsers] = useState<User[]>([])
const [searchTerm, setSearchTerm] = useState("")
const [filterType, setFilterType] = useState("all")

// Service management state
const [services, setServices] = useState<Service[]>([])
const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
const [editingService, setEditingService] = useState<Service | null>(null)

// Event management state
const [events, setEvents] = useState<Event[]>([])
const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
\`\`\`

### Data Filtering
\`\`\`typescript
const filteredUsers = users.filter((user) => {
  const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchTerm.toLowerCase())
  const matchesType = filterType === "all" || user.type === filterType
  const matchesStatus = filterStatus === "all" || user.status === filterStatus
  return matchesSearch && matchesType && matchesStatus
})
\`\`\`

## 🎨 UI Components

### Admin Layout
- Consistent header with admin branding
- Navigation breadcrumbs
- Action buttons
- Status indicators

### Data Tables
- Sortable columns
- Pagination
- Bulk actions
- Export functionality

### Modal Dialogs
- Form modals for creation/editing
- Confirmation dialogs
- Detail view modals
- Image preview modals

### Charts and Graphs
- Line charts for trends
- Bar charts for comparisons
- Pie charts for distributions
- Progress indicators

## 🔧 Configuration

### Admin Routes
\`\`\`typescript
const adminRoutes = [
  { path: '/admin', component: AdminDashboard },
  { path: '/admin/users', component: UserManagement },
  { path: '/admin/services', component: ServiceManagement },
  { path: '/admin/events', component: EventManagement },
  { path: '/admin/applications', component: ApplicationManagement },
  { path: '/admin/analytics', component: Analytics },
  { path: '/admin/settings', component: Settings },
]
\`\`\`

### Permission System
\`\`\`typescript
const permissions = {
  'admin': ['read', 'write', 'delete', 'manage'],
  'moderator': ['read', 'write'],
  'viewer': ['read']
}

const hasPermission = (userRole: string, action: string) => {
  return permissions[userRole]?.includes(action) || false
}
\`\`\`

## 📈 Performance Optimization

### Lazy Loading
\`\`\`typescript
const UserManagement = lazy(() => import('./users/page'))
const ServiceManagement = lazy(() => import('./services/page'))
const EventManagement = lazy(() => import('./events/page'))
\`\`\`

### Memoization
\`\`\`typescript
const memoizedFilteredUsers = useMemo(() => {
  return users.filter(user => {
    // Filtering logic
  })
}, [users, searchTerm, filterType])
\`\`\`

### Virtual Scrolling
For large datasets, implement virtual scrolling to improve performance.

## 🧪 Testing

### Unit Tests
\`\`\`typescript
describe('UserManagement', () => {
  test('should filter users by type', () => {
    const users = [
      { id: 1, type: 'startup', name: 'John' },
      { id: 2, type: 'student', name: 'Jane' }
    ]
    
    const filtered = filterUsersByType(users, 'startup')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].name).toBe('John')
  })
})
\`\`\`

### Integration Tests
\`\`\`typescript
describe('Admin Dashboard Integration', () => {
  test('should load dashboard with correct stats', async () => {
    render(<AdminDashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('Total Users')).toBeInTheDocument()
      expect(screen.getByText('2,847')).toBeInTheDocument()
    })
  })
})
\`\`\`

## 🚀 Deployment

### Environment Variables
\`\`\`env
ADMIN_SECRET_KEY=your_admin_secret
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url
EMAIL_SERVICE_API_KEY=your_email_api_key
\`\`\`

### Build Configuration
\`\`\`json
{
  "scripts": {
    "build:admin": "next build && next export",
    "deploy:admin": "npm run build:admin && deploy-to-server"
  }
}
\`\`\`

## 🔍 Monitoring & Logging

### Error Tracking
\`\`\`typescript
const logAdminAction = (action: string, userId: string, details: any) => {
  console.log(`Admin Action: ${action}`, {
    userId,
    timestamp: new Date().toISOString(),
    details
  })
  
  // Send to logging service
  sendToLoggingService({
    level: 'info',
    action,
    userId,
    details
  })
}
\`\`\`

### Performance Monitoring
\`\`\`typescript
const trackPerformance = (componentName: string, loadTime: number) => {
  if (loadTime > 1000) {
    console.warn(`Slow component: ${componentName} took ${loadTime}ms`)
  }
}
\`\`\`

---

This admin module provides comprehensive platform management capabilities with a focus on usability, security, and performance. It enables administrators to efficiently manage all aspects of the UpscaleX platform while maintaining data integrity and user experience.
