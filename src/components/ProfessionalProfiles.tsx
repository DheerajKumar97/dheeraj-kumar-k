import { Linkedin, Github, PenTool, Code } from "lucide-react";
import { Card } from "@/components/ui/card";

const ProfessionalProfiles = () => {
  const profiles = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/dheerajkumar1997/",
      color: "from-blue-600 to-blue-700",
      description: "Connect professionally",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/DheerajKumar97/",
      color: "from-gray-700 to-gray-900",
      description: "Explore my code",
    },
    {
      name: "Medium Blog",
      icon: PenTool,
      url: "https://medium.com/@engineerdheeraj97",
      color: "from-green-600 to-green-700",
      description: "Read my insights",
    },
    {
      name: "HackerRank",
      icon: Code,
      url: "https://www.hackerrank.com/profile/engineerdheeraj1",
      color: "from-emerald-600 to-emerald-700",
      description: "Check my skills",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Professional Profiles
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with me across various platforms and explore my work
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {profiles.map((profile, index) => (
            <a
              key={index}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="p-6 shadow-card hover:shadow-hover transition-smooth group cursor-pointer h-full">
                <div className={`bg-gradient-to-br ${profile.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md mx-auto`}>
                  <profile.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-center mb-2 text-foreground group-hover:text-primary transition-smooth">
                  {profile.name}
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  {profile.description}
                </p>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalProfiles;
