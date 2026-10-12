import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import Icon from '../../components/Icon.jsx';

const FEATURES = [
  { icon: 'grades', text: 'Enter and release grades per class' },
  { icon: 'check', text: 'Take attendance in a few taps' },
  { icon: 'message', text: 'Post announcements to your students' }
];

export default function FacultyLogin() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/faculty');
  };

  return (
    <AuthShell
      tag="FACULTY"
      headline="Teach more. Chase paperwork less."
      blurb="Your class records, attendance and announcements in one place, for every section you handle."
      features={FEATURES}
      footer="Need help? Contact faculty support at [FACULTY SUPPORT EMAIL]"
    >
      <form className="auth__form" onSubmit={handleSubmit}>
        <div>
          <h2 className="auth__title">Faculty sign in</h2>
          <p className="auth__sub">Use your employee ID and the password for your faculty account.</p>
        </div>

        <div className="seg">
          <Link to="/" className="seg__item">
            Student
          </Link>
          <div className="seg__item is-active">Faculty</div>
        </div>

        <div className="stack g18">
          <div className="field">
            <label htmlFor="fid">Employee ID</label>
            <input id="fid" className="input" type="text" placeholder="e.g. FAC-0127" />
          </div>
          <div className="field">
            <div className="row between items-center">
              <label htmlFor="fpw">Password</label>
              <a href="#" className="no-underline" style={{ fontSize: 13, fontWeight: 600 }}>
                Forgot password?
              </a>
            </div>
            <input id="fpw" className="input" type="password" placeholder="Enter your password" />
          </div>
          <label className="check">
            <input type="checkbox" />
            Keep me signed in on this device
          </label>
        </div>

        <button type="submit" className="btn btn--primary btn--block">
          Sign in to faculty portal
        </button>

        <div className="divider">or</div>

        <a href="#" className="btn btn--outline btn--block" style={{ fontSize: 15 }}>
          <Icon name="lock" size={18} stroke={2} />
          Sign in with school single sign-on
        </a>

        <p className="muted" style={{ fontSize: 13, lineHeight: 1.5, textAlign: 'center' }}>
          Faculty accounts are created by [HR OR IT OFFICE]. Not a faculty member?{' '}
          <Link to="/" className="no-underline" style={{ fontWeight: 700 }}>
            Go to student sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
