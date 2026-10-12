import Sidebar from './Sidebar.jsx';

const ITEMS = [
  { to: '/faculty', label: 'Overview', icon: 'home', end: true },
  { to: '/faculty/classes', label: 'My classes', icon: 'book' },
  { to: '/faculty/grades', label: 'Grade entry', icon: 'grades' },
  { to: '/faculty/attendance', label: 'Attendance', icon: 'check' },
  { to: '/faculty/announcements', label: 'Announcements', icon: 'message' }
];

const USER = { initials: 'DC', name: 'Prof. D. Cruz', sub: 'Computer Science' };

export default function FacultyLayout({ children }) {
  return (
    <div className="shell">
      <Sidebar tag="FACULTY" items={ITEMS} user={USER} signOutTo="/faculty/login" />
      <main className="main">{children}</main>
    </div>
  );
}
