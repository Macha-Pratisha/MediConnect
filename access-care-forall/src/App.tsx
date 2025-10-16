import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookDoctor from "./pages/BookDoctor";
import DoctorConsole from "./pages/DoctorConsole";
import PatientTranslate from "./pages/PatientTranslate";
import BookCounselor from "./pages/BookCounselor";
import BookAmbulance from "./pages/BookAmbulance";
import PatientChat from "./pages/PatientChat";
// import Chat from "./pages/Chat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster  />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/book-doctor" element={<BookDoctor />} />
          <Route path="/book-counsellor" element={<BookCounselor />} />
          <Route path="/emergency-ambulance" element={<BookAmbulance />} />
          <Route path="/doctor-console" element={<DoctorConsole />} />
          <Route path="/patient-translate" element={<PatientTranslate />} />
          {/* <Route path="/chat" element={<Chat />} /> */}
          <Route path="/chat" element={<PatientChat />} />
          /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
