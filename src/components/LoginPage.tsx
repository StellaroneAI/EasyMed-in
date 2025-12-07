// src/components/LoginPage.tsx (or ModernLoginPage.tsx)

import { useState, type FormEvent } from "react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../contexts/LanguageContext";

type LoginMode = "phone" | "email";
type UserRole = "patient" | "doctor" | "admin";

interface ModernLoginPageProps {
  onLogin: (userType: UserRole, userInfo: any) => void;
}

// Simple demo credentials – adjust as you like
const demoCredentials: Record<
  UserRole,
  { email: string; password: string; name: string }[]
> = {
  patient: [
    {
      email: "patient@easymed.ai",
      password: "patient123",
      name: "Patient User",
    },
  ],
  doctor: [
    {
      email: "doctor@easymed.ai",
      password: "doctor123",
      name: "Dr. Meera",
    },
  ],
  admin: [
    {
      email: "admin@easymed.ai",
      password: "admin123",
      name: "Admin User",
    },
  ],
};

export default function ModernLoginPage({ onLogin }: ModernLoginPageProps) {
  const { t, language } = useLanguage();

  const getText = (key: string): string => t(key);

  const [mode, setMode] = useState<LoginMode>("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // ---- PHONE + OTP FLOW ----

  const handleSendOtp = (e: FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setIsLoading(true);
    setMessage(null);

    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      // You can show a static "OTP sent" text here if you add a key in translations
      // setMessage(getText("otpSent"));
    }, 700);
  };

  const handleVerifyOtp = (e: FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setIsLoading(true);
    setMessage(null);

    setTimeout(() => {
      setIsLoading(false);

      // Demo: accept OTP 123456
      if (otp === "123456") {
        setMessage(getText("loginSuccess"));

        const userInfo = {
          name: "EasyMed User",
          phone,
          language,
          loginMethod: "phone",
        };

        // Navigate to patient dashboard
        onLogin("patient", userInfo);
      } else {
        setMessage(getText("invalidOtp"));
      }
    }, 700);
  };

  // ---- EMAIL + PASSWORD FLOW ----

  const handleEmailLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setMessage(null);

    setTimeout(() => {
      setIsLoading(false);

      const roles: UserRole[] = ["admin", "doctor", "patient"];

      for (const role of roles) {
        const match = demoCredentials[role].find(
          (cred) => cred.email === email && cred.password === password,
        );

        if (match) {
          setMessage(getText("loginSuccess"));

          const userInfo = {
            name: match.name,
            email,
            role,
            language,
            loginMethod: "email",
          };

          onLogin(role, userInfo);
          return;
        }
      }

      // If you don’t have "invalidCredentials" in translations yet
      // it will show as [invalidCredentials] until we add it.
      setMessage(getText("invalidCredentials"));
    }, 700);
  };

  // ---- RENDER FORMS ----

  const renderPhoneForm = () => (
    <form
      onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
      className="space-y-4"
    >
      {/* Phone input */}
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-700">
          {getText("phoneNumber")}
        </label>
        <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <span className="mr-2 text-lg">🇮🇳</span>
          <span className="mr-2 text-gray-500 text-xs sm:text-sm">+91</span>
          <input
            type="tel"
            className="flex-1 border-0 focus:ring-0 text-gray-900 placeholder-gray-400 text-sm"
            placeholder="9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      {/* OTP input (after sent) */}
      {otpSent && (
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-700">
            {getText("enterOtp")}
          </label>
          <input
            type="tel"
            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <p className="text-[11px] text-gray-400">
            Demo: use <span className="font-mono">123456</span> as OTP.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || (!phone && !otpSent)}
        className="w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2.5 shadow-md shadow-blue-500/30 hover:shadow-lg hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 text-sm"
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
        )}
        {otpSent ? getText("verifyOtp") : getText("sendOtp")}
      </button>
    </form>
  );

  const renderEmailForm = () => (
    <form onSubmit={handleEmailLogin} className="space-y-4">
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-700">
          {getText("email")}
        </label>
        <input
          type="email"
          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
          placeholder="patient@easymed.ai"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-gray-700">
          {getText("password")}
        </label>
        <input
          type="password"
          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-[11px] text-gray-400">
          Demo logins: <br />
          patient@easymed.ai / patient123 <br />
          doctor@easymed.ai / doctor123 <br />
          admin@easymed.ai / admin123
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !email || !password}
        className="w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2.5 shadow-md shadow-blue-500/30 hover:shadow-lg hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 text-sm"
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
        )}
        {getText("login")}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/80 px-5 py-6 sm:px-7 sm:py-7 space-y-5">
          {/* Top row: logo + language selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                <span className="text-xl">💜</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.18em] text-blue-500 uppercase">
                  EasyMed
                </p>
                <p className="text-[11px] text-gray-500">
                  {getText("healthCompanion")}
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <LanguageSelector />
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {getText("welcome")}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              AI for a healthier tomorrow.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl bg-gray-100 p-1 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => {
                setMode("phone");
                setOtpSent(false);
                setMessage(null);
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                mode === "phone"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {getText("phoneLogin")}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("email");
                setOtpSent(false);
                setMessage(null);
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                mode === "email"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {getText("emailLogin")}
            </button>
          </div>

          {/* Form */}
          <div>{mode === "phone" ? renderPhoneForm() : renderEmailForm()}</div>

          {/* Status message */}
          {message && (
            <p className="text-[11px] text-center text-gray-600">{message}</p>
          )}

          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-3 text-[11px] uppercase tracking-wide text-gray-400">
              {getText("continueWith")}
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-3 gap-3 text-xs sm:text-sm">
            {/* Google */}
            <button className="flex items-center justify-center space-x-1.5 rounded-xl border border-gray-200 bg-white py-2 shadow-sm hover:bg-gray-50 transition-all">
              <span className="h-5 w-5 rounded-full bg-white flex items-center justify-center border border-gray-200 text-[11px] font-bold text-blue-600">
                G
              </span>
              <span className="hidden sm:inline font-medium text-gray-700">
                Google
              </span>
            </button>

            {/* Facebook */}
            <button className="flex items-center justify-center space-x-1.5 rounded-xl bg-[#1877F2] py-2 shadow-sm hover:brightness-110 transition-all">
              <span className="h-5 w-5 rounded-full bg-white flex items-center justify-center text-[12px] font-bold text-[#1877F2]">
                f
              </span>
              <span className="hidden sm:inline font-medium text-white">
                Facebook
              </span>
            </button>

            {/* Apple */}
            <button className="flex items-center justify-center space-x-1.5 rounded-xl bg-black py-2 shadow-sm hover:bg-gray-900 transition-all">
              <span className="h-5 w-5 rounded-full bg-black flex items-center justify-center text-[14px] text-white">
                
              </span>
              <span className="hidden sm:inline font-medium text-white">
                Apple
              </span>
            </button>
          </div>

          {/* Footer text */}
          <div className="space-y-1">
            <p className="text-[11px] text-center text-gray-500">
              {getText("dontHaveAccount")}{" "}
              <a
                href="#"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                {getText("signUp")}
              </a>
            </p>
            <p className="text-[10px] text-center text-gray-400 leading-relaxed">
              {getText("terms")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
