import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Clock, Phone, Mail, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  patientName: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15),
  preferredDate: z.string().min(1, "Please select a date"),
  symptoms: z.string().trim().min(10, "Please describe your symptoms (minimum 10 characters)").max(1000),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  address: string;
  distance: string;
  rating: number;
  experience: string;
  availability: string;
}

// Mock data for nearby doctors
const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "General Physician",
    hospital: "City General Hospital",
    address: "123 Main Street, Downtown",
    distance: "0.8 km",
    rating: 4.8,
    experience: "15 years",
    availability: "Available Today",
    
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Cardiologist",
    hospital: "Heart Care Center",
    address: "456 Oak Avenue, Medical District",
    distance: "1.2 km",
    rating: 4.9,
    experience: "20 years",
    availability: "Available Tomorrow",
    
  },
  {
    id: "3",
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    hospital: "Children's Medical Center",
    address: "789 Park Road, East Side",
    distance: "1.5 km",
    rating: 4.7,
    experience: "12 years",
    availability: "Available Today",
    
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Orthopedic",
    hospital: "City General Hospital",
    address: "123 Main Street, Downtown",
    distance: "0.8 km",
    rating: 4.6,
    experience: "18 years",
    availability: "Available in 2 days",
    
  },
  {
    id: "5",
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    hospital: "Skin & Wellness Clinic",
    address: "321 Beach Boulevard, West End",
    distance: "2.1 km",
    rating: 4.9,
    experience: "10 years",
    availability: "Available Today",
   
  },
  {
    id: "6",
    name: "Dr. Ahmed Hassan",
    specialty: "Neurologist",
    hospital: "Neuro Care Institute",
    address: "654 River Drive, North District",
    distance: "2.5 km",
    rating: 4.8,
    experience: "22 years",
    availability: "Available Tomorrow",
   
  }
];

const BookDoctor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<string>("all");

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      patientName: "",
      email: "",
      phone: "",
      preferredDate: "",
      symptoms: "",
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
  if (!selectedDoctor) return;

  setIsSubmitting(true);

  try {
    const response = await fetch("http://localhost:5003/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        doctor: selectedDoctor.name,
        hospital: selectedDoctor.hospital,
        specialty: selectedDoctor.specialty,
      }),
    });

    if (!response.ok) throw new Error("Failed to book appointment");

    const savedData = await response.json();

    toast({
      title: "Appointment Requested!",
      description: `Your appointment with ${selectedDoctor.name} at ${selectedDoctor.hospital} has been Requested. Soon you will get Mail`,
      
    });

    form.reset();
    setSelectedDoctor(null);

  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  const hospitals = ["all", ...Array.from(new Set(mockDoctors.map(d => d.hospital)))];
  const filteredDoctors = selectedHospital === "all" 
    ? mockDoctors 
    : mockDoctors.filter(d => d.hospital === selectedHospital);

  if (selectedDoctor) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setSelectedDoctor(null)}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Doctor List
          </Button>

          <Card className="p-8 bg-gradient-card shadow-card mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-2">{selectedDoctor.name}</h2>
                <p className="text-lg text-muted-foreground mb-1">{selectedDoctor.specialty}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedDoctor.hospital}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{selectedDoctor.rating}</span>
                </div>
                <Badge variant="secondary">{selectedDoctor.availability}</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-card shadow-card">
            <h3 className="text-xl font-bold text-foreground mb-6">Book Appointment</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Enter patient name" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="email" placeholder="your.email@example.com" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="tel" placeholder="+1234567890" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Date</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="date" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="symptoms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe Your Symptoms</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe your symptoms, pain, or reason for visit..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground"></p>
                    <p className="text-2xl font-bold text-foreground"></p>
                  </div>
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Booking..." : "Request Booking"}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Find Nearby Doctors
          </h1>
          <p className="text-muted-foreground">
            Select a doctor and book your appointment instantly
          </p>
        </div>

        <div className="mb-8">
          <Select value={selectedHospital} onValueChange={setSelectedHospital}>
            <SelectTrigger className="w-full max-w-md mx-auto">
              <SelectValue placeholder="Filter by hospital" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hospitals</SelectItem>
              {hospitals.slice(1).map((hospital) => (
                <SelectItem key={hospital} value={hospital}>
                  {hospital}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="p-6 bg-gradient-card shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-1">{doctor.name}</h3>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{doctor.rating}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">{doctor.hospital}</p>
                    <p className="text-muted-foreground">{doctor.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {doctor.experience}
                  </span>
                  <span>• {doctor.distance}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <Badge variant="secondary" className="mb-1">{doctor.availability}</Badge>
                  <p className="text-sm font-semibold text-foreground"></p>
                </div>
                <Button onClick={() => setSelectedDoctor(doctor)}>
                  Book Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDoctor;
