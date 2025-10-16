import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  variant?: "default" | "emergency";
  onClick?: () => void;
}

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  buttonText, 
  variant = "default",
  onClick 
}: ServiceCardProps) => {
  const isEmergency = variant === "emergency";
  
  return (
    <Card className={`p-8 bg-gradient-card shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1 ${isEmergency ? 'border-2 border-emergency shadow-emergency' : ''}`}>
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
        isEmergency 
          ? 'bg-emergency text-emergency-foreground animate-pulse' 
          : 'bg-primary/10 text-primary'
      }`}>
        <Icon className="w-8 h-8" />
      </div>
      
      <h3 className="text-2xl font-bold mb-3 text-card-foreground">
        {title}
      </h3>
      
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>
      
      <Button 
        onClick={onClick}
        className={`w-full text-lg py-6 ${
          isEmergency 
            ? 'bg-emergency hover:bg-emergency/90 text-emergency-foreground shadow-emergency' 
            : ''
        }`}
        variant={isEmergency ? "default" : "default"}
      >
        {buttonText}
      </Button>
    </Card>
  );
};

export default ServiceCard;
