// Import a helper function to safely escape user-controlled text (XSS protection) and the Book type for TypeScript type safety
import { escapeHtml, type Book } from "../../app/app.component";

// bookCard is a pure UI function: it receives a Book object and returns an HTML string
export function bookCard(b: Book) {

  // Safely render the book title. If title is missing (null or undefined), use "Untitled"
  const title = escapeHtml(b.title ?? "Untitled");

  // Short description of the book. Escaping prevents malicious HTML or JavaScript injection
  const desc = escapeHtml(b.shortDescription ?? "");

  // Book category 
  const category = escapeHtml(b.category ?? "");

  // Difficulty level 
  const level = escapeHtml(b.level ?? "");

  // Book language 
  const lang = escapeHtml(b.language ?? "GR");

  // Return the HTML markup for a clickable book card. <a> is used instead of <div> so the entire card acts as a link
  return `
    <a
      class="card"
      data-link
      href="/books/details?id=${encodeURIComponent(b._id)}"
    >
      <!-- Card header -->
      <div class="card-top">
        <div>
          <!-- Book title -->
          <h3>${title}</h3>

          <!-- Metadata badges -->
          <div class="meta">
            <span class="pill">#${category}</span>
            <span class="pill">${level}</span>
            <span class="pill">${lang}</span>
          </div>
        </div>
      </div>

      <!-- Short description -->
      <p class="desc">${desc}</p>
    </a>
  `;
}
