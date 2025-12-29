export type RouteHandler = (view: HTMLElement) => Promise<void> | void;
type Book = {
  _id: string;
  title: string;
  subtitle?: string;
  author?: string;
  category: string;
  level: string;
  language?: string;
  shortDescription?: string;
  image?: string;
  available?: boolean;
};

type Course = {
  _id?: string;
  id?: string;
  title: string;
  subtitle?: string;
  category: string;
  level: string;

  duration?: string;        // π.χ. "6 weeks" ή "10h"
  lessonsCount?: number;    // π.χ. 12
  projectsCount?: number;   // π.χ. 3
  rating?: number;          // π.χ. 4.7
  ratingCount?: number;     // π.χ. 120
  language?: string;
  mode?: string;            // online / onsite
  shortDescription?: string;
  longDescription?: string;
};

function escapeHtml(s = "") {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getIdFromQuery(): string {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) throw new Error("Missing id (?id=...)");
  return id;
}

async function loadBooks(): Promise<Book[]> {
  const res = await fetch("/api/books");
  if (!res.ok) throw new Error(`Failed to load books (${res.status})`);
  return res.json();
}

async function loadBook(id: string): Promise<any> {
  const res = await fetch(`/api/books/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error(`Failed to load book (${res.status})`);
  return res.json();
}

async function loadCourses(): Promise<Course[]> {
  const res = await fetch("/api/courses");
  if (!res.ok) throw new Error(`Failed to load courses (${res.status})`);
  return res.json();
}

async function loadCourse(id: string): Promise<Course> {
  const res = await fetch(`/api/courses/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error(`Failed to load course (${res.status})`);
  return res.json();
}

function bookCard(b: Book) {
  const title = escapeHtml(b.title ?? "Untitled");
  const desc = escapeHtml(b.shortDescription ?? "");
  const category = escapeHtml(b.category ?? "");
  const level = escapeHtml(b.level ?? "");
  const lang = escapeHtml(b.language ?? "GR");

  return `
    <a class="card" data-link href="/books/details?id=${encodeURIComponent(b._id)}">
      <div class="card-top">
        <div>
          <h3>${title}</h3>
          <div class="meta">
            <span class="pill">#${category}</span>
            <span class="pill">${level}</span>
            <span class="pill">${lang}</span>
          </div>
        </div>
      </div>
      <p class="desc">${desc}</p>
    </a>
  `;
}

function courseCard(c: Course) {
  const id = (c as any)._id ?? c.id ?? "";
  const title = escapeHtml(c.title ?? "Untitled");
  const desc = escapeHtml(c.shortDescription ?? "");
  const category = escapeHtml(c.category ?? "");
  const level = escapeHtml(c.level ?? "");
  const lang = escapeHtml(c.language ?? "GR");

  const duration = c.duration ? escapeHtml(String(c.duration)) : "";
  const lessons = Number.isFinite(c.lessonsCount as number) ? String(c.lessonsCount) : "";
  const projects = Number.isFinite(c.projectsCount as number) ? String(c.projectsCount) : "";
  const rating =
    typeof c.rating === "number"
      ? `${c.rating.toFixed(1)}${typeof c.ratingCount === "number" ? ` (${c.ratingCount})` : ""}`
      : "";

  const infoParts = [
    duration && `⏱ ${duration}`,
    lessons && `📚 ${lessons} lessons`,
    projects && `🧩 ${projects} projects`,
    rating && `⭐ ${escapeHtml(rating)}`,
  ].filter(Boolean);

  return `
    <a class="card" data-link href="/courses/details?id=${encodeURIComponent(id)}">
      <div class="card-top">
        <div>
          <h3>${title}</h3>
          <div class="meta">
            <span class="pill">#${category}</span>
            <span class="pill">${level}</span>
            <span class="pill">${lang}</span>
            ${c.mode ? `<span class="pill">${escapeHtml(c.mode)}</span>` : ""}
          </div>
        </div>
      </div>

      ${infoParts.length ? `<div class="submeta">${infoParts.join(" · ")}</div>` : ""}

      <p class="desc">${desc}</p>
    </a>
  `;
}


// ---------- Pages ----------

export async function renderHome(view: HTMLElement) {
  view.innerHTML = `
    <div class="container">
      <h1>Home</h1>
      <p>Διάλεξε Books ή Courses από το μενού.</p>
    </div>
  `;
}

export async function renderBooks(view: HTMLElement) {
  view.innerHTML = `<div class="container"><p>Loading…</p></div>`;

  try {
    const books = await loadBooks();
    view.innerHTML = `
      <div class="container">
        <h1>Books</h1>
        <div class="grid">
          ${books.map(bookCard).join("")}
        </div>
      </div>
    `;
  } catch (err: any) {
    view.innerHTML = `
      <div class="container">
        <h1>Books</h1>
        <p class="error">${escapeHtml(err?.message ?? "Unknown error")}</p>
      </div>
    `;
  }
}

export async function renderBookDetails(view: HTMLElement) {
  view.innerHTML = `<div class="container"><p>Loading…</p></div>`;

  try {
    const id = getIdFromQuery();
    const book = await loadBook(id);

    view.innerHTML = `
      <div class="container book-details">
        <a class="back" data-link href="/books">← Back to books</a>
        <h1>${escapeHtml(book.title ?? "")}</h1>
        <p class="muted">${escapeHtml(book.subtitle ?? "")}</p>
        <div class="meta">
          <span class="pill">#${escapeHtml(book.category ?? "")}</span>
          <span class="pill">${escapeHtml(book.level ?? "")}</span>
          <span class="pill">${escapeHtml(book.language ?? "GR")}</span>
        </div>
        <p>${escapeHtml(book.shortDescription ?? "")}</p>
      </div>
    `;
  } catch (err: any) {
    view.innerHTML = `
      <div class="container">
        <a class="back" data-link href="/books">← Back to books</a>
        <p class="error">${escapeHtml(err?.message ?? "Unknown error")}</p>
      </div>
    `;
  }
}

export async function renderCourses(view: HTMLElement) {
  view.innerHTML = `<div class="container"><p>Loading…</p></div>`;

  try {
    const courses = await loadCourses();
    view.innerHTML = `
      <div class="container">
        <h1>Courses</h1>
        <div class="grid">
          ${courses.map(courseCard).join("")}
        </div>
      </div>
    `;
  } catch (err: any) {
    view.innerHTML = `
      <div class="container">
        <h1>Courses</h1>
        <p class="error">${escapeHtml(err?.message ?? "Unknown error")}</p>
      </div>
    `;
  }
}

export async function renderCourseDetails(view: HTMLElement) {
  view.innerHTML = `<div class="container"><p>Loading…</p></div>`;

  try {
    const id = getIdFromQuery();
    const course = await loadCourse(id);

    const details = [
      course.duration ? `⏱ Duration: ${escapeHtml(String(course.duration))}` : "",
      typeof course.lessonsCount === "number" ? `📚 Lessons: ${course.lessonsCount}` : "",
      typeof course.projectsCount === "number" ? `🧩 Projects: ${course.projectsCount}` : "",
      typeof course.rating === "number"
        ? `⭐ Rating: ${course.rating.toFixed(1)}${
            typeof course.ratingCount === "number" ? ` (${course.ratingCount})` : ""
          }`
        : "",
    ].filter(Boolean);

    view.innerHTML = `
      <div class="container course-details">
        <a class="back" data-link href="/courses">← Back to courses</a>

        <h1>${escapeHtml(course.title ?? "")}</h1>
        <p class="muted">${escapeHtml(course.subtitle ?? "")}</p>

        <div class="meta">
          <span class="pill">#${escapeHtml(course.category ?? "")}</span>
          <span class="pill">${escapeHtml(course.level ?? "")}</span>
          <span class="pill">${escapeHtml(course.language ?? "GR")}</span>
        </div>

        ${details.length ? `
          <ul class="details">
            ${details.map(d => `<li>${d}</li>`).join("")}
          </ul>
        ` : ""}

        <p>${escapeHtml(course.longDescription ?? course.shortDescription ?? "")}</p>
      </div>
    `;
  } catch (err: any) {
    view.innerHTML = `
      <div class="container">
        <a class="back" data-link href="/courses">← Back to courses</a>
        <p class="error">${escapeHtml(err?.message ?? "Unknown error")}</p>
      </div>
    `;
  }
}
