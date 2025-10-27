import { TrendingUp, Users, DollarSign, BarChart3, ExternalLink, Star, Code2, Database } from "lucide-react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useState } from "react";

const Projects = () => {
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "personal" | "organization">("organization");
  const [personalProjectFilter, setPersonalProjectFilter] = useState<"python" | "bi">("bi");

  const projects = [
    {
      title: "Udemy Course Analysis Report",
      description: "The project began with developing Python scripts to systematically scrape extensive course-level data from the Udemy website, capturing attributes such as total students, price points, subject category, number of lectures, and user reviews. This raw information was cleaned, validated, and loaded into SQL Server to create a centralized, queryable data mart.",
      fullDescription: (
        <>
          <p className="mb-4">
            <strong>Business Problem:</strong> Udemy and similar online education providers faced difficulty consolidating course engagement, pricing, and popularity data in a way that enabled quick, reliable decision-making. Without unified insights, it was challenging to identify which subjects and course categories were driving student enrollments, spot revenue growth opportunities, and monitor detailed student engagement metrics such as reviews and lecture participation. This lack of consolidated analytics made it hard for the business to optimize content investments, refine pricing strategies, or react efficiently to shifting demand and trends within the online learning space.
          </p>
          <p className="mb-4">
            <strong>Solution Approach:</strong> The project began with developing Python scripts to systematically scrape extensive course-level data from the Udemy website, capturing attributes such as total students, price points, subject category, number of lectures, and user reviews. This raw information was cleaned, validated, and loaded into SQL Server to create a centralized, queryable data mart. Tableau dashboards were then built on top of this data, providing intuitive, interactive reporting on key KPIs—enrollments, revenue distribution, review volumes, and the paid vs. free course mix. Dashboard features enabled users to filter by subject, explore price segmentation, and visually correlate how aspects like course price or lecture count influenced student engagement and sales. These dashboards empowered Udemy to drill deep into trends, benchmark courses, and make fast, data-driven content and pricing decisions.
          </p>
          <p className="mb-4">
            <strong>Challenges Faced:</strong> Key challenges included overcoming the technical barriers of large-scale web scraping in the face of site restrictions and dynamic web content, which frequently required code updates to ensure data continuity. Data quality posed another hurdle, with frequent issues like incomplete records, duplicate courses, or inconsistencies that had to be addressed through comprehensive cleaning routines. The volume of data created performance bottlenecks during query execution in SQL Server and when rendering Tableau reports. Finally, the project demanded the transformation of complex, multifaceted data into business-ready insights—making it essential to design visualizations that were clear and actionable for both technical and non-technical stakeholders, without overwhelming users or masking critical trends.
          </p>
        </>
      ),
      impact: "47% acceleration in course demand identification for new subject trends",
      tools: ["Python", "SQL Server", "Tableau Desktop", "Tableau Prep", "Web Scraping"],
      icon: BarChart3,
      metric: "+47%",
      color: "from-primary to-secondary",
      projectType: "personal",
      personalCategory: "bi" as const,
    },
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
      impact: "35% improvement in Flooring and Electronics Product Sales",
      tools: ["Power BI Desktop", "Power BI Service", "Power Query", "SQL Server", "Power Automate"],
      icon: DollarSign,
      metric: "+35%",
      color: "from-primary to-primary/70",
      projectType: "organization",
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
      projectType: "organization",
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
      projectType: "organization",
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
      projectType: "organization",
    },
    {
      title: "LoginPulse Analytics Dashboard",
      description: "A comprehensive BI dashboard was developed to centralize and visualize key metrics on user logins, registrations, and MAU trends with fine segmentation by OS and biometric adoption. The dashboard enables users to filter by year and month, immediately revealing spikes or dips in activity",
      fullDescription: (
        <>
          <p className="mb-4">
            <strong>Business Problem:</strong> The client struggled to gain visibility into detailed user authentication trends across mobile platforms, making it hard to monitor login volumes, registration growth, and monthly active user (MAU) activity broken down by channel. Existing reports lacked granularity around critical factors such as operating system split, biometric versus non-biometric usage, and how these patterns shifted week by week or month by month. As a result, the business was unable to proactively spot authentication issues, optimize platform resources, or adapt to evolving user behaviors on iOS and Android.
          </p>
          <p className="mb-4">
            <strong>Solution Approach:</strong> A comprehensive BI dashboard was developed to centralize and visualize key metrics on user logins, registrations, and MAU trends with fine segmentation by OS and biometric adoption. The dashboard enables users to filter by year and month, immediately revealing spikes or dips in activity, and provides a side-by-side view of historical trends for strategic decision-making. Visual components track login volumes over time, seasonality by day of week, OS and biometric share, and present granular breakdowns of daily and weekly login activity. Performance changes from the previous month are highlighted for quick diagnosis, and critical segments like iOS biometric logins are specifically monitored.
          </p>
          <p className="mb-4">
            <strong>Challenges Faced:</strong> Aggregating and harmonizing data across varied mobile OS sources posed significant challenges, particularly with inconsistencies in biometric event capture and variations in reporting standards between platforms. Designing visuals that communicated meaningful trends without overwhelming the user required careful layout planning and user feedback. Achieving real-time responsiveness while querying large activity datasets further required backend optimization and efficient dashboard design, ensuring accurate, actionable insights are always available to business stakeholders.
          </p>
        </>
      ),
      impact: "40% improvement in authentication monitoring",
      tools: ["Tableau Desktop", "Tableau Cloud", "SQL Server", "Python"],
      icon: Users,
      metric: "+40%",
      color: "from-primary to-secondary",
      projectType: "personal",
      personalCategory: "bi" as const,
    },
    {
      title: "Automated Exploratory Data Analysis Framework using Python and Streamlit",
      description: "This project offers a Streamlit-based web application that automates exploratory data analysis and basic machine learning model building. Users simply upload their CSV, and the app provides tools for inspecting data types, handling missing values, plotting various graphs, performing feature analysis, and running classification models (including Logistic Regression, Decision Tree, Random Forest, Naive Bayes, and XGBoost) — all from an interactive interface, without any coding required.",
      fullDescription: (
        <>
          <p className="mb-4">
            <strong>Business Problem:</strong> Data analysts and business users often spend excessive time on repetitive data exploration and initial model development. This manual process of cleaning data, checking types, visualizing patterns, and quickly building models increases the time to actionable insights and makes diagnostics prone to error.
          </p>
          <p className="mb-4">
            <strong>Solution Approach:</strong> This project offers a Streamlit-based web application that automates exploratory data analysis and basic machine learning model building. Users simply upload their CSV, and the app provides tools for inspecting data types, handling missing values, plotting various graphs, performing feature analysis, and running classification models (including Logistic Regression, Decision Tree, Random Forest, Naive Bayes, and XGBoost) — all from an interactive interface, without any coding required.
          </p>
          <p className="mb-4">
            <strong>Challenges Faced:</strong> Major challenges included robust type conversion for diverse data, dynamic data validation to prevent errors in plotting or modeling when columns are missing or unsuitable, and integrating matplotlib/Seaborn figures smoothly with Streamlit's interface. Additional considerations involved delivering a simple, informative user experience and clear feedback when operations couldn't be performed (such as with invalid feature selection or empty columns).
          </p>
        </>
      ),
      impact: "Automated EDA workflow reducing analysis time significantly",
      tools: ["Python", "Streamlit", "Pandas", "Scikit-learn", "XGBoost", "Matplotlib", "Seaborn"],
      icon: BarChart3,
      metric: "EDA",
      color: "from-primary to-secondary",
      projectType: "personal",
      personalCategory: "python" as const,
      liveDemoUrl: "https://python-automated-eda-dheeraj-kumar-konidala.streamlit.app/",
    },
  ];

  const filteredProjects = projects.filter(project => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "personal") {
      return project.projectType === "personal" && project.personalCategory === personalProjectFilter;
    }
    return project.projectType === selectedFilter;
  });

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Transforming business challenges into data-driven solutions with measurable impact
          </p>
          
          <div className="flex gap-3 justify-center">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              onClick={() => setSelectedFilter("all")}
              className="transition-smooth"
            >
              All Projects
            </Button>
            <Button
              variant={selectedFilter === "personal" ? "default" : "outline"}
              onClick={() => setSelectedFilter("personal")}
              className="transition-smooth"
            >
              Personal Projects
            </Button>
            <Button
              variant={selectedFilter === "organization" ? "default" : "outline"}
              onClick={() => setSelectedFilter("organization")}
              className="transition-smooth"
            >
              Previous Organizational Projects
            </Button>
          </div>

          {selectedFilter === "personal" && (
            <div className="flex gap-3 justify-center mt-4">
              <Button
                variant={personalProjectFilter === "python" ? "default" : "outline"}
                onClick={() => setPersonalProjectFilter("python")}
                className="transition-smooth"
              >
                Python Projects
              </Button>
              <Button
                variant={personalProjectFilter === "bi" ? "default" : "outline"}
                onClick={() => setPersonalProjectFilter("bi")}
                className="transition-smooth"
              >
                Business Intelligence Projects
              </Button>
            </div>
          )}
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {filteredProjects.map((project, index) => (
              <CarouselItem key={index} className="pl-4 lg:basis-1/2">
                <Card
                  className="p-8 shadow-card hover:shadow-hover transition-smooth group animate-fade-in overflow-hidden relative h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md">
                        <Star className="h-4 w-4 fill-white" />
                        <span className="text-sm font-semibold">
                          {project.projectType === 'personal' ? 'Personal Project' : 'Previous Organizational Project'}
                        </span>
                      </div>
                      {project.projectType === 'personal' && project.personalCategory && (
                        <div className="flex items-center gap-1.5 bg-white text-blue-600 border border-blue-600 px-2 py-0.5 rounded-md">
                          {project.personalCategory === 'python' ? (
                            <Code2 className="h-3 w-3" />
                          ) : (
                            <Database className="h-3 w-3" />
                          )}
                          <span className="text-xs font-semibold">
                            {project.personalCategory === 'python' ? 'Python Project' : 'Business Intelligence Project'}
                          </span>
                        </div>
                      )}
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
                          {project.title === "Udemy Course Analysis Report" ? (
                            <TableauDashboardTabs 
                              description={project.fullDescription} 
                              title="Udemy Course Analysis Dashboard"
                              tableauUrl="https://public.tableau.com/views/UdemyCourseAnalysisDashboard_17614589055810/CourseandStudentAnalysisReport?:language=en-US&:display_count=n&:origin=viz_share_link"
                            />
                          ) : project.title === "LoginPulse Analytics Dashboard" ? (
                            <TableauDashboardTabs 
                              description={project.fullDescription} 
                              title="LoginPulse Analytics Dashboard"
                              tableauUrl="https://public.tableau.com/app/profile/dheeraj.kumar.k3358/viz/AppHealthMetricsKPI/AppHealthMetrics"
                            />
                          ) : project.liveDemoUrl ? (
                            <LiveDemoTabs 
                              description={project.fullDescription} 
                              liveDemoUrl={project.liveDemoUrl}
                            />
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

const TableauDashboardTabs = ({ description, title, tableauUrl }: { description: React.ReactNode; title: string; tableauUrl: string }) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="text-foreground/80 leading-relaxed">
        {description}
      </TabsContent>
      <TabsContent value="dashboard" className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="text-center space-y-4">
          <BarChart3 className="h-16 w-16 mx-auto text-primary" />
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground max-w-md">
            Click the button below to view the interactive Tableau dashboard in a new window
          </p>
          <Button
            onClick={() => window.open(tableauUrl, '_blank')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Dashboard in New Tab
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

const LiveDemoTabs = ({ description, liveDemoUrl }: { description: React.ReactNode; liveDemoUrl: string }) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="demo">Live Demo</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="text-foreground/80 leading-relaxed">
        {description}
      </TabsContent>
      <TabsContent value="demo" className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="text-center space-y-4">
          <BarChart3 className="h-16 w-16 mx-auto text-primary" />
          <h3 className="text-xl font-semibold">Live Demo</h3>
          <p className="text-muted-foreground max-w-md">
            Click the button below to view the live demo in a new window
          </p>
          <Button
            onClick={() => window.open(liveDemoUrl, '_blank')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Live Demo
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Projects;
