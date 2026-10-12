import Sidebar from './Sidebar.jsx';

const ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: 'home' },
  { to: '/grades', label: 'Grades', icon: 'grades' },
  { to: '/schedule', label: 'Schedule', icon: 'calendar' },
  { to: '/enrollment', label: 'Enrollment', icon: 'enroll' },
  { to: '/profile', label: 'Profile', icon: 'user' }
];

const USER = { initials: 'AR', name: 'Ana Reyes', sub: 'BS Computer Science · 3rd Year' };

export default function StudentLayout({ children }) {
  return (
    <div className="shell">
      <Sidebar items={ITEMS} user={USER} signOutTo="/" />
      <main className="main">{children}</main>
    </div>
  );
}
