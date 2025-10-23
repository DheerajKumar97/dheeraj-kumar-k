import { TrendingUp, Users, DollarSign, BarChart3, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const Projects = () => {
  const [openDialog, setOpenDialog] = useState<number | null>(null);

  const projects = [
    {
      title: "Enterprise Sales Analytics Dashboard",
      description: "An Enterprise Sales Analytics Dashboard in Power BI helps the business by showing clear and easy-to-understand sales information across different products, regions, and teams.",
      fullDescription: "An Enterprise Sales Analytics Dashboard in Power BI helps the business by showing clear and easy-to-understand sales information across different products, regions, and teams. It allows decision-makers to see how much revenue is being generated, recognize sales trends over time, identify which products or markets are doing well or need improvement, and assess how well salespeople are performing. This insight supports better planning, helps focus sales efforts where they are most needed, and ultimately drives higher sales and profitability by making data simple and actionable without using complex terms or jargon.",
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

                {project.fullDescription && (
                  <Dialog open={openDialog === index} onOpenChange={(open) => setOpenDialog(open ? index : null)}>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="p-0 h-auto mb-4 text-primary hover:text-primary/80"
                      >
                        Read More <ExternalLink className="ml-1 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{project.title}</DialogTitle>
                      </DialogHeader>
                      <p className="text-foreground/80 leading-relaxed">
                        {project.fullDescription}
                      </p>
                    </DialogContent>
                  </Dialog>
                )}

                <div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  <span className="font-semibold text-foreground">{project.impact}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, toolIndex) => (
                    <Badge
                      key={toolIndex}
                      className="bg-blue-600 text-white font-bold hover:bg-blue-700"
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
