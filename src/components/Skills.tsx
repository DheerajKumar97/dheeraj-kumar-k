import { Code2, Database, TrendingUp, Cloud, BarChart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Skills = () => {
  const skillCategories = [
    {
      category: "Technology",
      icon: TrendingUp,
      skills: [
        { name: "Data Analytics", level: 95 },
        { name: "Business Intelligence", level: 95 },
        { name: "Data Modeling", level: 90 },
        { name: "Statistical Modeling", level: 88 },
        { name: "Data Engineering", level: 85 },
      ],
    },
    {
      category: "BI Tools",
      icon: BarChart,
      skills: [
        { name: "Tableau Desktop", level: 92 },
        { name: "Tableau Prep", level: 88 },
        { name: "Tableau Cloud", level: 85 },
        { name: "Power BI Desktop", level: 95 },
        { name: "Power BI Service", level: 92 },
        { name: "Power BI Report Builder", level: 88 },
        { name: "Power Automate", level: 85 },
      ],
    },
    {
      category: "DB / DW / DE Platforms",
      icon: Database,
      skills: [
        { name: "MS SQL Server (T SQL)", level: 95 },
        { name: "MySQL", level: 88 },
        { name: "PostgreSQL", level: 85 },
        { name: "Databricks", level: 85 },
        { name: "Snowflake", level: 82 },
        { name: "Azure Synapse", level: 80 },
      ],
    },
    {
      category: "Programming (Model / Technique) & SDLC",
      icon: Code2,
      skills: [
        { name: "Python (3.7– 3.11)", level: 90 },
        { name: "OOP's", level: 88 },
        { name: "ORM (SQL Alchemy)", level: 85 },
        { name: "PySpark", level: 88 },
        { name: "Agile Methodology (JIRA)", level: 90 },
        { name: "Azure Devops", level: 85 },
      ],
    },
    {
      category: "Cloud Platforms & DevOps",
      icon: Cloud,
      skills: [
        { name: "Microsoft Fabric (OneLake, ADF, Notebooks)", level: 88 },
        { name: "Azure", level: 85 },
        { name: "Databricks", level: 85 },
        { name: "VCS- GIT (GitHub, GitLab, Bitbucket)", level: 90 },
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
