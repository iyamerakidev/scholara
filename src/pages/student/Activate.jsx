import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import Icon from '../../components/Icon.jsx';

const STEPS = [
  { n: 1, title: 'Verify your identity', desc: 'Student ID, date of birth and email' },
  { n: 2, title: 'Create a password', desc: 'Confirm the code and set your password' },
  { n: 3, title: 'Start using Scholara', desc: 'Sign in to grades, schedule and enrollment' }
];

function StepList({ current }) {
  return (
    <ol className="steps">
      {STEPS.map((s) => {
        const done = current > s.n;
        const now = current === s.n;
        return (
          <li key={s.n}>
            <span className={'steps__dot' + (done ? ' is-done' : now ? ' is-current' : '')}>{s.n}</span>
            <span>
              <span className={'steps__title' + (done || now ? ' is-on' : '')}>{s.title}</span>
              <span className="steps__desc">{s.desc}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default function Activate() {
  const [step, setStep] = useState(1);
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');

  const rules = [
    { label: 'At least 8 characters', ok: pw.length >= 8 },
    { label: 'One uppercase letter', ok: /[A-Z]/.test(pw) },
    { label: 'One number', ok: /\d/.test(pw) },
    { label: 'Both passwords match', ok: pw.length > 0 && pw === pw2 }
  ];
  const allOk = rules.every((r) => r.ok);

  return (
    <AuthShell
      headline="Activate your student account"
      blurb="It takes about two minutes. You only need your student ID and the email address your school has on file."
      extra={<StepList current={step} />}
      footer="Trouble activating? Contact the Registrar's Office at [REGISTRAR EMAIL]"
    >
      <div className="auth__form">
        {step === 1 && (
          <>
            <div>
              <div className="eyebrow">STEP 1 OF 3</div>
              <h2 className="auth__title" style={{ fontSize: 30 }}>Verify it's you</h2>
              <p className="auth__sub">We'll check these details against your school record.</p>
            </div>
            <div className="stack g18">
              <div className="field">
                <label htmlFor="a-sid">Student ID</label>
                <input id="a-sid" className="input" type="text" placeholder="e.g. 2024-10482" />
              </div>
              <div className="field">
                <label htmlFor="a-dob">Date of birth</label>
                <input id="a-dob" className="input" type="text" placeholder="MM / DD / YYYY" />
              </div>
              <div className="field">
                <label htmlFor="a-mail">Email on file</label>
                <input id="a-mail" className="input" type="email" placeholder="name@example.com" />
                <span className="hint">We'll send a 6-digit code to this address.</span>
              </div>
              <label className="check" style={{ alignItems: 'flex-start', fontSize: 13, lineHeight: 1.5 }}>
                <input type="checkbox" style={{ marginTop: 2 }} />
                I agree to the Terms of Use and the Data Privacy Notice.
              </label>
            </div>
            <button type="button" className="btn btn--primary btn--block" onClick={() => setStep(2)}>
              Send verification code
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <div className="eyebrow">STEP 2 OF 3</div>
              <h2 className="auth__title" style={{ fontSize: 30 }}>Create your password</h2>
              <p className="auth__sub">Enter the code we emailed you, then choose a password.</p>
            </div>
            <div className="stack g18">
              <div className="field">
                <label htmlFor="a-code">Verification code</label>
                <input
                  id="a-code"
                  className="input"
                  type="text"
                  inputMode="numeric"
                  placeholder="6-digit code"
                  style={{ letterSpacing: '0.2em' }}
                />
              </div>
              <div className="field">
                <label htmlFor="a-pw">New password</label>
                <input
                  id="a-pw"
                  className="input"
                  type="password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="Create a password"
                />
              </div>
              <div className="field">
                <label htmlFor="a-pw2">Confirm password</label>
                <input
                  id="a-pw2"
                  className="input"
                  type="password"
                  value={pw2}
                  onChange={(e) => setPw2(e.target.value)}
                  placeholder="Type it again"
                />
              </div>
              <div className="rules">
                {rules.map((r) => (
                  <div key={r.label} className={'rule' + (r.ok ? ' is-ok' : '')}>
                    <span className="rule__dot">
                      <Icon name="tick" size={12} stroke={3} />
                    </span>
                    {r.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="row g12">
              <button type="button" className="btn btn--outline" style={{ minHeight: 52 }} onClick={() => setStep(1)}>
                Back
              </button>
              <button
                type="button"
                className="btn btn--primary grow"
                style={{ minHeight: 52, fontSize: 16 }}
                disabled={!allOk}
                onClick={() => setStep(3)}
              >
                Activate account
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="stack g28 items-start" role="status">
            <div
              className="icon-chip icon-chip--green"
              style={{ width: 72, height: 72, borderRadius: '50%' }}
            >
              <Icon name="tick" size={34} stroke={2.4} />
            </div>
            <div>
              <h2 className="auth__title" style={{ fontSize: 30, marginBottom: 10 }}>Your account is active</h2>
              <p className="muted" style={{ fontSize: 15, lineHeight: 1.55 }}>
                You can now sign in with your student ID and the password you just created. We also sent a
                confirmation to your email.
              </p>
            </div>
            <Link to="/" className="btn btn--primary btn--block">
              Go to sign in
            </Link>
          </div>
        )}

        <p className="muted" style={{ fontSize: 13, textAlign: 'center' }}>
          Already activated?{' '}
          <Link to="/" className="no-underline" style={{ fontWeight: 700 }}>
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
