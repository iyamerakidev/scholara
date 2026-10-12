import { Link } from 'react-router-dom';
import FacultyLayout from '../../components/FacultyLayout.jsx';
import Icon from '../../components/Icon.jsx';

const STATS = [
  { label: 'Classes this term', value: '4' },
  { label: 'Students taught', value: '103' },
  { label: 'Grades to release', value: '2' },
  { label: 'Attendance to record', value: '1' }
];

const ATTENTION = [
  { to: '/faculty/grades', icon: 'grades', tone: 'amber', title: 'Midterm grades ready to release', sub: 'CS 301 Sec A and Sec B' },
  { to: '/faculty/attendance', icon: 'check', tone: '', title: "Record today's attendance", sub: 'CS 301 Sec A · 9:00 AM' },
  { to: '/faculty/grades', icon: 'userminus', tone: 'red', title: '2 students below 75%', sub: 'CS 301 Sec A · review standings' }
];

const WEEK = [
  { label: 'MON 12 · TODAY', today: true, items: ['CS 301 A · 9:00 AM', 'CS 301 B · 1:00 PM'] },
  { label: 'TUE 13', items: ['CS 210 · 9:00 AM'] },
  { label: 'WED 14', items: ['CS 301 A · 9:00 AM', 'CS 301 B · 1:00 PM'] },
  { label: 'THU 15', items: ['CS 210 · 9:00 AM'] },
  { label: 'FRI 16', items: ['CS 399 Advising · 1:00 PM'] }
];

export default function FacultyOverview() {
  return (
    <FacultyLayout>
      <div>
        <h1 className="page-title">Good morning, Prof. Cruz</h1>
        <div className="page-sub">Monday, October 12 · 1st Semester, AY 2026–2027</div>
      </div>

      <div className="stat-grid">
        {STATS.map((s) => (
          <div key={s.label} className="stat">
            <span className="stat__label">{s.label}</span>
            <span className="stat__value">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="split" style={{ alignItems: 'stretch' }}>
        <section className="card" style={{ flex: '3 1 420px', minWidth: 0 }}>
          <div className="row between items-center">
            <h2 className="card__title">Today's classes</h2>
            <Link to="/faculty/classes" className="no-underline" style={{ fontSize: 14, fontWeight: 700 }}>
              All classes
            </Link>
          </div>

          <div className="list-row list-row--now" style={{ padding: 16 }}>
            <div className="list-row__time">
              9:00 AM<span>10:30 AM</span>
            </div>
            <div className="list-row__main">
              <div className="list-row__title">CS 301 · Algorithms · Sec A</div>
              <div className="list-row__sub">Room 304 · 34 students</div>
            </div>
            <span className="badge badge--solid">In progress</span>
            <Link to="/faculty/attendance" className="btn btn--outline" style={{ fontSize: 13, borderColor: '#c5d0f8' }}>
              Take attendance
            </Link>
          </div>

          <div className="list-row" style={{ padding: 16 }}>
            <div className="list-row__time">
              1:00 PM<span>2:30 PM</span>
            </div>
            <div className="list-row__main">
              <div className="list-row__title">CS 301 · Algorithms · Sec B</div>
              <div className="list-row__sub">Room 304 · 31 students</div>
            </div>
            <span className="badge">Up next</span>
          </div>

          <div style={{ padding: '14px 16px', borderRadius: 12, background: 'var(--bg)', fontSize: 13, color: 'var(--muted)' }}>
            No other classes today. Tomorrow: CS 210 Data Structures at 9:00 AM.
          </div>
        </section>

        <section className="card" style={{ flex: '2 1 320px', minWidth: 0 }}>
          <h2 className="card__title">Needs your attention</h2>
          {ATTENTION.map((a) => (
            <Link key={a.title} to={a.to} className="link-card" style={{ padding: 14 }}>
              <span className={'icon-chip icon-chip--lg' + (a.tone ? ` icon-chip--${a.tone}` : '')}>
                <Icon name={a.icon} size={19} stroke={2} />
              </span>
              <span>
                <span className="link-card__title">{a.title}</span>
                <span className="link-card__sub">{a.sub}</span>
              </span>
            </Link>
          ))}
        </section>
      </div>

      <section className="card" style={{ gap: 18 }}>
        <h2 className="card__title">This week</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12 }}>
          {WEEK.map((d) => (
            <div
              key={d.label}
              className="stack g10"
              style={{
                padding: 16,
                borderRadius: 12,
                background: d.today ? '#eef2fe' : '#fff',
                border: d.today ? '1px solid transparent' : '1px solid var(--border)'
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.05em', color: d.today ? 'var(--primary)' : 'var(--muted)' }}>
                {d.label}
              </div>
              {d.items.map((i) => (
                <div key={i} style={{ fontSize: 14, fontWeight: 700 }}>{i}</div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </FacultyLayout>
  );
}
