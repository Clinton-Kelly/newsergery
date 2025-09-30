import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  Stethoscope, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocalPatients, useLocalAnalysis, useLocalVitalData } from "@/hooks/useLocalStorage";

export default function DoctorAnalysis() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [analysisData, setAnalysisData] = useState({
    diagnosis: "",
    recommended_surgery: "",
    surgery_urgency: "",
    clinical_notes: ""
  });
  const { toast } = useToast();
  const { patients } = useLocalPatients();
  const { analyses, addAnalysis, getAnalysesByPatient } = useLocalAnalysis();
  const { getVitalDataByPatient } = useLocalVitalData();

  const getPatientsWithoutAnalysis = () => {
    return patients.filter(patient => {
      const patientAnalyses = getAnalysesByPatient(patient.id);
      return patientAnalyses.length === 0;
    });
  };

  const getPatientAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleAnalysisSubmit = async (patientId: string) => {
    if (!analysisData.diagnosis) {
      toast({
        title: "Error",
        description: "Please enter a diagnosis",
        variant: "destructive",
      });
      return;
    }

    try {
      await addAnalysis({
        patient_id: patientId,
        doctor_id: 'Dr. Admin',
        diagnosis: analysisData.diagnosis,
        recommended_surgery: analysisData.recommended_surgery,
        surgery_urgency: analysisData.surgery_urgency,
        clinical_notes: analysisData.clinical_notes,
        status: 'completed'
      });

      // If surgery is recommended, add to surgery scheduling
      if (analysisData.recommended_surgery && analysisData.surgery_urgency) {
        const surgeryData = {
          id: Date.now().toString(),
          patient_id: patientId,
          procedure_name: analysisData.recommended_surgery,
          urgency: analysisData.surgery_urgency,
          recommended_by: 'Dr. Admin',
          status: 'scheduled',
          created_at: new Date().toISOString()
        };
        
        const existingSurgeries = JSON.parse(localStorage.getItem('cardiovascular-surgeries') || '[]');
        localStorage.setItem('cardiovascular-surgeries', JSON.stringify([surgeryData, ...existingSurgeries]));
      }

      toast({
        title: "Analysis completed",
        description: "Medical assessment has been saved successfully.",
      });

      // Reset form
      setAnalysisData({
        diagnosis: "",
        recommended_surgery: "",
        surgery_urgency: "",
        clinical_notes: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save analysis",
        variant: "destructive",
      });
    }
  };

  const handleScheduleSurgery = (patientId: string) => {
    toast({
      title: "Surgery scheduled",
      description: `Surgery has been scheduled for patient ${patientId}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Doctor Analysis & Scheduling</h1>
        <p className="text-muted-foreground">
          Medical assessment, diagnosis, and surgery scheduling
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pending Analysis ({getPatientsWithoutAnalysis().length})
          </TabsTrigger>
          <TabsTrigger value="schedule">Surgery Scheduling</TabsTrigger>
          <TabsTrigger value="completed">Completed Assessments</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <div className="grid gap-6">
            {getPatientsWithoutAnalysis().map((patient) => {
              const vitalData = getVitalDataByPatient(patient.id);
              const latestVitals = vitalData[vitalData.length - 1];
              
              return (
                <Card key={patient.id} className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-medical rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{patient.first_name} {patient.last_name}</CardTitle>
                          <CardDescription>
                            Age: {getPatientAge(patient.date_of_birth)} • Patient ID: {patient.patient_id}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        Pending Analysis
                      </Badge>
                    </div>
                  </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Patient Information */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Stethoscope className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold">Medical Information</h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">
                            Medical History
                          </Label>
                          <p className="text-foreground">{patient.medical_history || 'None recorded'}</p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">
                            Allergies
                          </Label>
                          <p className="text-foreground">{patient.allergies || 'None recorded'}</p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">
                            Latest Vital Signs
                          </Label>
                          <p className="text-foreground">
                            {latestVitals ? 
                              `BP: ${latestVitals.blood_pressure_systolic}/${latestVitals.blood_pressure_diastolic}, HR: ${latestVitals.heart_rate}, Temp: ${latestVitals.temperature}°F` :
                              'No vital signs recorded'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Analysis Form */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold">Medical Analysis</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`diagnosis-${patient.id}`}>Diagnosis *</Label>
                          <Input 
                            id={`diagnosis-${patient.id}`}
                            placeholder="Enter primary diagnosis"
                            value={analysisData.diagnosis}
                            onChange={(e) => setAnalysisData(prev => ({
                              ...prev,
                              diagnosis: e.target.value
                            }))}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`surgery-type-${patient.id}`}>Recommended Surgery</Label>
                          <Select value={analysisData.recommended_surgery} onValueChange={(value) => setAnalysisData(prev => ({
                            ...prev,
                            recommended_surgery: value
                          }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select surgery type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cardiac-bypass">Cardiac Bypass</SelectItem>
                              <SelectItem value="valve-replacement">Valve Replacement</SelectItem>
                              <SelectItem value="angioplasty">Angioplasty</SelectItem>
                              <SelectItem value="pacemaker">Pacemaker Installation</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`urgency-${patient.id}`}>Surgery Urgency</Label>
                          <Select value={analysisData.surgery_urgency} onValueChange={(value) => setAnalysisData(prev => ({
                            ...prev,
                            surgery_urgency: value
                          }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select urgency level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="emergency">Emergency (0-6 hours)</SelectItem>
                              <SelectItem value="urgent">Urgent (24-48 hours)</SelectItem>
                              <SelectItem value="routine">Routine (1-2 weeks)</SelectItem>
                              <SelectItem value="elective">Elective (1+ months)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`notes-${patient.id}`}>Clinical Notes</Label>
                          <Textarea 
                            id={`notes-${patient.id}`}
                            placeholder="Additional observations, recommendations..."
                            className="h-20"
                            value={analysisData.clinical_notes}
                            onChange={(e) => setAnalysisData(prev => ({
                              ...prev,
                              clinical_notes: e.target.value
                            }))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      className="bg-gradient-medical text-white"
                      onClick={() => handleAnalysisSubmit(patient.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Analysis
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleScheduleSurgery(patient.id)}
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Schedule Surgery
                    </Button>
                    <Button variant="ghost">
                      <Eye className="w-4 h-4 mr-2" />
                      View History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )})}
            {getPatientsWithoutAnalysis().length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No patients pending analysis
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                Surgery Scheduling
              </CardTitle>
              <CardDescription>
                Schedule surgical procedures for analyzed patients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Patient</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient for surgery" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="P001">John Doe - Appendectomy</SelectItem>
                        <SelectItem value="P002">Jane Smith - Cholecystectomy</SelectItem>
                        <SelectItem value="P003">Mike Wilson - Hernia Repair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Surgeon</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign surgeon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                        <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                        <SelectItem value="dr-brown">Dr. Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Operating Room</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select OR" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="or1">OR 1 - General Surgery</SelectItem>
                        <SelectItem value="or2">OR 2 - Minimally Invasive</SelectItem>
                        <SelectItem value="or3">OR 3 - Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Surgery Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="08:00">08:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="14:00">02:00 PM</SelectItem>
                        <SelectItem value="16:00">04:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Estimated Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="180">3 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Special Instructions</Label>
                <Textarea 
                  placeholder="Any special requirements or instructions for the surgery..."
                  className="h-20"
                />
              </div>

              <div className="flex gap-3">
                <Button className="bg-gradient-medical text-white">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule Surgery
                </Button>
                <Button variant="outline">
                  Check Availability
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Completed Assessments
              </CardTitle>
              <CardDescription>
                Recently completed medical analyses and scheduled surgeries
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analyses.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No completed assessments to display
                </div>
              ) : (
                analyses.map((analysis) => {
                  const patient = patients.find(p => p.id === analysis.patient_id);
                  return (
                    <div key={analysis.id} className="p-4 bg-background rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-foreground">
                            {patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown Patient'}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Analysis by: {analysis.doctor_id} • {new Date(analysis.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="default">Completed</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-medium">Diagnosis:</span> {analysis.diagnosis}</div>
                        {analysis.recommended_surgery && (
                          <div><span className="font-medium">Recommended Surgery:</span> {analysis.recommended_surgery}</div>
                        )}
                        {analysis.surgery_urgency && (
                          <div><span className="font-medium">Urgency:</span> {analysis.surgery_urgency}</div>
                        )}
                        {analysis.clinical_notes && (
                          <div><span className="font-medium">Notes:</span> {analysis.clinical_notes}</div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}