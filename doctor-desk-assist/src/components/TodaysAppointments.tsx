import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Appointment {
  id: number;
  patientName: string;
  symptoms: string;
  Number : number;
  time: string;
}

const appointments: Appointment[] = [
  { id: 1, patientName: "John Smith", symptoms: "Chest pain, shortness of breath", Number: 9182346523,   time: "09:00 AM" },
  { id: 2, patientName: "Emma Wilson", symptoms: "High blood pressure monitoring", Number: 9182346523, time: "10:30 AM" },
  { id: 3, patientName: "Michael Brown", symptoms: "Irregular heartbeat", Number: 9182346521, time: "11:45 AM" },
  { id: 4, patientName: "Lisa Anderson", symptoms: "Post-surgery follow-up", Number: 9182346512, time: "02:00 PM" },
];

const TodaysAppointments = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextAppointment = () => {
    setCurrentIndex((prev) => (prev + 1) % appointments.length);
  };

  const prevAppointment = () => {
    setCurrentIndex((prev) => (prev - 1 + appointments.length) % appointments.length);
  };

  return (
    <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-4 ">Today's Appointments</h2>
      
      <div className="relative">
        <div className="flex gap-4 overflow-hidden">
          {appointments.map((appointment, index) => (
            <div
              key={appointment.id}
              className={`min-w-full transition-transform duration-300 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0 absolute'
              }`}
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`,
              }}
            >
              <div className="bg-muted/90 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{appointment.patientName}</h3>
                    <p className="text-sm text-muted-foreground">{appointment.Number}</p>
                  </div>
                  <Badge variant="secondary" className="text-base px-3 py-1">{appointment.time}</Badge>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Symptoms:</p>
                  <p className="text-sm">{appointment.symptoms}</p>
                </div>

                {/* <Button className="w-full bg-secondary hover:bg-secondary/90">
                  Paid Amount: ${appointment.paidAmount}
                </Button> */}
              </div>
            </div>
          ))}
        </div>

        {appointments.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevAppointment}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1">
              {appointments.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextAppointment}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
        
        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/all-appointments')}
            className="w-full max-w-xs bg-secondary"
          >
            View All
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TodaysAppointments;
