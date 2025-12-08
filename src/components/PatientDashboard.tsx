import { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import AIHealthAssistant from "./ai/AIHealthAssistant";
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

type TabId = "home" | "ai" | "vitals" | "meds" | "records";

export default function PatientDashboard({
  userInfo,
  onLogout,
}: PatientDashboardProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

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
      date: "Tomorrow",
      time: "10:00 AM",
      type: "Video",
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
      status: "Eligible",
    },
    {
      name: "Janani Suraksha Yojana",
      description: "Safe motherhood intervention scheme",
      status: "Eligible",
    },
  ];

  // ---------- MAIN MOBILE SECTIONS ----------

  const renderHome = () => (
    <div className="space-y-5 pb-24">
      {/* Greeting card */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <p className="text-xs text-gray-500 mb-1">
          {getText("welcomeBack", "Welcome back")}
        </p>
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {userInfo?.name || getText("patientDefaultName", "EasyMed User")} 👋
        </h1>
        <p className="text-sm text-gray-600">
          {getText("healthPriority", "Your health is always our priority.")}
        </p>

        <div className="flex items-center gap-2 mt-4">
          <span className="flex items-center text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />
            {getText("systemOnline", "System online")}
          </span>
          <span className="flex items-center text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            🏥 {getText("healthcareReady", "Healthcare support is ready")}
          </span>
        </div>
      </section>

      {/* Next appointment */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-lg">📅</span>
            {getText("nextAppointment", "Next appointment")}
          </h2>
          <button className="text-xs text-blue-600" onClick={() => setActiveTab("vitals")}>
            {getText("viewDetails", "View details")}
          </button>
        </div>
        {appointments.length ? (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
              🩺
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {appointments[0].doctor}
              </p>
              <p className="text-xs text-gray-500">
                {appointments[0].specialty} • {appointments[0].type}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                {appointments[0].date} • {appointments[0].time}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-500">
            {getText("noUpcomingAppointments", "No upcoming appointments")}
          </p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => setActiveTab("ai")}
            className="flex items-center justify-center gap-2 px-3 py-2 text-xs rounded-xl bg-purple-50 text-purple-700"
          >
            🤖 {getText("askAI", "Ask AI about symptoms")}
          </button>
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-center justify-center gap-2 px-3 py-2 text-xs rounded-xl bg-blue-50 text-blue-700"
          >
            🎥 {getText("videoConsultation", "Video Consultation")}
          </button>
        </div>
      </section>

      {/* Quick actions - horizontal scroll for mobile */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-2">
          {getText("quickActions", "Quick actions")}
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
          {[
            {
              id: "ai",
              icon: "🤖",
              title: getText("aiSymptomChecker", "AI Symptom Checker"),
              desc: getText(
                "startSymptomChecker",
                "Describe symptoms in your language"
              ),
            },
            {
              id: "vitals",
              icon: "💓",
              title: getText("vitalSigns", "Vital Signs"),
              desc: getText(
                "viewVitalSigns",
                "See latest readings and trends"
              ),
            },
            {
              id: "meds",
              icon: "💊",
              title: getText("medications", "Medications"),
              desc: getText("viewMedicines", "Track your medicines"),
            },
            {
              id: "records",
              icon: "📋",
              title: getText("healthRecords", "Health records"),
              desc: getText("viewRecords", "View test reports"),
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabId)}
              className="min-w-[190px] bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 flex flex-col items-start"
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <p className="text-xs font-semibold text-gray-900">
                {item.title}
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Health records summary */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-lg">📋</span>
            {getText("healthRecords", "Health records")}
          </h2>
          <button
            className="text-xs text-blue-600"
            onClick={() => setActiveTab("records")}
          >
            {getText("viewAll", "View all")}
          </button>
        </div>

        <div className="space-y-3">
          {healthRecords.slice(0, 2).map((record) => (
            <div
              key={record.id}
              className="flex items-start justify-between bg-gray-50 rounded-xl px-3 py-2"
            >
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-900">
                  {record.type}
                </p>
                <p className="text-[11px] text-gray-500">
                  {record.doctor} • {record.date}
                </p>
                <p className="text-[11px] text-gray-600 mt-1 line-clamp-2">
                  {record.findings}
                </p>
              </div>
              <button className="ml-2 text-[11px] text-blue-600">
                {getText("download", "Download")}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Government schemes summary */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="text-lg">🏛️</span>
          {getText(
            "governmentSchemes",
            "Government health schemes you may be eligible for"
          )}
        </h2>
        <div className="space-y-2">
          {governmentSchemes.map((scheme) => (
            <div
              key={scheme.name}
              className="flex items-start justify-between bg-gray-50 rounded-xl px-3 py-2"
            >
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-900">
                  {scheme.name}
                </p>
                <p className="text-[11px] text-gray-600 line-clamp-2">
                  {scheme.description}
                </p>
              </div>
              <span className="ml-2 text-[11px] px-2 py-1 rounded-full bg-green-50 text-green-700">
                {scheme.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderVitals = () => (
    <div className="pb-24 space-y-4">
      <VitalDashboard />
      <HealthAnalytics />
    </div>
  );

  const renderAI = () => (
    <div className="pb-24 space-y-4">
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-lg">🤖</span>
          {getText("aiHealthInsights", "AI Health Assistant")}
        </h2>
        <p className="text-xs text-gray-600 mb-3">
          {getText(
            "aiAssistantWelcome",
            "Ask questions in your language about symptoms, medicines or reports."
          )}
        </p>
        <button
          onClick={() => setIsAIAssistantOpen(true)}
          className="w-full flex items-center justify-center gap-2 text-sm font-medium rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5"
        >
          🤖 {getText("openAIChat", "Open AI chat")}
        </button>
      </section>
      <SymptomChecker />
    </div>
  );

  const renderMeds = () => (
    <div className="pb-24 space-y-4">
      <MedicationManager />
    </div>
  );

  const renderRecords = () => (
    <div className="pb-24 space-y-4">
      {/* Simple mobile list view reusing our mock records */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold text-gray-900">
            {getText("healthRecords", "Health records")}
          </h2>
          <button className="text-xs text-blue-600">
            {getText("uploadDocument", "Upload document")}
          </button>
        </div>
        <div className="space-y-3">
          {healthRecords.map((record) => (
            <div
              key={record.id}
              className="bg-gray-50 rounded-xl px-3 py-2 border border-gray-100"
            >
              <p className="text-xs font-semibold text-gray-900">
                {record.type}
              </p>
              <p className="text-[11px] text-gray-500">
                {record.doctor} • {record.date}
              </p>
              <p className="text-[11px] text-gray-600 mt-1 line-clamp-2">
                {record.findings}
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-[11px] text-gray-600">
                  <span className="font-medium">
                    {getText("prescription", "Prescription")}:
                  </span>{" "}
                  {record.prescription}
                </p>
                <button className="text-[11px] text-blue-600 ml-2">
                  {getText("download", "Download")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "ai":
        return renderAI();
      case "vitals":
        return renderVitals();
      case "meds":
        return renderMeds();
      case "records":
        return renderRecords();
      case "home":
      default:
        return renderHome();
    }
  };

  // ---------- UI SHELL (HEADER + BOTTOM TABS) ----------

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile App Header */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-sm">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              🏥
            </div>
            <div>
              <p className="text-[11px] text-blue-100 leading-tight">
                EasyMed
              </p>
              <p className="text-sm font-semibold text-white leading-tight">
                {getText("patientPortal", "Patient Portal")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            <button
              onClick={onLogout}
              className="text-[11px] px-3 py-1.5 rounded-lg bg-red-500/90 text-white"
            >
              {getText("logout", "Logout")}
            </button>
          </div>
        </div>
      </header>

      {/* Main scrollable content */}
      <main className="flex-1 max-w-xl mx-auto w-full px-4 pt-4">
        {renderContent()}
      </main>

      {/* App-like bottom tab bar (mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="max-w-xl mx-auto flex justify-between px-3 py-1.5">
          {[
            { id: "home", label: getText("home", "Home"), icon: "🏠" },
            { id: "ai", label: getText("aiShort", "AI"), icon: "🤖" },
            { id: "vitals", label: getText("vitalsShort", "Vitals"), icon: "💓" },
            { id: "meds", label: getText("medsShort", "Meds"), icon: "💊" },
            { id: "records", label: getText("recordsShort", "Records"), icon: "📋" },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabId)}
                className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl ${
                  active ? "bg-blue-50" : ""
                }`}
              >
                <span
                  className={`text-lg ${
                    active ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {tab.icon}
                </span>
                <span
                  className={`text-[10px] font-medium ${
                    active ? "text-blue-700" : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Spacer for content above tab bar */}
      <div className="h-16" />

      {/* AI Assistant floating sheet (reuse existing component) */}
      {isAIAssistantOpen && (
        <AIHealthAssistant
          isMinimized={false}
          onToggleMinimize={() => setIsAIAssistantOpen(false)}
        />
      )}
            {/* Mobile Bottom Navigation Bar – fixed to viewport */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 lg:hidden z-50">
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
      </nav>
    </div>
  );
}
