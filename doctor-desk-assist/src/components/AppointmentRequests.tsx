import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AcceptDialog from "./AcceptDialog";
import LaterDialog from "./LaterDialog";

interface AppointmentRequest {
  _id: string;
  patientName: string;
  symptoms: string;
  preferredDate: string;
}

const AppointmentRequests = () => {
  const [requests, setRequests] = useState<AppointmentRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<AppointmentRequest | null>(null);
  const [dialogType, setDialogType] = useState<"accept" | "later" | null>(null);

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const [patientsRes, counsellorRes] = await Promise.all([
          fetch("http://localhost:5003/api/patients"),
          fetch("http://localhost:5003/api/counsellor"),
        ]);

        if (!patientsRes.ok || !counsellorRes.ok)
          throw new Error("Failed to fetch appointment data");

        const [patientsData, counsellorData] = await Promise.all([
          patientsRes.json(),
          counsellorRes.json(),
        ]);

        // Combine both API results into one list
        const allAppointments = [...patientsData, ...counsellorData];

        setRequests(allAppointments);
      } catch (error) {
        console.error("❌ Error fetching appointments:", error);
      }
    };

    fetchAllAppointments();
  }, []);

  const handleAccept = (request: AppointmentRequest) => {
    setSelectedRequest(request);
    setDialogType("accept");
  };

  const handleLater = (request: AppointmentRequest) => {
    setSelectedRequest(request);
    setDialogType("later");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Appointment Requests</h2>

      <div
        className="
          grid 
          gap-6
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-3 
          xl:grid-cols-3
        "
      >
        {requests.length === 0 ? (
          <p className="text-muted-foreground col-span-full">
            No appointment requests yet.
          </p>
        ) : (
          requests.map((request) => (
            <Card
              key={request._id}
              className="p-4 space-y-3 shadow-md hover:shadow-lg transition-shadow rounded-2xl"
            >
              <div>
                <h3 className="font-semibold text-lg">{request.patientName}</h3>
                <p className="text-sm text-muted-foreground">
                  Preferred Date: {request.preferredDate}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Symptoms:</p>
                <p className="text-sm">{request.symptoms}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleAccept(request)}
                  className="flex-1 bg-secondary hover:bg-secondary/90"
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleLater(request)}
                  variant="outline"
                  className="flex-1"
                >
                  Later
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Accept / Later dialogs */}
      <AcceptDialog
        open={dialogType === "accept"}
        onOpenChange={(open) => !open && setDialogType(null)}
        patientName={selectedRequest?.patientName || ""}
      />

      <LaterDialog
        open={dialogType === "later"}
        onOpenChange={(open) => !open && setDialogType(null)}
        patientName={selectedRequest?.patientName || ""}
      />
    </div>
  );
};

export default AppointmentRequests;
