
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  TECHNICIAN = 'TECHNICIAN',
  CLINIC_ADMIN = 'CLINIC_ADMIN',
  SELLER = 'SELLER',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export interface TimeSlot {
  id: string;
  day: string; 
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface SurgeryBooking extends Booking {
  surgeonName: string;
  assistantName?: string;
  anesthesiaType: 'GENERAL' | 'LOCAL' | 'SEDATION';
  patientAge: number;
  equipmentNeeded: string[];
  roomNumber: string;
}

export interface Booking {
  id: string;
  serviceName: string;
  providerName: string; 
  date: string;
  time: string;
  endTime?: string;
  price: number;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  customerName?: string;
  customerPhone?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  category: 'BEAUTY' | 'MEDICAL' | 'SURGERY';
  image: string;
  description?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  description: string;
  tag?: string;
}

export interface Technician {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  philosophy?: string;
  experienceYears?: number;
  awards?: string[];
  rating: number;
  reviewCount: number;
  portfolio: PortfolioItem[];
  offeredServices: string[];
  isVerified: boolean;
  schedule?: TimeSlot[];
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  isPlatformUser: boolean;
}

export interface Room {
  id: string;
  name: string;
  pricePerHour: number;
  features: string[];
  image: string;
  gallery: string[];
  description: string;
  isAvailable: boolean;
  type?: 'GENERAL' | 'SURGERY' | 'CONSULTATION';
}

export interface Clinic {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  availableRoomsCount: number;
  rooms: Room[];
  services: string[];
  description: string;
  staff: Staff[];
  gallery: string[];
  address: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'EQUIPMENT' | 'CONSUMABLE' | 'FURNITURE' | 'SKINCARE';
  image: string;
  description: string;
  specs: Record<string, string>;
  stock: number;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
}