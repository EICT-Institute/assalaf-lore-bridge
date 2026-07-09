import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Material, TranslationRequest, User, UserRole } from '@/types';

interface DataContextType {
  materials: Material[];
  setMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
  requests: TranslationRequest[];
  setRequests: React.Dispatch<React.SetStateAction<TranslationRequest[]>>;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
}

const defaultUser: User = {
  id: 'user-1',
  name: 'Ahmad Musa',
  role: 'Learner',
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [materials, setMaterials] = useLocalStorage<Material[]>('as-salf-materials', []);
  const [requests, setRequests] = useLocalStorage<TranslationRequest[]>('as-salf-requests', []);
  const [currentUser, setCurrentUser] = useLocalStorage<User>('as-salf-user', defaultUser);

  const switchRole = (role: UserRole) => {
    setCurrentUser(prev => ({ ...prev, role }));
  };

  return (
    <DataContext.Provider value={{ 
      materials, 
      setMaterials, 
      requests, 
      setRequests, 
      currentUser, 
      setCurrentUser,
      switchRole
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
