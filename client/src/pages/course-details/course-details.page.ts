import { escapeHtml, getIdFromQuery, loadCourse } from "../../app/app.component";

export async function renderCourseDetails(view: HTMLElement) {
  try {
    const id = getIdFromQuery();
    const course = await loadCourse(id); // ✅ rename c -> course

    view.innerHTML = `
      <section class="details-page">
        <header class="details-header">
          <h1 class="details-title">${escapeHtml(course.title)}</h1>
          ${course.subtitle ? `<p class="details-subtitle">${escapeHtml(course.subtitle)}</p>` : ""}

          <div class="details-meta">
            ${course.category ? `<span class="meta-chip">🏷️ ${escapeHtml(course.category)}</span>` : ""}
            ${course.level ? `<span class="meta-chip">📈 ${escapeHtml(course.level)}</span>` : ""}
            ${course.duration ? `<span class="meta-chip">⏱️ ${escapeHtml(String(course.duration))}</span>` : ""}
            ${typeof course.lessonsCount === "number" ? `<span class="meta-chip">📚 ${course.lessonsCount} lessons</span>` : ""}
            ${typeof course.projectsCount === "number" ? `<span class="meta-chip">🧩 ${course.projectsCount} projects</span>` : ""}
            ${
              typeof course.rating === "number"
                ? `<span class="meta-chip">⭐ ${course.rating}${typeof course.ratingCount === "number" ? ` (${course.ratingCount})` : ""}</span>`
                : ""
            }
          </div>
        </header>

        <div class="details-card">
          <h2 class="details-card__title">Πληροφορίες</h2>

          <ul class="details-list">
            ${course.category ? `<li><b>Κατηγορία:</b> ${escapeHtml(course.category)}</li>` : ""}
            ${course.level ? `<li><b>Επίπεδο:</b> ${escapeHtml(course.level)}</li>` : ""}
            ${course.language ? `<li><b>Γλώσσα:</b> ${escapeHtml(course.language)}</li>` : ""}
            ${course.mode ? `<li><b>Mode:</b> ${escapeHtml(course.mode)}</li>` : ""}
            ${course.duration ? `<li><b>Διάρκεια:</b> ${escapeHtml(String(course.duration))}</li>` : ""}
            ${typeof course.lessonsCount === "number" ? `<li><b>Lessons:</b> ${course.lessonsCount}</li>` : ""}
            ${typeof course.projectsCount === "number" ? `<li><b>Projects:</b> ${course.projectsCount}</li>` : ""}
            ${
              typeof course.rating === "number"
                ? `<li><b>Rating:</b> ${course.rating}${typeof course.ratingCount === "number" ? ` (${course.ratingCount} reviews)` : ""}</li>`
                : ""
            }
          </ul>

          ${course.shortDescription ? `<p class="details-lead">${escapeHtml(course.shortDescription)}</p>` : ""}

          ${
            course.longDescription
              ? `
                <h2 class="details-section-title">Περιγραφή</h2>
                <p class="details-paragraph">${escapeHtml(course.longDescription)}</p>
              `
              : ""
          }
        </div>

        <a class="details-back" href="/courses.html">← Back to courses</a>
      </section>
    `;
  } catch (err) {
    view.innerHTML = `<p>Failed to load course details.</p>`;
  }
}
