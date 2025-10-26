import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage, LANGUAGES } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

const LanguageSelector = () => {
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  return (
    <Select
      value={currentLanguage.code}
      onValueChange={(value) => {
        const language = LANGUAGES.find((lang) => lang.code === value);
        if (language) {
          setCurrentLanguage(language);
        }
      }}
    >
      <SelectTrigger className="w-[140px] bg-card border-border">
        <Globe className="h-4 w-4 mr-2" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border z-[100]">
        {LANGUAGES.map((language) => (
          <SelectItem
            key={language.code}
            value={language.code}
            className="cursor-pointer hover:bg-muted"
          >
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
