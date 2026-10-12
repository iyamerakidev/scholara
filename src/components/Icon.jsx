const PATHS = {
  cap: 'M2 9l10-5 10 5-10 5-10-5zM6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5',
  home: 'M3 12l9-8 9 8M5 10v10h14V10',
  grades: 'M5 21V11M12 21V4M19 21v-8',
  calendar: 'M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zM3 10h18M8 3v4M16 3v4',
  enroll: 'M8 4h8a2 2 0 012 2v13a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2zM9 4V3h6v1M9 11h6M9 15h4',
  user: 'M12 4a4 4 0 100 8 4 4 0 000-8zM4 21c0-4 4-6 8-6s8 2 8 6',
  logout: 'M9 21H5V3h4M16 17l5-5-5-5M21 12H9',
  bell: 'M6 8a6 6 0 0112 0c0 7 3 8 3 8H3s3-1 3-8M10 21h4',
  book: 'M4 4h12a3 3 0 013 3v13H7a3 3 0 01-3-3V4z',
  check: 'M12 3a9 9 0 100 18 9 9 0 000-18zM8 12l3 3 5-6',
  tick: 'M5 12l5 5 9-10',
  message: 'M4 5h16v11H9l-5 4z',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 018 0v4',
  wallet: 'M5 6h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2zM3 10h18M16 15h2',
  award: 'M12 3a6 6 0 100 12 6 6 0 000-12zM8.5 14L7 22l5-3 5 3-1.5-8',
  plus: 'M12 5v14M5 12h14',
  x: 'M6 6l12 12M18 6L6 18',
  download: 'M12 3v12M7 10l5 5 5-5M4 21h16',
  left: 'M15 6l-6 6 6 6',
  right: 'M9 6l6 6-6 6',
  down: 'M6 9l6 6 6-6',
  clock: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2',
  file: 'M6 3h8l4 4v14H6zM14 3v4h4M9 13h6M9 17h6',
  idcard: 'M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zM9 9a2 2 0 100 4 2 2 0 000-4zM14 10h4M14 14h4M6 17c.5-1.5 1.7-2 3-2s2.5.5 3 2',
  userminus: 'M9 4a4 4 0 100 8 4 4 0 000-8zM2 21c0-4 3-6 7-6s7 2 7 6M19 8v6M16 11h6',
  settings: 'M12 9a3 3 0 100 6 3 3 0 000-6zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1',
  lines: 'M4 6h16M4 12h16M4 18h10'
};

export default function Icon({ name, size = 20, stroke = 1.8, className, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
