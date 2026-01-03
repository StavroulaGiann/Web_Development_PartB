import {
  createReview,
  escapeHtml,
  getIdFromQuery,
  loadCourse,
  loadCourseReviews,
} from "../../app/app.component";

export async function renderCourseDetails(view: HTMLElement) {
  try {
    const id = getIdFromQuery();
    const course = await loadCourse(id);

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

          <div class="details-actions">
            <button id="enrollBtn" type="button" class="btn btn-primary">Enroll</button>
            <p id="enrollMsg" class="form-msg" aria-live="polite"></p>
          </div>
        </div>

       <div class="details-card reviews-card">
  <div class="reviews-head">
    <h2 class="details-card__title">Reviews</h2>
    <p class="reviews-sub" id="reviewsSub"></p>
  </div>

  <div id="reviewsList" class="reviews-list">Loading reviews...</div>

  <div class="divider"></div>

  <h3 class="details-section-title">Leave a review</h3>

  <form id="reviewForm" class="review-form">
    <div class="review-grid">
      <div class="field">
  <label>Rating</label>

  <div class="star-rating" role="radiogroup" aria-label="Rating from 1 to 5">
    ${[1,2,3,4,5].map(n => `
      <button
        type="button"
        class="star"
        data-value="${n}"
        role="radio"
        aria-checked="false"
        aria-label="${n} star${n===1 ? "" : "s"}"
      >★</button>
    `).join("")}
  </div>

  <!-- αυτό είναι που θα διαβάσει το FormData -->
  <input name="rating" type="hidden" value="" required />
</div>


      <div class="field field-wide">
        <label>Comment</label>
        <textarea name="comment" rows="3" placeholder="Write something..." required></textarea>
      </div>
    </div>

    <div class="review-actions">
      <p id="reviewMsg" class="form-msg" aria-live="polite"></p>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</div>


        <a class="details-back" href="/courses">← Back to courses</a>
      </section>
    `;

    // ---------- ENROLL ----------
    const btn = view.querySelector("#enrollBtn") as HTMLButtonElement | null;
    const enrollMsg = view.querySelector("#enrollMsg") as HTMLParagraphElement | null;

    if (btn && enrollMsg) {
      btn.addEventListener("click", async () => {
        enrollMsg.textContent = "";

        const userRaw = localStorage.getItem("user");
        if (!userRaw) {
          enrollMsg.textContent = "Please login first.";
          return;
        }

        if (!course.id) {
          enrollMsg.textContent = "Invalid course.";
          return;
        }

        const user = JSON.parse(userRaw);

        try {
          const { enroll } = await import("../../app/app.component");
          await enroll(user._id, course.id);
          enrollMsg.textContent = "Enrolled successfully!";
        } catch (e: any) {
          enrollMsg.textContent = e?.message || "Enroll failed";
        }
      });
    }

    // ---------- REVIEWS ----------
    const reviewsList = view.querySelector("#reviewsList") as HTMLDivElement | null;
    const reviewForm = view.querySelector("#reviewForm") as HTMLFormElement | null;
    const reviewMsg = view.querySelector("#reviewMsg") as HTMLParagraphElement | null;

    // ⭐ Star rating widget
function initStarRating(root: HTMLElement) {
  const stars = Array.from(root.querySelectorAll<HTMLButtonElement>(".star-rating .star"));
  const hidden = root.querySelector<HTMLInputElement>('input[name="rating"]');

  if (!stars.length || !hidden) return;

  let current = Number(hidden.value) || 0;

  const paint = (val: number) => {
    stars.forEach((btn) => {
      const n = Number(btn.dataset.value);
      const on = n <= val;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-checked", on ? "true" : "false");
      btn.tabIndex = n === Math.max(val, 1) ? 0 : -1; // focus on selected (or first)
    });
  };

  const set = (val: number) => {
    current = val;
    hidden.value = String(val);
    paint(val);
  };

  // click
  stars.forEach((btn) => {
    btn.addEventListener("click", () => set(Number(btn.dataset.value)));
  });

  // keyboard (left/right/up/down, 1-5)
  root.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key >= "1" && key <= "5") {
      e.preventDefault();
      set(Number(key));
      stars[Number(key) - 1]?.focus();
      return;
    }

    if (["ArrowLeft", "ArrowDown"].includes(key)) {
      e.preventDefault();
      const next = Math.max(1, (current || 1) - 1);
      set(next);
      stars[next - 1]?.focus();
      return;
    }

    if (["ArrowRight", "ArrowUp"].includes(key)) {
      e.preventDefault();
      const next = Math.min(5, (current || 1) + 1);
      set(next);
      stars[next - 1]?.focus();
      return;
    }
  });

  // initial
  paint(current);
}

if (reviewForm) initStarRating(reviewForm);


    async function refreshReviews() {
      if (!reviewsList) return;

      if (!course.id) {
        reviewsList.innerHTML = "<p>Invalid course.</p>";
        return;
      }

      try {
        const reviews = await loadCourseReviews(course.id);

        if (!Array.isArray(reviews) || reviews.length === 0) {
          reviewsList.innerHTML = "<p>No reviews yet.</p>";
          return;
        }

       const sub = view.querySelector("#reviewsSub") as HTMLParagraphElement | null;
if (sub) sub.textContent = `${reviews.length} review${reviews.length === 1 ? "" : "s"}`;

reviewsList.innerHTML = reviews
  .map((r: any) => {
    const first = r?.userId?.firstName ? escapeHtml(r.userId.firstName) : "User";
    const last = r?.userId?.lastName ? escapeHtml(r.userId.lastName) : "";
    const name = `${first} ${last}`.trim();

    const rating = typeof r?.rating === "number" ? r.rating : "?";
    const comment = r?.comment ? escapeHtml(String(r.comment)) : "";

    return `
      <article class="review-item">
        <div class="review-top">
          <strong class="review-name">${name}</strong>
          <span class="review-rating">⭐ ${rating}/5</span>
        </div>
        ${comment ? `<p class="review-comment">${comment}</p>` : ""}
      </article>
    `;
  })
  .join("");

      } catch (e: any) {
        reviewsList.innerHTML = `<p>${escapeHtml(e?.message || "Failed to load reviews")}</p>`;
      }
    }

    await refreshReviews();

    if (reviewForm && reviewMsg) {
      reviewForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        reviewMsg.textContent = "";

        const userRaw = localStorage.getItem("user");
        if (!userRaw) {
          reviewMsg.textContent = "Please login first.";
          return;
        }

        if (!course.id) {
          reviewMsg.textContent = "Invalid course.";
          return;
        }

        const user = JSON.parse(userRaw);
        const fd = new FormData(reviewForm);

        const rating = Number(fd.get("rating"));
        const comment = String(fd.get("comment") || "");

        if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
          reviewMsg.textContent = "Rating must be between 1 and 5.";
          return;
        }

        try {
          await createReview(user._id, course.id, rating, comment);
          reviewMsg.textContent = "Review submitted!";
          reviewForm.reset();
          await refreshReviews();
        } catch (err: any) {
          reviewMsg.textContent = err?.message || "Review failed";
        }
      });
    }
  } catch (err) {
    view.innerHTML = `<p>Failed to load course details.</p>`;
  }
}

