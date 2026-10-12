import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Login from './pages/student/Login.jsx';
import Activate from './pages/student/Activate.jsx';
import Dashboard from './pages/student/Dashboard.jsx';
import Grades from './pages/student/Grades.jsx';
import Schedule from './pages/student/Schedule.jsx';
import Enrollment from './pages/student/Enrollment.jsx';
import Profile from './pages/student/Profile.jsx';
import Notifications from './pages/student/Notifications.jsx';

import FacultyLogin from './pages/faculty/FacultyLogin.jsx';
import FacultyOverview from './pages/faculty/FacultyOverview.jsx';
import FacultyClasses from './pages/faculty/FacultyClasses.jsx';
import FacultyGrades from './pages/faculty/FacultyGrades.jsx';
import FacultyAttendance from './pages/faculty/FacultyAttendance.jsx';
import FacultyAnnouncements from './pages/faculty/FacultyAnnouncements.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Student */}
        <Route path="/" element={<Login />} />
        <Route path="/activate" element={<Activate />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/enrollment" element={<Enrollment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Faculty */}
        <Route path="/faculty/login" element={<FacultyLogin />} />
        <Route path="/faculty" element={<FacultyOverview />} />
        <Route path="/faculty/classes" element={<FacultyClasses />} />
        <Route path="/faculty/grades" element={<FacultyGrades />} />
        <Route path="/faculty/attendance" element={<FacultyAttendance />} />
        <Route path="/faculty/announcements" element={<FacultyAnnouncements />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
