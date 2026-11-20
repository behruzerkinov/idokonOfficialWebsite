// Line icons (paths from Lucide, ISC licence: https://lucide.dev/license). Inline so the site needs no icon package.
const I = (nodes) => function Icon({ size = 20, strokeWidth = 2, ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      {nodes}
    </svg>
  );
};

export const ArrowRight = I([<path key="0" d="M5 12h14" />, <path key="1" d="m12 5 7 7-7 7" />]);
export const ArrowUpRight = I([<path key="0" d="M7 7h10v10" />, <path key="1" d="M7 17 17 7" />]);
export const Check = I([<path key="0" d="M20 6 9 17l-5-5" />]);
export const ChevronLeft = I([<path key="0" d="m15 18-6-6 6-6" />]);
export const ChevronRight = I([<path key="0" d="m9 18 6-6-6-6" />]);
export const ChevronDown = I([<path key="0" d="m6 9 6 6 6-6" />]);
export const Globe = I([<circle key="0" cx="12" cy="12" r="10" />, <path key="1" d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />, <path key="2" d="M2 12h20" />]);
export const Menu = I([<path key="0" d="M4 5h16" />, <path key="1" d="M4 12h16" />, <path key="2" d="M4 19h16" />]);
export const X = I([<path key="0" d="M18 6 6 18" />, <path key="1" d="m6 6 12 12" />]);
export const Moon = I([<path key="0" d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />]);
export const Sun = I([<circle key="0" cx="12" cy="12" r="4" />, <path key="1" d="M12 2v2" />, <path key="2" d="M12 20v2" />, <path key="3" d="m4.93 4.93 1.41 1.41" />, <path key="4" d="m17.66 17.66 1.41 1.41" />, <path key="5" d="M2 12h2" />, <path key="6" d="M20 12h2" />, <path key="7" d="m6.34 17.66-1.41 1.41" />, <path key="8" d="m19.07 4.93-1.41 1.41" />]);
export const Phone = I([<path key="0" d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />]);
export const Send = I([<path key="0" d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />, <path key="1" d="m21.854 2.147-10.94 10.939" />]);
export const Plus = I([<path key="0" d="M5 12h14" />, <path key="1" d="M12 5v14" />]);
export const Store = I([<path key="0" d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />, <path key="1" d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />, <path key="2" d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />]);
export const ShoppingCart = I([<path key="0" d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" />, <path key="1" d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" />, <circle key="2" cx="18" cy="20" r="2" />, <circle key="3" cx="8" cy="20" r="2" />]);
export const ShoppingBasket = I([<path key="0" d="m15 11-1 9" />, <path key="1" d="m19 11-4-7" />, <path key="2" d="M2 11h20" />, <path key="3" d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />, <path key="4" d="M4.5 15.5h15" />, <path key="5" d="m5 11 4-7" />, <path key="6" d="m9 11 1 9" />]);
export const DatabaseBackup = I([<ellipse key="0" cx="12" cy="5" rx="9" ry="3" />, <path key="1" d="M3 12a9 3 0 0 0 5 2.69" />, <path key="2" d="M21 9.3V5" />, <path key="3" d="M3 5v14a9 3 0 0 0 6.47 2.88" />, <path key="4" d="M12 12v4h4" />, <path key="5" d="M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16" />]);
export const GraduationCap = I([<path key="0" d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />, <path key="1" d="M22 10v6" />, <path key="2" d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />]);
export const Headset = I([<path key="0" d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />, <path key="1" d="M21 16v2a4 4 0 0 1-4 4h-5" />]);
export const ShieldCheck = I([<path key="0" d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />, <path key="1" d="m9 12 2 2 4-4" />]);
export const ScanLine = I([<path key="0" d="M3 7V5a2 2 0 0 1 2-2h2" />, <path key="1" d="M17 3h2a2 2 0 0 1 2 2v2" />, <path key="2" d="M21 17v2a2 2 0 0 1-2 2h-2" />, <path key="3" d="M7 21H5a2 2 0 0 1-2-2v-2" />, <path key="4" d="M7 12h10" />]);
export const Cloud = I([<path key="0" d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />]);
export const ChartColumn = I([<path key="0" d="M3 3v16a2 2 0 0 0 2 2h16" />, <path key="1" d="M18 17V9" />, <path key="2" d="M13 17V5" />, <path key="3" d="M8 17v-3" />]);
export const CircleCheck = I([<circle key="0" cx="12" cy="12" r="10" />, <path key="1" d="m16 9-5.5 5.5L8 12" />]);
export const Maximize2 = I([<path key="0" d="M15 3h6v6" />, <path key="1" d="m21 3-7 7" />, <path key="2" d="m3 21 7-7" />, <path key="3" d="M9 21H3v-6" />]);

/** Instagram glyph in the same 24px / 2px-stroke style (Lucide ships no brand icons). */
export const Instagram = I([<rect key="0" x="3" y="3" width="18" height="18" rx="5" />, <circle key="1" cx="12" cy="12" r="4" />, <path key="2" d="M17.5 6.5h.01" />]);
