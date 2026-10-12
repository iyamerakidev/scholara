import { useState } from 'react';
import StudentLayout from '../../components/StudentLayout.jsx';
import Icon from '../../components/Icon.jsx';

const HOUR_PX = 64;
const FIRST_HOUR = 8;

const COURSES = {
  cs301: { code: 'CS 301', title: 'Algorithms', room: 'Room 304', when: 'M W · 9:00–10:30 AM', units: 3, bg: '#E8EDFD', fg: '#1F37A3', dot: '#8FA3EE' },
  math214: { code: 'MATH 214', title: 'Linear Algebra', room: 'Room 118', when: 'M W · 11:00 AM–12:30 PM', units: 3, bg: '#E1F4EA', fg: '#12643F', dot: '#8CCFA9' },
  eng202: { code: 'ENG 202', title: 'Technical Writing', room: 'Room 210', when: 'M W · 2:00–3:30 PM', units: 3, bg: '#FDF1DC', fg: '#7A4A06', dot: '#F2C47E' },
  cs305: { code: 'CS 305', title: 'Database Systems', room: 'Computer Lab 2', when: 'T Th · 9:00–10:30 AM', units: 3, bg: '#EFE6FB', fg: '#4B2380', dot: '#BFA0EC' },
  cs311: { code: 'CS 311', title: 'Software Engineering', room: 'Room 305', when: 'T Th · 1:00–2:30 PM', units: 3, bg: '#FBE6E6', fg: '#8A2020', dot: '#EE9A9A' },
  pe4: { code: 'PE 4', title: 'Physical Education', room: 'University Gym', when: 'F · 8:00–10:00 AM', units: 2, bg: '#E6EAF2', fg: '#2E3A50', dot: '#A9B3C6' }
};

// days: 0 = Mon … 4 = Fri. start/end are 24h decimals.
const MEETINGS = [
  { course: 'cs301', days: [0, 2], start: 9, end: 10.5 },
  { course: 'math214', days: [0, 2], start: 11, end: 12.5 },
  { course: 'eng202', days: [0, 2], start: 14, end: 15.5 },
  { course: 'cs305', days: [1, 3], start: 9, end: 10.5 },
  { course: 'cs311', days: [1, 3], start: 13, end: 14.5 },
  { course: 'pe4', days: [4], start: 8, end: 10 }
];

const DAYS = [
  { short: 'MON', num: 12, full: 'Monday' },
  { short: 'TUE', num: 13, full: 'Tuesday' },
  { short: 'WED', num: 14, full: 'Wednesday' },
  { short: 'THU', num: 15, full: 'Thursday' },
  { short: 'FRI', num: 16, full: 'Friday' }
];

const HOUR_LABELS = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'];

function fmt(h) {
  const hour = Math.floor(h);
  const mins = h % 1 ? '30' : '00';
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour > 12 ? hour - 12 : hour;
  return `${h12}:${mins} ${suffix}`;
}

function meetingsFor(day) {
  return MEETINGS.filter((m) => m.days.includes(day)).sort((a, b) => a.start - b.start);
}

function WeekGrid() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <div className="week">
        <div className="week__head">
          {DAYS.map((d, i) => (
            <div key={d.short} className="week__day">
              <small>{d.short}</small>
              <span className={'week__num' + (i === 0 ? ' is-today' : '')}>{d.num}</span>
            </div>
          ))}
        </div>
        <div className="week__body">
          <div className="week__times">
            {HOUR_LABELS.map((label, i) => (
              <span key={label} style={{ top: i * HOUR_PX - 8 }}>{label}</span>
            ))}
          </div>
          <div className="week__cols">
            {DAYS.map((d, dayIdx) => (
              <div key={d.short} className="week__col">
                {meetingsFor(dayIdx).map((m) => {
                  const c = COURSES[m.course];
                  return (
                    <div
                      key={m.course}
                      className="block"
                      style={{
                        top: (m.start - FIRST_HOUR) * HOUR_PX + 2,
                        height: (m.end - m.start) * HOUR_PX - 4,
                        background: c.bg,
                        color: c.fg
                      }}
                    >
                      <strong>{c.code}</strong>
                      <span style={{ fontWeight: 600 }}>{c.title}</span>
                      <span style={{ marginTop: 2 }}>{c.room}</span>
                    </div>
                  );
                })}
                {dayIdx === 0 && <div className="now-line" style={{ top: 107 }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListView() {
  return (
    <div className="stack g20">
      {DAYS.map((d, i) => (
        <div key={d.full} className="stack g10">
          <h3 style={{ fontSize: 14, fontWeight: 800 }}>
            {d.full}, Oct {d.num}
          </h3>
          {meetingsFor(i).map((m) => {
            const c = COURSES[m.course];
            return (
              <div key={m.course} className="list-row">
                <div className="list-row__time">
                  {fmt(m.start)}
                  <span>{fmt(m.end)}</span>
                </div>
                <div className="list-row__main">
                  <div className="list-row__title">{c.code} · {c.title}</div>
                  <div className="list-row__sub">{c.room}</div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function Schedule() {
  const [view, setView] = useState('week');

  return (
    <StudentLayout>
      <div className="page-head">
        <div>
          <h1 className="page-title">Class schedule</h1>
          <div className="page-sub">1st Semester, AY 2026–2027 · 6 courses · 17 hours a week</div>
        </div>
        <div className="row items-center g8">
          <button type="button" aria-label="Previous week" className="btn btn--outline" style={{ width: 44, padding: 0 }}>
            <Icon name="left" size={18} stroke={2} />
          </button>
          <div className="btn btn--outline" style={{ cursor: 'default' }}>Oct 12 – 16, 2026</div>
          <button type="button" aria-label="Next week" className="btn btn--outline" style={{ width: 44, padding: 0 }}>
            <Icon name="right" size={18} stroke={2} />
          </button>
          <div className="seg" style={{ marginLeft: 8 }}>
            {['week', 'list'].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={'seg__item' + (view === v ? ' is-active' : '')}
                style={{ border: 0, background: view === v ? '#fff' : 'transparent', padding: '8px 14px', cursor: 'pointer', textTransform: 'capitalize' }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="split">
        <section className="card" style={{ flex: '3 1 560px', minWidth: 0, padding: '20px 20px 24px' }}>
          {view === 'week' ? <WeekGrid /> : <ListView />}
        </section>

        <section className="stack g20" style={{ flex: '1 1 280px', minWidth: 0 }}>
          <div className="card card--tight">
            <h2 className="card__title">Your courses</h2>
            {Object.values(COURSES).map((c) => (
              <div key={c.code} className="row items-center g12">
                <span style={{ width: 12, height: 12, borderRadius: 4, background: c.dot, flex: 'none' }} />
                <div className="grow">
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{c.code} · {c.title}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{c.when}</div>
                </div>
                <span className="muted" style={{ fontSize: 13, fontWeight: 700 }}>{c.units}u</span>
              </div>
            ))}
          </div>
          <div className="card card--tight" style={{ background: 'var(--ink)', borderColor: 'var(--ink)', color: '#fff', gap: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--amber)', letterSpacing: '0.05em' }}>HAPPENING NOW</div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>CS 301 · Algorithms</div>
            <div style={{ fontSize: 14, color: '#b8c3d9' }}>Room 304 · ends 10:30 AM</div>
          </div>
        </section>
      </div>
    </StudentLayout>
  );
}
