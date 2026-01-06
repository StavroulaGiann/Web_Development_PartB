// Import HTML escaping helper for XSS protection and the Course type for TypeScript safety
import { escapeHtml, type Course } from "../../app/app.component";

// courseCard is a pure UI function: it takes a Course object and returns HTML markup as a string
export function courseCard(c: Course) {

  // Resolve course ID
  // Some APIs return `_id` (MongoDB), others `id`, `(c as any)` is used as a temporary workaround for inconsistent typing
  const id = (c as any)._id ?? c.id ?? "";

  // Safely render the course title
  const title = escapeHtml(c.title ?? "Untitled");

  // Short description 
  const desc = escapeHtml(c.shortDescription ?? "");

  // Course category 
  const category = escapeHtml(c.category ?? "");

  // Difficulty level 
  const level = escapeHtml(c.level ?? "");

  // Course language 
  const lang = escapeHtml(c.language ?? "GR");

  // Optional course duration. Converted to string and escaped if present
  const duration = c.duration ? escapeHtml(String(c.duration)) : "";

  // Number of lessons. Guarded with Number.isFinite to avoid NaN or invalid values
  const lessons = Number.isFinite(c.lessonsCount as number)
    ? String(c.lessonsCount)
    : "";

  // Number of projects. Same numeric safety check as lessons
  const projects = Number.isFinite(c.projectsCount as number)
    ? String(c.projectsCount)
    : "";

  // Course rating
  // Displays average rating with one decimal. Optionally includes rating count in parentheses
  const rating =
    typeof c.rating === "number"
      ? `${c.rating.toFixed(1)}${
          typeof c.ratingCount === "number" ? ` (${c.ratingCount})` : ""
        }`
      : "";

  // Build secondary info line. Each item is optional and only included if it exists
  const infoParts = [
    duration && `✔ ${duration}`,
    lessons && `✔ ${lessons} lessons`,
    projects && `✔ ${projects} projects`,
    rating && `✔ ${escapeHtml(rating)}`,
  ].filter(Boolean); // Removes empty values

  // Return clickable course card markup. <a> is used so the entire card navigates via the SPA router
  return `
    <a class="card" data-link href="/courses/details?id=${encodeURIComponent(id)}">
      <div class="card-top">
        <div>
          <!-- Course title -->
          <h3>${title}</h3>

          <!-- Main metadata pills -->
          <div class="meta">
            <span class="pill">#${category}</span>
            <span class="pill">${level}</span>
            <span class="pill">${lang}</span>

            <!-- Optional course mode (e.g. online / hybrid) -->
            ${c.mode ? `<span class="pill">${escapeHtml(c.mode)}</span>` : ""}
          </div>
        </div>
      </div>

      <!-- Secondary metadata (duration, lessons, projects, rating) -->
      ${
        infoParts.length
          ? `<div class="submeta">${infoParts.join(" · ")}</div>`
          : ""
      }

      <!-- Course short description -->
      <p class="desc">${desc}</p>
    </a>
  `;
}
