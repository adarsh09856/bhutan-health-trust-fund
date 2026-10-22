import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { translations, type Language } from "./translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string, fallback?: string) => string;
  isDzongkha: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "bhtf_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  // Load persisted language safely on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved === "en" || saved === "dz") {
        setLangState(saved);
      }
    } catch {
      // localStorage unavailable (SSR / private mode)
    }
  }, []);

  // Sync document language attribute and font styling
  useEffect(() => {
    try {
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang;
        if (lang === "dz") {
          document.documentElement.classList.add("font-dzongkha");
          document.body.classList.add("font-dzongkha");
        } else {
          document.documentElement.classList.remove("font-dzongkha");
          document.body.classList.remove("font-dzongkha");
        }
      }
    } catch {}
  }, [lang]);

  const setLang = (nextLang: Language) => {
    setLangState(nextLang);
    try {
      localStorage.setItem(STORAGE_KEY, nextLang);
    } catch {}
  };

  const toggleLang = () => {
    const next = lang === "en" ? "dz" : "en";
    setLang(next);
  };

  const t = useMemo(() => {
    return (key: string, fallback?: string): string => {
      const entry = translations[key];
      if (entry) {
        return entry[lang] || entry.en || fallback || key;
      }
      return fallback || key;
    };
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      t,
      isDzongkha: lang === "dz",
    }),
    [lang, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Provide a resilient fallback if rendered outside provider
    return {
      lang: "en" as Language,
      setLang: () => {},
      toggleLang: () => {},
      t: (key: string, fallback?: string) => {
        const entry = translations[key];
        return entry ? entry.en : fallback || key;
      },
      isDzongkha: false,
    };
  }
  return context;
}
