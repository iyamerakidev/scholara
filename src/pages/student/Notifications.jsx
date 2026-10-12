import { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '../../components/StudentLayout.jsx';
import Icon from '../../components/Icon.jsx';

const CATEGORIES = {
  grades: { name: 'GRADES', icon: 'grades', tone: 'blue' },
  classes: { name: 'CLASSES', icon: 'calendar', tone: 'green' },
  announcements: { name: 'ANNOUNCEMENT', icon: 'message', tone: 'purple' },
  payments: { name: 'PAYMENTS', icon: 'wallet', tone: 'amber' }
};

const TONE_COLOR = {
  blue: 'var(--primary)',
  green: 'var(--green-text)',
  purple: '#4b2380',
  amber: '#a8620a'
};

const NOTIFICATIONS = [
  { id: 'n1', group: 'today', cat: 'grades', time: '20 minutes ago', title: 'New grade posted: CS 305 Quiz 3', body: 'Prof. R. Villanueva posted your score of 88%.', to: '/grades', action: 'View grades', read: false },
  { id: 'n2', group: 'today', cat: 'classes', time: '1 hour ago', title: 'Room change: ENG 202 moves to Room 212 today', body: 'Your 2:00 PM Technical Writing class will meet in Room 212 instead of Room 210.', to: '/schedule', action: 'View schedule', read: false },
  { id: 'n3', group: 'today', cat: 'announcements', time: '8:15 AM', title: 'Prof. D. Cruz: Midterm exam reminder', body: 'The midterm covers weeks 1 to 6. Bring a calculator and your school ID.', read: false },
  { id: 'n4', group: 'earlier', cat: 'payments', time: 'Sat, Oct 10', title: 'Tuition balance due October 30', body: '₱12,400 remains on your account. Pay at the cashier or online.', read: false },
  { id: 'n5', group: 'earlier', cat: 'classes', time: 'Fri, Oct 9', title: 'Enrollment for 2nd Semester is open', body: 'Choose your courses before the window closes. Your adviser will review the list.', to: '/enrollment', action: 'Go to enrollment', read: true },
  { id: 'n6', group: 'earlier', cat: 'payments', time: 'Sat, Oct 3', title: 'Payment received: ₱8,000', body: 'Thank you. Your receipt is available at the cashier.', read: true }
];

function NotificationCard({ n, onToggle }) {
  const cat = CATEGORIES[n.cat];
  const color = TONE_COLOR[cat.tone];
  return (
    <article
      className="row wrap g16 items-start"
      style={{
        padding: '18px 20px',
        borderRadius: 16,
        background: n.read ? '#fff' : '#f5f8ff',
        border: `1px solid ${n.read ? 'var(--border)' : '#c5d0f8'}`
      }}
    >
      <span className={'icon-chip icon-chip--lg' + (cat.tone === 'blue' ? '' : ` icon-chip--${cat.tone}`)} style={{ width: 44, height: 44 }}>
        <Icon name={cat.icon} size={20} stroke={2} />
      </span>
      <div className="stack g6" style={{ flex: '1 1 280px', minWidth: 0 }}>
        <div className="row items-center wrap g8">
          <span style={{ fontSize: 12, fontWeight: 800, color, letterSpacing: '0.04em' }}>{cat.name}</span>
          <span className="muted" style={{ fontSize: 12 }}>{n.time}</span>
          {!n.read && (
            <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', background: '#c93c3c', borderRadius: 999, padding: '2px 8px' }}>
              New
            </span>
          )}
        </div>
        <div style={{ fontSize: 15, fontWeight: n.read ? 600 : 800 }}>{n.title}</div>
        <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--gray-text)' }}>{n.body}</div>
        <div className="row wrap g8" style={{ marginTop: 4 }}>
          {n.to && (
            <Link to={n.to} className="btn btn--primary" style={{ fontSize: 13 }}>
              {n.action}
            </Link>
          )}
          <button type="button" className="btn btn--outline" style={{ fontSize: 13 }} onClick={() => onToggle(n.id)}>
            {n.read ? 'Mark as unread' : 'Mark as read'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Notifications() {
  const [items, setItems] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState('all');

  const unread = items.filter((n) => !n.read).length;
  const toggle = (id) => setItems((list) => list.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  const markAll = () => setItems((list) => list.map((n) => ({ ...n, read: true })));

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: `Unread (${unread})` },
    { key: 'grades', label: 'Grades' },
    { key: 'classes', label: 'Classes' },
    { key: 'announcements', label: 'Announcements' },
    { key: 'payments', label: 'Payments' }
  ];

  const visible = items.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.cat === filter;
  });
  const today = visible.filter((n) => n.group === 'today');
  const earlier = visible.filter((n) => n.group === 'earlier');

  return (
    <StudentLayout>
      <div className="page-head">
        <div>
          <h1 className="page-title">Notifications</h1>
          <div className="page-sub">
            {unread === 0 ? 'You have no unread notifications.' : `You have ${unread} unread notification${unread === 1 ? '' : 's'}.`}
          </div>
        </div>
        <div className="row g10">
          <button type="button" className="btn btn--outline" disabled={unread === 0} onClick={markAll}>
            Mark all as read
          </button>
          <Link to="/profile" className="btn btn--dark">
            <Icon name="settings" size={16} stroke={2} />
            Preferences
          </Link>
        </div>
      </div>

      <div className="row wrap g8" role="group" aria-label="Filter notifications">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            className={'chip' + (filter === f.key ? ' is-active' : '')}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="split">
        <section className="stack g14" style={{ flex: '3 1 520px', minWidth: 0 }}>
          {today.length > 0 && (
            <h2 style={{ fontSize: 13, fontWeight: 800, color: 'var(--muted)', letterSpacing: '0.06em', marginTop: 6 }}>TODAY</h2>
          )}
          {today.map((n) => (
            <NotificationCard key={n.id} n={n} onToggle={toggle} />
          ))}

          {earlier.length > 0 && (
            <h2 style={{ fontSize: 13, fontWeight: 800, color: 'var(--muted)', letterSpacing: '0.06em', marginTop: 10 }}>
              EARLIER THIS WEEK
            </h2>
          )}
          {earlier.map((n) => (
            <NotificationCard key={n.id} n={n} onToggle={toggle} />
          ))}

          {visible.length === 0 && (
            <div
              className="stack items-center g12"
              style={{ padding: '48px 24px', borderRadius: 16, background: '#fff', border: '1px solid var(--border)', textAlign: 'center' }}
            >
              <Icon name="bell" size={40} stroke={1.6} style={{ color: '#8793ab' }} />
              <div style={{ fontSize: 16, fontWeight: 800 }}>You're all caught up</div>
              <div className="muted" style={{ fontSize: 14 }}>Nothing here for this filter right now.</div>
            </div>
          )}
        </section>

        <aside className="stack g20" style={{ flex: '1 1 300px', minWidth: 0 }}>
          <div className="card card--tight" style={{ gap: 14 }}>
            <h2 className="card__title">Delivery</h2>
            <div className="setting-row">
              <span>In the portal</span>
              <span className="badge badge--green">On</span>
            </div>
            <div className="setting-row">
              <span>Email to school address</span>
              <span className="badge badge--green">On</span>
            </div>
            <div className="setting-row">
              <span>Payment reminders</span>
              <span className="badge">Off</span>
            </div>
            <Link to="/profile" className="no-underline row items-center" style={{ fontSize: 14, fontWeight: 700, minHeight: 44 }}>
              Change in your profile
            </Link>
          </div>
          <div className="card card--tight" style={{ background: 'var(--ink)', borderColor: 'var(--ink)', color: '#fff', gap: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--amber)', letterSpacing: '0.06em' }}>REMINDER</div>
            <div style={{ fontSize: 17, fontWeight: 800 }}>Tuition payment due Oct 30</div>
            <div style={{ fontSize: 14, color: '#b8c3d9', lineHeight: 1.5 }}>₱12,400 remains on your account for this semester.</div>
          </div>
        </aside>
      </div>
    </StudentLayout>
  );
}
