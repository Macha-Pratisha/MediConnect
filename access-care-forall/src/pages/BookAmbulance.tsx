import { useNavigate } from "react-router-dom";
import { ArrowLeft, PhoneCall, Hospital, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ambulances = [
  { id: 1, name: "LifeCare Ambulance Service", hospital: "Nandyal Government Hospital", phone: "+91 98765 43210", distance: "0.8 km" },
  { id: 2, name: "SafeMove Ambulance", hospital: "Sunrise Multi-Specialty Hospital", phone: "+91 99888 55667", distance: "1.2 km" },
  { id: 3, name: "MedLink Ambulance", hospital: "City Health Center", phone: "+91 90123 45678", distance: "1.5 km" },
  { id: 4, name: "24x7 Rapid Response Ambulance", hospital: "Apollo Hospital", phone: "+91 99001 22334", distance: "2.0 km" },
  { id: 5, name: "QuickAid Ambulance", hospital: "Sunrise Multi-Specialty Hospital", phone: "+91 98711 22334", distance: "2.3 km" },
  { id: 6, name: "SpeedyCare Ambulance", hospital: "Nandyal Government Hospital", phone: "+91 99822 33445", distance: "2.5 km" },
  { id: 7, name: "Rapid Response Medics", hospital: "City Health Center", phone: "+91 99033 44556", distance: "3.0 km" },
  { id: 8, name: "HealthLine Ambulance", hospital: "Apollo Hospital", phone: "+91 98744 55667", distance: "3.2 km" },
  { id: 9, name: "Emergency Aid Ambulance", hospital: "Sunrise Multi-Specialty Hospital", phone: "+91 99855 66778", distance: "3.5 km" },
  { id: 10, name: "Life Support Ambulance", hospital: "Nandyal Government Hospital", phone: "+91 99066 77889", distance: "3.8 km" },
  { id: 11, name: "MedFast Ambulance", hospital: "City Health Center", phone: "+91 98777 88990", distance: "4.0 km" },
  { id: 12, name: "First Response Ambulance", hospital: "Apollo Hospital", phone: "+91 99888 99001", distance: "4.3 km" },
  { id: 13, name: "RescueLine Ambulance", hospital: "Sunrise Multi-Specialty Hospital", phone: "+91 99011 11223", distance: "4.5 km" },
  { id: 14, name: "VitalCare Ambulance", hospital: "Nandyal Government Hospital", phone: "+91 98722 33444", distance: "4.8 km" },
  { id: 15, name: "Quick Response Medics", hospital: "City Health Center", phone: "+91 99833 44555", distance: "5.0 km" },
  { id: 16, name: "AllCare Ambulance", hospital: "Apollo Hospital", phone: "+91 99044 55666", distance: "5.2 km" },
  { id: 17, name: "SafeRide Ambulance", hospital: "Sunrise Multi-Specialty Hospital", phone: "+91 98755 66777", distance: "5.5 km" },
  { id: 18, name: "Ambulance 24/7", hospital: "Nandyal Government Hospital", phone: "+91 99866 77888", distance: "5.8 km" },
  { id: 19, name: "RescueCare Ambulance", hospital: "City Health Center", phone: "+91 99077 88999", distance: "6.0 km" },
  { id: 20, name: "Emergency Response Team", hospital: "Apollo Hospital", phone: "+91 98788 99000", distance: "6.2 km" },
];

const BookAmbulances = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      {/* 🔙 Back Button */}
      <div className="mb-6 flex items-center">
        <Button
          variant="outline"
          onClick={() => navigate("/book-doctor")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Doctors List
        </Button>
      </div>

      {/* 🚑 Title */}
      <h1 className="text-2xl font-bold mb-6">Nearby Ambulance Services</h1>

      {/* 🚑 Ambulance Cards (Responsive Grid) */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {ambulances.map((a) => (
          <Card
            key={a.id}
            className="p-4 shadow-md hover:shadow-lg transition-shadow rounded-2xl"
          >
            <h3 className="font-semibold text-lg">{a.name}</h3>
            <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
              <Hospital className="w-4 h-4 text-primary" />
              <span>{a.hospital}</span>
            </div>
            <div className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{a.distance}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm font-medium">
              <PhoneCall className="w-4 h-4 text-green-600" />
              <span>{a.phone}</span>
            </div>

            <div className="mt-4">
              <Button
                className="w-full bg-secondary hover:bg-secondary/90"
                onClick={() => window.open(`tel:${a.phone}`)}
              >
                Call Ambulance
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookAmbulances;
