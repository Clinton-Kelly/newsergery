import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Calendar,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Heart,
  Stethoscope,
  FileText
} from "lucide-react";

export default function Dashboard() {
  const [patients, setPatients] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [vitals, setVitals] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedPatients = localStorage.getItem('cardiovascular-patients');
    const storedAppointments = localStorage.getItem('cardiovascular-appointments');
    const storedVitals = localStorage.getItem('cardiovascular-vitals');
    const storedPrescriptions = localStorage.getItem('cardiovascular-prescriptions');
    const storedNotifications = localStorage.getItem('cardiovascular-notifications');

    if (storedPatients) setPatients(JSON.parse(storedPatients));
    if (storedAppointments) setAppointments(JSON.parse(storedAppointments));
    if (storedVitals) setVitals(JSON.parse(storedVitals));
    if (storedPrescriptions) setPrescriptions(JSON.parse(storedPrescriptions));
    if (storedNotifications) setNotifications(JSON.parse(storedNotifications));
    
    setLoading(false);
  };

  const activeAppointments = appointments.filter(a => a.status === 'scheduled' || a.status === 'confirmed');
  const criticalVitals = vitals.filter(v => v.riskLevel === 'critical' || v.riskLevel === 'high');
  const activePrescriptions = prescriptions.filter(p => p.status === 'active');
  const unreadNotifications = notifications.filter(n => !n.read);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  const stats = [
    {
      title: "Total Patients",
      value: patients.length.toString(),
      change: "+12%",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Active Appointments",
      value: activeAppointments.length.toString(),
      change: "+8%",
      icon: Calendar,
      color: "text-success"
    },
    {
      title: "Critical Cases",
      value: criticalVitals.length.toString(),
      change: "-15%",
      icon: AlertTriangle,
      color: "text-warning"
    },
    {
      title: "Active Prescriptions",
      value: activePrescriptions.length.toString(),
      change: "+3%",
      icon: FileText,
      color: "text-success"
    }
  ];

  const upcomingAppointments = appointments
    .filter(a => a.status === 'scheduled' || a.status === 'confirmed')
    .slice(0, 3)
    .map(a => ({
      patient: a.patientName,
      type: a.type,
      time: a.time,
      date: a.date,
      doctor: a.doctorName,
      status: a.status,
      priority: a.priority
    }));

  const recentActivity = [
    ...vitals.slice(0, 2).map(v => ({
      action: 'Vital signs recorded',
      patient: v.patientName,
      time: new Date(v.timestamp).toLocaleString(),
      status: v.riskLevel === 'critical' ? 'error' : v.riskLevel === 'high' ? 'warning' : 'success'
    })),
    ...appointments.slice(0, 2).map(a => ({
      action: 'Appointment scheduled',
      patient: a.patientName,
      time: new Date(a.createdAt).toLocaleString(),
      status: 'info'
    }))
  ].slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">Cardiovascular Patient Management</h1>
          <p className="text-muted-foreground">
            Welcome back, Dr. Johnson. Here's what's happening in your cardiovascular department today.
          </p>
        </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                  {stat.change}
                </span>
                {" "}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Surgeries */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription>
              Today's cardiac appointments and consultations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg border">
                <div className="space-y-1">
                  <div className="font-medium text-foreground">{appointment.patient}</div>
                  <div className="text-sm text-muted-foreground">{appointment.type}</div>
                  <div className="text-xs text-muted-foreground">
                    {appointment.date} at {appointment.time} • Dr. {appointment.doctor}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge 
                    variant={appointment.status === 'confirmed' ? 'default' : 
                            appointment.status === 'scheduled' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {appointment.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates and system activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-background rounded-lg border">
              <div className={`w-2 h-2 rounded-full ${
                activity.status === 'success' ? 'bg-green-500' :
                activity.status === 'warning' ? 'bg-yellow-500' : 
                activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
              }`} />
                <div className="flex-1 space-y-1">
                  <div className="text-sm font-medium text-foreground">{activity.action}</div>
                  <div className="text-xs text-muted-foreground">Patient: {activity.patient}</div>
                </div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Department Performance
          </CardTitle>
          <CardDescription>
            Key performance indicators for the surgery department
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Surgery Success Rate</span>
                <span className="font-medium text-foreground">98.2%</span>
              </div>
              <Progress value={98.2} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Patient Satisfaction</span>
                <span className="font-medium text-foreground">96.8%</span>
              </div>
              <Progress value={96.8} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">WHO Compliance</span>
                <span className="font-medium text-foreground">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used actions and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Users className="w-6 h-6" />
              <span className="text-sm">Add Patient</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Schedule Surgery</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <FileText className="w-6 h-6" />
              <span className="text-sm">Generate Report</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Stethoscope className="w-6 h-6" />
              <span className="text-sm">Emergency Protocol</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}