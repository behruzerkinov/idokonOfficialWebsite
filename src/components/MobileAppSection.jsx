import { ArrowUpRight, BarChart3, CheckCircle2, QrCode, ShieldCheck, Smartphone, Sparkles, WifiOff, Zap } from 'lucide-react';
import { Reveal } from './Reveal';

/** Authentic Apple logo SVG */
const AppleIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 170 170" fill="currentColor" className={className} aria-hidden="true">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.73-11.65-14.07-5.99-9.35-10.74-20.08-14.25-32.2-3.51-12.11-5.26-23.75-5.26-34.91 0-13.37 3.38-24.62 10.14-33.74 6.76-9.13 15.42-13.78 25.99-13.97 4.13 0 9.07 1.05 14.83 3.16 5.76 2.11 9.4 3.22 10.92 3.35 2.83-.35 6.83-1.6 12.02-3.76 5.18-2.15 9.8-3.1 13.85-2.85 10.34.62 18.66 4.38 24.96 11.28-9.04 5.5-13.48 13.14-13.32 22.92.16 7.64 3.03 14.15 8.6 19.53 5.57 5.38 12.28 8.44 20.13 9.17-2.3 6.97-5.28 14.2-8.94 21.69zm-27.8-106.18c0 5.46-1.89 10.59-5.67 15.39-3.78 4.8-8.49 7.82-14.13 9.07-.15-.8-.23-1.61-.23-2.43 0-5.32 1.95-10.45 5.85-15.39 3.9-4.94 8.76-7.97 14.58-9.08.13.8.2 1.61.2 2.44z" />
  </svg>
);

/** Authentic Google Play logo SVG */
const GooglePlayIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
    <path fill="#4285F4" d="M47.7 20.3C45.3 22.8 44 26.6 44 31.4v449.2c0 4.8 1.3 8.6 3.7 11.1l3.5 3.3 251.5-251.5v-6l-251.5-251.5-3.5 3.3z" />
    <path fill="#FBBC04" d="M386.9 313.2l-84.2-84.2v-6l84.2-84.2 2.4 1.4 99.8 56.7c28.5 16.2 28.5 42.7 0 58.9l-99.8 56.7-2.4 1.4z" />
    <path fill="#EA4335" d="M302.7 235l-255-214.7c9.5-10.1 25.3-11.3 43.1-1.2l298.8 169.7-86.9 46.2z" />
    <path fill="#34A853" d="M302.7 277l86.9 46.2-298.8 169.7c-17.8 10.1-33.6 8.9-43.1-1.2L302.7 277z" />
  </svg>
);

/** Stylized scan QR graphic */
const QrGraphic = () => (
  <div className="grid grid-cols-5 gap-1 p-2 rounded-xl bg-white text-black shadow-inner">
    {[
      1, 1, 1, 0, 1,
      1, 0, 1, 1, 0,
      1, 1, 1, 0, 1,
      0, 1, 0, 1, 1,
      1, 0, 1, 1, 1
    ].map((bit, idx) => (
      <div key={idx} className={`w-2 h-2 rounded-[2px] ${bit ? 'bg-black' : 'bg-transparent'}`} />
    ))}
  </div>
);

export const MobileAppSection = ({ t }) => {
  const m = t.mobileApp;

  return (
    <section id="mobile-app" className="section relative overflow-hidden" aria-label={m.title}>
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Left Column: Copy & Downloads */}
        <Reveal>
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow">{m.eyebrow}</span>
              <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-[var(--accent)] bg-[var(--accent-soft)]">
                <Sparkles size={12} aria-hidden="true" /> iOS & Android
              </span>
            </div>

            <h2 className="h2 mt-5 text-[var(--fg)]">{m.title}</h2>
            <p className="lede mt-5 max-w-[50ch] text-[var(--muted)]">{m.lead}</p>

            {/* Feature Highlights */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="chip-num shrink-0 mt-0.5" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                  <BarChart3 size={17} strokeWidth={2.25} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--fg)]">{m.f1_title}</h3>
                  <p className="mt-0.5 text-xs sm:text-sm text-[var(--muted)]">{m.f1_desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="chip-num shrink-0 mt-0.5" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                  <Zap size={17} strokeWidth={2.25} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--fg)]">{m.f2_title}</h3>
                  <p className="mt-0.5 text-xs sm:text-sm text-[var(--muted)]">{m.f2_desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="chip-num shrink-0 mt-0.5" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                  <WifiOff size={17} strokeWidth={2.25} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--fg)]">{m.f3_title}</h3>
                  <p className="mt-0.5 text-xs sm:text-sm text-[var(--muted)]">{m.f3_desc}</p>
                </div>
              </div>
            </div>

            {/* Download CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3.5 rounded-2xl px-5 py-3.5 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'var(--fg)',
                  color: 'var(--bg)',
                  boxShadow: '0 4px 14px rgb(0 0 0 / 0.15)'
                }}
              >
                <AppleIcon className="h-7 w-7 shrink-0 text-current transition-transform group-hover:-translate-y-0.5" />
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider opacity-75">
                    {m.downloadFrom}
                  </span>
                  <span className="block text-base font-bold leading-tight">{m.appStore}</span>
                </span>
                <ArrowUpRight size={16} className="ml-1 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-3.5 rounded-2xl px-5 py-3.5 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'var(--surface)',
                  color: 'var(--fg)',
                  boxShadow: 'inset 0 0 0 1px var(--line-strong), 0 4px 14px rgb(0 0 0 / 0.08)'
                }}
              >
                <GooglePlayIcon className="h-6 w-6 shrink-0 transition-transform group-hover:-translate-y-0.5" />
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                    {m.downloadFrom}
                  </span>
                  <span className="block text-base font-bold leading-tight">{m.googlePlay}</span>
                </span>
                <ArrowUpRight size={16} className="ml-1 text-[var(--muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Compatibility Note with Mini QR */}
            <div className="mt-5 flex items-center gap-3 text-xs text-[var(--muted)]">
              <QrGraphic />
              <p className="max-w-[34ch] leading-snug">{m.compatible}</p>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Stunning Creatively Positioned Phone Shots */}
        <Reveal delay={1}>
          <div className="relative mx-auto flex max-w-[520px] items-center justify-center py-6 sm:py-10">
            {/* Ambient Backlight Behind Devices */}
            <div
              className="absolute inset-0 rounded-3xl opacity-35 blur-3xl"
              style={{ background: 'radial-gradient(circle at 60% 40%, var(--accent) 0%, transparent 65%)' }}
              aria-hidden="true"
            />

            {/* Phone 2: Android Scanner Mockup (Layered Behind, Offset Left) */}
            <div
              className="relative -mr-16 sm:-mr-20 w-[240px] sm:w-[270px] shrink-0 rotate-[-5deg] transition-transform duration-500 hover:rotate-[-2deg] hover:z-20"
              style={{ filter: 'drop-shadow(0 20px 35px rgb(0 0 0 / 0.35))' }}
            >
              <div
                className="overflow-hidden rounded-[36px] sm:rounded-[42px] border-[5px] border-[#2b2f33] bg-[#0c0f12] text-white p-2.5 sm:p-3"
                style={{ boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.12)' }}
              >
                {/* Punch Hole Camera */}
                <div className="mx-auto h-3 w-3 rounded-full bg-black border border-white/10 mb-2" />

                {/* Android App Header */}
                <div className="flex items-center justify-between px-1 text-[11px] text-white/70">
                  <span className="font-semibold text-white">iDokon Kassa</span>
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400">POS</span>
                </div>

                {/* Scanner Viewfinder Area */}
                <div className="relative mt-2.5 overflow-hidden rounded-2xl bg-gradient-to-b from-gray-900 to-black p-3 border border-white/10">
                  <div className="flex items-center justify-between text-[10px] text-white/60 mb-2">
                    <span>{m.uiScanTitle}</span>
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                    </span>
                  </div>

                  {/* Camera Aim Box with Green Corners */}
                  <div className="relative mx-auto my-2 h-24 w-full max-w-[170px] rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/5 flex items-center justify-center">
                    <div className="absolute top-1 left-1 h-3 w-3 border-t-2 border-l-2 border-emerald-400" />
                    <div className="absolute top-1 right-1 h-3 w-3 border-t-2 border-r-2 border-emerald-400" />
                    <div className="absolute bottom-1 left-1 h-3 w-3 border-b-2 border-l-2 border-emerald-400" />
                    <div className="absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 border-emerald-400" />
                    {/* Laser Line */}
                    <div className="h-0.5 w-4/5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_#34d399]" />
                  </div>

                  {/* Scanned Cart Info */}
                  <div className="mt-2.5 rounded-xl bg-white/5 p-2 text-[11px]">
                    <div className="flex justify-between font-bold text-white">
                      <span>{m.uiProd1}</span>
                      <span className="text-emerald-400">16 000 so‘m</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-white/50 mt-1">
                      <span>2 dona x 8 000</span>
                      <span>{m.uiProd1Qty}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <div className="mt-3 rounded-xl bg-emerald-500 py-2 text-center text-xs font-bold text-black shadow-md">
                    {m.uiPay} · 145 000 so‘m
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 1: iPhone 16 Pro Dashboard (Front & Center) */}
            <div
              className="relative z-10 w-[260px] sm:w-[290px] shrink-0 rotate-[3deg] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]"
              style={{ filter: 'drop-shadow(0 25px 50px rgb(0 0 0 / 0.45))' }}
            >
              <div
                className="overflow-hidden rounded-[42px] sm:rounded-[48px] border-[5px] border-[#383d42] bg-[#0a0c0e] text-white p-3 sm:p-3.5"
                style={{ boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.15)' }}
              >
                {/* Dynamic Island */}
                <div className="mx-auto mb-2 flex h-5 w-24 items-center justify-between rounded-full bg-black px-2 text-[9px] text-white/80">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[8px] font-mono tracking-tight text-white/70">iDokon</span>
                  <div className="h-2.5 w-2.5 rounded-full bg-black border border-white/20" />
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between px-2 text-[10px] font-semibold text-white/80">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-bold text-emerald-400">5G</span>
                    <div className="h-2 w-4 rounded-sm border border-white/60 p-0.5">
                      <div className="h-full w-full bg-emerald-400 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* App Content */}
                <div className="mt-2.5 space-y-2.5">
                  {/* Revenue Card */}
                  <div className="rounded-2xl p-3 bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-white/70">{m.uiTodaySales}</span>
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                        +18.4%
                      </span>
                    </div>
                    <div className="mt-1 text-xl sm:text-2xl font-black tracking-tight text-white">{m.uiSum}</div>

                    {/* Mini Sparkline Chart */}
                    <div className="mt-2.5 flex items-end gap-1.5 h-9 pt-1">
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

                  {/* Top Items List */}
                  <div className="rounded-2xl bg-white/5 p-2.5 border border-white/10 text-[11px]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">{m.uiTopProducts}</span>
                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{m.uiProd1}</span>
                        <span className="text-emerald-400 font-bold">{m.uiProd1Qty}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{m.uiProd2}</span>
                        <span className="text-emerald-400 font-bold">{m.uiProd2Qty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Live Badge 1: New Receipt Notification */}
            <div
              className="absolute -top-3 sm:top-2 -right-4 sm:-right-6 z-30 flex items-center gap-2.5 rounded-2xl bg-[var(--surface)] p-3 text-xs shadow-xl backdrop-blur-md"
              style={{
                boxShadow: 'var(--ring), 0 16px 32px rgb(0 0 0 / 0.25)',
                border: '1px solid var(--line-strong)'
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500 font-bold">
                <CheckCircle2 size={18} strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-bold text-[var(--fg)] leading-tight">{m.badgeReceipt}</p>
                <p className="text-[10px] text-[var(--muted)] flex items-center gap-1 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> {m.badgeReceiptTime}
                </p>
              </div>
            </div>

            {/* Floating Live Badge 2: Offline Mode Pill */}
            <div
              className="absolute -bottom-4 sm:bottom-0 -left-4 sm:-left-6 z-30 flex items-center gap-2.5 rounded-2xl bg-[var(--surface)] p-3 text-xs shadow-xl backdrop-blur-md"
              style={{
                boxShadow: 'var(--ring), 0 16px 32px rgb(0 0 0 / 0.25)',
                border: '1px solid var(--line-strong)'
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/15 text-blue-500 font-bold">
                <ShieldCheck size={18} strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-bold text-[var(--fg)] leading-tight">{m.badgeOffline}</p>
                <p className="text-[10px] text-[var(--muted)] mt-0.5">{m.badgeOfflineDesc}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
