import { escapeHtml, getIdFromQuery, loadBook } from "../../app/app.component";

export async function renderBookDetails(view: HTMLElement) {
  view.innerHTML = `<div class="empty">Loading…</div>`;

  let id = "";
  try {
    id = getIdFromQuery();
  } catch (err: any) {
    view.innerHTML = `
      <div class="errorBox">
        ${escapeHtml(String(err?.message ?? err))}
      </div>
      <a class="back" href="/books" data-link>← Back to books</a>
    `;
    return;
  }

  try {
    const book: any = await loadBook(id);

    view.innerHTML = `
      <section class="book-details">
        <section class="hero">
          <h1>${escapeHtml(book.title ?? "")}</h1>

          ${book.subtitle ? `<p class="subtitle">${escapeHtml(book.subtitle)}</p>` : ""}

          ${(book.author || typeof book.year === "number" || typeof book.pages === "number") ? `
            <div class="submeta">
              ${book.author ? `✍️ ${escapeHtml(String(book.author))}` : ""}
              ${book.author && (typeof book.year === "number" || typeof book.pages === "number") ? " • " : ""}
              ${typeof book.year === "number" ? `📅 ${book.year}` : ""}
              ${typeof book.year === "number" && typeof book.pages === "number" ? " • " : ""}
              ${typeof book.pages === "number" ? `📄 ${book.pages} σελ.` : ""}
            </div>
          ` : ""}
        </section>

        <div class="panel">
          <h3>Πληροφορίες</h3>

          <ul class="details">
            ${book.author ? `<li><strong>Συγγραφέας:</strong> ${escapeHtml(String(book.author))}</li>` : ""}
            ${typeof book.year === "number" ? `<li><strong>Χρονολογία:</strong> ${book.year}</li>` : ""}
            ${typeof book.pages === "number" ? `<li><strong>Σελίδες:</strong> ${book.pages}</li>` : ""}
            ${book.publisher ? `<li><strong>Εκδότης:</strong> ${escapeHtml(String(book.publisher))}</li>` : ""}
            ${book.isbn ? `<li><strong>ISBN:</strong> ${escapeHtml(String(book.isbn))}</li>` : ""}
            ${book.language ? `<li><strong>Γλώσσα:</strong> ${escapeHtml(String(book.language))}</li>` : ""}
            ${book.category ? `<li><strong>Κατηγορία:</strong> ${escapeHtml(String(book.category))}</li>` : ""}
            ${book.level ? `<li><strong>Επίπεδο:</strong> ${escapeHtml(String(book.level))}</li>` : ""}
            ${typeof book.available === "boolean"
              ? `<li><strong>Διαθεσιμότητα:</strong> ${book.available ? "✅ Available" : "⛔ Unavailable"}</li>`
              : ""}
          </ul>

          ${book.shortDescription ? `
            <p class="subtitle">
              ${escapeHtml(String(book.shortDescription))}
            </p>
          ` : ""}

          ${book.longDescription ? `
            <div style="margin-top:16px">
              <h3>Περιγραφή</h3>
              <p class="subtitle">${escapeHtml(String(book.longDescription))}</p>
            </div>
          ` : ""}
        </div>

        <a class="back" href="/books" data-link>← Back to books</a>
      </section>
    `;
  } catch (err: any) {
    console.error(err);
    view.innerHTML = `
      <div class="errorBox">
        ${escapeHtml(String(err?.message ?? err))}
      </div>
      <a class="back" href="/books" data-link>← Back to books</a>
    `;
  }
}
