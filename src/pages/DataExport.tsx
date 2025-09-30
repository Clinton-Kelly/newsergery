import { useEffect } from "react";
import { useAuth } from "@/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import ExportData from "@/components/ExportData";

export default function DataExport() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Data Export</h1>
        <p className="text-muted-foreground">
          Export patient data for analysis and record keeping
        </p>
      </div>

      <ExportData />
    </div>
  );
}