import { Stethoscope } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DoctorProfile from "./DoctorProfile";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 shadow-sm">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MediConnect
            </span>
          </div>

          {/* NavLinks and Profile */}
          <div className="flex items-center gap-6">
            {/* DoctorTranslate Button */}
            <NavLink
              to="/doctor-translate"
              className="px-3 py-1.5 bg-secondary text-white text-sm rounded-md font-medium hover:bg-primary/80 transition-all"
            >
              DoctorTranslate
            </NavLink>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="w-10 h-10 cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=doctor" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setShowProfile(true)}>
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <DoctorProfile open={showProfile} onOpenChange={setShowProfile} />
    </>
  );
};

export default Navbar;