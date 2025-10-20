import { Code2, Database, TrendingUp, Cloud, BarChart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      category: "Technology",
      icon: TrendingUp,
      skills: ["Data Analytics", "Business Intelligence", "Data Modeling", "Statistical Modeling", "Data Engineering"],
    },
    {
      category: "BI Tools",
      icon: BarChart,
      skills: ["Tableau Desktop", "Tableau Prep", "Tableau Cloud", "Power BI Desktop", "Power BI Service", "Power BI Report Builder", "Power Automate"],
    },
    {
      category: "DB / DW / DE Platforms",
      icon: Database,
      skills: ["MS SQL Server (T SQL)", "MySQL", "PostgreSQL", "Databricks", "Snowflake", "Azure Synapse"],
    },
    {
      category: "Programming (Model / Technique) & SDLC",
      icon: Code2,
      skills: ["Python (3.7– 3.11)", "OOP's", "ORM (SQL Alchemy)", "PySpark", "Agile Methodology (JIRA)", "Azure Devops"],
    },
    {
      category: "Cloud Platforms & DevOps",
      icon: Cloud,
      skills: ["Microsoft Fabric (OneLake, ADF, Notebooks)", "Azure", "Databricks", "VCS- GIT (GitHub, GitLab, Bitbucket)"],
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

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    className="bg-blue-600 text-white font-bold hover:bg-blue-700"
                  >
                    {skill}
                  </Badge>
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
