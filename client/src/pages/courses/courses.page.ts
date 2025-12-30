import { escapeHtml, loadCourses } from "../../app/app.component";

export async function renderCourses(view: HTMLElement) {
  view.innerHTML = `
    <section class="hero">
      <h1>Courses</h1>
      <p>Διάλεξε μάθημα και δες λεπτομέρειες.</p>
    </section>

    <div class="grid" id="coursesGrid"></div>
  `;

  const grid = view.querySelector("#coursesGrid") as HTMLElement;

  try {
    const courses = await loadCourses();

    if (!courses.length) {
      grid.innerHTML = `<div class="empty">Δεν βρέθηκαν μαθήματα.</div>`;
      return;
    }

    grid.innerHTML = courses
      .map((c) => {
        const id = c._id ?? c.id; // για να παίζει και με τα 2
        return `
          <a class="card" href="/courses/details?id=${encodeURIComponent(String(id))}" data-link>
  <div class="card-top">
    <div>
      <h3>${escapeHtml(c.title)}</h3>
      ${c.subtitle ? `<div class="sub">${escapeHtml(c.subtitle)}</div>` : ""}
    </div>
  </div>

  ${c.shortDescription ? `<p class="desc">${escapeHtml(c.shortDescription)}</p>` : ""}

  <div class="meta">
    <span class="pill">📌 ${escapeHtml(c.category)}</span>
    <span class="pill">🎚 ${escapeHtml(c.level)}</span>
    ${c.duration ? `<span class="pill">⏱ ${escapeHtml(String(c.duration))}</span>` : ""}
    ${typeof c.rating === "number" ? `<span class="badge">⭐ ${c.rating.toFixed(1)}</span>` : ""}
  </div>
</a>

        `;
      })
      .join("");
  } catch (err: any) {
    grid.innerHTML = `
      <div class="errorBox">
        ${escapeHtml(String(err?.message ?? err))}
      </div>
    `;
  }
}
