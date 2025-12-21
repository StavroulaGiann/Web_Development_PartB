import "./styles.css";

type Course = {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  level: string;
  duration?: string;
  language?: string;
  mode?: string;
  shortDescription?: string;
  longDescription?: string;
  lessonsCount?: number;
  projectsCount?: number;
  rating?: number;
  ratingCount?: number;
  tags?: string[];
  thumbnail?: string;
};

function escapeHtml(s = "") {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getCourseIdFromURL(): string {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) throw new Error("Missing course id");
  return id;
}

async function loadCourse(id: string): Promise<Course> {
  const res = await fetch(`/api/courses/${id}`);
  if (!res.ok) throw new Error("Course not found");
  return res.json();
}

function renderCourse(course: Course) {
  return `
    <div class="container course-details">

      <a href="/" class="back">← Back to courses</a>

      <section class="hero">
        <div>
          <h1>${escapeHtml(course.title)}</h1>
          <p class="subtitle">${escapeHtml(course.subtitle ?? "")}</p>

          <div class="meta">
            <span class="pill">${escapeHtml(course.category)}</span>
            <span class="pill">${escapeHtml(course.level)}</span>
            <span class="pill">${escapeHtml(course.language ?? "GR")}</span>
            <span class="pill">${escapeHtml(course.duration ?? "")}</span>
          </div>
        </div>

        ${
          course.thumbnail
            ? `<img class="thumb" src="${escapeHtml(course.thumbnail)}" />`
            : ""
        }
      </section>

      <section class="panel">
        <h2>Περιγραφή</h2>
        <p>${escapeHtml(course.longDescription ?? "")}</p>
      </section>

      <section class="stats">
        <div><strong>${course.lessonsCount ?? 0}</strong><span>Lessons</span></div>
        <div><strong>${course.projectsCount ?? 0}</strong><span>Projects</span></div>
        <div><strong>${course.rating ?? "—"}</strong><span>Rating</span></div>
      </section>

      ${
        course.tags?.length
          ? `
        <section class="panel">
          <h3>Tags</h3>
          <div class="meta">
            ${course.tags.map(t => `<span class="pill">${escapeHtml(t)}</span>`).join("")}
          </div>
        </section>
      `
          : ""
      }

      <section class="actions">
        <button class="btn">Enroll</button>
        <button class="btn ghost">Bookmark</button>
      </section>
    </div>
  `;
}

async function main() {
  const root = document.querySelector<HTMLDivElement>("#app");
  if (!root) return;

  try {
    const id = getCourseIdFromURL();
    const course = await loadCourse(id);
    root.innerHTML = renderCourse(course);
  } catch (err: any) {
    root.innerHTML = `<div class="container errorBox">${err.message}</div>`;
  }
}

main();
