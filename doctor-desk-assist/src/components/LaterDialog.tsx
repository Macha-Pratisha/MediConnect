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

interface LaterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName: string;
}

const LaterDialog = ({ open, onOpenChange, patientName }: LaterDialogProps) => {
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  const handleSend = async () => {
  try {
    await fetch("http://localhost:5003/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientName,
        message: `Doctor postponed appointment. Reason: ${reason}`,
        status: "later",
      }),
    });

    toast({
      title: "Response Sent",
      description: `Your message has been sent to ${patientName}`,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
  }

  setReason("");
  onOpenChange(false);
};


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Postpone Appointment for {patientName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Reason for postponing</label>
            <Textarea
              placeholder="e.g., I'm currently fully booked. I can schedule you for next week."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-2"
              rows={4}
            />
          </div>
          <Button onClick={handleSend} className="w-full">
            Send to Patient
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LaterDialog;
