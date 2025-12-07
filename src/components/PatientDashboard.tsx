import { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import AIAssistantCard from "./ai/AIAssistantCard";
import AIHealthAssistant from "./ai/AIHealthAssistant";
import FloatingMenu from "./FloatingMenu";
import VitalDashboard from "./VitalDashboard";
import ConsultationBooking from "./ConsultationBooking";
import SymptomChecker from "./SymptomChecker";
import HealthAnalytics from "./HealthAnalytics";
import MedicationManager from "./MedicationManager";
import EmergencySystem from "./EmergencySystem";
import { useLanguage } from "../contexts/LanguageContext";

interface PatientDashboardProps {
  userInfo: any;
  onLogout: () => void;
}

export default function PatientDashboard({
  userInfo,
  onLogout,
}: PatientDashboardProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  // helper with fallback so missing translations don't show raw keys
  const getText = (key: string, fallback?: string): string => {
    const value = t(key);
    if (value && value !== key) return value;
    return fallback || key;
  };

  const appointments = [
    {
      id: 1,
      doctor: "Dr. Rajesh Kumar",
      specialty: "General Medicine",
      date: "2025-01-30",
      time: "10:00 AM",
      status: "Confirmed",
      type: "Video Consultation",
    },
    {
      id: 2,
      doctor: "Dr. Priya Sharma",
      specialty: "Gynecology",
      date: "2025-02-05",
      time: "2:30 PM",
      status: "Pending",
      type: "In-person",
    },
  ];

  const healthRecords = [
    {
      id: 1,
      date: "2025-01-20",
      type: "Blood Test",
      doctor: "Dr. Rajesh Kumar",
      findings: "Normal blood parameters",
      prescription: "Vitamin D supplements",
    },
    {
      id: 2,
      date: "2025-01-15",
      type: "General Checkup",
      doctor: "Dr. Priya Sharma",
      findings: "Blood pressure slightly elevated",
      prescription: "Low sodium diet, regular exercise",
    },
  ];

  const governmentSchemes = [
    {
      name: "Ayushman Bharat",
      description: "Health insurance coverage up to ₹5 lakh",
      eligibility: "BPL families",
      status: "Eligible",
      coverage: "₹5,00,000",
    },
    {
      name: "Muthulakshmi Reddy Maternity Assistance",
      description: "Financial assistance for pregnant women in Tamil Nadu",
      eligibility: "Pregnant women in Tamil Nadu",
      status: userInfo?.state === "Tamil Nadu" ? "Eligible" : "Not Eligible",
      coverage: "₹18,000",
    },
    {
      name: "Janani Suraksha Yojana",
      description: "Safe motherhood intervention scheme",
      eligibility: "Pregnant women below poverty line",
      status: "Eligible",
      coverage: "₹1,400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header with Gradient */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🏥</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">EasyMedPro</h1>
                  <p className="text-blue-100 text-sm">
                    {getText("healthcareCompanion", "Your Healthcare Companion")}
                  </p>
                </div>
              </div>
              <span className="ml-4 px-4 py-2 bg-blue-500/30 backdrop-blur-sm text-blue-100 rounded-full text-sm font-medium border border-blue-300/30">
                {getText("patientPortal", "Patient Portal")}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Language Selector */}
              <LanguageSelector />

              <div className="flex items-center space-x-3 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">
                    {userInfo?.name?.charAt(0) || "P"}
                  </span>
                </div>
                <span className="hidden sm:block">
                  {getText("welcome", "Welcome")},{" "}
                  {userInfo?.name || getText("patientDefaultName", "Patient User")}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-red-400/30"
              >
                {getText("logout", "Logout")}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                {getText("menu", "Menu")}
              </h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl text-white">👤</span>
                </div>
                <h3 className="text-center font-semibold text-gray-800">
                  {userInfo?.name || getText("patientDashboard", "Patient Dashboard")}
                </h3>
                <p className="text-center text-sm text-gray-600">
                  {userInfo?.email || "Healthcare Portal"}
                </p>
              </div>
              <nav className="space-y-2">
                {[
                  {
                    id: "overview",
                    name: getText("dashboard", "Dashboard"),
                    icon: "📊",
                    color: "from-blue-500 to-blue-600",
                  },
                  {
                    id: "vital-dashboard",
                    name: getText("vitalSigns", "Vital Signs"),
                    icon: "💓",
                    color: "from-red-500 to-pink-600",
                  },
                  {
                    id: "symptom-checker",
                    name: getText("aiSymptomChecker", "AI Symptom Checker"),
                    icon: "🤖",
                    color: "from-purple-500 to-indigo-600",
                  },
                  {
                    id: "health-analytics",
                    name: getText("healthAnalytics", "Health Analytics"),
                    icon: "📈",
                    color: "from-green-500 to-emerald-600",
                  },
                  {
                    id: "medication-manager",
                    name: getText("medications", "Medications"),
                    icon: "💊",
                    color: "from-blue-500 to-cyan-600",
                  },
                  {
                    id: "consultation-booking",
                    name: getText("bookConsultation", "Book Consultation"),
                    icon: "🩺",
                    color: "from-teal-500 to-green-600",
                  },
                  {
                    id: "health-records",
                    name: getText("healthRecordsMenu", "Health Records"),
                    icon: "📋",
                    color: "from-purple-500 to-purple-600",
                  },
                  {
                    id: "video-consultation",
                    name: getText("videoCall", "Video Call"),
                    icon: "📹",
                    color: "from-red-500 to-red-600",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-3 group ${
                      activeSection === item.id
                        ? `bg-gradient-to-r ${item.color} text-white shadow-md`
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activeSection === item.id
                          ? "bg-white/20"
                          : `bg-gradient-to-r ${item.color} text-white`
                      }`}
                    >
                      <span className="text-sm">{item.icon}</span>
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Navigation - Hidden on mobile */}
          <div
            className={`hidden lg:block ${
              isNavCollapsed ? "lg:w-20" : "lg:w-64"
            } transition-all duration-300 ease-in-out`}
          >
            <nav className="bg-white rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden sticky top-8">
              {/* Collapse Toggle Button */}
              <button
                onClick={() => setIsNavCollapsed(!isNavCollapsed)}
                className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md flex items-center justify-center"
                title={
                  isNavCollapsed
                    ? getText("expandNavigation", "Expand Navigation")
                    : getText("collapseNavigation", "Collapse Navigation")
                }
              >
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isNavCollapsed ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div
                className={`p-6 ${
                  isNavCollapsed ? "px-3" : ""
                } transition-all duration-300`}
              >
                {!isNavCollapsed && (
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl text-white">👤</span>
                    </div>
                    <h3 className="text-center font-semibold text-gray-800">
                      {userInfo?.name ||
                        getText("patientDashboard", "Patient Dashboard")}
                    </h3>
                    <p className="text-center text-sm text-gray-600">
                      {userInfo?.email || "Healthcare Portal"}
                    </p>
                  </div>
                )}

                {isNavCollapsed && (
                  <div className="mb-6 flex justify-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-xl text-white">👤</span>
                    </div>
                  </div>
                )}

                <ul className="space-y-2">
                  {[
                    {
                      id: "overview",
                      name: getText("dashboard", "Dashboard"),
                      icon: "📊",
                      color: "from-blue-500 to-blue-600",
                    },
                    {
                      id: "vital-dashboard",
                      name: getText("vitalSigns", "Vital Signs"),
                      icon: "💓",
                      color: "from-red-500 to-pink-600",
                    },
                    {
                      id: "symptom-checker",
                      name: getText("aiSymptomChecker", "AI Symptom Checker"),
                      icon: "🤖",
                      color: "from-purple-500 to-indigo-600",
                    },
                    {
                      id: "health-analytics",
                      name: getText("healthAnalytics", "Health Analytics"),
                      icon: "📈",
                      color: "from-green-500 to-emerald-600",
                    },
                    {
                      id: "medication-manager",
                      name: getText("medications", "Medications"),
                      icon: "💊",
                      color: "from-blue-500 to-cyan-600",
                    },
                    {
                      id: "consultation-booking",
                      name: getText("bookConsultation", "Book Consultation"),
                      icon: "🩺",
                      color: "from-teal-500 to-green-600",
                    },
                    {
                      id: "health-records",
                      name: getText("healthRecordsMenu", "Health Records"),
                      icon: "📋",
                      color: "from-purple-500 to-purple-600",
                    },
                    {
                      id: "video-consultation",
                      name: getText("videoCall", "Video Call"),
                      icon: "📹",
                      color: "from-red-500 to-red-600",
                    },
                  ].map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full text-left ${
                          isNavCollapsed
                            ? "px-2 py-3 justify-center"
                            : "px-4 py-3"
                        } rounded-xl transition-colors duration-200 flex items-center ${
                          isNavCollapsed ? "space-x-0 justify-center" : "space-x-3"
                        } ${
                          activeSection === item.id
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        title={isNavCollapsed ? item.name : ""}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            activeSection === item.id
                              ? "bg-blue-100 text-blue-700"
                              : `bg-gradient-to-r ${item.color} text-white`
                          }`}
                        >
                          <span className="text-sm">{item.icon}</span>
                        </div>
                        {!isNavCollapsed && (
                          <span className="font-medium">{item.name}</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          {/* Main Content with Modern Cards */}
          <div className="flex-1">
            {activeSection === "overview" && (
              <div className="space-y-8">
                {/* Welcome Card with Avatar */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">👋</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-2 text-gray-900">
                        {getText("welcomeBack", "Welcome back")},{" "}
                        {userInfo?.name ||
                          getText("patientDefaultName", "Patient User")}
                        !
                      </h2>
                      <p className="text-gray-600 text-lg">
                        {getText(
                          "healthPriority",
                          "Your health is always our priority."
                        )}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-4">
                        <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          <span className="text-sm text-green-700">
                            {getText("systemOnline", "System online")}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                          <span className="text-sm text-blue-700">
                            🏥{" "}
                            {getText(
                              "healthcareReady",
                              "Healthcare support is ready"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Cards - cleaner, no scaling */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-transform duration-200 hover:-translate-y-0.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">
                          {getText(
                            "upcomingAppointments",
                            "Upcoming appointments"
                          )}
                        </p>
                        <p className="text-3xl font-bold text-blue-600 mt-1">
                          2
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          📅 {getText("next", "next")}: Tomorrow 10 AM
                        </p>
                      </div>
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">📅</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-transform duration-200 hover:-translate-y-0.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">
                          {getText("healthRecords", "Health records")}
                        </p>
                        <p className="text-3xl font-bold text-purple-600 mt-1">
                          {healthRecords.length}
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          📋 {getText("allUpdated", "All updated")}
                        </p>
                      </div>
                      <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">📋</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-transform duration-200 hover:-translate-y-0.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">
                          {getText("availableSchemes", "Available schemes")}
                        </p>
                        <p className="text-3xl font-bold text-green-600 mt-1">
                          {
                            governmentSchemes.filter(
                              (s) => s.status === "Eligible"
                            ).length
                          }
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                          🏛️ {getText("readyToApply", "Ready to apply")}
                        </p>
                      </div>
                      <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">🏛️</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="mr-3">⚡</span>
                    {getText("quickActions", "Quick actions")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AIAssistantCard onClick={() => setIsAIAssistantOpen(true)} />
                    {[
                      {
                        icon: "📹",
                        title: getText("videoCall", "Video Call"),
                        desc: getText(
                          "startConsultation",
                          "Start a video consultation with a doctor"
                        ),
                        color: "from-red-500 to-pink-500",
                      },
                      {
                        icon: "📅",
                        title: getText("bookAppointment", "Book appointment"),
                        desc: getText(
                          "scheduleVisit",
                          "Schedule an upcoming visit"
                        ),
                        color: "from-blue-500 to-cyan-500",
                      },
                      {
                        icon: "💊",
                        title: getText("prescriptions", "Prescriptions"),
                        desc: getText(
                          "viewMedicines",
                          "View and manage your medicines"
                        ),
                        color: "from-green-500 to-teal-500",
                      },
                    ].map((action, index) => (
                      <button
                        key={index}
                        className={`p-6 rounded-2xl bg-gradient-to-br ${action.color} text-white hover:shadow-md transition-transform duration-200 hover:-translate-y-0.5 group`}
                      >
                        <div className="text-3xl mb-3">{action.icon}</div>
                        <h4 className="font-bold text-lg">{action.title}</h4>
                        <p className="text-sm opacity-90">{action.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="mr-3">📈</span>
                    {getText("recentActivity", "Recent activity")}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-xl">✅</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {getText(
                            "bloodTestResults",
                            "Blood test results updated"
                          )}
                        </p>
                        <p className="text-green-600 text-sm">
                          {getText(
                            "allParametersNormal",
                            "All parameters normal • 2 days ago"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-xl">📅</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {getText(
                            "appointmentScheduled",
                            "Appointment scheduled with Dr. Rajesh Kumar"
                          )}
                        </p>
                        <p className="text-blue-600 text-sm">
                          {getText(
                            "videoConsultSummary",
                            "Video consultation • 3 days ago"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Government Schemes section (newly surfaced) */}
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="mr-3">🏛️</span>
                    {getText(
                      "governmentSchemes",
                      "Government health schemes you may be eligible for"
                    )}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {governmentSchemes.map((scheme) => (
                      <div
                        key={scheme.name}
                        className="border border-gray-200 rounded-xl p-4 bg-gray-50"
                      >
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {scheme.name}
                        </p>
                        <p className="text-xs text-gray-600 mb-2">
                          {scheme.description}
                        </p>
                        <p className="text-xs text-gray-500 mb-1">
                          <span className="font-medium">
                            {getText("eligibility", "Eligibility")}:
                          </span>{" "}
                          {scheme.eligibility}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                          <span className="font-medium">
                            {getText("coverage", "Coverage")}:
                          </span>{" "}
                          {scheme.coverage}
                        </p>
                        <span
                          className={`inline-flex text-xs px-2 py-1 rounded-full ${
                            scheme.status === "Eligible"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {scheme.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === "video-consultation" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                    <span className="mr-3">📹</span>
                    {getText("videoConsultation", "Video Consultation")}
                  </h2>
                </div>

                <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-md">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                      <span className="text-4xl">📹</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">
                      {getText(
                        "connectWithDoctors",
                        "Connect with healthcare professionals"
                      )}
                    </h3>
                    <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                      {getText(
                        "videoConsultBlurb",
                        "Experience seamless video consultations with doctors, with ASHA worker support for language assistance and cultural context."
                      )}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                      <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-2xl transition-transform duration-200 hover:-translate-y-0.5 shadow-md">
                        <div className="text-2xl mb-2">🎥</div>
                        <div className="font-bold">
                          {getText("joinScheduledCall", "Join scheduled call")}
                        </div>
                        <div className="text-sm opacity-90">
                          {getText(
                            "nextDoctorSlot",
                            "Dr. Rajesh Kumar • 10:00 AM"
                          )}
                        </div>
                      </button>

                      <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl hover:bg-blue-50 transition-transform duration-200 hover:-translate-y-0.5 shadow-md font-bold">
                        <div className="text-2xl mb-2">📅</div>
                        <div>
                          {getText("scheduleNewCall", "Schedule new call")}
                        </div>
                        <div className="text-sm opacity-70">
                          {getText(
                            "bookAvailableDoctors",
                            "Book with available doctors"
                          )}
                        </div>
                      </button>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <div className="text-xl mb-2">🌍</div>
                        <div className="font-semibold">
                          {getText("languagesCount", "12 languages")}
                        </div>
                        <div className="text-xs opacity-80">
                          {getText("multilingualSupport", "Multilingual support")}
                        </div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <div className="text-xl mb-2">🏥</div>
                        <div className="font-semibold">
                          {getText("ashaSupport", "ASHA support")}
                        </div>
                        <div className="text-xs opacity-80">
                          {getText(
                            "localWorkerAssist",
                            "Local health worker assistance"
                          )}
                        </div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <div className="text-xl mb-2">📱</div>
                        <div className="font-semibold">
                          {getText("anyDevice", "Any device")}
                        </div>
                        <div className="text-xs opacity-80">
                          {getText(
                            "deviceSupport",
                            "Phone, tablet, computer"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Features */}
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    {getText(
                      "videoConsultHowItWorks",
                      "How video consultation works"
                    )}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        step: "1",
                        icon: "📅",
                        title: getText("schedule", "Schedule"),
                        desc: getText(
                          "scheduleDesc",
                          "Book appointment with preferred doctor"
                        ),
                      },
                      {
                        step: "2",
                        icon: "📱",
                        title: getText("prepare", "Prepare"),
                        desc: getText(
                          "prepareDesc",
                          "Receive call link and instructions"
                        ),
                      },
                      {
                        step: "3",
                        icon: "🎥",
                        title: getText("connect", "Connect"),
                        desc: getText(
                          "connectDesc",
                          "Join video call at scheduled time"
                        ),
                      },
                      {
                        step: "4",
                        icon: "💊",
                        title: getText("followUp", "Follow-up"),
                        desc: getText(
                          "followUpDesc",
                          "Get prescription and next steps"
                        ),
                      },
                    ].map((item) => (
                      <div key={item.step} className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl text-white">
                            {item.icon}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-800 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === "health-records" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {getText("healthRecords", "Health records")}
                  </h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    {getText("uploadDocument", "Upload document")}
                  </button>
                </div>

                <div className="grid gap-4">
                  {healthRecords.map((record) => (
                    <div
                      key={record.id}
                      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {record.type}
                          </h3>
                          <p className="text-gray-600">
                            {getText("byDoctor", "By")} {record.doctor}
                          </p>
                          <p className="text-gray-500 text-sm">
                            📅 {record.date}
                          </p>
                          <div className="mt-3">
                            <p className="text-gray-700">
                              <span className="font-medium">
                                {getText("findings", "Findings")}:
                              </span>{" "}
                              {record.findings}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-medium">
                                {getText("prescription", "Prescription")}:
                              </span>{" "}
                              {record.prescription}
                            </p>
                          </div>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          {getText("download", "Download")}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New AI-Powered Features */}
            {activeSection === "vital-dashboard" && <VitalDashboard />}

            {activeSection === "symptom-checker" && <SymptomChecker />}

            {activeSection === "health-analytics" && <HealthAnalytics />}

            {activeSection === "medication-manager" && <MedicationManager />}

            {activeSection === "consultation-booking" && (
              <ConsultationBooking />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar – now with more important items */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 lg:hidden z-40">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {[
            {
              id: "overview",
              name: getText("home", "Home"),
              icon: "📊",
              color: "from-blue-500 to-blue-600",
            },
            {
              id: "vital-dashboard",
              name: getText("vitalsShort", "Vitals"),
              icon: "💓",
              color: "from-red-500 to-pink-600",
            },
            {
              id: "symptom-checker",
              name: getText("aiShort", "AI"),
              icon: "🤖",
              color: "from-purple-500 to-indigo-600",
            },
            {
              id: "medication-manager",
              name: getText("medsShort", "Meds"),
              icon: "💊",
              color: "from-green-500 to-emerald-600",
            },
            {
              id: "health-records",
              name: getText("recordsShort", "Records"),
              icon: "📋",
              color: "from-purple-500 to-purple-600",
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors duration-200 ${
                activeSection === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 ${
                  activeSection === item.id
                    ? `bg-gradient-to-r ${item.color} text-white`
                    : "text-2xl"
                }`}
              >
                <span className="text-sm">{item.icon}</span>
              </div>
              <span
                className={`text-xs font-medium truncate ${
                  activeSection === item.id ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Spacer for mobile bottom navigation */}
      <div className="h-20 lg:hidden"></div>

      {/* AI Health Assistant Chatbot */}
      {isAIAssistantOpen && (
        <AIHealthAssistant
          isMinimized={false}
          onToggleMinimize={() => setIsAIAssistantOpen(false)}
        />
      )}

      {/* Floating Action Menu - Hidden on mobile */}
      <div className="hidden lg:block">
        <FloatingMenu onMenuSelect={setActiveSection} activeMenu={activeSection} />
      </div>
    </div>
  );
}
