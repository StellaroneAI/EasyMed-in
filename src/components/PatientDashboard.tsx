import React from "react";
import PatientDashboardInner from "./dashboards/PatientDashboard";

interface PatientDashboardProps {
  userInfo: {
    userType: "patient";
    name: string;
    phone?: string;
    email?: string;
    role?: string;
  };
  onLogout: () => void;
}

/**
 * Thin wrapper so App.tsx can keep using `components/PatientDashboard`,
 * but the actual UI is rendered from `components/dashboards/PatientDashboard`.
 */
export default function PatientDashboard({
  userInfo,
  onLogout,
}: PatientDashboardProps) {
  return (
    <PatientDashboardInner
      userInfo={userInfo}
      onLogout={onLogout}
    />
  );
}
