import { Stethoscope, Brain, Ambulance } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import { useToast } from "@/hooks/use-toast";

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDoctorClick = () => {
    navigate("/book-doctor");
  };

   const handleCounsellorClick = () => {
    navigate("/book-counsellor");
  };

  const handleAmbulanceClick = () => {
    navigate("/emergency-ambulance");
  }
  const handleServiceClick = (service: string) => {
    toast({
      title: `${service} Booking`,
      description: "This feature will connect you to available professionals shortly.",
    });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access healthcare professionals and emergency services instantly
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={Stethoscope}
            title="Book a Doctor"
            description="Connect with general practitioners and specialists instantly. No queues, no delays."
            buttonText="Find a Doctor"
            onClick={handleDoctorClick}
          />
          
          <ServiceCard
            icon={Brain}
            title="Book a Counselor"
            description="Professional mental health support for stress, anxiety, and emotional well-being."
            buttonText="Talk to a Counselor"
            onClick={handleCounsellorClick}
          />
          
          <ServiceCard
            icon={Ambulance}
            title="Emergency Ambulance"
            description="One-tap SOS to locate and call the nearest ambulance for immediate help."
            buttonText="Call Ambulance"
            variant="emergency"
            onClick={handleAmbulanceClick}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
