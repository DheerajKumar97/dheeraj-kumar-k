import { Linkedin, Github, PenTool, Code, BarChart3, Database, GitBranch, Zap, Shield, Workflow, FileCheck, Eye, Lightbulb, CheckSquare, FileText } from "lucide-react";

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

  const services = [
    { name: "Predictive Analytics", icon: BarChart3 },
    { name: "Dashboard Development", icon: Eye },
    { name: "Data Modeling", icon: Database },
    { name: "DAX Optimization", icon: Zap },
    { name: "Data Cleansing", icon: FileCheck },
    { name: "Scalable ETL Pipelines", icon: GitBranch },
    { name: "Data Governance", icon: Shield },
    { name: "Data Visualization", icon: Eye },
    { name: "Business Insights", icon: Lightbulb },
    { name: "BI Data Quality Checks", icon: CheckSquare },
    { name: "Report Automation", icon: FileText },
    { name: "Data Workflow", icon: Workflow },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card/95 backdrop-blur-md border-t border-border py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-12">
          {/* Services Section */}
          <div className="text-center space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
                Services we Provide
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="group p-4 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border hover:border-primary/50 transition-smooth"
                >
                  <service.icon className="h-6 w-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                    {service.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

          {/* Main Footer Content */}
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
              <p>Made by Dheeraj Kumar K</p>
              <p>© {currentYear} All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
