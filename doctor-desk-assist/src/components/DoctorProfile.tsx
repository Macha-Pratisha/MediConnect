import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface DoctorProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DoctorProfile = ({ open, onOpenChange }: DoctorProfileProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Doctor Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=doctor" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">Dr. Sarah Johnson</h3>
              <p className="text-muted-foreground">Cardiologist</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Specialization</p>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary">Cardiology</Badge>
                <Badge variant="secondary">Internal Medicine</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Experience</p>
              <p className="text-sm">15 years</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-sm">dr.sarah.johnson@mediconnect.com</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="text-sm">+1 (555) 123-4567</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">License Number</p>
              <p className="text-sm">MD-12345-USA</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Certificates Submitted</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm">Board Certification - Cardiology</span>
                  <Badge variant="secondary" className="text-xs">Verified</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm">Medical License</span>
                  <Badge variant="secondary" className="text-xs">Verified</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm">Advanced Cardiac Life Support</span>
                  <Badge variant="secondary" className="text-xs">Verified</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorProfile;
