# Scholara · Student Information System (front end)

A React + Vite front end for a student information system with a student portal and a faculty portal.
It is UI only: all names, grades and counts are sample data held in the page files, and nothing talks to a server.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build locally
```

## Screens and routes

| Route | Screen |
| --- | --- |
| `/` | Student login |
| `/activate` | Student account activation (3 steps) |
| `/dashboard` | Student dashboard |
| `/grades` | Grades and GPA by term |
| `/schedule` | Weekly class schedule (week and list views) |
| `/enrollment` | Course enrollment with prerequisite checks |
| `/profile` | Student profile and notification preferences |
| `/notifications` | Notifications inbox |
| `/faculty/login` | Faculty login |
| `/faculty` | Faculty overview |
| `/faculty/classes` | My classes with roster preview |
| `/faculty/grades` | Grade entry and release |
| `/faculty/attendance` | Attendance for a session |
| `/faculty/announcements` | Post and manage announcements |

## Project layout

```
src/
  main.jsx                 router + entry
  App.jsx                  route table
  styles/global.css        design tokens (CSS variables) and shared classes
  components/
    Icon.jsx               inline SVG icon set
    Sidebar.jsx            shared navigation sidebar
    StudentLayout.jsx      sidebar + content shell for student pages
    FacultyLayout.jsx      sidebar + content shell for faculty pages
    AuthShell.jsx          two-panel layout for login and activation
  pages/
    student/               8 student screens
    faculty/               6 faculty screens
```

## Design tokens

Colors, radii and spacing live as CSS variables at the top of `src/styles/global.css`
(`--ink`, `--primary`, `--amber`, `--bg`, and the status tints). Change them there to retheme the whole app.
The font is Plus Jakarta Sans, loaded from Google Fonts in `index.html`.

## Next steps when you add a back end

- Move the sample arrays at the top of each page into `src/data/` or fetch them from your API.
- Replace the placeholder sign-in handlers in `Login.jsx` and `FacultyLogin.jsx` with real authentication,
  then guard the student and faculty routes.
- Bracketed text such as `[REGISTRAR EMAIL]` marks details your school needs to fill in.
