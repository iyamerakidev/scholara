import { useState } from 'react';
import StudentLayout from '../../components/StudentLayout.jsx';
import Icon from '../../components/Icon.jsx';

const PERSONAL = [
  ['Full name', 'Ana Marie Reyes'],
  ['Date of birth', '[DATE OF BIRTH]'],
  ['School email', '[STUDENT EMAIL]'],
  ['Mobile number', '[MOBILE NUMBER]'],
  ['Home address', '[STREET ADDRESS, CITY, PROVINCE]', true]
];

const ACADEMIC = [
  ['Program', 'BS Computer Science'],
  ['Year level', '3rd Year'],
  ['Academic adviser', 'Prof. D. Cruz'],
  ['Admitted', '1st Semester, AY 2024–2025']
];

const EMERGENCY = [
  ['Name', '[CONTACT NAME]'],
  ['Relationship', '[RELATIONSHIP]'],
  ['Mobile number', '[CONTACT NUMBER]']
];

const REQUESTS = [
  { icon: 'file', title: 'Certificate of enrollment', sub: 'Usually ready in 1 business day' },
  { icon: 'file', title: 'Official transcript of records', sub: 'Processing time set by the Registrar' },
  { icon: 'idcard', title: 'Replacement student ID', sub: 'Fees apply' }
];

const INITIAL_PREFS = [
  { id: 'grades', label: 'New grades posted', on: true },
  { id: 'classes', label: 'Class changes and cancellations', on: true },
  { id: 'payments', label: 'Payment reminders', on: false }
];

function InfoGrid({ rows }) {
  return (
    <dl className="info-grid" style={{ margin: 0 }}>
      {rows.map(([label, value, full]) => (
        <div key={label} className={full ? 'full' : ''}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Profile() {
  const [prefs, setPrefs] = useState(INITIAL_PREFS);

  const togglePref = (id) =>
    setPrefs((list) => list.map((p) => (p.id === id ? { ...p, on: !p.on } : p)));

  return (
    <StudentLayout>
      <h1 className="page-title" style={{ marginBottom: 0 }}>My profile</h1>

      <section className="card row wrap items-center g24" style={{ flexDirection: 'row', padding: 28 }}>
        <div className="avatar">AR</div>
        <div className="stack g8" style={{ flex: '1 1 280px', minWidth: 0 }}>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.01em' }}>Ana Reyes</div>
          <div className="muted" style={{ fontSize: 15 }}>
            Student ID 2024-10482 · BS Computer Science · 3rd Year, Section A
          </div>
          <div className="row wrap g8">
            <span className="badge badge--green">Enrolled</span>
            <span className="badge badge--blue">Regular student</span>
            <span className="badge badge--amber">Dean's Lister</span>
          </div>
        </div>
        <button type="button" className="btn btn--outline">Change photo</button>
      </section>

      <div className="split">
        <div className="stack g20" style={{ flex: '3 1 480px', minWidth: 0 }}>
          <section className="card" style={{ gap: 20 }}>
            <div className="row between items-center">
              <h2 className="card__title">Personal information</h2>
              <button type="button" className="btn btn--outline" style={{ minHeight: 40, fontSize: 13 }}>
                Request update
              </button>
            </div>
            <InfoGrid rows={PERSONAL} />
          </section>

          <section className="card" style={{ gap: 20 }}>
            <h2 className="card__title">Academic information</h2>
            <InfoGrid rows={ACADEMIC} />
          </section>

          <section className="card" style={{ gap: 20 }}>
            <h2 className="card__title">Emergency contact</h2>
            <InfoGrid rows={EMERGENCY} />
          </section>
        </div>

        <div className="stack g20" style={{ flex: '2 1 320px', minWidth: 0 }}>
          <section className="card" style={{ gap: 14 }}>
            <h2 className="card__title">Request a document</h2>
            {REQUESTS.map((r) => (
              <a key={r.title} href="#" className="link-card">
                <span className="icon-chip icon-chip--lg">
                  <Icon name={r.icon} size={19} stroke={2} />
                </span>
                <span className="grow">
                  <span className="link-card__title">{r.title}</span>
                  <span className="link-card__sub">{r.sub}</span>
                </span>
              </a>
            ))}
          </section>

          <section className="card" style={{ gap: 6 }}>
            <h2 className="card__title" style={{ marginBottom: 10 }}>Notifications</h2>
            {prefs.map((p) => (
              <div key={p.id} className="setting-row">
                <span>{p.label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={p.on}
                  aria-label={p.label}
                  className="switch"
                  onClick={() => togglePref(p.id)}
                />
              </div>
            ))}
          </section>

          <a href="#" className="btn btn--outline btn--block" style={{ fontSize: 15 }}>
            <Icon name="lock" size={18} stroke={2} />
            Change password
          </a>
        </div>
      </div>
    </StudentLayout>
  );
}
