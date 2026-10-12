import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import Icon from '../../components/Icon.jsx';

const FEATURES = [
  { icon: 'grades', text: 'Grades posted as soon as faculty release them' },
  { icon: 'calendar', text: 'A weekly timetable that stays up to date' },
  { icon: 'enroll', text: 'Online enrollment with prerequisite checks' }
];

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <AuthShell
      headline="Your whole school year, in one place."
      blurb="Check grades, plan your schedule, and enroll in classes without queuing at the registrar."
      features={FEATURES}
      footer="Need help? Contact the Registrar's Office at [REGISTRAR EMAIL]"
    >
      <form className="auth__form" onSubmit={handleSubmit}>
        <div>
          <h2 className="auth__title">Welcome back</h2>
          <p className="auth__sub">Sign in with your student ID to continue.</p>
        </div>

        <div className="seg">
          <div className="seg__item is-active">Student</div>
          <Link to="/faculty/login" className="seg__item">
            Faculty
          </Link>
        </div>

        <div className="stack g18">
          <div className="field">
            <label htmlFor="sid">Student ID</label>
            <input id="sid" className="input" type="text" placeholder="e.g. 2024-10482" />
          </div>
          <div className="field">
            <div className="row between items-center">
              <label htmlFor="pw">Password</label>
              <a href="#" className="no-underline" style={{ fontSize: 13, fontWeight: 600 }}>
                Forgot password?
              </a>
            </div>
            <input id="pw" className="input" type="password" placeholder="Enter your password" />
          </div>
          <label className="check">
            <input type="checkbox" />
            Keep me signed in on this device
          </label>
        </div>

        <button type="submit" className="btn btn--primary btn--block">
          Sign in
        </button>

        <div className="divider">or</div>

        <a href="#" className="btn btn--outline btn--block" style={{ fontSize: 15 }}>
          <Icon name="lock" size={18} stroke={2} />
          Sign in with school single sign-on
        </a>

        <p className="muted" style={{ fontSize: 13, textAlign: 'center' }}>
          New student?{' '}
          <Link to="/activate" className="no-underline" style={{ fontWeight: 700 }}>
            Activate your account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
