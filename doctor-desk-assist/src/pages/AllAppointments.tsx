import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllAppointments = () => {
  const navigate = useNavigate();

  const allAppointments = [
    { id: 1, name: "John Doe", time: "9:00 AM", symptoms: "Chest pain, shortness of breath", amount: "$150", status: "Paid" },
    { id: 2, name: "Jane Smith", time: "10:30 AM", symptoms: "High blood pressure", amount: "$120", status: "Paid" },
    { id: 3, name: "Mike Johnson", time: "11:15 AM", symptoms: "Irregular heartbeat", amount: "$180", status: "Paid" },
    { id: 4, name: "Sarah Williams", time: "1:00 PM", symptoms: "Follow-up consultation", amount: "$100", status: "Paid" },
    { id: 5, name: "Robert Brown", time: "2:30 PM", symptoms: "Chest discomfort", amount: "$150", status: "Pending" },
    { id: 6, name: "Emily Davis", time: "3:45 PM", symptoms: "Palpitations", amount: "$140", status: "Paid" },
    { id: 7, name: "David Miller", time: "4:30 PM", symptoms: "Annual checkup", amount: "$130", status: "Paid" },
    { id: 8, name: "Lisa Anderson", time: "5:15 PM", symptoms: "High cholesterol", amount: "$110", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mt-16 p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">All Appointments</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Complete Appointment List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{appointment.name}</h3>
                    
                    <p className="text-sm mt-1">{appointment.symptoms}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="text-md px-3 py-1">
                      {appointment.time}
                    </Badge>
                    
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AllAppointments;
