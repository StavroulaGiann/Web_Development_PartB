import { initBookDetailsPage } from "./books-details";
import "./styles.css";
type CourseDoc = {
  _id: string;

  id: string;
  slug: string;

  title: string;
  subtitle?: string;

  category: string;
  level: string;

  duration?: string;      // "5 εβδομάδες"
  language?: string;      // "GR"
  mode?: string;          // "self-paced"

  shortDescription?: string;
  longDescription?: string;

  lessonsCount?: number;
  projectsCount?: number;

  hasCertificate?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  popular?: boolean;

  rating?: number;
  ratingCount?: number;

  thumbnail?: string;
  tags?: string[];

  available?: boolean;
};

type UICourse = {
  _id: string;
  id: string;
  title: string;
  category: string;
  description?: string;
  level?: string;
  format?: string;
  durationWeeks?: number;
  language?: string;

  // extra για UI αν θες
  subtitle?: string;
  rating?: number;
  ratingCount?: number;
};
type Book = {
  _id: string;
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  level: string;
  language?: string;
  pages?: number;
  year?: number;
  author?: string;
  shortDescription?: string;
  rating?: number;
  ratingCount?: number;
  image?: string;
  available?: boolean;
  tags?: string[];
};



async function loadCourses(): Promise<CourseDoc[]> {
  const res = await fetch("/api/courses");
  if (!res.ok) throw new Error(`Failed to load courses (${res.status})`);
  return res.json();
}

async function loadBooks(): Promise<Book[]> {
  const res = await fetch("/api/books");
  if (!res.ok) throw new Error(`Failed to load books (${res.status})`);
  return res.json();
}


function parseWeeks(duration?: string): number | undefined {
  if (!duration) return undefined;
  const m = duration.match(/(\d+)/);
  if (!m) return undefined;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : undefined;
}

function toUICourse(c: CourseDoc): UICourse {
  return {
    _id: c._id,
     id: c.id,  
    title: c.title,
    category: c.category,
    level: c.level,
    language: c.language ?? "GR",
    format: c.mode ?? "self-paced",
    durationWeeks: parseWeeks(c.duration),
    description: c.shortDescription ?? c.longDescription ?? "",
    subtitle: c.subtitle ?? "",
    rating: c.rating ?? 0,
    ratingCount: c.ratingCount ?? 0,
  };
}


function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function uniqueCategories(courses: UICourse[]) {
  const set = new Set<string>();
  for (const c of courses) if (c.category) set.add(c.category);
  return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
}

function renderCourseCard(c: UICourse) {
  const title = escapeHtml(c.title ?? "Untitled");
  const category = escapeHtml(c.category ?? "general");
  const desc = escapeHtml(c.description ?? "No description provided.");
  const level = escapeHtml(c.level ?? "beginner");
  const format = escapeHtml(c.format ?? "course");
  const lang = escapeHtml(c.language ?? "el");
  const weeks = typeof c.durationWeeks === "number" ? `${c.durationWeeks}w` : "—";

  return `
    <a class="card" href="/course.html?id=${encodeURIComponent(c.id)}">
      <div class="card-top">
        <div>
          <h3>${title}</h3>
          <div class="meta">
            <span class="pill">#${category}</span>
            <span class="pill">${level}</span>
            <span class="pill">${format}</span>
            <span class="pill">${lang}</span>
            <span class="pill">${weeks}</span>
          </div>
        </div>
        <span class="badge">Preview</span>
      </div>
      <p class="desc">${desc}</p>
    </a>
  `;
}

function renderBookCard(b: Book) {
  const title = escapeHtml(b.title ?? "Untitled");
  const subtitle = escapeHtml(b.subtitle ?? "");
  const category = escapeHtml(b.category ?? "general");
  const level = escapeHtml(b.level ?? "beginner");
  const author = escapeHtml(b.author ?? "");
  const lang = escapeHtml(b.language ?? "GR");
  const pages = typeof b.pages === "number" ? `${b.pages}p` : "—";
  const year = typeof b.year === "number" ? String(b.year) : "—";
  const desc = escapeHtml(b.shortDescription ?? "No description.");
  const cover = escapeHtml(b.image ?? "");

  return `
     <a class="card" href="/books-details.html?id=${encodeURIComponent(b._id)}">

      ${cover ? `<img class="cover" src="${cover}" alt="${title}" />` : ""}

      <div class="card-top">
        <div>
          <h3>${title}</h3>
          <div class="meta">
            <span class="pill">#${category}</span>
            <span class="pill">${level}</span>
            <span class="pill">${lang}</span>
            <span class="pill">${year}</span>
            <span class="pill">${pages}</span>
          </div>
          <div class="sub">${subtitle}</div>
          <div class="sub">${author}</div>
        </div>
        ${b.available ? `<span class="badge">Available</span>` : `<span class="badge">Unavailable</span>`}
      </div>

      <p class="desc">${desc}</p>
    </a>
  `;
}


async function main() {
  const root = document.querySelector<HTMLDivElement>("#app");
  if (!root) return;

  root.innerHTML = `
    <div class="topbar">
      <div class="topbar-inner">
        <div class="brand">
          <span class="logo"></span>
          <span>DevAcademy</span>
        </div>
        <span class="badge">Client (Vite + TS) • REST API</span>
      </div>
    </div>

    <div class="container">
      <section class="hero">
        <h1>E-Learning Courses</h1>
        <p>
          Courses are loaded dynamically from the backend (Express + MongoDB).
          This client has no hardcoded course data.
        </p>

        <div class="toolbar">
          <label class="input" aria-label="Search">
            🔎
            <input id="q" placeholder="Search by title..." />
          </label>

          <select id="cat" class="select" aria-label="Category">
            <option value="all">all</option>
          </select>

          <button id="reload" class="btn" type="button">↻ Reload</button>
        </div>

        <div class="footerNote" id="status">Loading…</div>
      </section>

      <section class="grid" id="grid"></section>

      <div class="empty" id="empty" style="display:none;">
        No courses yet. Add one in MongoDB (or create a POST /api/courses endpoint) and refresh.
      </div>

      <div class="errorBox" id="error" style="display:none;"></div>
    </div>
  `;

  const grid = document.querySelector<HTMLDivElement>("#grid")!;
  const status = document.querySelector<HTMLDivElement>("#status")!;
  const empty = document.querySelector<HTMLDivElement>("#empty")!;
  const error = document.querySelector<HTMLDivElement>("#error")!;
  const q = document.querySelector<HTMLInputElement>("#q")!;
  const cat = document.querySelector<HTMLSelectElement>("#cat")!;
  const reloadBtn = document.querySelector<HTMLButtonElement>("#reload")!;

  let allCourses: UICourse[] = [];


  function applyFilters() {
    const query = q.value.trim().toLowerCase();
    const category = cat.value;

    const filtered = allCourses.filter((c) => {
      const okCat = category === "all" || c.category === category;
      const okQ = !query || (c.title ?? "").toLowerCase().includes(query);
      return okCat && okQ;
    });

    grid.innerHTML = filtered.map(renderCourseCard).join("");
    empty.style.display = filtered.length === 0 ? "block" : "none";
  }

  async function loadAndRender() {
    error.style.display = "none";
    status.textContent = "Loading…";

    try {
      const docs = await loadCourses();
      allCourses = docs.map(toUICourse);
      status.textContent = `Loaded ${allCourses.length} course(s)`;

      // categories dropdown
      const cats = uniqueCategories(allCourses);
      cat.innerHTML = cats.map((x) => `<option value="${escapeHtml(x)}">${escapeHtml(x)}</option>`).join("");

      applyFilters();
    } catch (e: any) {
      status.textContent = "Error";
      error.style.display = "block";
      error.textContent = e?.message ?? "Unknown error";
      grid.innerHTML = "";
      empty.style.display = "none";
    }
  }

  q.addEventListener("input", applyFilters);
  cat.addEventListener("change", applyFilters);
  reloadBtn.addEventListener("click", loadAndRender);

  await loadAndRender();
}
const path = window.location.pathname;


if (path.includes("books-details.html")) {
  initBookDetailsPage();
} else {
  main();
}
