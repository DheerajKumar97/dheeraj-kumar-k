import { BarChart3, TrendingUp, Database, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
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
              With over <strong className="text-primary">5+ years of experience</strong> in Business Intelligence and Data Analytics, I specialize in transforming raw data into strategic business insights that drive decision-making and operational excellence.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              My expertise spans across industry-leading tools including{" "}
              <strong className="text-secondary">Power BI, Tableau, Microsoft Fabric, SQL Server, PySpark,</strong>{" "}
              and advanced data analytics platforms. I'm passionate about creating visually stunning, data-driven dashboards that tell compelling stories and enable stakeholders to make informed decisions.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              I am committed to delivering <strong className="text-primary">actionable business insights</strong> through innovative data solutions, optimization strategies, and a relentless focus on measurable results.
            </p>
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
