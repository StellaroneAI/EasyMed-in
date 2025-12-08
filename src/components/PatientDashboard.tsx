import { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import AIHealthAssistant from "./ai/AIHealthAssistant";
import VitalDashboard from "./VitalDashboard";
import SymptomChecker from "./SymptomChecker";
import HealthAnalytics from "./HealthAnalytics";
import MedicationManager from "./MedicationManager";
// import ConsultationBooking from "./ConsultationBooking";
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
    <div className="space-y-4 pb-24">
      {/* Greeting / hero */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 shadow-md text-white">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-[11px] text-blue-100 mb-1">
              {getText("welcomeBack", "Welcome back")}
            </p>
            <h1 className="text-lg font-semibold leading-snug">
              {userInfo?.name || getText("patientDefaultName", "EasyMed User")} 👋
            </h1>
            <p className="mt-1 text-[12px] text-blue-100">
              {getText(
                "healthPriority",
                "Your health is always our priority."
              )}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="flex items-center text-[11px] px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 mr-1.5" />
                {getText("systemOnline", "System online")}
              </span>
              <span className="flex items-center text-[11px] px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
                🏥 {getText("healthcareReady", "Care team ready")}
              </span>
            </div>
          </div>
          <div className="shrink-0 w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center text-2xl">
            💙
          </div>
        </div>
      </section>

      {/* Next appointment */}
      <section className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-base">📅</span>
            {getText("nextAppointment", "Next appointment")}
          </h2>
          <button
            className="text-[11px] text-blue-600"
            onClick={() => setActiveTab("vitals")}
          >
            {getText("viewDetails", "View details")}
          </button>
        </div>

        {appointments.length ? (
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-lg">
              🩺
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-gray-900 truncate">
                {appointments[0].doctor}
              </p>
              <p className="text-[11px] text-gray-500">
                {appointments[0].specialty} • {appointments[0].type}
              </p>
              <p className="text-[11px] text-blue-600 mt-0.5">
                {appointments[0].date} • {appointments[0].time}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-[11px] text-gray-500">
            {getText("noUpcomingAppointments", "No upcoming appointments")}
          </p>
        )}

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <button
            onClick={() => setActiveTab("ai")}
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 text-[11px] rounded-xl bg-purple-50 text-purple-700"
          >
            🤖 {getText("askAI", "Ask AI")}
          </button>
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-center justify-center gap-1.5 px-2.5 py-2 text-[11px] rounded-xl bg-blue-50 text-blue-700"
          >
            🎥 {getText("videoConsultation", "Video consult")}
          </button>
        </div>
      </section>

      {/* Quick actions – horizontal scroll */}
      <section>
        <div className="flex items-center justify-between mb-1.5">
          <h2 className="text-sm font-semibold text-gray-900">
            {getText("quickActions", "Quick actions")}
          </h2>
        </div>
        <div className="-mx-3 px-3 flex gap-3 overflow-x-auto pb-1 hide-scrollbar snap-x">
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
                "See latest readings & trends"
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
              className="snap-start min-w-[170px] bg-white rounded-2xl px-3 py-3 shadow-sm border border-gray-100 flex flex-col items-start"
            >
              <span className="text-2xl mb-1.5">{item.icon}</span>
              <p className="text-xs font-semibold text-gray-900 truncate">
                {item.title}
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2 text-left">
                {item.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Health records summary */}
      <section className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-base">📋</span>
            {getText("healthRecords", "Health records")}
          </h2>
        </div>

        <div className="space-y-2.5">
          {healthRecords.slice(0, 2).map((record) => (
            <div
              key={record.id}
              className="flex items-start justify-between bg-gray-50 rounded-xl px-3 py-2"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-gray-900 truncate">
                  {record.type}
                </p>
                <p className="text-[11px] text-gray-500 truncate">
                  {record.doctor} • {record.date}
                </p>
                <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-2">
                  {record.findings}
                </p>
              </div>
              <button className="ml-2 text-[11px] text-blue-600 whitespace-nowrap">
                {getText("download", "Download")}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Government schemes */}
      <section className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 mb-2.5 flex items-center gap-2">
          <span className="text-base">🏛️</span>
          {getText(
            "governmentSchemes",
            "Government health schemes for you"
          )}
        </h2>
        <div className="space-y-2">
          {governmentSchemes.map((scheme) => (
            <div
              key={scheme.name}
              className="flex items-start justify-between bg-gray-50 rounded-xl px-3 py-2"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-gray-900 truncate">
                  {scheme.name}
                </p>
                <p className="text-[11px] text-gray-600 line-clamp-2">
                  {scheme.description}
                </p>
              </div>
              <span className="ml-2 text-[11px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 whitespace-nowrap">
                {scheme.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderVitals = () => (
    <div className="pb-24 space-y-3">
      <section className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-base">💓</span>
          {getText("vitalSigns", "Vital Signs")}
        </h2>
        <VitalDashboard />
      </section>
      <section className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
        <HealthAnalytics />
      </section>
    </div>
  );

  const renderAI = () => (
    <div className="pb-24 space-y-3">
      <section className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-base">🤖</span>
          {getText("aiHealthInsights", "AI Health Assistant")}
        </h2>
        <p className="text-[11px] text-gray-600 mb-3">
          {getText(
            "aiAssistantWelcome",
            "Ask in your language about symptoms, medicines or reports."
          )}
        </p>
        <button
          onClick={() => setIsAIAssistantOpen(true)}
          className="w-full flex items-center justify-center gap-2 text-sm font-medium rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5"
        >
          🤖 {getText("openAIChat", "Open AI chat")}
        </button>
      </section>
      <section className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
        <SymptomChecker />
      </section>
    </div>
  );

  const renderMeds = () => (
    <div className="pb-24 space-y-3">
      <section className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
        <MedicationManager />
      </section>
    </div>
  );

  const renderRecords = () => (
    <div className="pb-24 space-y-3">
      <section className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-2.5">
          <h2 className="text-sm font-semibold text-gray-900">
            {getText("healthRecords", "Health records")}
          </h2>
          <button className="text-[11px] text-blue-600">
            {getText("uploadDocument", "Upload")}
          </button>
        </div>
        <div className="space-y-2.5">
          {healthRecords.map((record) => (
            <div
              key={record.id}
              className="bg-gray-50 rounded-xl px-3 py-2 border border-gray-100"
            >
              <p className="text-[12px] font-semibold text-gray-900">
                {record.type}
              </p>
              <p className="text-[11px] text-gray-500">
                {record.doctor} • {record.date}
              </p>
              <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-2">
                {record.findings}
              </p>
              <div className="flex justify-between items-center mt-1.5">
                <p className="text-[11px] text-gray-600 pr-2">
                  <span className="font-medium">
                    {getText("prescription", "Prescription")}:
                  </span>{" "}
                  {record.prescription}
                </p>
                <button className="text-[11px] text-blue-600 ml-2 whitespace-nowrap">
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
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-md mx-auto px-3 py-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-xl text-white shadow-sm">
              🏥
            </div>
            <div className="leading-tight">
              <p className="text-[11px] text-gray-500">EasyMed</p>
              <p className="text-sm font-semibold text-gray-900">
                {getText("patientPortal", "Patient Portal")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            <button
              onClick={onLogout}
              className="text-[11px] px-2.5 py-1.5 rounded-lg bg-red-500 text-white font-medium"
            >
              {getText("logout", "Logout")}
            </button>
          </div>
        </div>
      </header>

      {/* Main scrollable content */}
      <main className="flex-1 max-w-md mx-auto w-full px-3 pt-3 pb-20">
        {renderContent()}
      </main>

      {/* Bottom nav – mobile app style */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 z-40">
        <div className="max-w-md mx-auto flex justify-between px-2 py-1.5">
          {[
            { id: "home", label: getText("home", "Home"), icon: "🏠" },
            { id: "ai", label: getText("aiShort", "AI"), icon: "🤖" },
            {
              id: "vitals",
              label: getText("vitalsShort", "Vitals"),
              icon: "💓",
            },
            { id: "meds", label: getText("medsShort", "Meds"), icon: "💊" },
            {
              id: "records",
              label: getText("recordsShort", "Records"),
              icon: "📋",
            },
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

      {/* Spacer so content doesn’t hide behind nav */}
      <div className="h-16" />

      {/* AI Assistant floating sheet */}
      {isAIAssistantOpen && (
        <AIHealthAssistant
          isMinimized={false}
          onToggleMinimize={() => setIsAIAssistantOpen(false)}
        />
      )}
    </div>
  );
}
