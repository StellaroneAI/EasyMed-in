import { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../contexts/LanguageContext";

type LoginMode = "phone" | "email";

export default function ModernLoginPage() {
  const { t } = useLanguage();

  const getText = (key: string): string => t(key);

  const [mode, setMode] = useState<LoginMode>("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      // TODO: hook your real OTP API here
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // TODO: real verification + redirect
      alert(getText("loginSuccess"));
    }, 800);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(getText("loginSuccess"));
    }, 800);
  };

  const renderPhoneForm = () => (
    <form
      onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
      className="space-y-5"
    >
      {/* Phone input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {getText("phoneNumber")}
        </label>
        <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <span className="mr-2 text-xl">🇮🇳</span>
          <span className="mr-2 text-gray-500 text-sm">+91</span>
          <input
            type="tel"
            className="flex-1 border-0 focus:ring-0 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
            placeholder="9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      {/* OTP input (after sent) */}
      {otpSent && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {getText("enterOtp")}
          </label>
          <input
            type="tel"
            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm sm:text-base"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            {getText("sendOtp")} • SMS / WhatsApp
          </p>
        </div>
      )}

      {/* Primary button */}
      <button
        type="submit"
        disabled={isLoading || (!phone && !otpSent)}
        className="w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-base"
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
        )}
        {otpSent ? getText("verifyOtp") : getText("sendOtp")}
      </button>
    </form>
  );

  const renderEmailForm = () => (
    <form onSubmit={handleEmailLogin} className="space-y-5">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {getText("email")}
        </label>
        <input
          type="email"
          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm sm:text-base"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {getText("password")}
        </label>
        <input
          type="password"
          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm sm:text-base"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !email || !password}
        className="w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-base"
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
        )}
        {getText("login")}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Top bar */}
      <header className="w-full px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
            <span className="text-2xl">💜</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold tracking-wide text-blue-500 uppercase">
              EasyMed
            </p>
            <p className="text-sm text-gray-600">
              {getText("healthCompanion")}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <LanguageSelector />
        </div>
      </header>

      {/* Main layout */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Hero / Branding */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 xl:p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-blue-400/30 blur-3xl" />

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100 mb-3">
                EasyMed • TeleHealth
              </p>
              <h1 className="text-3xl xl:text-4xl font-bold leading-snug mb-4">
                AI for a Healthier Tomorrow
              </h1>
              <p className="text-blue-100 text-sm xl:text-base mb-6 max-w-md">
                Smart symptom analysis, medication guidance and 24/7 support
                for you and your family — all in your language.
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/20">
                  <p className="text-xs text-blue-100 mb-1">24/7</p>
                  <p className="font-semibold">AI Health Assistant</p>
                  <p className="text-xs text-blue-100 mt-2">
                    Ask questions anytime and get instant guidance.
                  </p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/20">
                  <p className="text-xs text-blue-100 mb-1">7+ Languages</p>
                  <p className="font-semibold">India-first Experience</p>
                  <p className="text-xs text-blue-100 mt-2">
                    Hindi, Tamil, Telugu, Kannada, Marathi and more.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center space-x-3 text-xs text-blue-100">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Secure • Encrypted • Patient-first design</span>
              </div>
            </div>
          </div>

          {/* Right: Login card */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 px-5 py-6 sm:px-8 sm:py-8">
                {/* Title */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    {getText("welcome")}
                  </h2>
                  <p className="text-sm text-gray-500">
                    AI for a healthier tomorrow.
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex rounded-xl bg-gray-100 p-1 mb-6 text-sm sm:text-base">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("phone");
                      setOtpSent(false);
                    }}
                    className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
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
                    }}
                    className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                      mode === "email"
                        ? "bg-white shadow-sm text-gray-900"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {getText("emailLogin")}
                  </button>
                </div>

                {/* Forms */}
                <div className="mb-6">
                  {mode === "phone" ? renderPhoneForm() : renderEmailForm()}
                </div>

                {/* Divider */}
                <div className="flex items-center mb-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="px-3 text-xs uppercase tracking-wide text-gray-400">
                    {getText("continueWith")}
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Social buttons - just UI for now */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <button className="flex items-center justify-center rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                    🌐
                  </button>
                  <button className="flex items-center justify-center rounded-xl border border-blue-500 bg-blue-500/90 py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition-all shadow-sm">
                    f
                  </button>
                  <button className="flex items-center justify-center rounded-xl border border-gray-900 bg-black py-2.5 text-sm font-medium text-white hover:bg-gray-900/90 transition-all shadow-sm">
                    
                  </button>
                </div>

                {/* Footer text */}
                <p className="text-xs text-center text-gray-500 mb-2">
                  {getText("dontHaveAccount")}{" "}
                  <a
                    href="#"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    {getText("signUp")}
                  </a>
                </p>
                <p className="text-[11px] text-center text-gray-400 leading-relaxed">
                  {getText("terms")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
