
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
  PHARMACY = 'PHARMACY'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  specialization?: string;
  avatar?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
}

export interface Medicine {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  imageURL: string;
  description: string;
}

export interface Order {
  id: string;
  userId: string;
  items: { medicineId: string; quantity: number; price: number; name: string }[];
  totalAmount: number;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
  isAi?: boolean;
}
