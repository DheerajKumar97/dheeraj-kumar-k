import { Linkedin, Github, BarChart3, Database, GitBranch, Zap, Shield, Workflow, FileCheck, Eye, Lightbulb, CheckSquare, FileText } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import mediumLogo from "@/assets/medium-logo-official.png";
import hackerrankLogo from "@/assets/hackerrank-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/dheerajkumar1997/",
      type: "icon",
      bgColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/DheerajKumar97/",
      type: "icon",
      bgColor: "bg-gray-900 hover:bg-black",
    },
    {
      name: "Medium",
      logo: mediumLogo,
      url: "https://medium.com/@engineerdheeraj97",
      type: "logo",
      bgColor: "bg-muted hover:bg-primary",
    },
    {
      name: "HackerRank",
      logo: hackerrankLogo,
      url: "https://www.hackerrank.com/profile/engineerdheeraj1",
      type: "logo",
      bgColor: "bg-muted hover:bg-primary",
    },
  ];

  const services = [
    { 
      name: "Predictive Analytics", 
      icon: BarChart3,
      description: "Leverage historical data to forecast trends and identify opportunities, enabling proactive decision-making that drives growth and minimizes risks."
    },
    { 
      name: "Dashboard Development", 
      icon: Eye,
      description: "Transform complex data into intuitive visual dashboards that provide real-time insights, empowering stakeholders to make informed decisions quickly."
    },
    { 
      name: "Data Modeling", 
      icon: Database,
      description: "Structure your data efficiently to support scalable analytics and ensure accurate reporting that aligns with your business objectives."
    },
    { 
      name: "DAX Optimization", 
      icon: Zap,
      description: "Optimize calculations in Power BI for faster performance and more efficient data processing, enhancing user experience and report responsiveness."
    },
    { 
      name: "Data Cleansing", 
      icon: FileCheck,
      description: "Ensure data accuracy and consistency by removing errors and duplicates, providing a solid foundation for reliable business insights."
    },
    { 
      name: "Scalable ETL Pipelines", 
      icon: GitBranch,
      description: "Build robust data pipelines that efficiently extract, transform, and load data at scale, supporting your growing business needs."
    },
    { 
      name: "Data Governance", 
      icon: Shield,
      description: "Implement frameworks to ensure data quality, security, and compliance, protecting your business while maintaining stakeholder trust."
    },
    { 
      name: "Data Visualization", 
      icon: Eye,
      description: "Create compelling visual narratives that make complex data accessible, helping teams understand key metrics and drive strategic initiatives."
    },
    { 
      name: "Business Insights", 
      icon: Lightbulb,
      description: "Uncover actionable insights from your data that reveal opportunities for optimization, innovation, and competitive advantage."
    },
    { 
      name: "BI Data Quality Checks", 
      icon: CheckSquare,
      description: "Implement automated quality controls to validate data integrity, ensuring your business intelligence reports are accurate and trustworthy."
    },
    { 
      name: "Report Automation", 
      icon: FileText,
      description: "Streamline reporting processes with automation, saving time and ensuring stakeholders receive timely, consistent insights for decision-making."
    },
    { 
      name: "Data Workflow", 
      icon: Workflow,
      description: "Design efficient data workflows that optimize how information flows through your organization, improving productivity and decision speed."
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-muted/50 backdrop-blur-md border-t border-border py-16">
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
                <HoverCard key={service.name} openDelay={200}>
                  <HoverCardTrigger asChild>
                    <div
                      className="group p-4 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border hover:border-primary/50 transition-smooth cursor-pointer"
                    >
                      <service.icon className="h-6 w-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                        {service.name}
                      </p>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <service.icon className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">{service.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

          {/* Main Footer Content */}
          <div className="flex flex-col items-center space-y-6">
            <p className="text-lg font-semibold text-foreground">
              Connect with Us
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full ${link.bgColor} text-white flex items-center justify-center transition-smooth group`}
                  aria-label={link.name}
                >
                  {link.type === "icon" && link.icon && (
                    <link.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  )}
                  {link.type === "logo" && link.logo && (
                    <img 
                      src={link.logo} 
                      alt={`${link.name} logo`}
                      className="w-9 h-9 object-contain rounded-sm group-hover:scale-110 transition-transform"
                    />
                  )}
                </a>
              ))}
            </div>

            <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

            <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
              <p>Made by Dheeraj Kumar K</p>
              <p>Copyright © {currentYear} All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
