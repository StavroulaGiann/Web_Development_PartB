import { escapeHtml, type Course } from "../../app/app.component";
export function courseCard(c: Course) {
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
