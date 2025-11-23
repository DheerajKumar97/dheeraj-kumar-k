import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import tableauSpecialistBadge from "@/assets/tableau-specialist-badge.png";
import tableauAnalystBadge from "@/assets/tableau-analyst-badge.png";
import powerBIBadge from "@/assets/power-bi-badge.png";

const Certifications = () => {
  const certifications = [
    {
      name: "Tableau Desktop Specialist",
      issuer: "Tableau",
      link: "https://www.credly.com/badges/39cb7a53-aead-4007-af98-f068777a6fd6/public_url",
      badge: tableauSpecialistBadge,
    },
    {
      name: "Tableau Data Analyst",
      issuer: "Tableau",
      link: "https://www.credly.com/badges/035dd9c9-138d-4ee7-9581-300333cca64a/public_url",
      badge: tableauAnalystBadge,
    },
    {
      name: "Power BI Data Analyst Associate",
      issuer: "Microsoft",
      link: "https://learn.microsoft.com/en-us/users/dheerajkkumar-9723/credentials/363632b34f222fac?ref=https%3A%2F%2Fwww.linkedin.com%2F",
      badge: powerBIBadge,
    },
  ];

  return (
    <section id="certifications" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry-recognized credentials validating expertise in data analytics and business intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className="p-8 shadow-card hover:shadow-hover transition-smooth group text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-32 h-32 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <img 
                  src={cert.badge} 
                  alt={`${cert.name} Badge`}
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-xl font-bold mb-2 text-foreground">
                {cert.name}
              </h3>
              <p className="text-muted-foreground mb-6">{cert.issuer}</p>

              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 transition-smooth group/btn w-full"
                asChild
              >
                <a href={cert.link} target="_blank" rel="noopener noreferrer">
                  View Credential
                  <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
