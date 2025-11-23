import { Linkedin, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import mediumLogo from "@/assets/medium-logo.jpg";
import hackerrankLogo from "@/assets/hackerrank-logo.png";

const ProfessionalProfiles = () => {
  const profiles = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/dheerajkumar1997/",
      color: "from-blue-600 to-blue-700",
      description: "Connect professionally",
      type: "icon",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/DheerajKumar97/",
      color: "from-gray-700 to-gray-900",
      description: "Explore my code",
      type: "icon",
    },
    {
      name: "Medium Blog",
      logo: mediumLogo,
      url: "https://medium.com/@engineerdheeraj97",
      color: "from-green-600 to-green-700",
      description: "Read my insights",
      type: "logo",
    },
    {
      name: "HackerRank",
      logo: hackerrankLogo,
      url: "https://www.hackerrank.com/profile/engineerdheeraj1",
      color: "from-emerald-600 to-emerald-700",
      description: "Check my skills",
      type: "logo",
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
                <div className={`${profile.name === "Medium Blog" ? "bg-transparent" : `bg-gradient-to-br ${profile.color}`} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${profile.name === "Medium Blog" ? "" : "shadow-md"} mx-auto`}>
                  {profile.type === "icon" && profile.icon && (
                    <profile.icon className="h-8 w-8 text-white" />
                  )}
                  {profile.type === "logo" && profile.logo && (
                    <img 
                      src={profile.logo} 
                      alt={`${profile.name} logo`}
                      className={profile.name === "HackerRank" ? "w-14 h-14 object-contain" : "w-12 h-12 object-contain"}
                    />
                  )}
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
