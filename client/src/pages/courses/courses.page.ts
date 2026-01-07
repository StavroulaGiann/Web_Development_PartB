import {
  escapeHtml,
  loadCourses,
  loadEnrollmentsByUser,
  mustGet,
} from "../../app/app.component";

import { getUser } from "../../services/auth";


// Helpers


// Returns a unique, alphabetically sorted list of non-empty strings.
function uniqSorted(arr: string[]) {
  return Array.from(new Set(arr.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

// Extracts the first number found in a value (useful for "10 hours", "3 weeks", etc).
function extractNumber(x: any): number {
  if (typeof x === "number" && Number.isFinite(x)) return x;
  const m = String(x ?? "").match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

//Sorts courses based on the selected sorting rules. Returns a new sorted array .
function sortCourses(list: any[], sortBy: string) {
  const out = list.slice();

  if (sortBy === "rating") {
    out.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy === "newest") {
    // Put "new" courses first
    out.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  } else if (sortBy === "duration") {
    // Sort by extracted numeric value 
    out.sort((a, b) => extractNumber(a.duration) - extractNumber(b.duration));
  } else {
    // Default: featured first, then by rating (descending)
    out.sort((a, b) => {
      const af = a.isFeatured ? 1 : 0;
      const bf = b.isFeatured ? 1 : 0;
      if (bf !== af) return bf - af;
      return (b.rating || 0) - (a.rating || 0);
    });
  }
  return out;
}

// Page

//Renders the Courses catalog page:
export async function renderCourses(view: HTMLElement) {
  // Read current user (null/undefined if not logged in)
  const user = getUser();

  // Initial page layout (filters sidebar + grid + empty state)
  view.innerHTML = `
  <section class="hero">
    <h1>Courses</h1>
    <p>Select a course for details.”</p>
  </section>

  <section class="courses-layout">
    <aside class="courses-sidebar">
      <section class="filters-card">
        <h2 class="filters-title">Filters</h2>
        <p class="filters-subtitle">
          Filter courses by category, language and availability.
        </p>

        <div class="filters-form">
          <div class="filters-field">
            <label class="filters-label" for="q">Search</label>
            <input id="q" class="filters-input" placeholder="Title or keywords..." />
          </div>

          <div class="filters-grid">
            <div class="filters-field">
              <label class="filters-label" for="cat">Category</label>
              <select id="cat" class="filters-select">
                <option value="">All</option>
              </select>
            </div>

            <div class="filters-field">
              <label class="filters-label" for="lvl">Level</label>
              <select id="lvl" class="filters-select">
                <option value="">All</option>
              </select>
            </div>

            <div class="filters-field">
              <label class="filters-label" for="avail">Availability</label>
              <select id="avail" class="filters-select">
                <option value="">All</option>
                <option value="available">Available only</option>
              </select>
            </div>

            <div class="filters-field">
              <label class="filters-label" for="lang">Language</label>
              <select id="lang" class="filters-select">
                <option value="">All</option>
                <option value="GR">GR</option>
                <option value="EN">EN</option>
              </select>
            </div>
          </div>

          <div class="filters-bottom">
            <select id="sort" class="filters-select">
              <option value="featured">Suggested</option>
              <option value="rating">Best rated</option>
              <option value="newest">Newest</option>
              <option value="duration">Duration</option>
            </select>

            ${
              user
                ? `
              <label class="filters-check">
                <input type="checkbox" id="enrolledOnly" />
                Enrolled only
              </label>
            `
                : ""
            }

            <div class="filters-count">
              <span id="count">0</span> results
            </div>
          </div>
        </div>
      </section>
    </aside>

    <div class="courses-content">
      <div class="grid" id="coursesGrid"></div>

      <div class="empty" id="emptyState" style="display:none; margin-top:14px;">
        No courses found for these filters.
      </div>
    </div>
  </section>
`;

 
  // DOM references

  const grid = mustGet<HTMLElement>(view, "#coursesGrid");
  const emptyState = mustGet<HTMLElement>(view, "#emptyState");
  const countEl = mustGet<HTMLElement>(view, "#count");

  const qEl = mustGet<HTMLInputElement>(view, "#q");
  const catEl = mustGet<HTMLSelectElement>(view, "#cat");
  const lvlEl = mustGet<HTMLSelectElement>(view, "#lvl");
  const availEl = mustGet<HTMLSelectElement>(view, "#avail");
  const langEl = mustGet<HTMLSelectElement>(view, "#lang");
  const sortEl = mustGet<HTMLSelectElement>(view, "#sort");

  // Only exists for logged-in users
  const enrolledOnlyEl = view.querySelector("#enrolledOnly") as HTMLInputElement | null;

  try {
    // Load all courses from API
    const courses = (await loadCourses()) as any[];


    // Load enrolled course ids 
    const enrolledIds = new Set<string>();
    if (user) {
      try {
        const enrollments = (await loadEnrollmentsByUser(user._id)) as any[];

        // Accept either populated course object (courseId._id) or raw id (courseId)
        for (const e of enrollments) {
          const cid = e?.courseId?._id ?? e?.courseId;
          if (cid) enrolledIds.add(String(cid));
        }
      } catch {
        // If enrollments fail, silently ignore (page still works without the filter)
      }
    }


    // Populate select options dynamically from course data
    const cats = uniqSorted(courses.map((c) => String(c.category ?? "")));
    const lvls = uniqSorted(courses.map((c) => String(c.level ?? "")));

    // Use escapeHtml so option labels/values can’t inject HTML
    catEl.innerHTML =
      `<option value="">All</option>` +
      cats.map((v) => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join("");

    lvlEl.innerHTML =
      `<option value="">All</option>` +
      lvls.map((v) => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join("");


    // Render function (filters + sorting + UI)
    const renderList = () => {
      // Start with all courses, then narrow down
      let visible = courses.slice();

      // Read current filter values
      const q = qEl.value.trim().toLowerCase();
      const cat = catEl.value;
      const lvl = lvlEl.value;
      const avail = availEl.value;
      const lang = langEl.value;
      const sortBy = sortEl.value;

      // Text search across a few common fields (title/subtitle/shortDescription)
      if (q) {
        visible = visible.filter((c) =>
          `${c.title ?? ""} ${c.subtitle ?? ""} ${c.shortDescription ?? ""}`
            .toLowerCase()
            .includes(q)
        );
      }

      // Exact match filters
      if (cat) visible = visible.filter((c) => String(c.category ?? "") === cat);
      if (lvl) visible = visible.filter((c) => String(c.level ?? "") === lvl);

      // Availability filter
      if (avail === "available") visible = visible.filter((c) => c.available === true);

      // Language filter
      if (lang) visible = visible.filter((c) => String(c.language ?? "") === lang);

      // Logged-in only filter: show only courses the user is enrolled in
      if (user && enrolledOnlyEl?.checked) {
        visible = visible.filter((c) => enrolledIds.has(String(c._id ?? c.id)));
      }

      // Sort after filtering
      visible = sortCourses(visible, sortBy);

      // Update results count
      countEl.textContent = String(visible.length);

      // Empty state: show message and clear the grid
      if (!visible.length) {
        grid.innerHTML = "";
        emptyState.style.display = "block";
        return;
      }

      // Otherwise show grid
      emptyState.style.display = "none";

      // Render cards: each card is a link to course details 
      grid.innerHTML = visible
        .map((c) => {
          const id = c._id ?? c.id;
          return `
            <a class="card" href="/courses/details?id=${encodeURIComponent(
              String(id)
            )}" data-link>
              <div class="card-top">
                <div>
                  <h3>${escapeHtml(c.title ?? "")}</h3>
                  ${c.subtitle ? `<div class="sub">${escapeHtml(c.subtitle)}</div>` : ""}
                </div>
              </div>

              ${c.shortDescription ? `<p class="desc">${escapeHtml(c.shortDescription)}</p>` : ""}

              <div class="meta">
                ${c.category ? `<span class="pill">✔ ${escapeHtml(c.category)}</span>` : ""}
                ${c.level ? `<span class="pill">✔ ${escapeHtml(c.level)}</span>` : ""}
                ${c.duration ? `<span class="pill">✔ ${escapeHtml(String(c.duration))}</span>` : ""}
                ${typeof c.rating === "number" ? `<span class="badge">✔ ${c.rating.toFixed(1)}</span>` : ""}
              </div>
            </a>
          `;
        })
        .join("");
    };


    // Events: re-render when filters change
    qEl.addEventListener("input", renderList);
    catEl.addEventListener("change", renderList);
    lvlEl.addEventListener("change", renderList);
    availEl.addEventListener("change", renderList);
    langEl.addEventListener("change", renderList);
    sortEl.addEventListener("change", renderList);
    enrolledOnlyEl?.addEventListener("change", renderList);

    // First render
    renderList();
  } catch (err: any) {
    // If loading courses fails, show an error box inside the grid area
    grid.innerHTML = `
      <div class="errorBox">
        ${escapeHtml(String(err?.message ?? err))}
      </div>
    `;
    emptyState.style.display = "none";
    countEl.textContent = "0";
  }
}
