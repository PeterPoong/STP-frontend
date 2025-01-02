// TranslationContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const TranslationContext = createContext();

// Create a hook to check if provider exists
export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

// Create a hook that ensures provider exists
export const useTranslation = () => {
  try {
    return useTranslationContext();
  } catch (error) {
    //console.warn('TranslationProvider not found, creating local provider');
    return useLocalTranslation();
  }
};

// Local translation state for components used outside main provider
const useLocalTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  const changeLanguage = useCallback((langCode) => {
    setCurrentLanguage(langCode);
    // Implement the same Google Translate logic here
    const tryChangeLanguage = () => {
      const selectBox = document.querySelector('.goog-te-combo');
      if (selectBox) {
        selectBox.value = langCode;
        selectBox.dispatchEvent(new Event('change'));
        return true;
      }
      return false;
    };

    if (isInitialized && tryChangeLanguage()) {
      return;
    }

    let attempts = 0;
    const maxAttempts = 5;
    const attempt = () => {
      if (attempts >= maxAttempts) return;
      attempts++;
      
      setTimeout(() => {
        if (!tryChangeLanguage()) {
          attempt();
        }
      }, Math.min(500 * attempts, 2000));
    };

    attempt();
  }, [isInitialized]);

  // Initialize Google Translate
  useEffect(() => {
    if (!document.getElementById('google-translate-script')) {
      const translateDiv = document.createElement('div');
      translateDiv.id = 'google_translate_element';
      translateDiv.style.visibility = 'hidden';
      translateDiv.style.position = 'absolute';
      translateDiv.style.display = 'none';
      document.body.appendChild(translateDiv);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,zh-CN,ms',
            layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT,
            autoDisplay: false,
          },
          'google_translate_element'
        );
        setIsInitialized(true);
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return { currentLanguage, changeLanguage, isInitialized };
};

// HOC to wrap components that need translation
export const withTranslation = (WrappedComponent) => {
  return function WithTranslationComponent(props) {
    const translation = useTranslation();
    return <WrappedComponent {...props} translation={translation} />;
  };
};

// Main Translation Provider
export const TranslationProvider = ({ children }) => {
  const translation = useLocalTranslation();

  return (
    <TranslationContext.Provider value={translation}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationContext;