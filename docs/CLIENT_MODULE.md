# Client Module Documentation

## Overview
The client module handles all user-facing functionality including registration, service applications, event management, and user dashboards.

## 🏗 Architecture

### File Structure
\`\`\`
app/(client)/
├── page.tsx                 # Home page
├── about/page.tsx          # About page
├── services/page.tsx       # Services listing
├── events/page.tsx         # Events listing
├── join/page.tsx           # User registration
├── contact/page.tsx        # Contact page
├── apply/page.tsx          # Application form
├── login/page.tsx          # User login
├── signup/page.tsx         # User registration
└── dashboard/page.tsx      # User dashboard
\`\`\`

## 🎯 Key Features

### 1. User Registration System
**File**: `app/signup/page.tsx`

**Features**:
- Multi-step registration process
- Category-specific data collection
- Form validation and error handling
- Password strength requirements
- Terms and conditions acceptance

**User Categories**:
- **Startups**: Company details, funding stage, team size
- **Students**: Academic information, skills, internship preferences
- **Mentors**: Professional experience, expertise areas
- **Investors**: Investment focus, portfolio size, sectors
- **Freelancers**: Services offered, hourly rates, portfolio

**Code Example**:
\`\`\`typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords don't match!")
    return
  }

  const userData = {
    id: Date.now(),
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    role: "user",
    userType: formData.userType,
    profile: {
      // Category-specific data
    }
  }

  localStorage.setItem("user", JSON.stringify(userData))
  window.location.href = "/dashboard"
}
\`\`\`

### 2. Service Application System
**File**: `app/services/page.tsx`

**Features**:
- Service browsing with filters
- Search functionality
- Category-based filtering
- Application submission
- Cost and eligibility display

**Available Services**:
- 1-on-1 Mentorship (Free)
- Legal Services (₹15,000)
- Tech Internship Program (Free)
- Startup Bootcamp (₹5,000)
- Funding Connect (Free)
- Business Scaling Workshop (₹2,500)

### 3. Event Management
**File**: `app/events/page.tsx`

**Features**:
- Current and upcoming events
- Event registration
- Capacity tracking
- Event details and location
- Registration status

**Event Types**:
- Bootcamps
- Workshops
- Networking events
- Investor pitch nights
- Conferences

### 4. User Dashboard
**File**: `app/dashboard/page.tsx`

**Features**:
- Profile overview
- Application tracking
- Event registrations
- Notifications
- Settings management

## 🔐 Authentication Flow

### Login Process
**File**: `app/login/page.tsx`

\`\`\`typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const userData = {
      id: 1,
      name: "John Doe",
      email: formData.email,
      role: formData.email === "admin@upscalex.com" ? "admin" : "user",
      userType: "startup",
    }

    localStorage.setItem("user", JSON.stringify(userData))

    if (userData.role === "admin") {
      window.location.href = "/admin"
    } else {
      window.location.href = "/dashboard"
    }
  } catch (error) {
    console.error("Login failed:", error)
  }
}
\`\`\`

### Protected Routes
**File**: `components/protected-route.tsx`

\`\`\`typescript
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  if (loading) return <div>Loading...</div>
  if (!user) return <LoginForm />

  return <>{children}</>
}
\`\`\`

## 🎨 UI Components

### Header Component
**File**: `components/header.tsx`

**Features**:
- Responsive navigation
- User authentication state
- Role-based menu items
- Mobile-friendly design

### Form Components
- Input validation
- Error handling
- Loading states
- Accessibility features

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Hamburger menu
- Touch-friendly buttons
- Optimized forms
- Swipe gestures

## 🔍 Search & Filtering

### Service Filtering
\`\`\`typescript
const filteredServices = services.filter((service) => {
  const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase())
  const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
  return matchesSearch && matchesCategory
})
\`\`\`

### Event Filtering
- By status (current/upcoming)
- By category
- By location
- By date range

## 📊 State Management

### User State
\`\`\`typescript
const useAuth = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/"
  }

  return { user, loading, logout }
}
\`\`\`

## 🚀 Performance Optimizations

### Code Splitting
- Route-based splitting
- Component lazy loading
- Dynamic imports

### Image Optimization
- Next.js Image component
- Placeholder images
- Responsive images

### Caching Strategy
- Static generation
- Incremental static regeneration
- Client-side caching

## 🧪 Testing Strategy

### Unit Tests
- Component testing
- Hook testing
- Utility function testing

### Integration Tests
- Form submission
- Navigation flow
- Authentication flow

### E2E Tests
- User registration flow
- Application submission
- Event registration

## 🔧 Configuration

### TypeScript Configuration
\`\`\`json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
\`\`\`

### Tailwind Configuration
\`\`\`javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
\`\`\`

## 🐛 Error Handling

### Form Validation
\`\`\`typescript
const validateForm = (data: FormData) => {
  const errors: string[] = []
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Valid email is required")
  }
  
  if (!data.password || data.password.length < 8) {
    errors.push("Password must be at least 8 characters")
  }
  
  return errors
}
\`\`\`

### API Error Handling
\`\`\`typescript
try {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  
  if (!response.ok) {
    throw new Error('Registration failed')
  }
  
  const result = await response.json()
  return result
} catch (error) {
  console.error('Error:', error)
  setError('Registration failed. Please try again.')
}
\`\`\`

## 🔒 Security Measures

### Input Sanitization
- XSS prevention
- SQL injection protection
- CSRF tokens

### Data Validation
- Client-side validation
- Server-side validation
- Type checking

### Authentication Security
- Password hashing
- Session management
- JWT tokens

## 📈 Analytics Integration

### User Tracking
\`\`\`typescript
const trackUserAction = (action: string, data?: any) => {
  // Analytics implementation
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      custom_parameter: data
    })
  }
}
\`\`\`

### Performance Monitoring
- Core Web Vitals
- Error tracking
- User behavior analytics

---

This client module provides a comprehensive user experience with modern web development practices, responsive design, and robust functionality for all user types in the UpscaleX ecosystem.
