import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const bodyParts = [
  { id: "head", label: "Head", top: "5%", left: "50%" },
  { id: "chest", label: "Chest", top: "25%", left: "50%" },
  { id: "stomach", label: "Stomach", top: "40%", left: "50%" },
  { id: "left-arm", label: "Left Arm", top: "30%", left: "25%" },
  { id: "right-arm", label: "Right Arm", top: "30%", left: "75%" },
  { id: "left-leg", label: "Left Leg", top: "65%", left: "40%" },
  { id: "right-leg", label: "Right Leg", top: "65%", left: "60%" },
];

const SymptomChecker = () => {
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleBodyPart = (id: string) => {
    setSelectedParts(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async () => {
  if (selectedParts.length === 0) {
    toast({
      title: "No symptoms selected",
      description: "Please select the areas where you feel discomfort.",
      variant: "destructive",
    });
    return;
  }

  const symptomLabels = selectedParts.map(id => bodyParts.find(p => p.id === id)?.label);

  try {
    const response = await fetch("http://localhost:5003/api/symptoms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientName: "John Doe", // Replace with logged-in patient
        symptoms: symptomLabels,
      }),
    });

    if (!response.ok) throw new Error("Failed to submit symptoms");

    toast({
      title: "Symptoms Recorded",
      description: `We've noted discomfort in: ${symptomLabels.join(", ")}`,
    });

    setSelectedParts([]);
  } catch (err) {
    console.error(err);
    toast({
      title: "Error",
      description: "Failed to submit symptoms",
      variant: "destructive",
    });
  }
};


  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-4">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Visual Symptom Checker
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tap on the areas where you feel discomfort - no words needed
          </p>
        </div>

        <Card className="p-8 bg-gradient-card shadow-card">
          <div className="relative mx-auto max-w-md h-96 mb-8">
            {/* Simple body diagram */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 400" className="w-full h-full">
                {/* Simple body outline */}
                <ellipse cx="100" cy="40" rx="30" ry="35" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
                <rect x="80" y="75" width="40" height="80" rx="20" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
                <rect x="80" y="155" width="40" height="100" rx="20" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
                <rect x="45" y="85" width="35" height="100" rx="15" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
                <rect x="120" y="85" width="35" height="100" rx="15" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
                <rect x="70" y="255" width="25" height="120" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
                <rect x="105" y="255" width="25" height="120" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
              </svg>
            </div>

            {/* Interactive points */}
            {bodyParts.map((part) => (
              <button
                key={part.id}
                onClick={() => toggleBodyPart(part.id)}
                className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-2 transition-all duration-300 ${
                  selectedParts.includes(part.id)
                    ? 'bg-emergency border-emergency scale-125 shadow-emergency'
                    : 'bg-card border-border hover:border-primary hover:scale-110'
                }`}
                style={{ top: part.top, left: part.left }}
                aria-label={part.label}
              >
                <span className="sr-only">{part.label}</span>
              </button>
            ))}
          </div>

          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              {selectedParts.length > 0 
                ? `Selected: ${selectedParts.map(id => bodyParts.find(p => p.id === id)?.label).join(", ")}`
                : "Tap on body parts to indicate discomfort"
              }
            </p>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full text-lg py-6"
            disabled={selectedParts.length === 0}
          >
            Submit Symptoms
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default SymptomChecker;
