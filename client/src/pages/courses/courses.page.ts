import { escapeHtml, loadCourses, loadEnrollmentsByUser } from "../../app/app.component";
import { getUser } from "../../services/auth";

export async function renderCourses(view: HTMLElement) {
  const user = getUser();
  let showEnrolledOnly = false;

  view.innerHTML = `
    <section class="hero">
      <h1>Courses</h1>
      <p>Διάλεξε μάθημα και δες λεπτομέρειες.</p>
    </section>

    ${user ? `
      <div style="margin: 0 0 14px 0;">
        <button id="toggleEnrolled" class="btn">
          Show enrolled only
        </button>
      </div>
    ` : ""}

    <div class="grid" id="coursesGrid"></div>
  `;

  const grid = view.querySelector("#coursesGrid") as HTMLElement;
  const toggleBtn = view.querySelector("#toggleEnrolled") as HTMLButtonElement | null;

  try {
    const courses = await loadCourses();

    if (!courses.length) {
      grid.innerHTML = `<div class="empty">Δεν βρέθηκαν μαθήματα.</div>`;
      return;
    }

    // ---- load my enrollments (if logged in)
    const enrolledIds = new Set<string>();
    if (user) {
      try {
        const enrollments = await loadEnrollmentsByUser(user._id);

        // controller κάνει populate("courseId"), άρα courseId μπορεί να είναι object
        for (const e of enrollments) {
          const cid = e?.courseId?._id ?? e?.courseId; // populated or raw id
          if (cid) enrolledIds.add(String(cid));
        }
      } catch {
        // αν αποτύχει, απλά δεν φιλτράρουμε
      }
    }

    const renderList = () => {
      const visible = showEnrolledOnly
        ? courses.filter((c: any) => enrolledIds.has(String(c._id)))
        : courses;

      toggleBtn && (toggleBtn.textContent = showEnrolledOnly ? "Show all courses" : "Show enrolled only");

      if (showEnrolledOnly && visible.length === 0) {
        grid.innerHTML = `<div class="empty">Δεν είσαι enrolled σε κάποιο μάθημα ακόμα.</div>`;
        return;
      }

      grid.innerHTML = visible
        .map((c: any) => {
          const id = c._id ?? c.id; // κρατάμε όπως το είχες
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
    };

    renderList();

    toggleBtn?.addEventListener("click", () => {
      showEnrolledOnly = !showEnrolledOnly;
      renderList();
    });

  } catch (err: any) {
    grid.innerHTML = `
      <div class="errorBox">
        ${escapeHtml(String(err?.message ?? err))}
      </div>
    `;
  }
}
