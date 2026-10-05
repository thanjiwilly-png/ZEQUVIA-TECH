const storageKey = "zequvia-learning-portal-v1";

const initialData = {
  role: "student",
  sessionUserId: "student-alex",
  users: [
    { id: "student-alex", name: "Alex Morgan", email: "alex.morgan@atlas.example", role: "student", initials: "AM" },
    { id: "teacher-sam", name: "Sam Patel", email: "sam.patel@atlas.example", role: "teacher", initials: "SP" },
    { id: "admin-avery", name: "Avery Williams", email: "avery.williams@atlas.example", role: "admin", initials: "AW" },
    { id: "parent-jordan", name: "Jordan Morgan", email: "jordan.morgan@atlas.example", role: "parent", initials: "JM" }
  ],
  enrolled: ["math", "biology", "design"],
  completedAssignments: ["bio-lab"],
  liveClasses: [
    { id: "live-math", title: "Algebra live workshop", course: "Mathematics", teacher: "Sam Patel", date: "2026-09-30", time: "09:00 AM", duration: "45 min", room: "Room 204", attendees: 28, status: "Live now", color: "blue", recording: true, link: "https://zoom.us/j/atlas-academy-demo-math", participants: ["Alex Morgan", "Jordan Lee", "Sam Patel", "Mina Shah"], joined: true, attendanceStatus: "Present", chat: [{ author: "Sam Patel", text: "Welcome back everyone — today's focus is reviewing the last quiz." }, { author: "Alex Morgan", text: "I have a question about the final algebra step." }] },
    { id: "live-bio", title: "Cell structure clinic", course: "Life Sciences", teacher: "Taylor Kim", date: "2026-09-30", time: "11:15 AM", duration: "30 min", room: "Lab 03", attendees: 19, status: "Starting soon", color: "green", recording: false, link: "https://zoom.us/j/atlas-academy-demo-bio", participants: ["Alex Morgan", "Taylor Kim", "Jude Green"], joined: false, attendanceStatus: "Pending", chat: [{ author: "Taylor Kim", text: "Please keep your notes open while we review the lab task." }] },
    { id: "live-design", title: "Design critique session", course: "Creative Design", teacher: "Riley Chen", date: "2026-10-01", time: "02:00 PM", duration: "60 min", room: "Studio 1", attendees: 22, status: "Scheduled", color: "violet", recording: false, link: "https://zoom.us/j/atlas-academy-demo-design", participants: ["Jordan Lee", "Riley Chen"], joined: false, attendanceStatus: "Pending", chat: [{ author: "Riley Chen", text: "Bring your mockup drafts and we will review them together." }] }
  ],
  attendance: {
    present: 22,
    absent: 2,
    late: 3,
    trend: 94,
    records: [
      { day: "Mon", status: "present" },
      { day: "Tue", status: "present" },
      { day: "Wed", status: "late" },
      { day: "Thu", status: "present" },
      { day: "Fri", status: "absent" }
    ]
  },
  fees: {
    total: 725000,
    paid: 540000,
    due: 185000,
    lastPayment: "2026-08-30",
    payments: [],
    breakdown: [
      { label: "Tuition", amount: 520000 },
      { label: "Labs", amount: 98000 },
      { label: "Uniform", amount: 107000 }
    ]
  },
  exams: {
    upcoming: [
      { subject: "Mathematics", date: "2026-10-08", type: "Quiz" },
      { subject: "Life Sciences", date: "2026-10-12", type: "Class test" },
      { subject: "Creative Design", date: "2026-10-17", type: "Project review" }
    ],
    results: [
      { subject: "Mathematics", score: 91, grade: "A-" },
      { subject: "Life Sciences", score: 87, grade: "B+" },
      { subject: "Creative Design", score: 96, grade: "A" }
    ]
  },
  announcements: [
    { id: "welcome", title: "Welcome to the new term!", body: "Your 2026–27 learning portal is ready. Check your timetable and say hello to your teachers.", author: "School office", date: "2026-09-21", tone: "blue" },
    { id: "library", title: "Library hours extended", body: "The library is open until 6:00 PM on weekdays for quiet study and group projects.", author: "School office", date: "2026-09-19", tone: "violet" },
    { id: "science", title: "Science fair registration is open", body: "Share your idea with your science teacher by October 4. Every curious mind is welcome.", author: "Science department", date: "2026-09-16", tone: "green" }
  ],
  liveClassJoinLink: "https://zoom.us/j/atlas-academy-demo",
  messages: [
    { id: "msg-1", from: "Sam Patel", to: "Alex Morgan", subject: "Algebra checkpoint", body: "Your algebra practice set is improving. Please review the final question set before Friday.", time: "2026-09-28T09:15:00", unread: true, channel: "Teacher" },
    { id: "msg-2", from: "School office", to: "Jordan Morgan", subject: "Parent meeting reminder", body: "Your progress review and fee check-in is scheduled for Thursday at 4:00 PM.", time: "2026-09-27T15:40:00", unread: false, channel: "School" },
    { id: "msg-3", from: "Alex Morgan", to: "Sam Patel", subject: "Question about lab notes", body: "I am still unsure about the cell diagram labels. Could we go over them during office hours?", time: "2026-09-26T17:05:00", unread: true, channel: "Student" }
  ],
  assignments: [
    { id: "math-quiz", courseId: "math", title: "Algebra: practice set 4", due: "2026-09-30", kind: "Practice", points: 20 },
    { id: "bio-lab", courseId: "biology", title: "Cell structure lab notes", due: "2026-09-27", kind: "Lab report", points: 30 },
    { id: "design-poster", courseId: "design", title: "A poster for positive change", due: "2026-10-02", kind: "Project", points: 40 },
    { id: "math-project", courseId: "math", title: "Patterns in the real world", due: "2026-10-06", kind: "Project", points: 35 }
  ],
  people: [
    { id: "p-1", name: "Alex Morgan", email: "alex.morgan@atlas.example", role: "Student", group: "Grade 10" },
    { id: "p-2", name: "Jordan Lee", email: "jordan.lee@atlas.example", role: "Student", group: "Grade 10" },
    { id: "p-3", name: "Sam Patel", email: "sam.patel@atlas.example", role: "Teacher", group: "Mathematics" },
    { id: "p-4", name: "Taylor Kim", email: "taylor.kim@atlas.example", role: "Teacher", group: "Science" }
  ]
};

let courses = [
  { id: "math", name: "Mathematics", teacher: "Sam Patel", room: "Room 204", progress: 72, lessons: 18, color: "blue", icon: "∑", next: "Algebra & patterns" },
  { id: "biology", name: "Life Sciences", teacher: "Taylor Kim", room: "Lab 03", progress: 58, lessons: 14, color: "green", icon: "✳", next: "Inside the cell" },
  { id: "design", name: "Creative Design", teacher: "Riley Chen", room: "Studio 1", progress: 84, lessons: 22, color: "violet", icon: "✎", next: "Design that makes a difference" },
  { id: "english", name: "English Language", teacher: "Morgan James", room: "Room 112", progress: 41, lessons: 16, color: "amber", icon: "Aa", next: "Stories and perspective" },
  { id: "history", name: "World History", teacher: "Casey Brown", room: "Room 108", progress: 35, lessons: 12, color: "rose", icon: "◷", next: "A changing world" }
];
initialData.courses = structuredClone(courses);

const timetable = [
  { day: "Monday", date: "28", lessons: [{ time: "08:30", course: "Mathematics", room: "Room 204", color: "blue" }, { time: "10:15", course: "Life Sciences", room: "Lab 03", color: "green" }, { time: "13:00", course: "English Language", room: "Room 112", color: "amber" }] },
  { day: "Tuesday", date: "29", lessons: [{ time: "09:15", course: "Creative Design", room: "Studio 1", color: "violet" }, { time: "11:00", course: "World History", room: "Room 108", color: "rose" }, { time: "14:00", course: "Mathematics", room: "Room 204", color: "blue" }] },
  { day: "Wednesday", date: "30", lessons: [{ time: "08:30", course: "Life Sciences", room: "Lab 03", color: "green" }, { time: "10:15", course: "English Language", room: "Room 112", color: "amber" }] },
  { day: "Thursday", date: "01", lessons: [{ time: "09:15", course: "Mathematics", room: "Room 204", color: "blue" }, { time: "11:00", course: "Creative Design", room: "Studio 1", color: "violet" }] },
  { day: "Friday", date: "02", lessons: [{ time: "08:30", course: "World History", room: "Room 108", color: "rose" }, { time: "10:15", course: "Life Sciences", room: "Lab 03", color: "green" }, { time: "13:00", course: "English Language", room: "Room 112", color: "amber" }] }
];

const peopleForRole = {
  student: { name: "Alex Morgan", initials: "AM", label: "Student" },
  teacher: { name: "Sam Patel", initials: "SP", label: "Teacher" },
  admin: { name: "Avery Williams", initials: "AW", label: "Administrator" },
  parent: { name: "Jordan Morgan", initials: "JM", label: "Parent" }
};

const titles = {
  dashboard: "Overview",
  courses: "My courses",
  assignments: "Assignments",
  schedule: "Schedule",
  grades: "Grades",
  attendance: "Attendance",
  fees: "Fees",
  exams: "Exams",
  announcements: "Announcements",
  people: "People",
  profile: "My profile"
};

const viewContent = document.getElementById("viewContent");
const toast = document.getElementById("toast");
const dialog = document.getElementById("actionDialog");
const dialogForm = document.getElementById("actionForm");
const dialogFields = document.getElementById("dialogFields");
const supabaseConfig = window.ZEQUVIA_SUPABASE_CONFIG;
const supabaseClient = supabaseConfig && window.supabase
  ? window.supabase.createClient(supabaseConfig.url, supabaseConfig.publishableKey)
  : null;
let activeView = "dashboard";
let searchTerm = "";
let toastTimer;
let authUser = null;
let schoolMembership = null;
let membershipLoadError = "";

function loadData() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return structuredClone(initialData);
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Saved portal data has an invalid shape.");
    }
    const users = Array.isArray(parsed.users)
      ? parsed.users
        .filter((user) => user && typeof user.id === "string" && typeof user.name === "string")
        .map((user) => ({
          id: user.id,
          name: user.name,
          email: typeof user.email === "string" ? user.email : "",
          role: ["student", "teacher", "admin", "parent"].includes(user.role) ? user.role : "student",
          initials: typeof user.initials === "string" ? user.initials : user.name.split(" ").map((part) => part[0]).join("")
        }))
      : [];
    return {
      ...structuredClone(initialData),
      ...parsed,
      role: ["student", "teacher", "admin", "parent"].includes(parsed.role) ? parsed.role : "student",
      sessionUserId: typeof parsed.sessionUserId === "string" ? parsed.sessionUserId : initialData.sessionUserId,
      users: users.length ? users : initialData.users,
      enrolled: Array.isArray(parsed.enrolled) ? parsed.enrolled : initialData.enrolled,
      completedAssignments: Array.isArray(parsed.completedAssignments) ? parsed.completedAssignments : initialData.completedAssignments,
      announcements: Array.isArray(parsed.announcements) ? parsed.announcements : initialData.announcements,
      assignments: Array.isArray(parsed.assignments) ? parsed.assignments : initialData.assignments,
      courses: Array.isArray(parsed.courses) ? parsed.courses : initialData.courses,
      people: Array.isArray(parsed.people) ? parsed.people : initialData.people,
      liveClasses: Array.isArray(parsed.liveClasses) ? parsed.liveClasses : initialData.liveClasses,
      liveClassJoinLink: typeof parsed.liveClassJoinLink === "string" ? parsed.liveClassJoinLink : initialData.liveClassJoinLink,
      attendance: {
        ...structuredClone(initialData.attendance),
        ...(parsed.attendance || {}),
        records: Array.isArray(parsed.attendance?.records) ? parsed.attendance.records : initialData.attendance.records
      },
      fees: {
        ...structuredClone(initialData.fees),
        ...(parsed.fees || {}),
        breakdown: Array.isArray(parsed.fees?.breakdown) ? parsed.fees.breakdown : initialData.fees.breakdown,
        payments: Array.isArray(parsed.fees?.payments) ? parsed.fees.payments : []
      },
      exams: {
        ...structuredClone(initialData.exams),
        ...(parsed.exams || {}),
        upcoming: Array.isArray(parsed.exams?.upcoming) ? parsed.exams.upcoming : initialData.exams.upcoming,
        results: Array.isArray(parsed.exams?.results) ? parsed.exams.results : initialData.exams.results
      }
    };
  } catch (error) {
    showToast("Saved demo data could not be read. Starting with sample data.", true);
    return structuredClone(initialData);
  }
}

let data = loadData();
courses = data.courses;

function getCurrentUser() {
  if (!authUser || !schoolMembership) return null;
  const fullName = schoolMembership.profile?.full_name || authUser.email?.split("@")[0] || "School user";
  return {
    id: authUser.id,
    name: fullName,
    email: authUser.email || "",
    role: schoolMembership.role,
    initials: fullName.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()
  };
}

function persist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
    return true;
  } catch (error) {
    showToast("Changes are temporary because browser storage is unavailable.", true);
    return false;
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function formatDate(value, options = { month: "short", day: "numeric" }) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-US", options);
}

function showToast(message, warning = false) {
  toast.textContent = message;
  toast.classList.toggle("warning", warning);
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3600);
}

function courseById(id) {
  return courses.find((course) => course.id === id) || courses[0];
}

function canManageSchool() {
  return ["teacher", "admin"].includes(data.role);
}

function formatCurrency(value) {
  return `₦${Number(value || 0).toLocaleString()}`;
}

function getAttendanceSummary(attendance) {
  const records = Array.isArray(attendance?.records) ? attendance.records : [];
  const summary = { present: Number(attendance?.present || 0), late: Number(attendance?.late || 0), absent: Number(attendance?.absent || 0), trend: Number(attendance?.trend || 0), records };
  if (records.length) {
    const numbers = records.reduce((acc, record) => {
      const status = record.status || "absent";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, { present: 0, late: 0, absent: 0 });
    summary.present = numbers.present;
    summary.late = numbers.late;
    summary.absent = numbers.absent;
    summary.trend = Math.max(0, Math.min(100, Math.round((numbers.present / records.length) * 100)));
  }
  return summary;
}

function gradeForScore(score) {
  const value = Number(score);
  if (Number.isNaN(value)) return "—";
  if (value >= 90) return "A";
  if (value >= 80) return "A-";
  if (value >= 70) return "B";
  if (value >= 60) return "B-";
  if (value >= 50) return "C";
  if (value >= 40) return "D";
  return "E";
}

function assignmentCard(assignment) {
  const course = courseById(assignment.courseId);
  const complete = data.completedAssignments.includes(assignment.id);
  const isTeacher = canManageSchool();
  return `<article class="ed-assignment ${complete ? "is-complete" : ""}">
    <span class="ed-assignment-mark ${course.color}" aria-hidden="true">${complete ? "✓" : course.icon}</span>
    <div class="ed-assignment-copy"><span class="ed-overline">${escapeHTML(course.name)} · ${escapeHTML(assignment.kind)}</span><strong>${escapeHTML(assignment.title)}</strong><small>Due ${formatDate(assignment.due)} · ${assignment.points} points</small></div>
    ${isTeacher ? `<span class="ed-assignment-state">${complete ? "Completed" : "Assigned"}</span>` : `<button class="ed-button ${complete ? "ed-button-light" : "ed-button-primary"} ed-complete-button" data-toggle-assignment="${escapeHTML(assignment.id)}" type="button">${complete ? "Completed" : "Mark done"}</button>`}
  </article>`;
}

function courseCard(course) {
  const enrolled = data.enrolled.includes(course.id);
  return `<article class="ed-course-card">
    <div class="ed-course-top"><span class="ed-course-icon ${course.color}">${course.icon}</span><button class="ed-more-button" type="button" aria-label="More about ${escapeHTML(course.name)}" data-course-info="${course.id}">···</button></div>
    <span class="ed-overline">${escapeHTML(course.room)} · ${course.lessons} lessons</span>
    <h3>${escapeHTML(course.name)}</h3><p>${escapeHTML(course.next)}</p>
    <div class="ed-progress-label"><span>${data.role === "student" ? "Your progress" : "Class progress"}</span><strong>${course.progress}%</strong></div>
    <div class="ed-progress"><span style="width:${course.progress}%"></span></div>
    <div class="ed-course-footer"><span class="ed-teacher-avatar">${escapeHTML(course.teacher.split(" ").map((part) => part[0]).join(""))}</span><span>${escapeHTML(course.teacher)}</span>${data.role === "student" ? `<button class="ed-text-button" type="button" data-enroll-course="${course.id}">${enrolled ? "Enrolled ✓" : "Join course"}</button>` : ""}</div>
  </article>`;
}

function statCard(label, value, note, icon, color) {
  return `<article class="ed-stat-card"><span class="ed-stat-icon ${color}" aria-hidden="true">${icon}</span><div><span class="ed-stat-label">${label}</span><strong>${value}</strong><small>${note}</small></div></article>`;
}

function renderDashboard() {
  const isStudent = data.role === "student";
  const isParent = data.role === "parent";
  const person = peopleForRole[data.role];
  const openAssignments = data.assignments.filter((assignment) => !data.completedAssignments.includes(assignment.id));
  const todaysLessons = timetable[0].lessons;
  const parentSummary = {
    attendance: getAttendanceSummary(data.attendance),
    outstanding: (data.fees?.due || 0),
    average: "A−"
  };
  return `<section class="ed-welcome">
    <div><span class="ed-date-label">${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span><h1>Good morning, ${person.name.split(" ")[0]} <span aria-hidden="true">✦</span></h1>
    <p>${isStudent ? "A new week is full of possibilities. Here's what’s happening with your learning." : isParent ? "Here’s a quick check-in on your child’s progress, attendance, and financial updates." : data.role === "teacher" ? "Here’s a quick look at your classes and what needs your attention." : "Your school at a glance. Keep your community moving forward."}</p></div>
    <button class="ed-button ed-button-primary" type="button" data-go-view="${isStudent ? "courses" : isParent ? "fees" : "assignments"}">${isStudent ? "Explore courses" : isParent ? "View fees" : "Manage learning"} <span aria-hidden="true">↗</span></button>
  </section>
  <section class="ed-stat-grid" aria-label="Learning summary">
    ${statCard(isParent ? "Child’s progress" : isStudent ? "Active courses" : "Active classes", isParent ? parentSummary.average : isStudent ? data.enrolled.length : courses.length, isParent ? "Across core subjects" : isStudent ? "Keep your momentum going" : "Across this school term", "▤", "blue")}
    ${statCard(isParent ? "Attendance" : isStudent ? "To-do this week" : "Pending work", isParent ? `${parentSummary.attendance.trend}%` : openAssignments.length, isParent ? "Present this month" : isStudent ? "A little progress adds up" : "Assignments to review", "☷", "amber")}
    ${statCard(isParent ? "Outstanding fees" : isStudent ? "Average grade" : "Class attendance", isParent ? formatCurrency(parentSummary.outstanding) : isStudent ? "A−" : "96%", isParent ? "Due before term close" : isStudent ? "You’re doing great" : "Across active classes", "◇", "violet")}
    ${statCard(isParent ? "Important notices" : isStudent ? "Learning streak" : "School community", isParent ? data.announcements.length : isStudent ? "6 days" : data.people.length, isParent ? "School messages" : isStudent ? "You’re building a habit" : "People in your directory", "✳", "green")}
  </section>
  <div class="ed-dashboard-grid">
    <section class="ed-panel ed-panel-courses"><div class="ed-panel-heading"><div><span class="ed-overline">${isParent ? "STUDENT SNAPSHOT" : isStudent ? "PICK UP WHERE YOU LEFT OFF" : "YOUR CLASSROOM"}</span><h2>${isParent ? "Current focus" : isStudent ? "Your courses" : "Your classes"}</h2></div><button class="ed-text-button" type="button" data-go-view="courses">View all <span aria-hidden="true">→</span></button></div><div class="ed-mini-courses">${courses.filter((course) => !isStudent && !isParent || data.enrolled.includes(course.id)).slice(0, 3).map((course) => `<button class="ed-mini-course" type="button" data-course-info="${course.id}"><span class="ed-course-icon ${course.color}">${course.icon}</span><span><strong>${escapeHTML(course.name)}</strong><small>${escapeHTML(course.next)}</small><span class="ed-mini-progress"><i style="width:${course.progress}%"></i></span></span><span class="ed-mini-percent">${course.progress}%</span></button>`).join("") || emptyState("No courses yet", "Join a course to get started.")}</div></section>
    <section class="ed-panel ed-panel-today"><div class="ed-panel-heading"><div><span class="ed-overline">MONDAY · SEPTEMBER 28</span><h2>Today’s schedule</h2></div><button class="ed-text-button" type="button" data-go-view="schedule">Full schedule <span aria-hidden="true">→</span></button></div><div class="ed-today-list">${todaysLessons.map((lesson, index) => `<div class="ed-today-item ${index === 0 ? "current" : ""}"><time>${lesson.time}</time><span class="ed-timeline-dot ${lesson.color}"></span><div><strong>${lesson.course}</strong><small>${lesson.room}</small></div>${index === 0 ? `<span class="ed-live-pill">NEXT UP</span>` : ""}</div>`).join("")}</div></section>
    <section class="ed-panel ed-panel-work"><div class="ed-panel-heading"><div><span class="ed-overline">${isParent ? "KEEPING YOU INFORMED" : "SMALL STEPS, BIG PROGRESS"}</span><h2>${isParent ? "Recent updates" : isStudent ? "Coming up" : "Assignment activity"}</h2></div><button class="ed-text-button" type="button" data-go-view="${isParent ? "announcements" : "assignments"}">${isParent ? "All updates" : "See all"} <span aria-hidden="true">→</span></button></div><div class="ed-assignment-list">${isParent ? data.announcements.slice(0, 3).map((item) => `<article class="ed-assignment"><span class="ed-assignment-mark blue" aria-hidden="true">✳</span><div class="ed-assignment-copy"><span class="ed-overline">${escapeHTML(item.author)}</span><strong>${escapeHTML(item.title)}</strong><small>${formatDate(item.date)} · ${escapeHTML(item.body.slice(0, 38))}${item.body.length > 38 ? "…" : ""}</small></div></article>`).join("") : openAssignments.slice(0, 3).map(assignmentCard).join("") || emptyState("All caught up!", "You’ve made it through your assignments.")}</div></section>
    <section class="ed-panel ed-panel-notice"><div class="ed-panel-heading"><div><span class="ed-overline">A NOTE FROM YOUR SCHOOL</span><h2>Latest update</h2></div><button class="ed-icon-button small" type="button" data-go-view="announcements" aria-label="All announcements">→</button></div>${announcementCard(data.announcements[0])}</section>
  </div>`;
}

function emptyState(title, message) {
  return `<div class="ed-empty-state"><span aria-hidden="true">✦</span><strong>${title}</strong><p>${message}</p></div>`;
}

function announcementCard(item) {
  if (!item) return emptyState("Nothing new", "Check back for school updates.");
  return `<article class="ed-announcement-card"><span class="ed-announcement-icon ${item.tone || "blue"}" aria-hidden="true">✳</span><div><div class="ed-announcement-meta">${formatDate(item.date, { month: "long", day: "numeric" })} <span>·</span> ${escapeHTML(item.author)}</div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.body)}</p></div></article>`;
}

function renderCourses() {
  const visibleCourses = courses.filter((course) => `${course.name} ${course.teacher} ${course.next}`.toLowerCase().includes(searchTerm.toLowerCase()));
  const canCreate = canManageSchool();
  return `<section class="ed-page-heading"><div><span class="ed-date-label">YOUR LEARNING SPACE</span><h1>${data.role === "student" || data.role === "parent" ? "My courses" : "Classes & courses"}</h1><p>Every lesson is another step toward something great.</p></div>${canCreate ? `<button class="ed-button ed-button-primary" type="button" data-action="new-course">＋ Create course</button>` : ""}</section>
    <div class="ed-toolbar"><label class="ed-search"><span aria-hidden="true">⌕</span><input id="courseSearch" type="search" value="${escapeHTML(searchTerm)}" placeholder="Search courses or teachers" aria-label="Search courses" /></label><span class="ed-result-count">${visibleCourses.length} courses</span></div>
    <section class="ed-course-grid">${visibleCourses.map(courseCard).join("") || emptyState("No courses found", "Try another search term.")}</section>`;
}

function renderAssignments() {
  const assignments = [...data.assignments].sort((a, b) => a.due.localeCompare(b.due));
  const open = assignments.filter((item) => !data.completedAssignments.includes(item.id));
  const complete = assignments.filter((item) => data.completedAssignments.includes(item.id));
  const canCreate = canManageSchool();
  return `<section class="ed-page-heading"><div><span class="ed-date-label">STAY ON TOP OF YOUR WORK</span><h1>Assignments</h1><p>${data.role === "student" || data.role === "parent" ? "One thing at a time. You’ve got this." : "Create work for your students and keep track of what’s assigned."}</p></div>${canCreate ? `<button class="ed-button ed-button-primary" type="button" data-action="new-assignment">＋ New assignment</button>` : ""}</section>
    <div class="ed-assignment-summary"><span><strong>${open.length}</strong> ${data.role === "student" ? "to do" : "active"}</span><span><strong>${complete.length}</strong> completed</span><span><strong>${assignments.length}</strong> total</span></div>
    <section class="ed-panel ed-full-panel"><div class="ed-panel-heading"><div><span class="ed-overline">UP NEXT</span><h2>${data.role === "student" ? "Your to-do list" : "Assigned work"}</h2></div></div><div class="ed-assignment-list">${open.map(assignmentCard).join("") || emptyState("Nothing due right now", "Enjoy the breathing room.")}</div></section>
    ${complete.length ? `<section class="ed-panel ed-full-panel ed-completed-panel"><div class="ed-panel-heading"><div><span class="ed-overline">LOOK AT YOU GO</span><h2>Completed</h2></div></div><div class="ed-assignment-list">${complete.map(assignmentCard).join("")}</div></section>` : ""}`;
}

function renderSchedule() {
  const liveClasses = (data.liveClasses || []).slice(0, 3);
  const canManage = canManageSchool();
  return `<section class="ed-page-heading"><div><span class="ed-date-label">WEEK OF SEPTEMBER 28, 2026</span><h1>Your schedule</h1><p>A little structure leaves more room to learn.</p></div><button class="ed-button ed-button-light" type="button" data-action="schedule-note">▦ This week</button></section>
    <section class="ed-panel ed-full-panel ed-live-panel"><div class="ed-panel-heading"><div><span class="ed-overline">LIVE CLASSES</span><h2>Join now</h2></div>${canManage ? `<div class="ed-live-actions"><button class="ed-button ed-button-light" type="button" data-live-action="new-live-class">＋ New session</button></div>` : `<a class="ed-button ed-button-primary" href="${escapeHTML(data.liveClassJoinLink || "#")}" target="_blank" rel="noreferrer" aria-label="Join a live class">Live room ↗</a>`}</div>
      <div class="ed-live-grid">${liveClasses.map((item) => `<article class="ed-live-card ${item.color}"><div class="ed-live-head"><span class="ed-live-status">${escapeHTML(item.status)}</span><span class="ed-live-time">${escapeHTML(item.time)}</span></div><h3>${escapeHTML(item.title)}</h3><div class="ed-live-meta"><span>${escapeHTML(item.course)}</span><span>${escapeHTML(item.teacher)}</span><span>${escapeHTML(item.room)}</span></div><div class="ed-live-footer"><small>${item.attendees} attending${item.recording ? " · recording" : ""}</small><div class="ed-live-buttons"><button type="button" data-live-join="${escapeHTML(item.id)}">Join</button>${canManage ? `<button type="button" data-live-action="toggle-live-status" data-live-id="${escapeHTML(item.id)}">${item.status === "Live now" ? "Pause" : "Start"}</button>` : ""}</div></div></article>`).join("") || emptyState("No live classes scheduled", "Check back soon for new sessions.")}</div>
    </section>
    <section class="ed-week-grid">${timetable.map((day, index) => `<article class="ed-day-card ${index === 0 ? "today" : ""}"><div class="ed-day-heading"><span>${day.day}</span><strong>${day.date}</strong></div>${day.lessons.map((lesson) => `<div class="ed-day-lesson ${lesson.color}"><time>${lesson.time}</time><strong>${lesson.course}</strong><small>${lesson.room}</small></div>`).join("") || `<p class="ed-day-free">A little time to recharge.</p>`}</article>`).join("")}</section>
    <p class="ed-demo-note">Sample timetable shown for demonstration. Your school can configure its own term dates and class times.</p>`;
}

function renderGrades() {
  const grades = [
    { course: "Mathematics", color: "blue", grade: "A−", percent: 91, note: "Consistent progress" },
    { course: "Life Sciences", color: "green", grade: "B+", percent: 87, note: "Strong lab work" },
    { course: "Creative Design", color: "violet", grade: "A", percent: 96, note: "Excellent project work" },
    { course: "English Language", color: "amber", grade: "B", percent: 83, note: "Growing confidence" },
    { course: "World History", color: "rose", grade: "B+", percent: 88, note: "Thoughtful contributions" }
  ];
  return `<section class="ed-page-heading"><div><span class="ed-date-label">TERM 1 · 2026–27</span><h1>Grades & progress</h1><p>Progress isn’t just a number. See how your learning is taking shape.</p></div><span class="ed-grade-average"><strong>A−</strong><small>Overall average</small></span></section>
    <section class="ed-panel ed-full-panel"><div class="ed-panel-heading"><div><span class="ed-overline">YOUR COURSES</span><h2>Term progress</h2></div><span class="ed-term-pill">Term 1</span></div><div class="ed-grade-list">${grades.map((grade) => `<article class="ed-grade-row"><span class="ed-grade-course-icon ${grade.color}">${courseById(({ "Mathematics": "math", "Life Sciences": "biology", "Creative Design": "design" })[grade.course] || "history").icon}</span><div class="ed-grade-course"><strong>${grade.course}</strong><small>${grade.note}</small></div><div class="ed-grade-meter"><span><i style="width:${grade.percent}%"></i></span><small>${grade.percent}%</small></div><strong class="ed-grade-mark">${grade.grade}</strong></article>`).join("")}</div></section>
    <div class="ed-notice-strip"><span aria-hidden="true">✦</span><p>Grades are here to help you spot what’s working and where a little extra practice can help. Keep asking questions.</p></div>
    <p class="ed-demo-note">Sample grades shown for demonstration. Official records are managed by your school.</p>`;
}

function renderAttendance() {
  const attendance = getAttendanceSummary(data.attendance || { present: 22, absent: 2, late: 3, trend: 94, records: [] });
  const presentPercent = Math.max(0, Math.min(100, attendance.trend));
  const canRecord = canManageSchool();
  return `<section class="ed-page-heading"><div><span class="ed-date-label">THIS MONTH</span><h1>Attendance overview</h1><p>Small routines add up. Keep showing up with purpose.</p></div><div class="ed-page-actions">${canRecord ? `<button class="ed-button ed-button-primary" type="button" data-action="new-attendance">＋ Record attendance</button>` : ""}<span class="ed-grade-average"><strong>${attendance.trend}%</strong><small>Present rate</small></span></div></section>
    <section class="ed-stat-grid" aria-label="Attendance summary">
      ${statCard("Present", attendance.present, "Days attended", "◎", "green")}
      ${statCard("Late", attendance.late, "Late arrivals", "◔", "amber")}
      ${statCard("Absent", attendance.absent, "Unexplained absences", "◌", "rose")}
      ${statCard("Trend", `${attendance.trend}%`, "Across the week", "↗", "blue")}
    </section>
    <section class="ed-panel ed-full-panel"><div class="ed-panel-heading"><div><span class="ed-overline">WEEKLY SUMMARY</span><h2>Attendance record</h2></div></div>
      <div class="ed-attendance-row">${attendance.records.map((record) => `<div class="ed-attendance-pill ${record.status}"><span>${record.day}</span><strong>${record.status === 'present' ? 'Present' : record.status === 'late' ? 'Late' : 'Absent'}</strong></div>`).join("") || emptyState("No attendance logged", "Record a class presence update here.")}</div>
      <div class="ed-mini-progress attendance-meter"><i style="width:${presentPercent}%"></i></div>
      <p class="ed-demo-note">Your attendance is strong, and the school is monitoring the late arrivals for support.</p>
    </section>`;
}

function renderFees() {
  const fees = data.fees || { total: 0, paid: 0, due: 0, lastPayment: "—", breakdown: [], payments: [] };
  const paidPct = fees.total ? Math.round((fees.paid / fees.total) * 100) : 0;
  const canRecord = canManageSchool();
  return `<section class="ed-page-heading"><div><span class="ed-date-label">FINANCE</span><h1>School fees</h1><p>Clear payment tracking keeps every commitment on schedule.</p></div><div class="ed-page-actions">${canRecord ? `<button class="ed-button ed-button-primary" type="button" data-action="new-payment">＋ Record payment</button>` : ""}<span class="ed-grade-average"><strong>${formatCurrency(fees.due || 0)}</strong><small>Outstanding</small></span></div></section>
    <section class="ed-stat-grid">
      ${statCard("Total fees", formatCurrency(fees.total), "Approved annual plan", "₦", "blue")}
      ${statCard("Paid", formatCurrency(fees.paid), `${paidPct}% settled`, "✓", "green")}
      ${statCard("Due now", formatCurrency(fees.due), "Next payment window", "◌", "amber")}
      ${statCard("Last payment", fees.lastPayment ? formatDate(fees.lastPayment) : "No payment yet", "Updated on record", "⏱", "violet")}
    </section>
    <section class="ed-panel ed-full-panel"><div class="ed-panel-heading"><div><span class="ed-overline">BREAKDOWN</span><h2>Fee schedule</h2></div></div>
      <div class="ed-fee-list">${(fees.breakdown || []).map((item) => `<div class="ed-fee-row"><span>${escapeHTML(item.label)}</span><strong>${formatCurrency(item.amount)}</strong></div>`).join("") || emptyState("No fee data", "This school account is empty.")}</div>
      <div class="ed-mini-progress attendance-meter"><i style="width:${paidPct}%"></i></div>
      <p class="ed-demo-note">This fee summary is a prototype. Real payment records and notifications would be managed through your Student Information System.</p>
    </section>
    ${(fees.payments || []).length ? `<section class="ed-panel ed-full-panel"><div class="ed-panel-heading"><div><span class="ed-overline">PAYMENTS</span><h2>Recent settlements</h2></div></div><div class="ed-fee-list">${fees.payments.slice().reverse().slice(0, 5).map((payment) => `<div class="ed-fee-row"><span>${escapeHTML(payment.note || "School fee payment")}</span><strong>${formatCurrency(payment.amount)} · ${formatDate(payment.date)}</strong></div>`).join("")}</div></section>` : ""}`;
}

function renderExams() {
  const exams = data.exams || { upcoming: [], results: [] };
  const canRecord = canManageSchool();
  return `<section class="ed-page-heading"><div><span class="ed-date-label">ASSESSMENTS</span><h1>Exams & outcomes</h1><p>Review the next milestones and track how performance is building.</p></div><div class="ed-page-actions">${canRecord ? `<button class="ed-button ed-button-primary" type="button" data-action="new-exam">＋ Add exam</button>` : ""}<span class="ed-grade-average"><strong>${exams.results.length ? exams.results[0].grade : "A"}</strong><small>Latest result</small></span></div></section>
    <section class="ed-panel ed-full-panel"><div class="ed-panel-heading"><div><span class="ed-overline">UPCOMING</span><h2>Assessment calendar</h2></div></div>
      <div class="ed-exam-list">${(exams.upcoming || []).map((exam) => `<div class="ed-exam-row"><span>${escapeHTML(exam.subject)}</span><strong>${escapeHTML(exam.type)}</strong><small>${formatDate(exam.date)}</small></div>`).join("") || emptyState("No upcoming exams", "You are all set for now.")}</div>
    </section>
    <section class="ed-panel ed-full-panel"><div class="ed-panel-heading"><div><span class="ed-overline">RESULTS</span><h2>Recent performance</h2></div></div>
      <div class="ed-exam-results">${(exams.results || []).map((result) => `<div class="ed-exam-result"><span>${escapeHTML(result.subject)}</span><strong>${result.grade}</strong><small>${result.score}%</small></div>`).join("") || emptyState("No exam results yet", "Record scores when ready.")}</div>
    </section>`;
}

function renderAnnouncements() {
  const canPost = canManageSchool();
  return `<section class="ed-page-heading"><div><span class="ed-date-label">THE LATEST FROM ATLAS ACADEMY</span><h1>Announcements</h1><p>One place for the updates, reminders, and good things worth sharing.</p></div>${canPost ? `<button class="ed-button ed-button-primary" type="button" data-action="new-announcement">＋ Post an update</button>` : ""}</section>
    <section class="ed-announcement-feed">${[...data.announcements].sort((a, b) => b.date.localeCompare(a.date)).map((item) => `<article class="ed-panel ed-feed-item">${announcementCard(item)}</article>`).join("") || emptyState("No announcements yet", "School updates will show up here.")}</section>`;
}

function renderPeople() {
  if (data.role !== "admin") return renderDashboard();
  return `<section class="ed-page-heading"><div><span class="ed-date-label">YOUR SCHOOL COMMUNITY</span><h1>People</h1><p>Keep your school directory in one easy-to-find place.</p></div><button class="ed-button ed-button-primary" type="button" data-action="new-person">＋ Add a person</button></section>
    <section class="ed-panel ed-full-panel"><div class="ed-panel-heading"><div><span class="ed-overline">DIRECTORY</span><h2>${data.people.length} people</h2></div><label class="ed-search ed-people-search"><span aria-hidden="true">⌕</span><input id="peopleSearch" type="search" placeholder="Search directory" aria-label="Search directory" /></label></div><div class="ed-people-table-wrap"><table class="ed-people-table"><thead><tr><th>Name</th><th>Role</th><th>Group</th><th>Email</th></tr></thead><tbody id="peopleRows">${peopleRows(data.people)}</tbody></table></div></section>
    <p class="ed-demo-note">This browser-only demo does not create login credentials or send invitations.</p>`;
}

function peopleRows(people) {
  return people.map((person) => `<tr><td><span class="ed-person-cell"><span class="ed-avatar small">${escapeHTML(person.name.split(" ").map((part) => part[0]).join(""))}</span><strong>${escapeHTML(person.name)}</strong></span></td><td><span class="ed-person-role ${person.role.toLowerCase()}">${escapeHTML(person.role)}</span></td><td>${escapeHTML(person.group)}</td><td>${escapeHTML(person.email)}</td></tr>`).join("") || `<tr><td colspan="4">No people found.</td></tr>`;
}

function renderProfile() {
  const person = peopleForRole[data.role];
  const note = data.role === "parent"
    ? "This parent profile keeps track of a student’s schedule, fee status, and key school updates."
    : "This is a demo profile. Authentication and personal account settings are not connected in this browser-only prototype.";
  return `<section class="ed-page-heading"><div><span class="ed-date-label">YOUR ACCOUNT</span><h1>My profile</h1><p>${data.role === "parent" ? "A quick snapshot of your family’s learning journey." : "A friendly face behind the learning."}</p></div></section>
    <section class="ed-panel ed-profile-panel"><span class="ed-avatar large">${person.initials}</span><div><span class="ed-overline">DEMO ${person.label.toUpperCase()}</span><h2>${person.name}</h2><p>${person.name.toLowerCase().replace(" ", ".")}@atlas.example</p><span class="ed-role-badge">${person.label}</span></div></section>
    <div class="ed-notice-strip"><span aria-hidden="true">ⓘ</span><p>${note}</p></div>`;
}

function render() {
  const currentUser = getCurrentUser();
  const connectionStatus = document.getElementById("connectionStatus");
  if (!supabaseClient) {
    connectionStatus.textContent = "CONFIG REQUIRED";
    viewContent.innerHTML = `<section class="ed-auth-required"><span class="ed-date-label">PORTAL SETUP</span><h1>Supabase configuration is missing</h1><p>Check the public project settings in <code>supabase/config.js</code>, then reload the page.</p></section>`;
    return;
  }
  if (!authUser) {
    connectionStatus.textContent = "SIGN IN REQUIRED";
    viewContent.innerHTML = `<section class="ed-auth-required"><span class="ed-date-label">SECURE ACCESS</span><h1>Sign in to your school account</h1><p>Your school portal is private. Sign in with the account created by your school administrator.</p><button class="ed-button ed-button-primary" type="button" data-action="sign-in">Sign in</button></section>`;
    return;
  }
  if (membershipLoadError) {
    connectionStatus.textContent = "DATABASE SETUP REQUIRED";
    viewContent.innerHTML = `<section class="ed-auth-required"><span class="ed-date-label">SCHOOL ACCESS</span><h1>Could not load school access</h1><p>${escapeHTML(membershipLoadError)}</p><p>Confirm the database schema is installed and the account has one valid school membership.</p><button class="ed-button ed-button-light" type="button" data-action="sign-out">Sign out</button></section>`;
    return;
  }
  if (!schoolMembership) {
    connectionStatus.textContent = "SCHOOL SETUP REQUIRED";
    viewContent.innerHTML = `<section class="ed-auth-required"><span class="ed-date-label">SCHOOL ACCESS</span><h1>Your account is not linked to a school</h1><p>You are authenticated, but an administrator must add your account to a school membership before the portal can open.</p><button class="ed-button ed-button-light" type="button" data-action="sign-out">Sign out</button></section>`;
    return;
  }
  data.role = schoolMembership.role;
  connectionStatus.textContent = "AUTHENTICATED · DEMO RECORDS";
  if (!titles[activeView]) activeView = "dashboard";
  if (activeView === "people" && data.role !== "admin") activeView = "dashboard";
  document.getElementById("pageCrumb").textContent = titles[activeView];
  document.querySelectorAll(".ed-nav [data-view]").forEach((link) => {
    link.classList.toggle("active", link.dataset.view === activeView);
  });
  document.querySelectorAll("[data-admin-only]").forEach((item) => {
    item.hidden = data.role !== "admin";
  });
  const renderers = {
    dashboard: renderDashboard,
    courses: renderCourses,
    assignments: renderAssignments,
    schedule: renderSchedule,
    grades: renderGrades,
    attendance: renderAttendance,
    fees: renderFees,
    exams: renderExams,
    announcements: renderAnnouncements,
    people: renderPeople,
    profile: renderProfile
  };
  viewContent.innerHTML = renderers[activeView]();
  viewContent.insertAdjacentHTML("afterbegin", `<aside class="ed-demo-data-warning" role="note"><strong>Demo records only:</strong> sign-in is connected to Supabase, but course, assignment, fee, attendance, and other school records on this screen are still sample browser data. Do not enter real student information.</aside>`);
  const person = { name: currentUser.name, initials: currentUser.initials, label: currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1) };
  document.getElementById("userName").innerHTML = `${escapeHTML(person.name)}<small id="userRole">${escapeHTML(person.label)}</small>`;
  document.getElementById("userAvatar").textContent = person.initials;
  document.querySelector(".ed-breadcrumb > span:first-child").textContent = schoolMembership.school?.name || "Your school";
  document.getElementById("assignmentCount").textContent = data.role === "student"
    ? data.assignments.filter((assignment) => !data.completedAssignments.includes(assignment.id)).length
    : "";
  document.getElementById("announcementDot").classList.toggle("unread", data.announcements.length > 0);
  document.getElementById("currentYear").textContent = new Date().getFullYear();
}

function openDialog(title, fields, submitLabel, onSubmit) {
  document.getElementById("dialogTitle").textContent = title;
  document.getElementById("dialogSubmit").textContent = submitLabel;
  dialogFields.innerHTML = fields;
  dialogForm.onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(dialogForm);
    if (onSubmit(formData) !== false) {
      dialog.close();
      render();
    }
  };
  dialog.showModal();
  dialogFields.querySelector("input, select, textarea")?.focus();
}

function handleAction(action) {
  if (action === "sign-in") {
    showLoginDialog();
  } else if (action === "sign-out") {
    signOut();
  } else if (action === "password-reset") {
    requestPasswordReset();
  } else if (action === "new-announcement") {
    openDialog("Share a school update", `<label>Headline<input name="title" maxlength="90" required placeholder="What should everyone know?" /></label><label>Message<textarea name="body" rows="4" maxlength="400" required placeholder="Add a little more detail"></textarea></label><label>Category<select name="tone"><option value="blue">School update</option><option value="violet">Event</option><option value="green">Good news</option></select></label>`, "Post update", (form) => {
      data.announcements.unshift({ id: `notice-${Date.now()}`, title: form.get("title").trim(), body: form.get("body").trim(), author: peopleForRole[data.role].name, date: new Date().toISOString().slice(0, 10), tone: form.get("tone") });
      persist();
      showToast("Your update has been posted in this demo.");
    });
  } else if (action === "new-assignment") {
    openDialog("Create an assignment", `<label>Assignment title<input name="title" maxlength="90" required placeholder="e.g. Reading reflection" /></label><label>Course<select name="courseId">${courses.map((course) => `<option value="${course.id}">${escapeHTML(course.name)}</option>`).join("")}</select></label><div class="ed-form-row"><label>Due date<input name="due" type="date" min="${new Date().toISOString().slice(0, 10)}" required /></label><label>Points<input name="points" type="number" min="1" max="1000" value="20" required /></label></div><label>Type<select name="kind"><option>Practice</option><option>Project</option><option>Reading</option><option>Lab report</option></select></label>`, "Create assignment", (form) => {
      data.assignments.push({ id: `task-${Date.now()}`, title: form.get("title").trim(), courseId: form.get("courseId"), due: form.get("due"), points: Number(form.get("points")), kind: form.get("kind") });
      persist();
      showToast("Assignment added to the demo course.");
    });
  } else if (action === "new-course") {
    openDialog("Create a course", `<label>Course name<input name="name" maxlength="70" required placeholder="e.g. Digital Photography" /></label><label>Teacher name<input name="teacher" maxlength="70" required placeholder="e.g. Jamie Rivera" /></label><label>Classroom<input name="room" maxlength="50" required placeholder="e.g. Studio 2" /></label>`, "Create course", (form) => {
      const id = `course-${Date.now()}`;
      courses.push({ id, name: form.get("name").trim(), teacher: form.get("teacher").trim(), room: form.get("room").trim(), progress: 0, lessons: 0, color: "blue", icon: "✦", next: "Course introduction" });
      data.courses = courses;
      data.enrolled.push(id);
      persist();
      showToast("Course created in this demo.");
    });
  } else if (action === "new-person") {
    openDialog("Add someone to the directory", `<label>Full name<input name="name" maxlength="80" required placeholder="e.g. Jamie Rivera" /></label><label>Email address<input name="email" type="email" maxlength="120" required placeholder="name@school.example" /></label><div class="ed-form-row"><label>Role<select name="role"><option>Student</option><option>Teacher</option><option>Staff</option></select></label><label>Group<input name="group" maxlength="60" required placeholder="e.g. Grade 8" /></label></div>`, "Add to directory", (form) => {
      data.people.push({ id: `person-${Date.now()}`, name: form.get("name").trim(), email: form.get("email").trim(), role: form.get("role"), group: form.get("group").trim() });
      persist();
      showToast("Person added to the demo directory.");
    });
  } else if (action === "new-attendance") {
    openDialog("Record attendance", `<label>Day<input name="day" maxlength="20" required value="Mon" /></label><label>Status<select name="status"><option value="present">Present</option><option value="late">Late</option><option value="absent">Absent</option></select></label>`, "Save attendance", (form) => {
      const record = { day: form.get("day").trim() || "Mon", status: form.get("status") };
      data.attendance = data.attendance || { present: 0, absent: 0, late: 0, trend: 0, records: [] };
      data.attendance.records = [...(data.attendance.records || []), record];
      const summary = getAttendanceSummary(data.attendance);
      data.attendance.present = summary.present;
      data.attendance.late = summary.late;
      data.attendance.absent = summary.absent;
      data.attendance.trend = summary.trend;
      persist();
      showToast("Attendance was updated in the demo record.");
    });
  } else if (action === "new-payment") {
    openDialog("Record school payment", `<label>Amount<input name="amount" type="number" min="1" step="1000" required value="50000" /></label><label>Note<input name="note" maxlength="80" required placeholder="Tuition payment" /></label><label>Date<input name="date" type="date" required value="${new Date().toISOString().slice(0, 10)}" /></label>`, "Record payment", (form) => {
      const amount = Number(form.get("amount"));
      const note = form.get("note").trim();
      const date = form.get("date");
      data.fees = data.fees || { total: 0, paid: 0, due: 0, lastPayment: date, breakdown: [], payments: [] };
      data.fees.paid += amount;
      data.fees.due = Math.max(0, (data.fees.total || 0) - data.fees.paid);
      data.fees.lastPayment = date;
      data.fees.payments = [...(data.fees.payments || []), { amount, note, date }];
      persist();
      showToast("Fee payment was saved in the demo ledger.");
    });
  } else if (action === "new-exam") {
    openDialog("Add an exam", `<label>Subject<select name="subject"><option>Mathematics</option><option>Life Sciences</option><option>Creative Design</option><option>English Language</option><option>World History</option></select></label><div class="ed-form-row"><label>Date<input name="date" type="date" required value="${new Date().toISOString().slice(0, 10)}" /></label><label>Type<input name="type" maxlength="40" required value="Assessment" /></label></div><label>Score<input name="score" type="number" min="0" max="100" value="82" /></label>`, "Add exam", (form) => {
      const subject = form.get("subject");
      const score = Number(form.get("score"));
      const date = form.get("date");
      const type = form.get("type").trim() || "Assessment";
      data.exams = data.exams || { upcoming: [], results: [] };
      data.exams.upcoming = [...(data.exams.upcoming || []), { subject, date, type }];
      if (!Number.isNaN(score)) {
        data.exams.results = [...(data.exams.results || []), { subject, score, grade: gradeForScore(score) }];
      }
      persist();
      showToast("Exam schedule and result were updated in the demo.");
    });
  } else if (action === "schedule-note") {
    showToast("You’re viewing the sample timetable for this week.");
  }
}

function openLiveClassModal(classId) {
  const item = (data.liveClasses || []).find((entry) => entry.id === classId);
  if (!item) return;

  const participants = (item.participants || []).slice(0, 6);
  const chat = Array.isArray(item.chat) ? item.chat : [];

  openDialog(
    `${item.title}`,
    `
      <div class="ed-live-class-wrap">
        <div class="ed-live-class-stage">
          <div class="ed-live-stage-top">
            <div>
              <span class="ed-live-stage-kicker">${escapeHTML(item.course)}</span>
              <h3>${escapeHTML(item.teacher)}</h3>
            </div>
            <span class="ed-live-stage-status ${item.status === "Live now" ? "active" : "waiting"}">${escapeHTML(item.status)}</span>
          </div>
          <div class="ed-live-video-frame">
            <div class="ed-video-pill">Live</div>
            <div class="ed-video-meta">
              <strong>${escapeHTML(item.room)}</strong>
              <small>${escapeHTML(item.date)} • ${escapeHTML(item.time)} • ${escapeHTML(item.duration)}</small>
            </div>
          </div>
          <div class="ed-live-controls">
            <button type="button" class="ed-button ed-button-light" data-live-action="toggle-live-status" data-live-id="${escapeHTML(item.id)}">${item.status === "Live now" ? "Pause" : "Start"}</button>
            <button type="button" class="ed-button ed-button-light" data-live-action="mark-attendance" data-live-id="${escapeHTML(item.id)}">Mark attendance</button>
            <button type="button" class="ed-button ed-button-primary" data-live-action="join-live-class" data-live-id="${escapeHTML(item.id)}">${item.joined ? "Joined" : "Join room"}</button>
          </div>
          <div class="ed-live-attendance">
            <div><span>Participants</span><strong>${item.attendees}</strong></div>
            <div><span>Recording</span><strong>${item.recording ? "On" : "Off"}</strong></div>
            <div><span>Attendance</span><strong>${escapeHTML(item.attendanceStatus || "Present")}</strong></div>
          </div>
        </div>
        <div class="ed-live-class-chat">
          <div class="ed-live-chat-header">
            <h4>Class chat</h4>
            <span>${participants.length} online</span>
          </div>
          <div class="ed-live-chat-list">
            ${chat.length ? chat.map((message) => `<div class="ed-live-chat-line"><strong>${escapeHTML(message.author)}</strong><p>${escapeHTML(message.text)}</p></div>`).join("") : '<div class="ed-live-chat-line"><strong>Classroom</strong><p>No messages yet. Start the conversation.</p></div>'}
          </div>
          <div class="ed-live-chat-footer">
            <input type="text" name="chatMessage" class="ed-live-chat-input" placeholder="Type a message" aria-label="Type a new message" />
            <button type="button" class="ed-button ed-button-primary" data-live-action="send-chat-message" data-live-id="${escapeHTML(item.id)}">Send</button>
          </div>
        </div>
      </div>
    `,
    "Close",
    (formData) => {
      const message = formData.get("chatMessage");
      if (typeof message === "string" && message.trim()) {
        const liveItem = (data.liveClasses || []).find((entry) => entry.id === item.id);
        if (liveItem) {
          liveItem.chat = [...(liveItem.chat || []), { author: peopleForRole[data.role].name, text: message.trim() }];
          persist();
          render();
          dialog.close();
          openLiveClassModal(liveItem.id);
        }
      }
      return false;
    }
  );
}

function handleLiveAction(action, id) {
  if (action === "new-live-class") {
    const classId = `live-${Date.now()}`;
    const nextClass = {
      id: classId,
      title: "New live lesson",
      course: "Mathematics",
      teacher: peopleForRole[data.role].name,
      date: new Date().toISOString().slice(0, 10),
      time: "02:30 PM",
      duration: "45 min",
      room: "Digital classroom",
      attendees: 12,
      status: "Scheduled",
      color: "blue",
      recording: false,
      link: "https://zoom.us/j/atlas-academy-live-demo",
      participants: [peopleForRole[data.role].name],
      joined: false,
      attendanceStatus: "Pending",
      chat: [{ author: "School office", text: "This class has been scheduled for today." }]
    };
    data.liveClasses = [nextClass, ...(data.liveClasses || [])];
    persist();
    render();
    showToast("A new live class session has been added to the demo schedule.");
  } else if (action === "toggle-live-status") {
    const item = (data.liveClasses || []).find((entry) => entry.id === id);
    if (!item) return;
    item.status = item.status === "Live now" ? "Scheduled" : "Live now";
    item.recording = item.status === "Live now" ? true : item.recording;
    item.attendees = item.status === "Live now" ? Math.max(item.attendees, 18) : Math.max(8, item.attendees - 2);
    item.joined = item.status === "Live now" ? true : item.joined;
    persist();
    render();
    showToast(item.status === "Live now" ? "Class started. Students can join the room." : "Session paused in this demo classroom.");
  } else if (action === "join-live-class") {
    const item = (data.liveClasses || []).find((entry) => entry.id === id);
    if (!item) return;
    item.joined = true;
    item.attendees = Math.max(item.attendees, (item.participants || []).length + 1);
    item.participants = [...new Set([...(item.participants || []), peopleForRole[data.role].name])];
    if (!item.attendanceStatus || item.attendanceStatus === "Pending") item.attendanceStatus = "Present";
    persist();
    render();
    showToast("You joined the live classroom.");
  } else if (action === "send-chat-message") {
    const item = (data.liveClasses || []).find((entry) => entry.id === id);
    if (!item) return;
    const field = document.querySelector(".ed-live-chat-input");
    const message = field ? field.value.trim() : "";
    if (!message) return;
    item.chat = [...(item.chat || []), { author: peopleForRole[data.role].name, text: message }];
    item.participants = [...new Set([...(item.participants || []), peopleForRole[data.role].name])];
    persist();
    render();
    dialog.close();
    openLiveClassModal(item.id);
    showToast("Your message was sent to the class chat.");
  } else if (action === "mark-attendance") {
    const item = (data.liveClasses || []).find((entry) => entry.id === id);
    if (!item) return;
    item.attendanceStatus = item.attendanceStatus === "Present" ? "Late" : "Present";
    persist();
    render();
    showToast(`Your attendance is now marked as ${item.attendanceStatus.toLowerCase()}.`);
  }
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a");
  if (!target) return;
  if (target.dataset.view) {
    event.preventDefault();
    activeView = target.dataset.view;
    searchTerm = "";
    history.replaceState(null, "", `#${activeView}`);
    render();
  } else if (target.dataset.goView) {
    activeView = target.dataset.goView;
    history.replaceState(null, "", `#${activeView}`);
    render();
    viewContent.focus();
  } else if (target.dataset.liveAction) {
    handleLiveAction(target.dataset.liveAction, target.dataset.liveId);
  } else if (target.dataset.liveJoin) {
    openLiveClassModal(target.dataset.liveJoin);
  } else if (target.dataset.toggleAssignment) {
    const id = target.dataset.toggleAssignment;
    data.completedAssignments = data.completedAssignments.includes(id)
      ? data.completedAssignments.filter((completedId) => completedId !== id)
      : [...data.completedAssignments, id];
    persist();
    render();
    showToast(data.completedAssignments.includes(id) ? "Nice work — marked as complete!" : "Assignment moved back to your to-do list.");
  } else if (target.dataset.enrollCourse) {
    const id = target.dataset.enrollCourse;
    if (data.enrolled.includes(id)) {
      data.enrolled = data.enrolled.filter((courseId) => courseId !== id);
      showToast("You left the course in this demo.");
    } else {
      data.enrolled.push(id);
      showToast("You joined the course in this demo.");
    }
    persist();
    render();
  } else if (target.dataset.action) {
    handleAction(target.dataset.action);
  } else if (target.dataset.courseInfo) {
    const course = courseById(target.dataset.courseInfo);
    showToast(`${course.name} · ${course.teacher} · ${course.room}`);
  } else if (target.hasAttribute("data-close-dialog")) {
    dialog.close();
  }
});

function showAuthError(message) {
  const error = document.getElementById("authError");
  if (error) {
    error.textContent = message;
    error.hidden = false;
  }
}

function showLoginDialog() {
  if (!supabaseClient || dialog.open) return;
  openDialog(
    "Sign in to your school",
    `<p class="ed-auth-intro">Use the email and password your school administrator provided.</p><label>Email address<input name="email" type="email" autocomplete="username" required maxlength="254" placeholder="name@school.edu" /></label><label>Password<input name="password" type="password" autocomplete="current-password" required /></label><p class="ed-auth-error" id="authError" role="alert" hidden></p><button class="ed-auth-reset" type="button" data-action="password-reset">Forgot password?</button>`,
    "Sign in",
    () => false
  );
  dialogForm.onsubmit = async (event) => {
    event.preventDefault();
    const submitButton = document.getElementById("dialogSubmit");
    submitButton.disabled = true;
    submitButton.textContent = "Signing in…";
    const formData = new FormData(dialogForm);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    try {
      const { data: authResult, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) {
        showAuthError(error.message);
        return;
      }
      if (!authResult.user) {
        showAuthError("Sign-in completed without a user session. Please try again.");
        return;
      }
      await loadAuthenticatedUser(authResult.user);
      dialog.close();
      render();
      if (schoolMembership) showToast(`Signed in to ${schoolMembership.school?.name || "your school"}.`);
    } catch (error) {
      showAuthError(`Sign-in could not reach Supabase: ${error.message || "network error"}`);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Sign in";
    }
  };
}

async function requestPasswordReset() {
  if (!supabaseClient) return;
  const emailField = dialogForm.elements.namedItem("email");
  const email = emailField instanceof HTMLInputElement ? emailField.value.trim() : "";
  if (!email) {
    showAuthError("Enter your school email address first.");
    return;
  }
  try {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });
    if (error) {
      showAuthError(error.message);
      return;
    }
    showAuthError("If an account exists for that email, a password-reset link will be sent.");
  } catch (error) {
    showAuthError(`Password reset could not reach Supabase: ${error.message || "network error"}`);
  }
}

async function loadAuthenticatedUser(user) {
  authUser = user;
  schoolMembership = null;
  membershipLoadError = "";
  render();
  let memberships;
  let error;
  try {
    ({ data: memberships, error } = await supabaseClient
      .from("school_memberships")
      .select("school_id, role, school:schools(name, academic_year), profile:profiles(full_name)")
      .eq("user_id", user.id));
  } catch (requestError) {
    membershipLoadError = `Could not connect to the school database: ${requestError.message || "network error"}`;
    render();
    return;
  }
  if (error) {
    membershipLoadError = `Could not load school access: ${error.message}. Apply supabase/schema.sql and add a school membership.`;
    render();
    return;
  }
  if (!memberships?.length) {
    showToast("Your login is valid, but an administrator must add you to a school.", true);
    return;
  }
  if (memberships.length > 1) {
    membershipLoadError = "This account belongs to multiple schools. School selection must be configured before access.";
    render();
    return;
  }
  const membership = memberships[0];
  if (!["student", "teacher", "admin", "parent"].includes(membership.role)) {
    membershipLoadError = "Your school membership has an unsupported role. Ask an administrator to correct it.";
    render();
    return;
  }
  schoolMembership = membership;
  data.role = membership.role;
  if (membership.school?.academic_year) {
    document.querySelector(".ed-school-switch small").textContent = `Academic year ${membership.school.academic_year}`;
  }
  document.querySelector(".ed-school-switch strong").textContent = membership.school?.name || "Your school";
  if (data.role !== "admin" && activeView === "people") activeView = "dashboard";
  render();
}

async function signOut() {
  if (!supabaseClient) return;
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      showToast(`Could not sign out: ${error.message}`, true);
      return;
    }
    authUser = null;
    schoolMembership = null;
    membershipLoadError = "";
    render();
    showLoginDialog();
  } catch (error) {
    showToast(`Could not sign out: ${error.message || "network error"}`, true);
  }
}

async function initializeAuth() {
  if (!supabaseClient) {
    render();
    showToast("Supabase configuration is missing. Check supabase/config.js.", true);
    return;
  }
  const { data: authListener } = supabaseClient.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_OUT") {
      authUser = null;
      schoolMembership = null;
      render();
      showLoginDialog();
    }
  });
  try {
    const { data: sessionData, error } = await supabaseClient.auth.getSession();
    if (error) {
      render();
      showToast(`Could not restore your sign-in: ${error.message}`, true);
      showLoginDialog();
      return;
    }
    if (sessionData.session?.user) {
      await loadAuthenticatedUser(sessionData.session.user);
    } else {
      render();
      showLoginDialog();
    }
  } catch (error) {
    render();
    showToast(`Could not connect to Supabase: ${error.message || "network error"}`, true);
    showLoginDialog();
  }
}

document.addEventListener("input", (event) => {
  if (event.target.id === "courseSearch") {
    searchTerm = event.target.value;
    const cursor = event.target.selectionStart;
    render();
    const search = document.getElementById("courseSearch");
    search.focus();
    search.setSelectionRange(cursor, cursor);
  } else if (event.target.id === "peopleSearch") {
    const query = event.target.value.toLowerCase();
    document.getElementById("peopleRows").innerHTML = peopleRows(data.people.filter((person) => `${person.name} ${person.email} ${person.role} ${person.group}`.toLowerCase().includes(query)));
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && dialog.open) dialog.close();
});

const hashView = window.location.hash.slice(1);
if (titles[hashView]) activeView = hashView;
render();
initializeAuth();
