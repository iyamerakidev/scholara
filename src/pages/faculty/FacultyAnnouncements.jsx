import { useState } from 'react';
import FacultyLayout from '../../components/FacultyLayout.jsx';

const TARGETS = ['All classes', 'CS 301 A', 'CS 301 B', 'CS 210'];

const INITIAL_POSTS = [
  { id: 1, target: 'CS 301 A and B', date: 'Oct 9', title: 'Midterm exam reminder', body: 'The midterm covers weeks 1 to 6.\nBring a calculator and your school ID.' },
  { id: 2, target: 'CS 210', date: 'Oct 7', title: 'Project proposal template posted', body: 'The template is in the class files. Proposals are due next Friday.' },
  { id: 3, target: 'All classes', date: 'Oct 5', title: 'Consultation hours this week', body: 'I am available Thursday, 3:00 to 5:00 PM in Faculty Room 2.' }
];

export default function FacultyAnnouncements() {
  const [target, setTarget] = useState('All classes');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [nextId, setNextId] = useState(4);

  const ready = title.trim().length > 0 && body.trim().length > 0;

  const handlePost = (e) => {
    e.preventDefault();
    if (!ready) return;
    setPosts((list) => [
      { id: nextId, target, date: 'Just now', title: title.trim(), body: body.trim() },
      ...list
    ]);
    setNextId((n) => n + 1);
    setTitle('');
    setBody('');
  };

  const remove = (id) => setPosts((list) => list.filter((p) => p.id !== id));

  return (
    <FacultyLayout>
      <div>
        <h1 className="page-title">Announcements</h1>
        <div className="page-sub">Post updates to the students in your classes.</div>
      </div>

      <div className="split">
        <form className="card" style={{ flex: '2 1 400px', minWidth: 0, gap: 18 }} onSubmit={handlePost}>
          <h2 className="card__title">New announcement</h2>

          <div className="field">
            <span className="field__label">Send to</span>
            <div className="row wrap g8" role="group" aria-label="Send to">
              {TARGETS.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={target === t}
                  className={'chip' + (target === t ? ' is-active' : '')}
                  style={{ fontSize: 13, fontWeight: 700, padding: '0 16px' }}
                  onClick={() => setTarget(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="an-title">Title</label>
            <input
              id="an-title"
              className="input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Quiz moved to Friday"
            />
          </div>

          <div className="field">
            <label htmlFor="an-body">Message</label>
            <textarea
              id="an-body"
              className="input"
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your message to students"
            />
          </div>

          <label className="check">
            <input type="checkbox" defaultChecked />
            Also email this to students
          </label>

          <button type="submit" className="btn btn--primary btn--block" disabled={!ready}>
            Post announcement
          </button>
        </form>

        <section className="stack g16" style={{ flex: '3 1 460px', minWidth: 0 }}>
          <h2 className="card__title">Posted</h2>

          {posts.map((p) => (
            <article key={p.id} className="card" style={{ padding: '20px 22px', gap: 10 }}>
              <div className="row wrap between items-center g10">
                <span className="badge badge--blue">{p.target}</span>
                <span className="muted" style={{ fontSize: 12, fontWeight: 600 }}>{p.date}</span>
              </div>
              <div style={{ fontSize: 17, fontWeight: 800 }}>{p.title}</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--gray-text)', whiteSpace: 'pre-line' }}>{p.body}</div>
              <div className="row" style={{ justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn--danger" style={{ fontSize: 13, borderRadius: 10 }} onClick={() => remove(p.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}

          {posts.length === 0 && (
            <div className="card" style={{ padding: '28px 20px', textAlign: 'center', fontSize: 14, color: 'var(--muted)' }}>
              No announcements yet.
            </div>
          )}
        </section>
      </div>
    </FacultyLayout>
  );
}
