import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const useTranslatedText = (originalText: string) => {
  const { translate, currentLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState(originalText);

  useEffect(() => {
    const doTranslate = async () => {
      if (currentLanguage.code === "en") {
        setTranslatedText(originalText);
        return;
      }

      const translated = await translate(originalText);
      setTranslatedText(translated);
    };

    doTranslate();
  }, [originalText, currentLanguage, translate]);

  return translatedText;
};
