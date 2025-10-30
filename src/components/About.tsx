import { BarChart3, TrendingUp, Database, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const highlights = [
    {
      icon: BarChart3,
      title: "Data Storytelling",
      description: "Crafting compelling narratives from complex datasets",
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Forecasting trends and business outcomes with precision",
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "Building robust data pipelines and infrastructure",
    },
    {
      icon: Sparkles,
      title: "Dashboard Development",
      description: "Creating intuitive, interactive business intelligence solutions",
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
          <Card className="p-8 shadow-card hover:shadow-hover transition-smooth">
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Unlock the power of your data to drive smarter business decisions and accelerate growth. With over <strong className="text-primary">6 years of expertise</strong> in <strong className="text-secondary">Business Intelligence</strong>, I transform complex raw data into visually stunning, actionable insights that empower organizations to thrive.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              As a seasoned <strong className="text-secondary">Data Analyst and BI Developer</strong>, I combine mastery in{" "}
              <strong className="text-primary">Python, Power BI, Tableau, SQL, Microsoft Fabric, PySpark</strong>, and cutting-edge AI tools to build scalable dashboards, robust data models, and intelligent automation—all tailored to meet your unique business challenges.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              I have successfully delivered over <strong className="text-primary">250+ customized BI reports</strong> and migrated
              {isExpanded && (
                <>
                  {" "}nearly <strong className="text-primary">200+ Tableau dashboards to Power BI</strong>, enabling faster and more accurate business insights that have led clients to make confident decisions <strong className="text-secondary">35% quicker</strong>. By optimizing data workflows and improving report responsiveness, I have helped reduce decision-making delays by <strong className="text-secondary">30%</strong>, allowing organizations to react swiftly to market changes and operational needs.
                </>
              )}
            </p>
            {isExpanded && (
              <>
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  Whether it's optimizing your decision-making processes, uncovering hidden business opportunities through <strong className="text-secondary">advanced analytics</strong>, or designing interactive reports that engage stakeholders, I am here to partner with you on your success journey.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  Let's collaborate to unlock your data's true potential and propel your business to new heights with smart, customized <strong className="text-primary">Business Intelligence solutions</strong>.
                </p>
              </>
            )}
            <Button
              variant="link"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-0 h-auto text-primary hover:text-primary/80"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </Button>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <Card
              key={index}
              className="p-6 shadow-card hover:shadow-hover transition-smooth group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
