export type Category = 
  | 'Hadith' 
  | 'Fiqh' 
  | 'Seerah' 
  | 'Tawheed' 
  | 'Lughah' 
  | 'Sarf' 
  | 'Nahw' 
  | 'Anasheed' 
  | 'Balaghah';

export type UserRole = 'Learner' | 'Tutor' | 'Admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Material {
  id: string;
  userId: string;
  category: Category;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  createdAt: string;
}

export interface TranslationRequest {
  id: string;
  materialId: string;
  learnerId: string;
  targetTopic: string;
  targetLanguage: 'Hausa' | 'Yoruba' | 'Igbo';
  status: 'Pending' | 'Accepted' | 'Completed';
  tutorId?: string;
  responseText?: string;
  responseAudioUrl?: string;
  createdAt: string;
  rating?: number;
  feedback?: string;
}
