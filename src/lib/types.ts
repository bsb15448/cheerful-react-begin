// ============================================
// Data models for backend integration
// These types mirror expected API/DB structures
// ============================================

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type ServiceType = 'airport' | 'business' | 'event' | 'excursion' | 'other';
export type VehicleStatus = 'available' | 'in_use' | 'maintenance';
export type PaymentMethod = 'card' | 'cash' | 'transfer' | 'whatsapp';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  totalBookings: number;
  totalSpent: number;
}

export interface Reservation {
  id: string;
  customerId: string;
  customer: Customer;
  serviceType: ServiceType;
  status: ReservationStatus;
  // Trip details
  pickupAddress: string;
  dropoffAddress: string;
  pickupDate: string; // ISO date
  pickupTime: string; // HH:mm
  returnDate?: string;
  returnTime?: string;
  // Passengers
  passengerCount: number;
  luggageCount: number;
  specialRequests?: string;
  // Assignment
  vehicleId?: string;
  driverId?: string;
  // Financial
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  // Meta
  source: 'website' | 'whatsapp' | 'phone' | 'admin';
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  type: string;
  capacity: number;
  status: VehicleStatus;
  fuelLevel: number;
  mileage: number;
  nextServiceDate: string;
  insuranceExpiry: string;
  dailyRate: number;
  totalTrips: number;
  imageUrl?: string;
  features: string[];
}

export interface CalendarEvent {
  id: string;
  reservationId: string;
  title: string;
  date: string;
  time: string;
  endTime?: string;
  serviceType: ServiceType;
  customerName: string;
  vehicleId?: string;
  driverName?: string;
  status: ReservationStatus;
}

export interface AnalyticsOverview {
  totalBookings: number;
  totalRevenue: number;
  totalVisitors: number;
  avgSessionDuration: string;
  bounceRate: number;
  conversionRate: number;
  period: string;
}

export interface SEOPageData {
  path: string;
  title: string;
  description: string;
  titleLength: number;
  descLength: number;
  h1: string;
  score: number;
  issues: string[];
  lastCrawled?: string;
}

export interface DashboardStats {
  reservations: { value: number; change: number };
  visitors: { value: number; change: number };
  revenue: { value: number; change: number; currency: string };
  activeVehicles: { active: number; total: number };
}

// API Response wrapper for backend integration
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

// Filter/query params for listing endpoints
export interface ReservationFilters {
  status?: ReservationStatus;
  serviceType?: ServiceType;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface VehicleFilters {
  status?: VehicleStatus;
  type?: string;
  minCapacity?: number;
  search?: string;
}
