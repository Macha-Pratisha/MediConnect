import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SymptomChecker from "@/components/SymptomChecker";
import Features from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <SymptomChecker />
      <Features />
    </div>
  );
};

export default Index;
