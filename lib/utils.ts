import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date and Time Utilities
export function formatDate(date: string | Date, format: "short" | "long" | "relative" = "short"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  if (format === "relative") {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`

    return dateObj.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (format === "long") {
    return dateObj.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return dateObj.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatTime(time: string): string {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export function formatDateTime(dateTime: string | Date): string {
  const dateObj = typeof dateTime === "string" ? new Date(dateTime) : dateTime
  return dateObj.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

// String Utilities
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// Number Utilities
export function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + "Cr"
  }
  if (num >= 100000) {
    return (num / 100000).toFixed(1) + "L"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

// Validation Utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\s+/g, ""))
}

export function isValidURL(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number")
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Array Utilities
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const group = String(item[key])
      groups[group] = groups[group] || []
      groups[group].push(item)
      return groups
    },
    {} as Record<string, T[]>,
  )
}

export function sortBy<T>(array: T[], key: keyof T, order: "asc" | "desc" = "asc"): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]

    if (aVal < bVal) return order === "asc" ? -1 : 1
    if (aVal > bVal) return order === "asc" ? 1 : -1
    return 0
  })
}

export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set()
  return array.filter((item) => {
    const value = item[key]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}

// Object Utilities
export function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  keys.forEach((key) => delete result[key])
  return result
}

export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target }

  for (const key in source) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
     result[key] = deepMerge(result[key] || {}, source[key] as any)
    } else {
      result[key] = source[key] as any
    }
  }

  return result
}

// Local Storage Utilities
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(key)
}

// File Utilities
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/")
}

export function isPDFFile(file: File): boolean {
  return file.type === "application/pdf"
}

// Error Handling Utilities
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === "string") return error
  return "An unknown error occurred"
}

export function handleAsyncError<T>(promise: Promise<T>): Promise<[T | null, Error | null]> {
  return promise.then<[T, null]>((data: T) => [data, null]).catch<[null, Error]>((error: Error) => [null, error])
}

// Debounce Utility
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Theme Utilities
export function getThemeColor(color: string): string {
  const colors: Record<string, string> = {
    blue: "rgb(59 130 246)",
    purple: "rgb(147 51 234)",
    green: "rgb(34 197 94)",
    yellow: "rgb(234 179 8)",
    red: "rgb(239 68 68)",
    indigo: "rgb(99 102 241)",
    pink: "rgb(236 72 153)",
    orange: "rgb(249 115 22)",
  }

  return colors[color] || colors.blue
}

// Status Utilities
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    active: "text-green-600 bg-green-100",
    inactive: "text-gray-600 bg-gray-100",
    pending: "text-yellow-600 bg-yellow-100",
    approved: "text-green-600 bg-green-100",
    rejected: "text-red-600 bg-red-100",
    suspended: "text-red-600 bg-red-100",
    completed: "text-blue-600 bg-blue-100",
    ongoing: "text-purple-600 bg-purple-100",
    upcoming: "text-indigo-600 bg-indigo-100",
    cancelled: "text-gray-600 bg-gray-100",
  }

  return statusColors[status.toLowerCase()] || "text-gray-600 bg-gray-100"
}

// Search and Filter Utilities
export function searchInText(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase())
}

export function filterByQuery<T>(items: T[], query: string, searchFields: (keyof T)[]): T[] {
  if (!query.trim()) return items

  return items.filter((item) =>
    searchFields.some((field) => {
      const value = item[field]
      return typeof value === "string" && searchInText(value, query)
    }),
  )
}

// Progress Calculation
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.min(Math.round((completed / total) * 100), 100)
}

// Random Utilities
export function getRandomColor(): string {
  const colors = ["blue", "purple", "green", "yellow", "red", "indigo", "pink", "orange"]
  return colors[Math.floor(Math.random() * colors.length)]
}

export function getRandomGradient(): string {
  const gradients = [
    "bg-gradient-to-r from-blue-500 to-purple-600",
    "bg-gradient-to-r from-green-500 to-blue-600",
    "bg-gradient-to-r from-purple-500 to-pink-600",
    "bg-gradient-to-r from-yellow-500 to-orange-600",
    "bg-gradient-to-r from-indigo-500 to-blue-600",
    "bg-gradient-to-r from-pink-500 to-red-600",
  ]
  return gradients[Math.floor(Math.random() * gradients.length)]
}
