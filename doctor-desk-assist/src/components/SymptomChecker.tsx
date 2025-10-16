import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SuggestionsDialog from "./SuggestionsDialog";

interface Patient {
  _id: string;
  patientName: string;
  symptoms: string[];
  createdAt: string;
}

const SymptomChecker = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const res = await fetch("http://localhost:5003/api/symptoms");
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        console.error("Failed to fetch symptoms", err);
      }
    };
    fetchSymptoms();
  }, []);

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Visual Symptom Checker</h2>
        <div className="space-y-3">
          {patients.map((patient) => (
            <Card key={patient._id} className="p-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold">{patient.patientName}</h3>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-muted-foreground">Symptoms:</p>
                    <p className="text-sm">{patient.symptoms.join(", ")}</p>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedPatient(patient)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Suggestions
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <SuggestionsDialog
        open={!!selectedPatient}
        onOpenChange={(open) => !open && setSelectedPatient(null)}
        patientName={selectedPatient?.patientName || ""}
        symptoms={selectedPatient?.symptoms?.join(", ") || ""}
      />
    </>
  );
};

export default SymptomChecker;
