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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

const Projects = () => {
  const [openDialog, setOpenDialog] = useState<number | null>(null);

  const projects = [
    {
      title: "Enterprise Level Product Performance Daily Metrics",
      description: "We developed a Power BI Sales Analytics Dashboard that provides a complete view of sales data at different levels—team-wise, manager-wise, and overall business performance. The dashboard incorporates Role-Level Security (RLS), ensuring users only see the data relevant to their role, which enhances data privacy and accuracy.",
      fullDescription: (
        <>
          <p className="mb-4">
            <strong>Business Problem:</strong> The client faced challenges accessing consolidated sales data, making it hard to track revenue, monitor team and manager performance, and quickly identify opportunities or issues across different teams and regions.
          </p>
          <p className="mb-4">
            <strong>Solution Approach:</strong> We developed a Power BI Sales Analytics Dashboard that provides a complete view of sales data at different levels—team-wise, manager-wise, and overall business performance. The dashboard incorporates Role-Level Security (RLS), ensuring users only see the data relevant to their role, which enhances data privacy and accuracy. This allows sales managers and team leaders to monitor their specific team's performance, assess targets vs. actuals, and focus on improvement areas, all through intuitive visual reports updated in real time.
          </p>
          <p className="mb-4">
            <strong>Challenges Faced:</strong> Integrating diverse data sources into a unified model and maintaining data accuracy with real-time updates were key challenges. Implementing RLS required careful role definition and testing to ensure proper data access without leakage. Designing an easy-to-use interface for different user groups while avoiding information overload was also addressed through user-centered design and feedback loops.
          </p>
          <p>
            This solution enables your client to have transparent, actionable insights by team and manager, fostering accountability, improving decision-making, and ultimately driving sales growth while safeguarding sensitive data.
          </p>
        </>
      ),
      impact: "35% improvement in sales forecast accuracy",
      tools: ["Power BI Desktop", "Power BI Service", "Power Query", "SQL Server", "Power Automate"],
      icon: DollarSign,
      metric: "+35%",
      color: "from-primary to-primary/70",
    },
    {
      title: "Customer Behavior Analysis Report",
      description: "We have implemented a solution by directly connecting Tableau to the customer data stored in AWS Redshift. Redshift's cloud data warehouse enables efficient handling of large datasets with fast SQL querying, while Tableau provides interactive dashboards to visualize key customer behavior metrics such as buying patterns, customer segments, and engagement trends.",
      fullDescription: (
        <>
          <p className="mb-4">
            <strong>Business Problem:</strong> The client wants to understand customer interactions and behaviors across different channels to optimize marketing, improve customer retention, and boost sales. Without clear insights into purchase patterns, preferences, and engagement triggers, business strategies may lack focus and effectiveness, affecting revenue growth and customer satisfaction.
          </p>
          <p className="mb-4">
            <strong>Solution Approach:</strong> We have implemented a solution by directly connecting Tableau to the customer data stored in AWS Redshift. Redshift's cloud data warehouse enables efficient handling of large datasets with fast SQL querying, while Tableau provides interactive dashboards to visualize key customer behavior metrics such as buying patterns, customer segments, and engagement trends. This integration allows the client to explore data dynamically, gain actionable insights, and make data-driven decisions quickly. The solution ensures performance optimization on Redshift and delivers rich visualization and interactivity through Tableau.
          </p>
          <p className="mb-4">
            <strong>Challenges Faced:</strong> Combining and cleansing data from multiple sources into Redshift to ensure accuracy and consistency. Optimizing queries and schema design in Redshift to enable real-time dashboard responsiveness. Ensuring compliance with data privacy regulations when handling sensitive customer information. Translating complex customer behavior data into clear, practical insights without losing context. Training client users to effectively use Tableau dashboards for strategic decision-making.
          </p>
          <p>
            This explanation clearly highlights the problem, the technical and analytical solution using Tableau and AWS Redshift, and the challenges tackled to deliver a high-value customer behavior analysis report.
          </p>
        </>
      ),
      impact: "28% increase in customer retention",
      tools: ["Tableau Desktop", "Tableau Prep", "Tableau Cloud", "AWS Redshift", "Python"],
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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {projects.map((project, index) => (
              <CarouselItem key={index} className="pl-4 lg:basis-1/2">
                <Card
                  className="p-8 shadow-card hover:shadow-hover transition-smooth group animate-fade-in overflow-hidden relative h-full"
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
                          <div className="text-foreground/80 leading-relaxed">
                            {project.fullDescription}
                          </div>
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-12" />
          <CarouselNext className="right-0 translate-x-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default Projects;
