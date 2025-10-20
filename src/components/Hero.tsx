import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-bg.jpg";
import profilePhoto from "@/assets/dheeraj-profile.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const downloadResume = () => {
    window.open("https://drive.google.com/uc?export=download&id=1fjIRkyfJ2UpnxTMygMSV9a-S5pgGMlox", "_blank");
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(217, 241, 251, 0.9), rgba(217, 241, 251, 0.95)), url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 gradient-hero"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
              Data Alchemist at your Service
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-medium">
              Transforming Raw Data into{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">
                Actionable Insights
              </span>{" "}
              with Visual Brilliance
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Business Intelligence Developer & Data Analyst with 5+ years of
              expertise in Power BI, Tableau, SQL, and Advanced Analytics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-hover transition-smooth group"
                onClick={scrollToContact}
              >
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 transition-smooth"
                onClick={downloadResume}
              >
                Download Resume
                <Download className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex-shrink-0 animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <img
                src={profilePhoto}
                alt="Dheeraj Kumar K - Business Intelligence Developer"
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-hover border-4 border-card"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
