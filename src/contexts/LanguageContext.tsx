import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type Language = {
  code: string;
  name: string;
};

export const LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "ml", name: "Malayalam" },
  { code: "kn", name: "Kannada" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
];

type TranslationCache = {
  [key: string]: {
    [language: string]: string;
  };
};

type LanguageContextType = {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
  translate: (text: string) => Promise<string>;
  isTranslating: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0]);
  const [translationCache, setTranslationCache] = useState<TranslationCache>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const translate = async (text: string): Promise<string> => {
    // If English or empty text, return as is
    if (currentLanguage.code === "en" || !text.trim()) {
      return text;
    }

    // Check cache first
    if (translationCache[text]?.[currentLanguage.code]) {
      return translationCache[text][currentLanguage.code];
    }

    try {
      const { data, error } = await supabase.functions.invoke("translate-content", {
        body: {
          text,
          targetLanguage: currentLanguage.name,
        },
      });

      if (error) {
        console.error("Translation error:", error);
        return text;
      }

      const translatedText = data?.translatedText || text;

      // Update cache
      setTranslationCache((prev) => ({
        ...prev,
        [text]: {
          ...prev[text],
          [currentLanguage.code]: translatedText,
        },
      }));

      return translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setCurrentLanguage,
        translate,
        isTranslating,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
