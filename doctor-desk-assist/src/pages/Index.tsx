import Navbar from "@/components/Navbar";
import TodaysAppointments from "@/components/TodaysAppointments";
import AppointmentRequests from "@/components/AppointmentRequests";
import SymptomChecker from "@/components/SymptomChecker";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mt-16 p-6 space-y-8 max-w-7xl mx-auto">
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl font-bold ">Dr. Sarah Johnson</h1>
          <p className="text-md font-bold text-muted-foreground">Cardiologist</p>
          
        </div>
        
        <TodaysAppointments />
        <AppointmentRequests />
        <SymptomChecker />
      </main>
    </div>
  );
};

export default Index;
