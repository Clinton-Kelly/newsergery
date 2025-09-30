import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProjectSetupDialog } from "@/components/ProjectSetupDialog";
import Index from "./pages/Index";
import PatientOnboarding from "./pages/PatientOnboarding";
import VitalDataCollection from "./pages/VitalDataCollection";
import AppointmentBooking from "./pages/AppointmentBooking";
import DoctorAnalysis from "./pages/DoctorAnalysis";
import Prescriptions from "./pages/Prescriptions";
import ConsentManagement from "./pages/ConsentManagement";
import SurgeryTracking from "./pages/SurgeryTracking";
import RecordsManagement from "./pages/RecordsManagement";
import Notifications from "./pages/Notifications";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showProjectSetup, setShowProjectSetup] = useState(false);
  
  useEffect(() => {
    // Check if project setup was already completed
    const projectType = localStorage.getItem('aiaa-project-type');
    if (!projectType) {
      setShowProjectSetup(true);
    }
  }, []);

  const handleProjectSetupComplete = (projectType: string) => {
    localStorage.setItem('aiaa-project-type', projectType);
    setShowProjectSetup(false);
  };

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ProjectSetupDialog 
        open={showProjectSetup}
        onComplete={handleProjectSetupComplete}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/patients" element={<DashboardLayout title="Patient Registration" subtitle="Register and manage cardiac patient information"><PatientOnboarding /></DashboardLayout>} />
          <Route path="/vitals" element={<DashboardLayout title="Vital Data Collection" subtitle="Cardiac vital signs monitoring"><VitalDataCollection /></DashboardLayout>} />
          <Route path="/appointments" element={<DashboardLayout title="Appointment Booking" subtitle="Schedule cardiac consultations"><AppointmentBooking /></DashboardLayout>} />
          <Route path="/analysis" element={<DashboardLayout title="Doctor Analysis" subtitle="Cardiac assessment and diagnosis"><DoctorAnalysis /></DashboardLayout>} />
          <Route path="/prescriptions" element={<DashboardLayout title="Prescriptions" subtitle="Medication management"><Prescriptions /></DashboardLayout>} />
          <Route path="/consent" element={<DashboardLayout title="Surgery Consent" subtitle="Cardiac surgery consent forms"><ConsentManagement /></DashboardLayout>} />
          <Route path="/surgery" element={<DashboardLayout title="Surgery Tracking" subtitle="Live cardiac surgery monitoring"><SurgeryTracking /></DashboardLayout>} />
          <Route path="/records" element={<DashboardLayout title="Patient Records" subtitle="Complete patient history and data export"><RecordsManagement /></DashboardLayout>} />
          <Route path="/notifications" element={<DashboardLayout title="Notifications" subtitle="Doctor alerts and reminders"><Notifications /></DashboardLayout>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
