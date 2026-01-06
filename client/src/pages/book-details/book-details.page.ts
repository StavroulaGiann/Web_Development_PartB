import { escapeHtml, getIdFromQuery, loadBook } from "../../app/app.component";

//Renders the details page for a single book.

export async function renderBookDetails(view: HTMLElement) {
  // Quick loading placeholder so the user gets immediate feedback
  view.innerHTML = `<div class="empty">Loading…</div>`;

  // Extract the book id from the URL. We keep id as a string and handle potential errors from getIdFromQuery()
  let id = "";
  try {
    id = getIdFromQuery();
  } catch (err: any) {
    // If the id is missing/invalid, show a friendly error and a back link
    view.innerHTML = `
      <div class="errorBox">
        ${escapeHtml(String(err?.message ?? err))}
      </div>
      <a class="back" href="/books" data-link>← Back to books</a>
    `;
    return;
  }

  try {
    // Fetch book details from the API by id

    const book: any = await loadBook(id);

    // Render the book details page
    view.innerHTML = `
      <section class="book-details">
        <!-- Title section / hero -->
        <section class="hero">
          <h1>${escapeHtml(book.title ?? "")}</h1>

          <!-- Subtitle is optional -->
          ${book.subtitle ? `<p class="subtitle">${escapeHtml(book.subtitle)}</p>` : ""}

          <!-- Submeta line: author, year, pages (only if at least one exists) -->
          ${(book.author || typeof book.year === "number" || typeof book.pages === "number") ? `
            <div class="submeta">
              <!-- Author (optional) -->
              ${book.author ? `✔ ${escapeHtml(String(book.author))}` : ""}

              <!-- Add separator only when needed -->
              ${book.author && (typeof book.year === "number" || typeof book.pages === "number") ? " • " : ""}

              <!-- Year (optional) -->
              ${typeof book.year === "number" ? `✔ ${book.year}` : ""}

              <!-- Add separator only when needed -->
              ${typeof book.year === "number" && typeof book.pages === "number" ? " • " : ""}

              <!-- Pages (optional) -->
              ${typeof book.pages === "number" ? `✔ ${book.pages} σελ.` : ""}
            </div>
          ` : ""}
        </section>

        <!-- Main info panel -->
        <div class="panel">
          <h3>Πληροφορίες</h3>

          <!-- Details list: each <li> is rendered only if the field exists -->
          <ul class="details">
            ${book.author ? `<li><strong>Συγγραφέας:</strong> ${escapeHtml(String(book.author))}</li>` : ""}
            ${typeof book.year === "number" ? `<li><strong>Χρονολογία:</strong> ${book.year}</li>` : ""}
            ${typeof book.pages === "number" ? `<li><strong>Σελίδες:</strong> ${book.pages}</li>` : ""}
            ${book.publisher ? `<li><strong>Εκδότης:</strong> ${escapeHtml(String(book.publisher))}</li>` : ""}
            ${book.isbn ? `<li><strong>ISBN:</strong> ${escapeHtml(String(book.isbn))}</li>` : ""}
            ${book.language ? `<li><strong>Γλώσσα:</strong> ${escapeHtml(String(book.language))}</li>` : ""}
            ${book.category ? `<li><strong>Κατηγορία:</strong> ${escapeHtml(String(book.category))}</li>` : ""}
            ${book.level ? `<li><strong>Επίπεδο:</strong> ${escapeHtml(String(book.level))}</li>` : ""}

            <!-- Availability is a boolean, so we explicitly check its type -->
            ${typeof book.available === "boolean"
              ? `<li><strong>Διαθεσιμότητα:</strong> ${book.available ? "✔ Available" : "✔ Unavailable"}</li>`
              : ""}
          </ul>

          <!-- Short description (optional) -->
          ${book.shortDescription ? `
            <p class="subtitle">
              ${escapeHtml(String(book.shortDescription))}
            </p>
          ` : ""}

          <!-- Long description (optional) -->
          ${book.longDescription ? `
            <div style="margin-top:16px">
              <h3>Περιγραφή</h3>
              <p class="subtitle">${escapeHtml(String(book.longDescription))}</p>
            </div>
          ` : ""}
        </div>

        <!-- Back link for SPA navigation (data-link) -->
        <a class="back" href="/books" data-link>← Back to books</a>
      </section>
    `;
  } catch (err: any) {
    // If the API call fails or rendering throws, log for debugging and show user-friendly error
    console.error(err);
    view.innerHTML = `
      <div class="errorBox">
        ${escapeHtml(String(err?.message ?? err))}
      </div>
      <a class="back" href="/books" data-link>← Back to books</a>
    `;
  }
}
