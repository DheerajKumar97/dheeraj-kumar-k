import { Linkedin, Github, PenTool, Code, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/dheerajkumar1997/",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/DheerajKumar97/",
    },
    {
      name: "Medium",
      icon: PenTool,
      url: "https://medium.com/@engineerdheeraj97",
    },
    {
      name: "HackerRank",
      icon: Code,
      url: "https://www.hackerrank.com/profile/engineerdheeraj1",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <button
            onClick={scrollToTop}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            Dheeraj Kumar K
          </button>

          <p className="text-muted-foreground text-center max-w-md">
            Transforming data into insights, one dashboard at a time
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-smooth group"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>

          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> by Dheeraj Kumar K
            </p>
            <p>© {currentYear} All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
