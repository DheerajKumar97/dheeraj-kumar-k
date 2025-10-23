import { BookOpen, ExternalLink, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Blog = () => {
  const blogPosts = [
    {
      title: "Mastering DAX: Advanced Calculations in Power BI",
      excerpt: "Deep dive into advanced DAX formulas and optimization techniques for high-performance Power BI dashboards.",
      date: "2025-10-20",
      category: "Power BI",
      readTime: "8 min read",
      link: "https://medium.com/@engineerdheeraj97/mastering-dax-advanced-calculations-in-power-bi-fd30ff2a6a5b",
    },
    {
      title: "Data Storytelling: Making Numbers Speak",
      excerpt: "Learn the art of transforming complex data into compelling narratives that drive business decisions.",
      date: "2024-02-28",
      category: "Analytics",
      readTime: "6 min read",
      link: "https://medium.com/@engineerdheeraj97",
    },
    {
      title: "Building Scalable Data quality check Pipelines with Snowpark",
      excerpt: "Best practices and patterns for creating efficient, scalable data processing pipelines using Snowpark.",
      date: "2025-10-21",
      category: "Data Engineering",
      readTime: "10 min read",
      link: "https://medium.com/@engineerdheeraj97/building-a-robust-data-quality-check-pipeline-with-snowpark-e7cb6ee4f4ea",
    },
    {
      title: "Power BI Performance Optimization Techniques",
      excerpt: "Learn advanced strategies to optimize your Power BI reports for faster load times and better user experience.",
      date: "2025-09-15",
      category: "Power BI",
      readTime: "7 min read",
      link: "https://medium.com/@engineerdheeraj97",
    },
    {
      title: "Data Warehouse Design Best Practices",
      excerpt: "Essential principles and patterns for designing efficient and scalable data warehouse architectures.",
      date: "2025-08-22",
      category: "Data Engineering",
      readTime: "9 min read",
      link: "https://medium.com/@engineerdheeraj97",
    },
    {
      title: "Advanced Analytics with Python and Pandas",
      excerpt: "Explore powerful data manipulation and analysis techniques using Python's Pandas library.",
      date: "2025-07-10",
      category: "Analytics",
      readTime: "11 min read",
      link: "https://medium.com/@engineerdheeraj97",
    },
    {
      title: "Real-time Data Processing with Apache Kafka",
      excerpt: "Understanding how to build robust real-time data pipelines using Apache Kafka and stream processing.",
      date: "2025-06-18",
      category: "Data Engineering",
      readTime: "12 min read",
      link: "https://medium.com/@engineerdheeraj97",
    },
    {
      title: "Business Intelligence Dashboard Design Principles",
      excerpt: "Key principles for creating effective and user-friendly BI dashboards that drive business decisions.",
      date: "2025-05-25",
      category: "Analytics",
      readTime: "8 min read",
      link: "https://medium.com/@engineerdheeraj97",
    },
    {
      title: "Machine Learning for Business Analytics",
      excerpt: "Practical applications of machine learning algorithms in business analytics and predictive modeling.",
      date: "2025-04-12",
      category: "Analytics",
      readTime: "10 min read",
      link: "https://medium.com/@engineerdheeraj97",
    },
  ];

  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Latest Articles
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing insights, tutorials, and best practices in data analytics and business intelligence
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto mb-12"
        >
          <CarouselContent className="-ml-4">
            {blogPosts.map((post, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card
                  className="p-6 shadow-card hover:shadow-hover transition-smooth group animate-fade-in h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                      {post.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-smooth">
                    {post.title}
                  </h3>

                  <p className="text-foreground/70 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary/80 hover:bg-primary/5 transition-smooth group/btn p-0"
                    asChild
                  >
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      Read More
                      <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-12" />
          <CarouselNext className="right-0 translate-x-12" />
        </Carousel>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-hover transition-smooth"
            asChild
          >
            <a href="https://medium.com/@engineerdheeraj97" target="_blank" rel="noopener noreferrer">
              View All Articles on Medium
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
