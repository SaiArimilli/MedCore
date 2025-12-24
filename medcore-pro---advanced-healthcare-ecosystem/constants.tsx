
import React from 'react';
import { 
  Home, 
  Calendar, 
  User as UserIcon, 
  ShoppingBag, 
  MessageSquare, 
  Settings, 
  PlusCircle,
  Stethoscope,
  Activity,
  Heart
} from 'lucide-react';

export const COLORS = {
  primary: '#0055a5',
  secondary: '#e6f0f9',
  accent: '#00bfa5',
  danger: '#ef4444',
  success: '#10b981'
};

export const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: <Home size={20} /> },
  { label: 'Find Doctors', path: '/booking', icon: <Stethoscope size={20} /> },
  { label: 'Pharmacy', path: '/pharmacy', icon: <ShoppingBag size={20} /> },
  { label: 'AI Health Bot', path: '/chatbot', icon: <MessageSquare size={20} /> },
];

export const MOCK_DOCTORS = [
  { id: 'd1', name: 'Dr. Teja', specialization: 'Cardiologist', rating: 4.9, image: 'services/profile1.jpg' },
  { id: 'd2', name: 'Dr. Kumar', specialization: 'Neurologist', rating: 4.8, image: 'services/profile2.jpg' },
  { id: 'd3', name: 'Dr. Akhilesh', specialization: 'Pediatrician', rating: 5.0, image: 'services/profile3.jpg' },
  { id: 'd4', name: 'Dr. Vinod', specialization: 'Orthopedics', rating: 5.0, image: 'services/profile4.jpg' },
];

export const MOCK_MEDICINES = [
  { id: 'm1', name: 'Paracetamol 500mg', price: 200, stock: 100, category: 'Pain Relief', imageURL: 'services/image1.jpg', description: 'Standard pain relief and fever reducer.' },
  { id: 'm2', name: 'Amoxicillin 250mg', price: 250, stock: 45, category: 'Antibiotics', imageURL: 'services/image2.jpg', description: 'Used to treat bacterial infections.' },
  { id: 'm3', name: 'Vitamin C 1000mg', price: 150, stock: 200, category: 'Supplements', imageURL: 'services/image3.jpg', description: 'Boosts immune system health.' },
  { id: 'm4', name: 'Loratadine 10mg', price: 99, stock: 60, category: 'Allergy', imageURL: 'services/image4.jpg', description: 'Non-drowsy allergy relief.' },
];
