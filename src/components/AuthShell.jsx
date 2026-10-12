import Icon from './Icon.jsx';

/**
 * Two-panel layout shared by the student login, account activation
 * and faculty login screens. The left panel is brand + message,
 * the right panel receives the form as children.
 */
export default function AuthShell({ tag, headline, blurb, features, extra, footer, children }) {
  return (
    <div className="auth">
      <div className="auth__brand">
        <div className="brand brand--lg">
          <div className="brand__mark">
            <Icon name="cap" size={22} stroke={2} />
          </div>
          <div>
            <div className="brand__name">Scholara</div>
            {tag && <div className="brand__tag">{tag}</div>}
          </div>
        </div>

        <svg className="auth__deco" viewBox="0 0 400 400" width="420" height="420" aria-hidden="true">
          <rect x="20" y="20" width="360" height="360" rx="72" fill="none" stroke="#2F4BCC" strokeWidth="2" />
          <rect x="70" y="70" width="260" height="260" rx="56" fill="none" stroke="#3E5FE0" strokeWidth="2" />
          <rect x="120" y="120" width="160" height="160" rx="40" fill="#2F4BCC" fillOpacity="0.35" />
          <circle cx="200" cy="200" r="34" fill="#F2A33A" />
        </svg>

        <div className="auth__copy">
          <h1 className="auth__headline">{headline}</h1>
          <p className="auth__blurb">{blurb}</p>
          {features && (
            <ul className="auth__features">
              {features.map((f) => (
                <li key={f.text}>
                  <Icon name={f.icon} stroke={2} style={{ color: '#F2A33A', flex: 'none' }} />
                  {f.text}
                </li>
              ))}
            </ul>
          )}
          {extra}
        </div>

        <div className="auth__footer">{footer}</div>
      </div>

      <div className="auth__pane">{children}</div>
    </div>
  );
}
