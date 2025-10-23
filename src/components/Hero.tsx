import { ArrowRight, Download, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import heroBackground from "@/assets/hero-bg.jpg";
import profilePhoto from "@/assets/dheeraj-profile.jpg";
import videoThumbnail from "@/assets/video-thumbnail.png";

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
              A Results-driven{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">
                AI Enabled Business Intelligence Developer & Data Analyst
              </span>{" "}
              Leveraging 6+ years of expertise in Power BI, Tableau, SQL, PySpark, Microsoft Fabric and Advance Analytics Techniques with 100% Committed to delivering high-quality data insights and driving data-centric solutions for optimal business outcomes.
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
                asChild
              >
                <a href="https://drive.google.com/uc?export=download&id=1fjIRkyfJ2UpnxTMygMSV9a-S5pgGMlox">
                  Download Resume
                  <Download className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 transition-smooth"
                  >
                    Video Introduction
                    <PlayCircle className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full">
                  <DialogHeader>
                    <DialogTitle>Video Introduction</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <img
                      src={videoThumbnail}
                      alt="Dheeraj Kumar K - Video Introduction Thumbnail"
                      className="w-full rounded-lg"
                    />
                    <div className="relative w-full pt-[56.25%]">
                      <iframe
                        src="https://drive.google.com/file/d/1z__4LBCKqUMhy5hfODPArHHXTvU2naFt/preview"
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        allow="autoplay"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
