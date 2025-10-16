import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AcceptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName: string;
}

const AcceptDialog = ({ open, onOpenChange, patientName }: AcceptDialogProps) => {
  const [availability, setAvailability] = useState("");
  const { toast } = useToast();

  const handleSend = async () => {
  try {
    await fetch("http://localhost:5003/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientName,
        message: `Doctor accepted appointment. Availability: ${availability}`,
        status: "accepted",
      }),
    });

    toast({
      title: "Appointment Confirmed",
      description: `Your availability has been sent to ${patientName}`,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
  }

  setAvailability("");
  onOpenChange(false);
};


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Appointment for {patientName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">When are you available?</label>
            <Textarea
              placeholder="e.g., I'm available tomorrow at 10:00 AM or Thursday at 2:00 PM"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="mt-2"
              rows={4}
            />
          </div>
          <Button onClick={handleSend} className="w-full bg-secondary hover:bg-secondary/90">
            Send to Patient
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptDialog;
