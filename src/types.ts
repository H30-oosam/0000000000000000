export interface Course {
  id: string;
  title: string;
  category: 'tot' | 'leadership' | 'development' | 'content' | 'consulting';
  categoryLabel: string;
  duration: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  price?: string;
  originalPrice?: string;
  seatsLeft?: number;
  totalSeats?: number;
  featured?: boolean;
}

export interface TraineeRegistration {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  country: string;
  courseId: string;
  courseTitle: string;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'contacted';
  notes?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface AcademyStats {
  studentsCount: number;
  coursesCount: number;
  satisfactionRate: string;
  experienceYears: number;
}
