import { useState } from 'react';
import StudentLayout from '../../components/StudentLayout.jsx';
import Icon from '../../components/Icon.jsx';

const TERMS = ['1st Sem 2026–27', '2nd Sem 2025–26', '1st Sem 2025–26', 'All terms'];

const COURSES = [
  { code: 'CS 301', title: 'Algorithms', prof: 'Prof. D. Cruz', units: 3, standing: 92 },
  { code: 'CS 305', title: 'Database Systems', prof: 'Prof. R. Villanueva', units: 3, standing: 88 },
  { code: 'CS 311', title: 'Software Engineering', prof: 'Prof. J. Navarro', units: 3, standing: 86 },
  { code: 'MATH 214', title: 'Linear Algebra', prof: 'Prof. L. Aquino', units: 3, standing: 84 },
  { code: 'ENG 202', title: 'Technical Writing', prof: 'Prof. M. Tan', units: 3, standing: 90 },
  { code: 'PE 4', title: 'Physical Education', prof: 'Coach A. Lim', units: 2, standing: 96 }
];

const GPA_TREND = [
  { label: 'Y1 S1', gpa: 3.34 },
  { label: 'Y1 S2', gpa: 3.41 },
  { label: 'Y2 S1', gpa: 3.49 },
  { label: 'Y2 S2', gpa: 3.54 },
  { label: 'Y3 S1', gpa: 3.62 }
];

function standingBadge(pct) {
  if (pct >= 85) return 'badge badge--green';
  return 'badge badge--amber';
}

function GpaChart() {
  const base = 190;
  const scale = 87.8;
  return (
    <svg
      viewBox="0 0 360 220"
      role="img"
      aria-label="GPA by term rising from 3.34 to 3.62 over five terms"
      style={{ width: '100%', height: 'auto' }}
    >
      <line x1="30" y1={base} x2="350" y2={base} stroke="#D3DAE8" />
      <line x1="30" y1="120" x2="350" y2="120" stroke="#EEF1F7" />
      <line x1="30" y1="50" x2="350" y2="50" stroke="#EEF1F7" />
      {GPA_TREND.map((t, i) => {
        const h = 108 + (t.gpa - 3.21) * scale;
        const x = 52 + i * 60;
        const last = i === GPA_TREND.length - 1;
        return (
          <g key={t.label}>
            <rect x={x} y={base - h} width="34" height={h} rx="6" fill={last ? '#2F4BCC' : '#B9C6F4'} />
            <text x={x + 17} y={base - h - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0F1B2D">
              {t.gpa.toFixed(2)}
            </text>
            <text x={x + 17} y="208" textAnchor="middle" fontSize="11" fill="#55627A">
              {t.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Grades() {
  const [term, setTerm] = useState(TERMS[0]);

  return (
    <StudentLayout>
      <div className="page-head">
        <div>
          <h1 className="page-title">Grades</h1>
          <div className="page-sub">Your academic record, updated as faculty post results.</div>
        </div>
        <a href="#" className="btn btn--outline">
          <Icon name="download" size={18} stroke={2} />
          Download transcript
        </a>
      </div>

      <div className="row wrap g8" role="tablist" aria-label="Term">
        {TERMS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={term === t}
            className={'chip' + (term === t ? ' is-active' : '')}
            onClick={() => setTerm(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="stat-grid">
        <div className="stat">
          <span className="stat__label">Term GPA (running)</span>
          <span className="stat__value">3.62</span>
        </div>
        <div className="stat">
          <span className="stat__label">Cumulative GPA</span>
          <span className="stat__value">3.48</span>
        </div>
        <div className="stat">
          <span className="stat__label">Units earned</span>
          <span className="stat__value">
            84 <small>of 148</small>
          </span>
        </div>
        <div className="stat">
          <span className="stat__label">Academic standing</span>
          <span>
            <span className="badge badge--green" style={{ fontSize: 15, padding: '8px 16px' }}>Dean's Lister</span>
          </span>
        </div>
      </div>

      <div className="split">
        <section className="card" style={{ flex: '3 1 480px', minWidth: 0 }}>
          <h2 className="card__title">Course grades</h2>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Units</th>
                  <th>Midterm</th>
                  <th>Final</th>
                  <th className="t-right">Standing</th>
                </tr>
              </thead>
              <tbody>
                {COURSES.map((c) => (
                  <tr key={c.code}>
                    <td>
                      <div className="cell-title">{c.code} · {c.title}</div>
                      <div className="cell-sub">{c.prof}</div>
                    </td>
                    <td>{c.units}</td>
                    <td className="muted">Pending</td>
                    <td className="muted">Pending</td>
                    <td className="t-right">
                      <span className={standingBadge(c.standing)} style={{ fontSize: 14 }}>{c.standing}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted" style={{ fontSize: 13 }}>
            Standing is the running grade from graded work so far. Midterm and final marks appear here once released.
          </p>
        </section>

        <section className="card" style={{ flex: '2 1 320px', minWidth: 0 }}>
          <h2 className="card__title">GPA by term</h2>
          <GpaChart />
          <div style={{ padding: '14px 16px', borderRadius: 12, background: 'var(--bg)', fontSize: 13, lineHeight: 1.55, color: 'var(--gray-text)' }}>
            <div style={{ fontWeight: 800, marginBottom: 6, color: 'var(--ink)' }}>Grading guide</div>
            90% and above: Excellent · 85–89%: Very good · 80–84%: Good · below 75%: Needs attention
          </div>
        </section>
      </div>
    </StudentLayout>
  );
}
