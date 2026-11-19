import { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  Cloud,
  CreditCard,
  Layers,
  Radio,
  Receipt,
  Scan,
  Smartphone,
  Sparkles,
  Zap
} from 'lucide-react';
import { Reveal } from './Reveal';

/** Authentic, official Apple App Store mark geometry */
const AppleStoreLogo = () => (
  <svg viewBox="0 0 384 512" fill="currentColor" className="h-7 w-7 shrink-0 text-white" aria-hidden="true">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

/** Authentic, official Google Play 4-color isometric mark geometry */
const GooglePlayStoreLogo = () => (
  <svg viewBox="0 0 512 512" className="h-7 w-7 shrink-0" aria-hidden="true">
    <path fill="#0086F9" d="M47.7 20.3C45.3 22.8 44 26.6 44 31.4v449.2c0 4.8 1.3 8.6 3.7 11.1l3.5 3.3 251.5-251.5v-6l-251.5-251.5-3.5 3.3z" />
    <path fill="#00E676" d="M302.7 277l86.9 46.2-298.8 169.7c-17.8 10.1-33.6 8.9-43.1-1.2L302.7 277z" />
    <path fill="#FFD400" d="M386.9 313.2l-84.2-84.2v-6l84.2-84.2 2.4 1.4 99.8 56.7c28.5 16.2 28.5 42.7 0 58.9l-99.8 56.7-2.4 1.4z" />
    <path fill="#FF334C" d="M302.7 235l-255-214.7c9.5-10.1 25.3-11.3 43.1-1.2l298.8 169.7-86.9 46.2z" />
  </svg>
);

export const MobileAppSection = ({ t }) => {
  const m = t.mobileApp;
  // Interactive view switcher for screenshot transitions
  const [activeTab, setActiveTab] = useState('pos'); // 'pos' or 'dashboard'

  return (
    <section id="mobile-app" className="section relative overflow-hidden" aria-label={m.title}>
      {/* Background ambient radial illumination */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[640px] w-[640px] rounded-full opacity-30 blur-[130px]"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_1.1fr] lg:gap-14">
        {/* Left Column: Value Proposition & Official Store Badges */}
        <Reveal>
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow">{m.eyebrow}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[11px] font-semibold text-[var(--accent)] bg-[var(--accent-soft)]">
                <Sparkles size={12} aria-hidden="true" /> iOS & Android
              </span>
            </div>

            <h2 className="h2 mt-4 text-[var(--fg)]">{m.title}</h2>
            <p className="lede mt-4 max-w-[52ch] text-[var(--muted)]">{m.lead}</p>

            {/* Feature Highlights */}
            <div className="mt-8 space-y-4">
              {/* Feature 1: Real-time Sales Control */}
              <div className="flex items-start gap-3.5">
                <div
                  className="chip-num shrink-0 mt-0.5"
                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                >
                  <BarChart3 size={17} strokeWidth={2.25} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--fg)]">{m.f1_title}</h3>
                  <p className="mt-0.5 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">{m.f1_desc}</p>
                </div>
              </div>

              {/* Feature 2: Camera Barcode Scanner (NO Bluetooth scanner) */}
              <div className="flex items-start gap-3.5">
                <div
                  className="chip-num shrink-0 mt-0.5"
                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                >
                  <Scan size={17} strokeWidth={2.25} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--fg)]">{m.f2_title}</h3>
                  <p className="mt-0.5 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">{m.f2_desc}</p>
                </div>
              </div>

              {/* Feature 3: Always Online Cloud Sync (NO offline) */}
              <div className="flex items-start gap-3.5">
                <div
                  className="chip-num shrink-0 mt-0.5"
                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                >
                  <Cloud size={17} strokeWidth={2.25} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--fg)]">{m.f3_title}</h3>
                  <p className="mt-0.5 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">{m.f3_desc}</p>
                </div>
              </div>
            </div>

            {/* Premier Store Download Badges */}
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              {/* Official Apple App Store Badge */}
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3.5 rounded-2xl bg-[#090b0e] px-5 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] active:translate-y-0 active:scale-[0.98]"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.14), 0 4px 16px rgba(0, 0, 0, 0.25)'
                }}
                aria-label="App Store - iDokon"
              >
                <AppleStoreLogo />
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium tracking-[0.06em] text-white/65 uppercase leading-none">
                    {m.downloadFrom}
                  </span>
                  <span className="text-[17px] font-bold tracking-tight text-white leading-tight mt-1 font-sans">
                    {m.appStore}
                  </span>
                </div>
              </a>

              {/* Official Google Play Store Badge */}
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3.5 rounded-2xl bg-[#090b0e] px-5 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] active:translate-y-0 active:scale-[0.98]"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.14), 0 4px 16px rgba(0, 0, 0, 0.25)'
                }}
                aria-label="Google Play - iDokon"
              >
                <GooglePlayStoreLogo />
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium tracking-[0.06em] text-white/65 uppercase leading-none">
                    {m.downloadFrom}
                  </span>
                  <span className="text-[17px] font-bold tracking-tight text-white leading-tight mt-1 font-sans">
                    {m.googlePlay}
                  </span>
                </div>
              </a>
            </div>

            {/* Compatibility & Live Status Pill */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-[var(--muted)] border border-[var(--line)] bg-[var(--surface-2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-medium">{m.compatible}</span>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Stunning Interactive Device Mockups & Transitions */}
        <Reveal delay={1}>
          <div className="relative mx-auto flex flex-col items-center">
            {/* Interactive Screen Perspective Switcher */}
            <div
              className="mb-5 flex items-center gap-1 rounded-full p-1 border shadow-sm backdrop-blur-md"
              style={{
                borderColor: 'var(--line-strong)',
                background: 'var(--surface-2)'
              }}
              role="tablist"
              aria-label="Mobile app screens"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'pos'}
                onClick={() => setActiveTab('pos')}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  activeTab === 'pos'
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'text-[var(--muted)] hover:text-[var(--fg)]'
                }`}
              >
                <Scan size={13} />
                <span>{m.tabPos}</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'dashboard'}
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  activeTab === 'dashboard'
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'text-[var(--muted)] hover:text-[var(--fg)]'
                }`}
              >
                <BarChart3 size={13} />
                <span>{m.tabDashboard}</span>
              </button>
            </div>

            {/* Mockups Container */}
            <div className="relative flex items-center justify-center py-4 sm:py-8 w-full max-w-[500px]">
              {/* Backlight Glow Behind Mockups */}
              <div
                className="absolute inset-0 rounded-3xl opacity-30 blur-3xl pointer-events-none"
                style={{
                  background: activeTab === 'pos'
                    ? 'radial-gradient(circle at 40% 50%, #10b981 0%, transparent 65%)'
                    : 'radial-gradient(circle at 60% 50%, var(--accent) 0%, transparent 65%)'
                }}
                aria-hidden="true"
              />

              {/* Device 1: Android POS Mobile Kassa & Camera Scanner */}
              <div
                onClick={() => setActiveTab('pos')}
                className={`relative cursor-pointer shrink-0 transition-all duration-500 ease-out ${
                  activeTab === 'pos'
                    ? 'z-20 scale-100 rotate-[-2deg] opacity-100 -mr-10 sm:-mr-12'
                    : 'z-10 scale-95 rotate-[-8deg] opacity-60 -mr-20 hover:opacity-90'
                }`}
                style={{
                  width: '260px',
                  filter: activeTab === 'pos'
                    ? 'drop-shadow(0 25px 45px rgba(0, 0, 0, 0.45))'
                    : 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.25))'
                }}
              >
                <div
                  className="overflow-hidden rounded-[40px] border-[5px] border-[#25282d] bg-[#0c0f12] text-white p-3"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.15)' }}
                >
                  {/* Punch Hole Camera & Speaker */}
                  <div className="mx-auto mb-2 flex items-center justify-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-black border border-white/20" />
                    <div className="h-1 w-6 rounded-full bg-white/10" />
                  </div>

                  {/* App Header */}
                  <div className="flex items-center justify-between px-1 text-[11px] text-white/80">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white tracking-tight">iDokon Kassa</span>
                      <span className="flex items-center gap-1 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400">
                        <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" /> Live
                      </span>
                    </div>
                    <span className="text-[10px] text-white/50">WiFi · 98%</span>
                  </div>

                  {/* Camera Barcode Viewfinder */}
                  <div className="relative mt-2.5 overflow-hidden rounded-2xl bg-gradient-to-b from-gray-900 to-black p-3 border border-white/10">
                    <div className="flex items-center justify-between text-[10px] text-white/60 mb-1.5">
                      <span className="flex items-center gap-1">
                        <Scan size={11} className="text-emerald-400" />
                        {m.uiScanTitle}
                      </span>
                      <span className="text-[9px] text-emerald-400 font-mono">1080p 60fps</span>
                    </div>

                    {/* Camera Aim Box with Animated Laser Line */}
                    <div className="relative mx-auto my-2 h-24 w-full rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/5 flex items-center justify-center overflow-hidden">
                      {/* Aim Target Corners */}
                      <div className="absolute top-1.5 left-1.5 h-3.5 w-3.5 border-t-2 border-l-2 border-emerald-400" />
                      <div className="absolute top-1.5 right-1.5 h-3.5 w-3.5 border-t-2 border-r-2 border-emerald-400" />
                      <div className="absolute bottom-1.5 left-1.5 h-3.5 w-3.5 border-b-2 border-l-2 border-emerald-400" />
                      <div className="absolute bottom-1.5 right-1.5 h-3.5 w-3.5 border-b-2 border-r-2 border-emerald-400" />

                      {/* Animated Laser Scanning Beam */}
                      <div
                        className="absolute h-0.5 w-4/5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-pulse"
                        style={{
                          animationDuration: '1.8s'
                        }}
                      />

                      <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase">
                        Shtrixkodni to‘g‘rilang
                      </span>
                    </div>

                    {/* Scanned Cart Item (Real POS Product) */}
                    <div className="mt-2.5 rounded-xl bg-white/5 p-2 text-[11px] border border-white/5">
                      <div className="flex justify-between font-bold text-white">
                        <span>{m.uiProd1}</span>
                        <span className="text-emerald-400 font-bold">16 000 so‘m</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-white/50 mt-0.5">
                        <span>{m.uiProd1Qty}</span>
                        <span className="text-emerald-400/80">Skanerlandi ✓</span>
                      </div>
                    </div>

                    {/* Quick Payment Button */}
                    <div className="mt-2.5 rounded-xl bg-emerald-500 py-2.5 text-center text-xs font-bold text-black shadow-md flex items-center justify-center gap-1.5">
                      <CreditCard size={13} />
                      <span>{m.uiPay} · 145 000 so‘m</span>
                    </div>

                    {/* Payment Types Row */}
                    <div className="mt-2 flex items-center justify-around text-[9px] text-white/50 border-t border-white/10 pt-1.5">
                      <span>Naqd</span>
                      <span>•</span>
                      <span>Karta</span>
                      <span>•</span>
                      <span>Tez QR</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Device 2: iPhone 16 Pro Manager Live Dashboard */}
              <div
                onClick={() => setActiveTab('dashboard')}
                className={`relative cursor-pointer shrink-0 transition-all duration-500 ease-out ${
                  activeTab === 'dashboard'
                    ? 'z-20 scale-100 rotate-[2deg] opacity-100 -ml-10 sm:-ml-12'
                    : 'z-10 scale-95 rotate-[6deg] opacity-60 -ml-10 hover:opacity-90'
                }`}
                style={{
                  width: '275px',
                  filter: activeTab === 'dashboard'
                    ? 'drop-shadow(0 25px 45px rgba(0, 0, 0, 0.45))'
                    : 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.25))'
                }}
              >
                <div
                  className="overflow-hidden rounded-[44px] border-[5px] border-[#383d42] bg-[#0a0c0e] text-white p-3 sm:p-3.5"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.18)' }}
                >
                  {/* Dynamic Island */}
                  <div className="mx-auto mb-2 flex h-5 w-24 items-center justify-between rounded-full bg-black px-2.5 text-[9px] text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[8px] font-mono tracking-tight text-white/80 font-bold">iDokon Cloud</span>
                    <div className="h-2 w-2 rounded-full bg-black border border-white/30" />
                  </div>

                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-2 text-[10px] font-semibold text-white/80">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold text-emerald-400">5G</span>
                      <div className="h-2 w-4 rounded-sm border border-white/60 p-0.5">
                        <div className="h-full w-full bg-emerald-400 rounded-2xs" />
                      </div>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="mt-2.5 space-y-2.5">
                    {/* Revenue Metric Card */}
                    <div className="rounded-2xl p-3 bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-white/70">{m.uiTodaySales}</span>
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                          +18.4%
                        </span>
                      </div>
                      <div className="mt-1 text-xl font-black tracking-tight text-white">{m.uiSum}</div>

                      {/* Mini Sparkline Chart */}
                      <div className="mt-2.5 flex items-end gap-1.5 h-8 pt-1">
                        {[35, 55, 40, 75, 60, 95, 80, 100].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-sm bg-emerald-400/30 hover:bg-emerald-400 transition-colors"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>

                      <div className="mt-2 flex justify-between border-t border-white/10 pt-2 text-[10px] text-white/60">
                        <span>{m.uiChecks}</span>
                        <span>O‘rtacha: {m.uiAvgCheck}</span>
                      </div>
                    </div>

                    {/* Recent Receipts Stream (Replacing "top tovarlar") */}
                    <div className="rounded-2xl bg-white/5 p-2.5 border border-white/10 text-[11px]">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                        <span className="flex items-center gap-1">
                          <Receipt size={11} className="text-emerald-400" />
                          {m.uiRecentSales}
                        </span>
                        <span className="text-emerald-400 font-mono text-[9px] font-normal">Onlayn</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between rounded-lg bg-white/5 px-2 py-1">
                          <span className="font-medium text-white/90">{m.uiCheck1}</span>
                          <span className="text-emerald-400 font-bold">{m.uiCheck1Sum}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-white/5 px-2 py-1">
                          <span className="font-medium text-white/90">{m.uiCheck2}</span>
                          <span className="text-emerald-400 font-bold">{m.uiCheck2Sum}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: New Receipt Notification */}
              <div
                className="absolute -top-3 sm:top-2 -right-2 sm:-right-4 z-30 flex items-center gap-2.5 rounded-2xl bg-[var(--surface)] p-3 text-xs shadow-xl backdrop-blur-md transition-transform hover:scale-105"
                style={{
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.28)',
                  border: '1px solid var(--line-strong)'
                }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500 font-bold shrink-0">
                  <CheckCircle2 size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-bold text-[var(--fg)] leading-tight">{m.badgeReceipt}</p>
                  <p className="text-[10px] text-[var(--muted)] flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> {m.badgeReceiptTime}
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: Always Online Cloud Sync Status */}
              <div
                className="absolute -bottom-3 sm:bottom-0 -left-2 sm:-left-4 z-30 flex items-center gap-2.5 rounded-2xl bg-[var(--surface)] p-3 text-xs shadow-xl backdrop-blur-md transition-transform hover:scale-105"
                style={{
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.28)',
                  border: '1px solid var(--line-strong)'
                }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/15 text-blue-500 font-bold shrink-0">
                  <Cloud size={18} strokeWidth={2.5} className="animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-[var(--fg)] leading-tight">{m.badgeSync}</p>
                  <p className="text-[10px] text-[var(--muted)] mt-0.5 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    {m.badgeSyncDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
