import { useState } from 'react';
import FacultyLayout from '../../components/FacultyLayout.jsx';
import Icon from '../../components/Icon.jsx';

const INITIAL = [
  { name: 'Ana Reyes', id: '2024-10482', q: 18, p: 27, m: 44 },
  { name: 'Marco Dela Cruz', id: '2024-10117', q: 15, p: 24, m: 38 },
  { name: 'Bea Santiago', id: '2023-09214', q: 19, p: 28, m: 47 },
  { name: 'Paolo Mercado', id: '2025-11302', q: 12, p: 20, m: 33 },
  { name: 'Kisha Ramos', id: '2024-10554', q: 17, p: 26, m: 42 },
  { name: 'Jon Bautista', id: '2022-08077', q: 14, p: 22, m: 36 },
  { name: 'Lia Fernandez', id: '2025-11450', q: 20, p: 29, m: 48 },
  { name: 'Noel Garcia', id: '2023-09388', q: 16, p: 25, m: 40 }
];

const LIMITS = { q: 20, p: 30, m: 50 };

const clamp = (value, max) => Math.max(0, Math.min(max, Number(value) || 0));

function standingBadge(total) {
  if (total >= 90) return 'badge badge--green';
  if (total >= 75) return 'badge badge--blue';
  return 'badge badge--amber';
}

export default function FacultyGrades() {
  const [rows, setRows] = useState(INITIAL);
  const [released, setReleased] = useState(false);

  const setScore = (index, key, value) => {
    setReleased(false);
    setRows((list) =>
      list.map((r, i) => (i === index ? { ...r, [key]: clamp(value, LIMITS[key]) } : r))
    );
  };

  const totals = rows.map((r) => r.q + r.p + r.m);
  const average = (totals.reduce((a, b) => a + b, 0) / totals.length).toFixed(1);
  const highest = Math.max(...totals);
  const atRisk = totals.filter((t) => t < 75).length;

  return (
    <FacultyLayout>
      <div className="page-head">
        <div>
          <h1 className="page-title">Grade entry</h1>
          <div className="page-sub">CS 301 · Algorithms · Section A · M W 9:00–10:30 AM · 34 students</div>
        </div>
        <div className="btn btn--outline" style={{ cursor: 'default' }}>
          Midterm period
          <Icon name="down" size={16} stroke={2} />
        </div>
      </div>

      {released && (
        <div className="banner banner--green" role="status">
          <Icon name="check" size={22} stroke={2} />
          Midterm grades released. Students have been notified.
        </div>
      )}

      <div className="stat-grid">
        <div className="stat">
          <span className="stat__label">Average of shown</span>
          <span className="stat__value">{average}%</span>
        </div>
        <div className="stat">
          <span className="stat__label">Highest</span>
          <span className="stat__value">{highest}%</span>
        </div>
        <div className="stat">
          <span className="stat__label">Below 75%</span>
          <span className="stat__value">{atRisk}</span>
        </div>
        <div className="stat">
          <span className="stat__label">Graded so far</span>
          <span className="stat__value">
            8 <small>of 34</small>
          </span>
        </div>
      </div>

      <section className="card">
        <div className="row wrap between items-center g12">
          <h2 className="card__title">Class record</h2>
          <div className="search search--soft">
            <Icon name="search" size={18} stroke={2} />
            <input type="search" aria-label="Search students" placeholder="Search students" />
          </div>
        </div>

        <div className="table-wrap">
          <table className="table" style={{ minWidth: 660 }}>
            <thead>
              <tr>
                <th>Student</th>
                <th className="t-center">Quizzes /20</th>
                <th className="t-center">Project /30</th>
                <th className="t-center">Midterm /50</th>
                <th className="t-right">Standing</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const total = totals[i];
                return (
                  <tr key={r.id}>
                    <td>
                      <div className="cell-title">{r.name}</div>
                      <div className="cell-sub">{r.id}</div>
                    </td>
                    {['q', 'p', 'm'].map((key) => (
                      <td key={key} className="t-center">
                        <input
                          type="number"
                          min="0"
                          max={LIMITS[key]}
                          className="score-input"
                          aria-label={`${{ q: 'Quiz', p: 'Project', m: 'Midterm' }[key]} score for ${r.name}`}
                          value={r[key]}
                          onChange={(e) => setScore(i, key, e.target.value)}
                        />
                      </td>
                    ))}
                    <td className="t-right">
                      <span className={standingBadge(total)} style={{ minWidth: 52, textAlign: 'center', fontSize: 14 }}>
                        {total}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="row wrap between items-center g12">
          <span className="muted" style={{ fontSize: 13 }}>
            Showing 8 of 34 students. Edits are saved as a draft until you release grades.
          </span>
          <div className="row g12">
            <button type="button" className="btn btn--outline" style={{ minHeight: 48 }}>
              Save draft
            </button>
            <button
              type="button"
              className="btn btn--primary"
              style={{ minHeight: 48, padding: '0 22px' }}
              disabled={released}
              onClick={() => setReleased(true)}
            >
              {released ? 'Released' : 'Release to students'}
            </button>
          </div>
        </div>
      </section>
    </FacultyLayout>
  );
}
