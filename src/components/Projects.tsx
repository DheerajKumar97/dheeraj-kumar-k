import { TrendingUp, Users, DollarSign, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const projects = [
    {
      title: "Enterprise Sales Analytics Dashboard",
      description: "Developed comprehensive Power BI dashboard tracking sales performance across 50+ regions, enabling real-time decision making and forecasting.",
      impact: "35% improvement in sales forecast accuracy",
      tools: ["Power BI", "SQL Server", "DAX"],
      icon: DollarSign,
      metric: "+35%",
      color: "from-primary to-primary/70",
    },
    {
      title: "Customer Behavior Analytics Platform",
      description: "Built interactive Tableau dashboards analyzing customer journey and behavior patterns across multiple touchpoints.",
      impact: "28% increase in customer retention",
      tools: ["Tableau", "Python", "AWS"],
      icon: Users,
      metric: "+28%",
      color: "from-secondary to-secondary/70",
    },
    {
      title: "Supply Chain Optimization System",
      description: "Created data pipeline using PySpark and Microsoft Fabric to optimize inventory management and reduce operational costs.",
      impact: "42% reduction in inventory costs",
      tools: ["PySpark", "Microsoft Fabric", "Azure"],
      icon: TrendingUp,
      metric: "-42%",
      color: "from-primary to-secondary",
    },
    {
      title: "Financial Performance Analytics",
      description: "Designed executive-level financial dashboards with predictive analytics for revenue forecasting and budget optimization.",
      impact: "50% faster executive reporting",
      tools: ["Power BI", "SQL", "Python"],
      icon: BarChart3,
      metric: "+50%",
      color: "from-secondary/70 to-primary",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transforming business challenges into data-driven solutions with measurable impact
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="p-8 shadow-card hover:shadow-hover transition-smooth group animate-fade-in overflow-hidden relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <project.icon className="w-full h-full" />
              </div>

              <div className="relative">
                <div className={`bg-gradient-to-r ${project.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <project.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-smooth">
                  {project.title}
                </h3>

                <p className="text-foreground/70 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  <span className="font-semibold text-foreground">{project.impact}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, toolIndex) => (
                    <Badge
                      key={toolIndex}
                      variant="secondary"
                      className="bg-muted hover:bg-muted/80"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
