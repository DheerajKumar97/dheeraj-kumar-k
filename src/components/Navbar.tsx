import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslatedText } from "@/hooks/useTranslatedText";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  // Translate navigation items
  const translatedAbout = useTranslatedText("About");
  const translatedSkills = useTranslatedText("Skills");
  const translatedProjects = useTranslatedText("Projects");
  const translatedCertifications = useTranslatedText("Certifications");
  const translatedBlog = useTranslatedText("Blog");
  const translatedContact = useTranslatedText("Contact");

  const translatedNavItems = [
    { name: translatedAbout, href: "#about" },
    { name: translatedSkills, href: "#skills" },
    { name: translatedProjects, href: "#projects" },
    { name: translatedCertifications, href: "#certifications" },
    { name: translatedBlog, href: "#blog" },
    { name: translatedContact, href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#"
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Dheeraj Kumar K
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {translatedNavItems.map((item, index) => (
              <button
                key={navItems[index].href}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground/80 hover:text-primary transition-smooth font-medium"
              >
                {item.name}
              </button>
            ))}
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {translatedNavItems.map((item, index) => (
              <button
                key={navItems[index].href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-3 rounded-lg text-foreground/80 hover:text-primary hover:bg-muted transition-smooth font-medium"
              >
                {item.name}
              </button>
            ))}
            <div className="px-4 pt-2">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
