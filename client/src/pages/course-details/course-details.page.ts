import {
  createReview,
  escapeHtml,
  getIdFromQuery,
  loadCourse,
  loadCourseReviews,
} from "../../app/app.component";

//Renders the Course Details page:

export async function renderCourseDetails(view: HTMLElement) {
  try {
    // Read course id from query string 
    const id = getIdFromQuery();

    // Fetch course details from API
    const course = await loadCourse(id);

    // Build the page HTML (course meta + enroll + reviews + review form)
    view.innerHTML = `
      <section class="details-page">
        <header class="details-header">
          <h1 class="details-title">${escapeHtml(course.title)}</h1>
          ${course.subtitle ? `<p class="details-subtitle">${escapeHtml(course.subtitle)}</p>` : ""}

          <!-- Top meta chips: category, level, duration, counts, rating -->
          <div class="details-meta">
            ${course.category ? `<span class="meta-chip">✔ ${escapeHtml(course.category)}</span>` : ""}
            ${course.level ? `<span class="meta-chip">✔ ${escapeHtml(course.level)}</span>` : ""}
            ${course.duration ? `<span class="meta-chip">✔ ${escapeHtml(String(course.duration))}</span>` : ""}
            ${typeof course.lessonsCount === "number" ? `<span class="meta-chip">✔ ${course.lessonsCount} lessons</span>` : ""}
            ${typeof course.projectsCount === "number" ? `<span class="meta-chip">✔ ${course.projectsCount} projects</span>` : ""}
            ${
              typeof course.rating === "number"
                ? `<span class="meta-chip">✔${course.rating}${typeof course.ratingCount === "number" ? ` (${course.ratingCount})` : ""}</span>`
                : ""
            }
          </div>
        </header>

        <!-- Course info card -->
        <div class="details-card">
          <h2 class="details-card__title">Πληροφορίες</h2>

          <!-- Details list: each row is optional based on available fields -->
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

          <!-- Short description teaser -->
          ${course.shortDescription ? `<p class="details-lead">${escapeHtml(course.shortDescription)}</p>` : ""}

          <!-- Long description section -->
          ${
            course.longDescription
              ? `
                <h2 class="details-section-title">Περιγραφή</h2>
                <p class="details-paragraph">${escapeHtml(course.longDescription)}</p>
              `
              : ""
          }

          <!-- Enroll action -->
          <div class="details-actions">
            <button id="enrollBtn" type="button" class="btn btn-primary">Enroll</button>
            <p id="enrollMsg" class="form-msg" aria-live="polite"></p>
          </div>
        </div>

        <!-- Reviews card -->
        <div class="details-card reviews-card">
          <div class="reviews-head">
            <h2 class="details-card__title">Reviews</h2>
            <!-- Filled later with "X reviews" -->
            <p class="reviews-sub" id="reviewsSub"></p>
          </div>

          <!-- Reviews will be loaded async and rendered here -->
          <div id="reviewsList" class="reviews-list">Loading reviews...</div>

          <div class="divider"></div>

          <!-- Review form -->
          <h3 class="details-section-title">Leave a review</h3>

          <form id="reviewForm" class="review-form">
            <div class="review-grid">
              <div class="field">
                <label>Rating</label>

                <!-- Custom star widget (buttons) with ARIA roles for accessibility -->
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

                <!-- Hidden input is what FormData reads on submit -->
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

        <!-- Back navigation -->
        <a class="details-back" href="/courses">← Back to courses</a>
      </section>
    `;


    // ENROLL button logic
    const btn = view.querySelector("#enrollBtn") as HTMLButtonElement | null;
    const enrollMsg = view.querySelector("#enrollMsg") as HTMLParagraphElement | null;

    if (btn && enrollMsg) {
      btn.addEventListener("click", async () => {
        // Reset message each time user clicks
        enrollMsg.textContent = "";

        // Require user to be logged in (stored in localStorage)
        const userRaw = localStorage.getItem("user");
        if (!userRaw) {
          enrollMsg.textContent = "Please login first.";
          return;
        }

        // Require a valid course id
        if (!course.id) {
          enrollMsg.textContent = "Invalid course.";
          return;
        }

        // Parse user object from localStorage
        const user = JSON.parse(userRaw);

        try {
          // Lazy import to avoid loading enroll code until needed
          const { enroll } = await import("../../app/app.component");

          // Call API to enroll the user in the course
          await enroll(user._id, course.id);

          enrollMsg.textContent = "Enrolled successfully!";
        } catch (e: any) {
          // Show API error message if available
          enrollMsg.textContent = e?.message || "Enroll failed";
        }
      });
    }


    // REVIEWS section logic
    const reviewsList = view.querySelector("#reviewsList") as HTMLDivElement | null;
    const reviewForm = view.querySelector("#reviewForm") as HTMLFormElement | null;
    const reviewMsg = view.querySelector("#reviewMsg") as HTMLParagraphElement | null;

    // Initializes the custom star rating widget:

    function initStarRating(root: HTMLElement) {
      const stars = Array.from(root.querySelectorAll<HTMLButtonElement>(".star-rating .star"));
      const hidden = root.querySelector<HTMLInputElement>('input[name="rating"]');

      if (!stars.length || !hidden) return;

      // Current rating value (0 means not selected yet)
      let current = Number(hidden.value) || 0;

      // Paint UI based on selected rating 
      const paint = (val: number) => {
        stars.forEach((btn) => {
          const n = Number(btn.dataset.value);
          const on = n <= val;

          btn.classList.toggle("is-on", on);
          btn.setAttribute("aria-checked", on ? "true" : "false");

          // Keep keyboard focus on the selected star 
          btn.tabIndex = n === Math.max(val, 1) ? 0 : -1;
        });
      };

      // Set rating: update state + hidden input + repaint
      const set = (val: number) => {
        current = val;
        hidden.value = String(val);
        paint(val);
      };

      // Click: set rating to the clicked star number
      stars.forEach((btn) => {
        btn.addEventListener("click", () => set(Number(btn.dataset.value)));
      });

      // Keyboard support: arrows or number keys 1..5
      root.addEventListener("keydown", (e) => {
        const key = e.key;

        // Direct selection by pressing 1..5
        if (key >= "1" && key <= "5") {
          e.preventDefault();
          set(Number(key));
          stars[Number(key) - 1]?.focus();
          return;
        }

        // Decrease rating
        if (["ArrowLeft", "ArrowDown"].includes(key)) {
          e.preventDefault();
          const next = Math.max(1, (current || 1) - 1);
          set(next);
          stars[next - 1]?.focus();
          return;
        }

        // Increase rating
        if (["ArrowRight", "ArrowUp"].includes(key)) {
          e.preventDefault();
          const next = Math.min(5, (current || 1) + 1);
          set(next);
          stars[next - 1]?.focus();
          return;
        }
      });

      // Initial paint (in case the form has a pre-filled rating)
      paint(current);
    }

    // Activate star widget once the form exists in DOM
    if (reviewForm) initStarRating(reviewForm);

  // Loads reviews from API and renders them in the UI. Also updates the small subtitle with the number of reviews.

    async function refreshReviews() {
      if (!reviewsList) return;

      // Require a valid course id before requesting reviews
      if (!course.id) {
        reviewsList.innerHTML = "<p>Invalid course.</p>";
        return;
      }

      try {
        const reviews = await loadCourseReviews(course.id);

        // Empty state
        if (!Array.isArray(reviews) || reviews.length === 0) {
          reviewsList.innerHTML = "<p>No reviews yet.</p>";
          return;
        }

        // Update "X review(s)" subtitle
        const sub = view.querySelector("#reviewsSub") as HTMLParagraphElement | null;
        if (sub) sub.textContent = `${reviews.length} review${reviews.length === 1 ? "" : "s"}`;

        // Render each review
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
                  <span class="review-rating">✔ ${rating}/5</span>
                </div>
                ${comment ? `<p class="review-comment">${comment}</p>` : ""}
              </article>
            `;
          })
          .join("");
      } catch (e: any) {
        // Show an error message inside the reviews box (instead of crashing)
        reviewsList.innerHTML = `<p>${escapeHtml(e?.message || "Failed to load reviews")}</p>`;
      }
    }

    // Load reviews immediately on page render
    await refreshReviews();

    // Handle review submission
    if (reviewForm && reviewMsg) {
      reviewForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        reviewMsg.textContent = "";

        // Require login
        const userRaw = localStorage.getItem("user");
        if (!userRaw) {
          reviewMsg.textContent = "Please login first.";
          return;
        }

        // Require valid course id
        if (!course.id) {
          reviewMsg.textContent = "Invalid course.";
          return;
        }

        const user = JSON.parse(userRaw);

        // Read form values
        const fd = new FormData(reviewForm);
        const rating = Number(fd.get("rating"));
        const comment = String(fd.get("comment") || "");

        // Validate rating on client side
        if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
          reviewMsg.textContent = "Rating must be between 1 and 5.";
          return;
        }

        try {
          // Create review via API
          await createReview(user._id, course.id, rating, comment);

          // UX: confirm + clear form + refresh list
          reviewMsg.textContent = "Review submitted!";
          reviewForm.reset();
          await refreshReviews();
        } catch (err: any) {
          // Show API error message if available
          reviewMsg.textContent = err?.message || "Review failed";
        }
      });
    }
  } catch (err) {
    // Top-level fallback: covers missing/invalid id, loadCourse failure, etc.
    view.innerHTML = `<p>Failed to load course details.</p>`;
  }
}
