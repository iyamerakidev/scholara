import { Link } from 'react-router-dom';
import StudentLayout from '../../components/StudentLayout.jsx';
import Icon from '../../components/Icon.jsx';

const STATS = [
  { label: 'Term GPA', value: '3.62', note: 'Up 0.08 from last semester', noteTone: 'good', icon: 'award' },
  { label: 'Units enrolled', value: '21', note: '6 courses this term', icon: 'book' },
  { label: 'Attendance', value: '94%', note: '2 absences so far', icon: 'check' },
  { label: 'Balance due', value: '₱12,400', note: 'Due October 30', noteTone: 'warn', icon: 'wallet', tone: 'amber' }
];

const TODAY = [
  { start: '9:00 AM', end: '10:30 AM', title: 'CS 301 · Algorithms', sub: 'Room 304 · Prof. D. Cruz', status: 'In progress', now: true },
  { start: '11:00 AM', end: '12:30 PM', title: 'MATH 214 · Linear Algebra', sub: 'Room 118 · Prof. L. Aquino', status: 'Up next' },
  { start: '2:00 PM', end: '3:30 PM', title: 'ENG 202 · Technical Writing', sub: 'Room 210 · Prof. M. Tan', status: 'Later' }
];

const DEADLINES = [
  { month: 'OCT', day: '14', title: 'Database project proposal', sub: 'CS 305 · Submit online', tone: 'amber' },
  { month: 'OCT', day: '19', title: 'Midterm examinations begin', sub: 'All courses · See exam schedule' },
  { month: 'OCT', day: '30', title: 'Tuition payment due', sub: 'Cashier or online payment' }
];

const STANDING = [
  ['CS 301 · Algorithms', 92],
  ['CS 305 · Database Systems', 88],
  ['MATH 214 · Linear Algebra', 84],
  ['ENG 202 · Technical Writing', 90],
  ['CS 311 · Software Engineering', 86],
  ['PE 4 · Physical Education', 96]
];

export default function Dashboard() {
  return (
    <StudentLayout>
      <div className="page-head">
        <div>
          <h1 className="page-title">Good morning, Ana</h1>
          <div className="page-sub">Monday, October 12 · 1st Semester, AY 2026–2027</div>
        </div>
        <div className="row items-center g12">
          <div className="search">
            <Icon name="search" size={18} stroke={2} />
            <input type="search" aria-label="Search" placeholder="Search courses, forms…" />
          </div>
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="btn btn--outline"
            style={{ width: 44, padding: 0, position: 'relative', borderColor: 'var(--border)' }}
          >
            <Icon name="bell" />
            <span
              style={{
                position: 'absolute',
                top: 10,
                right: 11,
                width: 9,
                height: 9,
                borderRadius: '50%',
                background: '#c93c3c',
                border: '2px solid #fff'
              }}
            />
          </Link>
        </div>
      </div>

      <div className="stat-grid">
        {STATS.map((s) => (
          <div key={s.label} className="stat">
            <div className="stat__head">
              <span className="stat__label">{s.label}</span>
              <span className={'icon-chip' + (s.tone ? ` icon-chip--${s.tone}` : '')}>
                <Icon name={s.icon} size={19} stroke={2} />
              </span>
            </div>
            <div className="stat__value">{s.value}</div>
            <div className={'stat__note' + (s.noteTone ? ` stat__note--${s.noteTone}` : '')}>{s.note}</div>
          </div>
        ))}
      </div>

      <div className="split" style={{ alignItems: 'stretch' }}>
        <section className="card" style={{ flex: '3 1 420px', minWidth: 0 }}>
          <div className="row between items-center">
            <h2 className="card__title">Today's classes</h2>
            <Link to="/schedule" className="no-underline" style={{ fontSize: 14, fontWeight: 700 }}>
              View schedule
            </Link>
          </div>
          {TODAY.map((c) => (
            <div key={c.title} className={'list-row' + (c.now ? ' list-row--now' : '')}>
              <div className="list-row__time">
                {c.start}
                <span>{c.end}</span>
              </div>
              <div className="list-row__main">
                <div className="list-row__title">{c.title}</div>
                <div className="list-row__sub">{c.sub}</div>
              </div>
              <span className={'badge' + (c.now ? ' badge--solid' : '')}>{c.status}</span>
            </div>
          ))}
        </section>

        <section className="card" style={{ flex: '2 1 320px', minWidth: 0 }}>
          <h2 className="card__title">Upcoming deadlines</h2>
          {DEADLINES.map((d) => (
            <div key={d.title} className="row items-center g14">
              <div className={'date-chip' + (d.tone ? ` date-chip--${d.tone}` : '')}>
                <small>{d.month}</small>
                <strong>{d.day}</strong>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{d.title}</div>
                <div className="muted" style={{ fontSize: 13 }}>{d.sub}</div>
              </div>
            </div>
          ))}
        </section>
      </div>

      <section className="card" style={{ gap: 20 }}>
        <div className="row between items-center">
          <h2 className="card__title">Current standing by course</h2>
          <Link to="/grades" className="no-underline" style={{ fontSize: 14, fontWeight: 700 }}>
            See all grades
          </Link>
        </div>
        <div className="two-col">
          {STANDING.map(([name, pct]) => (
            <div key={name}>
              <div className="meter-row">
                <span>{name}</span>
                <span>{pct}%</span>
              </div>
              <div className="progress">
                <span style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </StudentLayout>
  );
}
