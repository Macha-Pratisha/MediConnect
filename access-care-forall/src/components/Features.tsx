import { 
  Clock, 
  MessageSquare, 
  Shield, 
  Users, 
  Languages,
  Heart
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Queue-Free Appointments",
    description: "Instantly book with doctors or counselors, no waiting"
  },
  {
    icon: MessageSquare,
    title: "Visual Communication",
    description: "Interactive body maps and symbols for easy symptom reporting"
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description: "Real-time translation for seamless communication"
  },
  {
    icon: Heart,
    title: "Mental Health Care",
    description: "Access to counselors for stress, anxiety, and wellness"
  },
  {
    icon: Users,
    title: "Accessible for All",
    description: "Designed for rural, migrant, and differently-abled users"
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Your health records are safe and confidential"
  }
];

const Features = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Healthcare that breaks barriers and puts you first
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-xl shadow-card hover:shadow-soft transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
