import { Code2, Database, TrendingUp, Cloud, BarChart, LineChart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Skills = () => {
  const skillCategories = [
    {
      category: "Business Intelligence",
      icon: BarChart,
      skills: [
        { name: "Power BI", level: 95 },
        { name: "Tableau", level: 90 },
        { name: "Microsoft Fabric", level: 85 },
      ],
    },
    {
      category: "Data Analytics",
      icon: LineChart,
      skills: [
        { name: "Data Storytelling", level: 95 },
        { name: "Predictive Analytics", level: 88 },
        { name: "Statistical Analysis", level: 85 },
      ],
    },
    {
      category: "Database & Query",
      icon: Database,
      skills: [
        { name: "SQL Server", level: 92 },
        { name: "PySpark", level: 85 },
        { name: "Data Modeling", level: 90 },
      ],
    },
    {
      category: "Programming",
      icon: Code2,
      skills: [
        { name: "Python", level: 88 },
        { name: "DAX", level: 92 },
        { name: "SQL", level: 95 },
      ],
    },
    {
      category: "Cloud Platforms",
      icon: Cloud,
      skills: [
        { name: "Azure", level: 85 },
        { name: "AWS", level: 75 },
        { name: "Data Engineering", level: 82 },
      ],
    },
    {
      category: "Visualization",
      icon: TrendingUp,
      skills: [
        { name: "Dashboard Design", level: 95 },
        { name: "Interactive Reports", level: 92 },
        { name: "KPI Development", level: 90 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Technical Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mastering the tools and technologies that power modern data-driven decision making
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={categoryIndex}
              className="p-6 shadow-card hover:shadow-hover transition-smooth animate-fade-in"
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {category.category}
                </h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
