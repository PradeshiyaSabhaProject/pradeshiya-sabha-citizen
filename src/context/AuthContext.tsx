import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext<any>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const DUMMY_CITIZEN = {
  name: 'Verified Citizen',
  nic: '199012345678',
  phone: '+94 71 234 5678',
  email: "citizen@homagamaps.lk",
  role: 'citizen',
  verified: true,
  avatar: null
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('citizen_auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Failed to load auth user from localStorage', e);
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('citizen_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('citizen_auth_user');
      }
    } catch (e) {
      console.error('Failed to save auth user to localStorage', e);
    }
  }, [user]);

  const login = (userData = DUMMY_CITIZEN) => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem('citizen_lang_selected');
      window.dispatchEvent(new Event('lang_selection_reset'));
      setUser({
        ...DUMMY_CITIZEN,
        ...userData,
        verified: true
      });
      setIsLoading(false);
    }, 400);
  };

  const dummyLogin = () => {
    login(DUMMY_CITIZEN);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('citizen_auth_user');
    localStorage.removeItem('citizen_lang_selected');
    window.dispatchEvent(new Event('lang_selection_reset'));
  };

  const updateUser = (newFields: Record<string, any>) => {
    setUser((prev: any) => {
      const updated = { ...prev, ...newFields };
      try {
        localStorage.setItem('citizen_auth_user', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save updated user to localStorage', e);
      }
      return updated;
    });
  };

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading,
    login,
    dummyLogin,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
