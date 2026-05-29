import { Activity, Clock, Zap, Phone } from "lucide-react";
import heroImage from "../../../assets/callifo3.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex flex-col">

      {/* ── BACKGROUND IMAGE WITH OVERLAY ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/50 via-slate-900/45 to-blue-900/50" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* ── DECORATIVE BLOBS ── */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl z-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl z-0 pointer-events-none" />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 flex items-start">
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12">

          {/* Badge */}
          <div className="flex justify-center mb-6 px-4">
            <span className="inline-flex items-center gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[9px] sm:text-sm font-medium backdrop-blur-sm text-center whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
              Empowering Businesses with Strength, Backed by Reliability
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Smarter Call Management
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              for Growing Businesses
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-center text-sm sm:text-base text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
           Automatically track calls, sync leads with Bitrix24 CRM, and monitor team performance with real-time analytics.</p>

          {/* ── STATS CARDS ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full px-0 sm:px-4">
            {[
              { icon: Activity, value: "99.9%", label: "Uptime", color: "green" },
              { icon: Clock, value: "24/7", label: "Support", color: "purple" },
              { icon: Zap, value: "Real-Time", label: "Sync", color: "cyan" },
              { icon: Phone, value: "Smart", label: "Call Tracking", color: "blue" },
            ].map(({ icon: Icon, value, label, color }) => (
              <div
                key={label}
                className="relative group w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 sm:p-6 text-center hover:bg-white/25 transition-all hover:scale-105 hover:shadow-lg h-36 sm:h-44 flex flex-col items-center justify-center"
              >
                <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl mx-auto mb-3 sm:mb-4 flex items-center justify-center
                  ${color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : ''}
                  ${color === 'blue' ? 'bg-blue-500/20 text-blue-400' : ''}
                  ${color === 'green' ? 'bg-green-500/20 text-green-400' : ''}
                  ${color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
                `}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="font-bold text-white mb-1 sm:mb-2 text-xl sm:text-3xl lg:text-4xl flex items-center justify-center whitespace-nowrap">
                  {value}
                </div>
                <div className="text-xs sm:text-sm text-gray-200 font-medium">{label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}