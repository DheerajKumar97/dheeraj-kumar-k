import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BadgeShowcase from "@/components/BadgeShowcase";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import ProfessionalProfiles from "@/components/ProfessionalProfiles";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <BadgeShowcase />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <ProfessionalProfiles />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
