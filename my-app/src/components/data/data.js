import React from 'react';
import { 
  DollarSign, 
  Utensils, 
  Stethoscope, 
  Scale, 
  HardHat, 
  Car, 
  Smile, 
  Building, 
  GraduationCap 
} from 'lucide-react';

export const categoryData = [
  {
    id: 'finance',
    name: 'Finance',
    icon: React.createElement(DollarSign, { className: 'w-8 h-8 text-white' }),
    onClick: () => console.log('Finance clicked')
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    icon: React.createElement(Utensils, { className: 'w-8 h-8 text-white' }),
    onClick: () => console.log('Restaurants clicked')
  },
  {
    id: 'doctors',
    name: 'Doctors',
    icon: React.createElement(Stethoscope, { className: 'w-8 h-8 text-white' }),
    onClick: () => console.log('Doctors clicked')
  },
  {
    id: 'lawyers',
    name: 'Lawyers',
    icon: React.createElement(Scale, { className: 'w-8 h-8 text-white' }),
    onClick: () => console.log('Lawyers clicked')
  },
  {
    id: 'construction',
    name: 'Construction',
    icon: React.createElement(HardHat, { className: 'w-8 h-8 text-white' }),
    onClick: () => console.log('Construction clicked')
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: React.createElement(Car, { className: 'w-8 h-8 text-white' }),
    onClick: () => console.log('Automotive clicked')
  },
  {
    id: 'dentists',
    name: 'Dentists',
    icon: React.createElement(Smile, { className: 'w-8 h-8 text-white' }),
    onClick: () => console.log('Dentists clicked')
  },
  {
    id: 'hotels',
    name: 'Hotels',
    icon: React.createElement(Building, { className: 'w-8 h-8 text-white' }),
    onClick: () => console.log('Hotels clicked')
  },
  {
    id: 'education',
    name: 'Education',
    icon: React.createElement(GraduationCap, { className: 'w-8 h-8 text-white' }),
    onClick: () => console.log('Education clicked')
  }
];