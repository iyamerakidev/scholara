import { useState } from 'react';
import FacultyLayout from '../../components/FacultyLayout.jsx';
import Icon from '../../components/Icon.jsx';

const PEOPLE = [
  { id: 's1', name: 'Ana Reyes', sid: '2024-10482' },
  { id: 's2', name: 'Marco Dela Cruz', sid: '2024-10117' },
  { id: 's3', name: 'Bea Santiago', sid: '2023-09214' },
  { id: 's4', name: 'Paolo Mercado', sid: '2025-11302' },
  { id: 's5', name: 'Kisha Ramos', sid: '2024-10554' },
  { id: 's6', name: 'Jon Bautista', sid: '2022-08077' },
  { id: 's7', name: 'Lia Fernandez', sid: '2025-11450' },
  { id: 's8', name: 'Noel Garcia', sid: '2023-09388' }
];

const KINDS = [
  { key: 'P', label: 'Present', bg: '#e1f4ea', color: '#12643f', border: '#12643f', dot: '#1e8a5b' },
  { key: 'L', label: 'Late', bg: '#fdf1dc', color: '#7a4a06', border: '#a8620a', dot: '#e08a12' },
  { key: 'A', label: 'Absent', bg: '#fbe6e6', color: '#8a2020', border: '#8a2020', dot: '#c93c3c' },
  { key: 'E', label: 'Excused', bg: '#e8edfd', color: '#1f37a3', border: '#2f4bcc', dot: '#2f4bcc' }
];

const INITIAL_MARKS = { s1: 'P', s2: 'P', s3: 'P', s4: 'A', s5: 'P', s6: 'L', s7: null, s8: null };

export default function FacultyAttendance() {
  const [marks, setMarks] = useState(INITIAL_MARKS);
  const [saved, setSaved] = useState(false);

  const setMark = (id, key) => {
    setSaved(false);
    setMarks((m) => ({ ...m, [id]: key }));
  };

  const markAllPresent = () => {
    setSaved(false);
    setMarks(Object.fromEntries(PEOPLE.map((p) => [p.id, 'P'])));
  };

  const count = (key) => PEOPLE.filter((p) => marks[p.id] === key).length;
  const unmarked = PEOPLE.filter((p) => !marks[p.id]).length;

  return (
    <FacultyLayout>
      <div className="page-head">
        <div>
          <h1 className="page-title">Attendance</h1>
          <div className="page-sub">CS 301 · Algorithms · Section A · Monday, Oct 12 · 9:00 AM</div>
        </div>
        <div className="row g8" role="tablist" aria-label="Session">
          <button type="button" role="tab" aria-selected="false" className="chip">Wed, Oct 7</button>
          <button type="button" role="tab" aria-selected="true" className="chip is-active">Mon, Oct 12</button>
        </div>
      </div>

      {saved && (
        <div className="banner banner--green" role="status">
          <Icon name="check" size={22} stroke={2} />
          Attendance saved for this session.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
        {KINDS.map((k) => (
          <div key={k.key} className="stat" style={{ padding: 20, gap: 8 }}>
            <span className="stat__label row items-center g8">
              <span style={{ width: 10, height: 10, borderRadius: 3, background: k.dot }} />
              {k.label}
            </span>
            <span className="stat__value" style={{ fontSize: 30 }}>{count(k.key)}</span>
          </div>
        ))}
        <div className="stat" style={{ padding: 20, gap: 8 }}>
          <span className="stat__label row items-center g8">
            <span style={{ width: 10, height: 10, borderRadius: 3, background: '#a3adc2' }} />
            Not marked
          </span>
          <span className="stat__value" style={{ fontSize: 30 }}>{unmarked}</span>
        </div>
      </div>

      <section className="card">
        <div className="row wrap between items-center g12">
          <h2 className="card__title">Class list</h2>
          <button type="button" className="btn btn--outline" style={{ fontSize: 13, borderRadius: 10 }} onClick={markAllPresent}>
            Mark all present
          </button>
        </div>

        <div className="stack">
          {PEOPLE.map((p) => (
            <div
              key={p.id}
              className="row wrap items-center g12"
              style={{ padding: '10px 0', borderBottom: '1px solid var(--border-soft)' }}
            >
              <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{p.sid}</div>
              </div>
              <div className="row g6" role="group" aria-label={`Attendance for ${p.name}`}>
                {KINDS.map((k) => {
                  const on = marks[p.id] === k.key;
                  return (
                    <button
                      key={k.key}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setMark(p.id, k.key)}
                      style={{
                        minWidth: 76,
                        height: 44,
                        padding: '0 12px',
                        borderRadius: 10,
                        fontSize: 13,
                        cursor: 'pointer',
                        fontWeight: on ? 800 : 600,
                        border: `1px solid ${on ? k.border : 'var(--input-border)'}`,
                        background: on ? k.bg : '#fff',
                        color: on ? k.color : 'var(--gray-text)'
                      }}
                    >
                      {k.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="row wrap between items-center g12">
          <span className="muted" style={{ fontSize: 13 }}>
            Showing 8 of 34 students. {unmarked > 0 ? `${unmarked} not marked yet.` : 'Everyone is marked.'}
          </span>
          <button type="button" className="btn btn--primary" style={{ minHeight: 48, padding: '0 24px' }} onClick={() => setSaved(true)}>
            Save attendance
          </button>
        </div>
      </section>
    </FacultyLayout>
  );
}
