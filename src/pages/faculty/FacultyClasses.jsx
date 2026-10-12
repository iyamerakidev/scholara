import { useState } from 'react';
import { Link } from 'react-router-dom';
import FacultyLayout from '../../components/FacultyLayout.jsx';

const CLASSES = [
  {
    id: 'cs301a',
    code: 'CS 301 · Section A',
    title: 'Algorithms',
    when: 'M W · 9:00–10:30 AM',
    room: 'Room 304',
    metrics: [['Students', '34'], ['Class average', '83%'], ['Attendance', '94%']],
    total: 34,
    colA: 'Standing',
    colB: 'Attend.',
    roster: [
      ['Ana Reyes', '2024-10482', 89, '96%'],
      ['Marco Dela Cruz', '2024-10117', 77, '92%'],
      ['Bea Santiago', '2023-09214', 94, '98%'],
      ['Paolo Mercado', '2025-11302', 65, '80%'],
      ['Kisha Ramos', '2024-10554', 85, '94%']
    ]
  },
  {
    id: 'cs301b',
    code: 'CS 301 · Section B',
    title: 'Algorithms',
    when: 'M W · 1:00–2:30 PM',
    room: 'Room 304',
    metrics: [['Students', '31'], ['Class average', '79%'], ['Attendance', '91%']],
    total: 31,
    colA: 'Standing',
    colB: 'Attend.',
    roster: [
      ['Rafael Lim', '2024-10731', 84, '95%'],
      ['Trisha Uy', '2024-10888', 76, '90%'],
      ['Carlo Sison', '2024-10245', 91, '97%'],
      ['Dina Pascual', '2024-10392', 72, '85%'],
      ['Miguel Torres', '2024-10914', 80, '92%']
    ]
  },
  {
    id: 'cs210',
    code: 'CS 210 · Section A',
    title: 'Data Structures',
    when: 'T Th · 9:00–10:30 AM',
    room: 'Room 301',
    metrics: [['Students', '38'], ['Class average', '81%'], ['Attendance', '93%']],
    total: 38,
    colA: 'Standing',
    colB: 'Attend.',
    roster: [
      ['Hannah Co', '2025-11021', 88, '96%'],
      ['Ivan Delos Santos', '2025-11134', 79, '90%'],
      ['Joy Manalo', '2025-11267', 83, '93%'],
      ['Ken Abad', '2025-11389', 70, '84%'],
      ['Mara Ocampo', '2025-11476', 90, '97%']
    ]
  },
  {
    id: 'cs399',
    code: 'CS 399',
    title: 'Thesis Advising',
    when: 'F · 1:00–3:00 PM',
    room: 'Faculty Room 2',
    metrics: [['Advisees', '6'], ['Next meeting', 'Fri 16'], ['Defenses set', '2']],
    total: 6,
    advising: true,
    colA: 'Stage',
    colB: 'Meetings',
    roster: [
      ['Enzo Villar', '2022-08142', 'Proposal', '3'],
      ['Gia Mendoza', '2022-08219', 'Writing', '7'],
      ['Harold Yap', '2022-08305', 'Data gathering', '5'],
      ['Isa Cortez', '2022-08377', 'Writing', '8'],
      ['Jun Rivera', '2022-08461', 'Proposal', '2']
    ]
  }
];

function chipClass(value) {
  if (typeof value !== 'number') return 'badge';
  if (value >= 90) return 'badge badge--green';
  if (value >= 75) return 'badge badge--blue';
  return 'badge badge--amber';
}

export default function FacultyClasses() {
  const [selectedId, setSelectedId] = useState('cs301a');
  const current = CLASSES.find((c) => c.id === selectedId);

  return (
    <FacultyLayout>
      <div>
        <h1 className="page-title">My classes</h1>
        <div className="page-sub">1st Semester, AY 2026–2027 · 4 classes</div>
      </div>

      <div className="split">
        <section className="stack g16" style={{ flex: '3 1 480px', minWidth: 0 }}>
          {CLASSES.map((c) => {
            const on = c.id === selectedId;
            return (
              <div
                key={c.id}
                className="card"
                style={{ padding: 22, gap: 18, borderWidth: 2, borderColor: on ? 'var(--primary)' : 'var(--border)' }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary)' }}>{c.code}</div>
                  <div style={{ fontSize: 19, fontWeight: 800, marginTop: 2 }}>{c.title}</div>
                  <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>{c.when} · {c.room}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
                  {c.metrics.map(([label, value]) => (
                    <div key={label} style={{ padding: '12px 14px', borderRadius: 12, background: 'var(--bg)' }}>
                      <div className="muted" style={{ fontSize: 12, fontWeight: 600 }}>{label}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, marginTop: 2 }}>{value}</div>
                    </div>
                  ))}
                </div>

                <div className="row wrap g10">
                  <button
                    type="button"
                    aria-pressed={on}
                    className={'btn ' + (on ? 'btn--primary' : 'btn--soft')}
                    style={{ fontSize: 13, borderRadius: 10 }}
                    onClick={() => setSelectedId(c.id)}
                  >
                    {on ? 'Viewing roster' : 'View roster'}
                  </button>
                  <Link to="/faculty/grades" className="btn btn--outline" style={{ fontSize: 13, borderRadius: 10 }}>
                    Grade entry
                  </Link>
                  <Link to="/faculty/attendance" className="btn btn--outline" style={{ fontSize: 13, borderRadius: 10 }}>
                    Attendance
                  </Link>
                </div>
              </div>
            );
          })}
        </section>

        <aside className="card" style={{ flex: '2 1 340px', minWidth: 0 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.05em' }}>
              {current.advising ? 'ADVISEES' : 'CLASS ROSTER'}
            </div>
            <h2 className="card__title" style={{ marginTop: 4 }}>{current.code} · {current.title}</h2>
          </div>

          <div className="row" style={{ paddingBottom: 8, borderBottom: '1px solid var(--border)', fontSize: 12, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            <span className="grow">Student</span>
            <span style={{ width: 104, textAlign: 'right' }}>{current.colA}</span>
            <span style={{ width: 84, textAlign: 'right' }}>{current.colB}</span>
          </div>

          {current.roster.map(([name, id, a, b]) => (
            <div key={id} className="row items-center g8" style={{ padding: '6px 0', borderBottom: '1px solid var(--border-soft)' }}>
              <div className="grow">
                <div style={{ fontSize: 14, fontWeight: 700 }}>{name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{id}</div>
              </div>
              <span style={{ width: 104, textAlign: 'right' }}>
                <span className={chipClass(a)}>{typeof a === 'number' ? `${a}%` : a}</span>
              </span>
              <span style={{ width: 84, textAlign: 'right', fontSize: 13, fontWeight: 600 }}>{b}</span>
            </div>
          ))}

          <div className="hint">
            Showing 5 of {current.total} {current.advising ? 'advisees' : 'students'}.
          </div>
        </aside>
      </div>
    </FacultyLayout>
  );
}
