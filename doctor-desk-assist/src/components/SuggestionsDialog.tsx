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

interface SuggestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName: string;
  symptoms: string;
}

const SuggestionsDialog = ({ open, onOpenChange, patientName, symptoms }: SuggestionsDialogProps) => {
  const [suggestions, setSuggestions] = useState("");
  const { toast } = useToast();

  const handleSend = () => {
    toast({
      title: "Suggestions Sent",
      description: `Your suggestions have been sent to ${patientName}`,
    });
    setSuggestions("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suggestions for {patientName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Patient Symptoms:</p>
            <p className="text-sm bg-muted p-2 rounded">{symptoms}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium">Your Suggestions</label>
            <Textarea
              placeholder="Write your medical suggestions and recommendations..."
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              className="mt-2"
              rows={5}
            />
          </div>
          
          <Button onClick={handleSend} className="w-full bg-primary hover:bg-primary/90">
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuggestionsDialog;
