import { NavLink, Link } from 'react-router-dom';
import Icon from './Icon.jsx';

export default function Sidebar({ tag, items, user, signOutTo }) {
  return (
    <nav className="sidebar" aria-label="Main">
      <div className="sidebar__top">
        <div className="brand">
          <div className="brand__mark">
            <Icon name="cap" size={20} stroke={2} />
          </div>
          <div>
            <div className="brand__name">Scholara</div>
            {tag && <div className="brand__tag">{tag}</div>}
          </div>
        </div>

        <div className="nav">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => 'nav__link' + (isActive ? ' is-active' : '')}
            >
              <Icon name={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="sidebar__bottom">
        <div className="usercard">
          <div className="avatar avatar--sm">{user.initials}</div>
          <div>
            <div className="usercard__name">{user.name}</div>
            <div className="usercard__sub">{user.sub}</div>
          </div>
        </div>
        <Link to={signOutTo} className="nav__link">
          <Icon name="logout" />
          Sign out
        </Link>
      </div>
    </nav>
  );
}
