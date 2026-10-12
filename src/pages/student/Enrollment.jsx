import { useState } from 'react';
import StudentLayout from '../../components/StudentLayout.jsx';
import Icon from '../../components/Icon.jsx';

const MAX_UNITS = 24;

const COURSES = [
  { id: 'cs321', code: 'CS 321', title: 'Operating Systems', units: 3, dept: 'cs', sched: 'T Th · 9:00–10:30 AM', seats: 12, prereq: 'CS 301', met: true },
  { id: 'cs325', code: 'CS 325', title: 'Computer Networks', units: 3, dept: 'cs', sched: 'M W · 1:00–2:30 PM', seats: 4, prereq: 'CS 301', met: true },
  { id: 'cs331', code: 'CS 331', title: 'Machine Learning Fundamentals', units: 3, dept: 'cs', sched: 'T Th · 1:00–2:30 PM', seats: 18, prereq: 'MATH 214', met: true },
  { id: 'cs341', code: 'CS 341', title: 'Mobile App Development', units: 3, dept: 'cs', sched: 'W F · 3:30–5:00 PM', seats: 9, prereq: 'CS 311', met: true },
  { id: 'math301', code: 'MATH 301', title: 'Probability and Statistics', units: 3, dept: 'other', sched: 'M W · 11:00 AM–12:30 PM', seats: 9, prereq: 'MATH 214', met: true },
  { id: 'soc101', code: 'SOC 101', title: 'Society and Culture', units: 3, dept: 'other', sched: 'T Th · 3:00–4:30 PM', seats: 22, prereq: '', met: true },
  { id: 'cs401', code: 'CS 401', title: 'Capstone Project 1', units: 3, dept: 'cs', sched: 'F · 9:00 AM–12:00 PM', seats: 30, prereq: 'CS 311 and 4th-year standing', met: false }
];

const FILTERS = [
  { key: 'all', label: 'All courses' },
  { key: 'cs', label: 'Computer Science' },
  { key: 'other', label: 'Math and electives' }
];

export default function Enrollment() {
  const [selected, setSelected] = useState({ cs321: true, math301: true });
  const [filter, setFilter] = useState('all');
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id) => {
    setSubmitted(false);
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  };

  const shown = COURSES.filter((c) => filter === 'all' || c.dept === filter);
  const picked = COURSES.filter((c) => selected[c.id]);
  const total = picked.reduce((n, c) => n + c.units, 0);
  const over = total > MAX_UNITS;
  const canSubmit = total > 0 && !over && !submitted;

  return (
    <StudentLayout>
      <div className="page-head">
        <div>
          <h1 className="page-title">Enrollment</h1>
          <div className="page-sub">2nd Semester, AY 2026–2027 · Enrollment window closes [DATE]</div>
        </div>
        <div
          className="row items-center g8"
          style={{ padding: '10px 16px', borderRadius: 12, background: 'var(--blue-bg)', color: 'var(--blue-text)', fontSize: 14, fontWeight: 700 }}
        >
          <Icon name="clock" size={18} stroke={2} />
          Your advising hold is cleared
        </div>
      </div>

      {submitted && (
        <div className="banner banner--green" role="status">
          <Icon name="check" size={22} stroke={2} />
          Enrollment submitted. Your adviser will review it and you will be notified once it is approved.
        </div>
      )}

      <div className="split">
        <section className="stack g16" style={{ flex: '3 1 520px', minWidth: 0 }}>
          <div className="row wrap g8 items-center">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={'chip' + (filter === f.key ? ' is-active' : '')}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {shown.map((c) => {
            const on = !!selected[c.id];
            return (
              <div
                key={c.id}
                className="row wrap items-center g16"
                style={{
                  padding: '20px 22px',
                  borderRadius: 16,
                  background: '#fff',
                  border: `1px solid ${on ? 'var(--primary)' : 'var(--border)'}`
                }}
              >
                <div className="stack g8" style={{ flex: '1 1 300px', minWidth: 0 }}>
                  <div className="row wrap g10" style={{ alignItems: 'baseline' }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary)' }}>{c.code}</span>
                    <span style={{ fontSize: 17, fontWeight: 800 }}>{c.title}</span>
                    <span className="muted" style={{ fontSize: 13, fontWeight: 600 }}>{c.units} units</span>
                  </div>
                  <div className="row wrap muted" style={{ gap: '8px 18px', fontSize: 13 }}>
                    <span>{c.sched}</span>
                    <span>{c.seats} seats left</span>
                    <span style={{ fontWeight: 600, color: c.met ? 'var(--green-text)' : 'var(--red-text)' }}>
                      {c.prereq ? `Prerequisite: ${c.prereq} (${c.met ? 'completed' : 'not met'})` : 'No prerequisite'}
                    </span>
                  </div>
                </div>

                {c.met ? (
                  <button
                    type="button"
                    aria-pressed={on}
                    className="btn"
                    style={{
                      minWidth: 132,
                      background: on ? 'var(--green-bg)' : 'var(--primary)',
                      color: on ? 'var(--green-text)' : '#fff'
                    }}
                    onClick={() => toggle(c.id)}
                  >
                    {on ? 'Added' : 'Add course'}
                  </button>
                ) : (
                  <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px', fontSize: 13, borderRadius: 12 }}>
                    <Icon name="lock" size={16} stroke={2} />
                    Not yet eligible
                  </span>
                )}
              </div>
            );
          })}
        </section>

        <aside className="card" style={{ flex: '1 1 320px', minWidth: 0 }}>
          <h2 className="card__title">Your enrollment</h2>
          <div className="stack g8">
            <div className="row between" style={{ alignItems: 'baseline' }}>
              <span className="muted" style={{ fontSize: 14, fontWeight: 600 }}>Units selected</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: over ? 'var(--red-text)' : 'var(--ink)' }}>
                {total} of {MAX_UNITS} units
              </span>
            </div>
            <div className="progress">
              <span style={{ width: `${Math.min(100, Math.round((total / MAX_UNITS) * 100))}%`, background: over ? '#c93c3c' : 'var(--primary)' }} />
            </div>
            <div className="hint">{over ? 'Over the maximum load. Remove a course to continue.' : 'Regular load is 18 to 24 units.'}</div>
          </div>

          {picked.length > 0 ? (
            <div className="stack">
              {picked.map((c) => (
                <div key={c.id} className="row items-center g10" style={{ padding: '10px 0', borderBottom: '1px solid var(--border-soft)' }}>
                  <div className="grow">
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{c.code} · {c.title}</div>
                    <div className="muted" style={{ fontSize: 12 }}>{c.units} units · {c.sched}</div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${c.code}`}
                    className="btn btn--outline"
                    style={{ width: 36, minHeight: 36, padding: 0, borderRadius: 10 }}
                    onClick={() => toggle(c.id)}
                  >
                    <Icon name="x" size={16} stroke={2} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: 20, borderRadius: 12, background: 'var(--bg)', fontSize: 14, color: 'var(--muted)', textAlign: 'center' }}>
              No courses yet. Add courses from the list to build your load.
            </div>
          )}

          <button
            type="button"
            className="btn btn--primary btn--block"
            disabled={!canSubmit}
            onClick={() => setSubmitted(true)}
          >
            {submitted ? 'Submitted' : 'Submit enrollment'}
          </button>
          <div className="hint" style={{ lineHeight: 1.5 }}>
            Submitting sends your course list to your adviser for approval. You can still edit it until the window closes.
          </div>
        </aside>
      </div>
    </StudentLayout>
  );
}
