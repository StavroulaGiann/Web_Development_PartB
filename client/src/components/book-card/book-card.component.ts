import { escapeHtml, type Book } from "../../app/app.component";
export function bookCard(b: Book) {
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
