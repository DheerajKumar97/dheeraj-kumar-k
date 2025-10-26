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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

const TableauDashboardTabs = ({ fullDescription }: { fullDescription: React.ReactNode }) => {
  useEffect(() => {
    // Load Tableau JS API
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="text-foreground/80 leading-relaxed mt-4">
        {fullDescription}
      </TabsContent>
      <TabsContent value="dashboard" className="mt-4">
        <div className="w-full min-h-[600px]">
          <div className='tableauPlaceholder' id='viz1761455999163' style={{ position: 'relative' }}>
            <noscript>
              <a href='#'>
                <img 
                  alt='Overview' 
                  src='https://public.tableau.com/static/images/Fi/FinancialDashboard_16880395715220/Overview/1_rss.png' 
                  style={{ border: 'none' }} 
                />
              </a>
            </noscript>
            <object className='tableauViz' style={{ display: 'none' }}>
              <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
              <param name='embed_code_version' value='3' />
              <param name='site_root' value='' />
              <param name='name' value='FinancialDashboard_16880395715220/Overview' />
              <param name='tabs' value='no' />
              <param name='toolbar' value='yes' />
              <param name='static_image' value='https://public.tableau.com/static/images/Fi/FinancialDashboard_16880395715220/Overview/1.png' />
              <param name='animate_transition' value='yes' />
              <param name='display_static_image' value='yes' />
              <param name='display_spinner' value='yes' />
              <param name='display_overlay' value='yes' />
              <param name='display_count' value='yes' />
              <param name='language' value='en-US' />
            </object>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

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
      title: "Fully Filled Orders Report",
      description: "We have implemented a Power BI report called \"Fully Filled Orders,\" using data sourced from Microsoft Fabric with SQL Server for validation. The report employs advanced DAX logic to classify orders into four fulfillment states—Fully Filled, Able to be Fully Filled, Awaiting ALL Stock, and Awaiting SOME Stock—by aggregating item-level fulfillment and stock data into order-level insights.",
      fullDescription: (
        <>
          <p className="mb-4">
            <strong>Business Problem:</strong> The client lacked visibility into the fulfillment status of complete customer orders. They could not easily determine if all items in an order were shipped, in stock, or delayed due to scheduling or stock issues. This made it difficult to prioritize operations, track overdue or unscheduled orders, and provide accurate status updates to customers, leading to inefficiencies and delays.
          </p>
          <p className="mb-4">
            <strong>Solution Approach:</strong> We have implemented a Power BI report called "Fully Filled Orders," using data sourced from Microsoft Fabric with SQL Server for validation. The report employs advanced DAX logic to classify orders into four fulfillment states—Fully Filled, Able to be Fully Filled, Awaiting ALL Stock, and Awaiting SOME Stock—by aggregating item-level fulfillment and stock data into order-level insights. The solution includes interactive visuals like KPI cards, region and product family breakdowns, and SKU lists of pending items, enabling real-time visibility and focused action to improve supply chain fulfillment.
          </p>
          <p className="mb-4">
            <strong>Challenges Faced:</strong> Developing complex grouped logic across multiple line items in an order using DAX functions while ensuring accuracy. Optimizing performance for heavy DAX calculations on large datasets. Making the fulfillment classification logic understandable and actionable for business users. Ensuring data consistency and validation between SQL Server and Microsoft Fabric. Presenting detailed insights without overwhelming users, maintaining clarity and usability.
          </p>
        </>
      ),
      impact: "42% reduction in inventory costs",
      tools: ["Power BI Desktop", "Power BI Service", "Power Query", "Microsoft Fabric", "SQL Server"],
      icon: TrendingUp,
      metric: "-42%",
      color: "from-primary to-secondary",
    },
    {
      title: "Labor Budget and Workforce Utilization Report",
      description: "We developed a comprehensive Labor Report dashboard in Power BI, sourcing data from Microsoft Fabric with SQL Server as the base validation layer. Using PySpark, we transformed raw data and created a semantic model optimized for the report's needs. The report tracks KPIs such as regular, overtime, benefit, and temporary labor hours and costs, comparing current vs prior year and budget.",
      fullDescription: (
        <>
          <p className="mb-4">
            <strong>Business Problem:</strong> The key challenge was that HR, Finance, and Operations teams lacked a consolidated, clear view of labor costs, workforce efficiency, and utilization across multiple regions and divisions. Without timely insights comparing current year versus prior year labor metrics and budget alignment, decision-makers struggled to optimize labor costs, control overtime, manage temporary labor spending, and ensure budget compliance effectively.
          </p>
          <p className="mb-4">
            <strong>Solution Approach:</strong> We developed a comprehensive Labor Report dashboard in Power BI, sourcing data from Microsoft Fabric with SQL Server as the base validation layer. Using PySpark, we transformed raw data and created a semantic model optimized for the report's needs. The report tracks KPIs such as regular, overtime, benefit, and temporary labor hours and costs, comparing current vs prior year and budget. Advanced DAX calculations dynamically determine the latest pay period and aggregate metrics with filters by region, division, and department. Interactive visuals include matrix tables with conditional formatting to highlight variances and trends, empowering Finance, HR, and Operations to monitor labor costs, utilization, and staffing in real-time.
          </p>
          <p className="mb-4">
            <strong>Challenges Faced:</strong> Building dynamic DAX measures for accurately calculating pay periods and aggregating labor metrics over complex timeframes. Transforming and modeling large datasets in PySpark and Microsoft Fabric to create an efficient, reusable semantic layer. Ensuring data accuracy and consistency across source SQL Server and transformed data in Power BI. Designing a report intuitive for diverse stakeholder needs—from detailed labor hours to high-level budget variance summaries. Optimizing report performance to provide fast, real-time updates despite extensive calculations and large data volume.
          </p>
        </>
      ),
      impact: "50% faster executive reporting",
      tools: ["Power BI Desktop", "Power BI Service", "Power Query", "Microsoft Fabric", "SQL Server"],
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
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{project.title}</DialogTitle>
                          </DialogHeader>
                          {index === 1 ? (
                            <TableauDashboardTabs fullDescription={project.fullDescription} />
                          ) : (
                            <div className="text-foreground/80 leading-relaxed">
                              {project.fullDescription}
                            </div>
                          )}
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
