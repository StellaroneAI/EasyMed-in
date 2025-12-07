import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function SidebarMenu({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
}: SidebarMenuProps) {
  const { t } = useLanguage();
  const getText = (key: string) => t(key);

  const menuItems = [
    {
      id: "dashboard",
      label: getText("sidebarDashboard"),
      icon: "📊",
    },
    {
      id: "vitals",
      label: getText("sidebarVitals"),
      icon: "💗",
    },
    {
      id: "ai-symptom",
      label: getText("sidebarAISymptom"),
      icon: "🧠",
    },
    {
      id: "health-analytics",
      label: getText("sidebarHealthAnalytics"),
      icon: "📈",
    },
    {
      id: "medications",
      label: getText("sidebarMedications"),
      icon: "💊",
    },
    {
      id: "book-consultation",
      label: getText("sidebarBookConsultation"),
      icon: "📅",
    },
    {
      id: "health-records",
      label: getText("sidebarHealthRecords"),
      icon: "📂",
    },
    {
      id: "video-call",
      label: getText("sidebarVideoCall"),
      icon: "🎥",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* drawer */}
      <div className="relative z-50 w-72 max-w-full bg-white shadow-2xl h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-400 tracking-wide uppercase">
              Menu
            </p>
            <p className="text-sm font-semibold text-gray-900">
              EasyMed User
            </p>
            <p className="text-xs text-gray-500">Healthcare Portal</p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex-1 overflow-y-auto py-2">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`mx-2 mb-1 flex items-center rounded-xl px-3 py-2 text-sm transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="font-medium truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
