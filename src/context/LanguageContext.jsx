import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { user } = useAuth();

  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('citizen_pref_lang') || 'en';
    } catch (e) {
      return 'en';
    }
  });

  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(() => {
    try {
      return localStorage.getItem('citizen_lang_selected') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Re-check selection state when auth user changes
  useEffect(() => {
    try {
      if (user) {
        const selected = localStorage.getItem('citizen_lang_selected') === 'true';
        setHasSelectedLanguage(selected);
      } else {
        setHasSelectedLanguage(false);
      }
    } catch (e) {
      console.error('Error reading language selection state', e);
    }
  }, [user]);

  // Listen to custom reset event when logging in/out
  useEffect(() => {
    const handleReset = () => {
      setHasSelectedLanguage(false);
    };
    window.addEventListener('lang_selection_reset', handleReset);
    return () => window.removeEventListener('lang_selection_reset', handleReset);
  }, []);

  const selectLanguage = useCallback((lang) => {
    setLanguage(lang);
    setHasSelectedLanguage(true);
    try {
      localStorage.setItem('citizen_pref_lang', lang);
      localStorage.setItem('citizen_lang_selected', 'true');
    } catch (e) {
      console.error('Failed to save preferred language', e);
    }
  }, []);

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    try {
      localStorage.setItem('citizen_pref_lang', lang);
    } catch (e) {
      console.error('Failed to update language', e);
    }
  }, []);

  const t = useCallback((key, fallback = '') => {
    const langDict = translations[language] || translations['en'];
    if (langDict && langDict[key] !== undefined) {
      return langDict[key];
    }
    const enDict = translations['en'];
    if (enDict && enDict[key] !== undefined) {
      return enDict[key];
    }
    return fallback || key;
  }, [language]);

  const value = {
    language,
    hasSelectedLanguage,
    selectLanguage,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
