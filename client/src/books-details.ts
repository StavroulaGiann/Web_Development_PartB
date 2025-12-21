import "./styles.css";

function escapeHtml(s = "") {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function initBookDetailsPage() {
  const root = document.getElementById("app");
  if (!root) return;

  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) {
    root.innerHTML = "<p>Λείπει το id από το URL (?id=...).</p>";
    return;
  }

  root.innerHTML = "<p>Loading…</p>";

  try {
    const res = await fetch(`/api/books/${encodeURIComponent(id)}`);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
    }

    const book = await res.json();

    root.innerHTML = `
      <div class="container book-details">
        <a class="back" href="/books.html">← Back to books</a>
        <section class="panel">
          <h1>${escapeHtml(book.title ?? "")}</h1>
          <p class="subtitle">${escapeHtml(book.subtitle ?? "")}</p>
          <p><strong>Author:</strong> ${escapeHtml(book.author ?? "")}</p>
          <p><strong>Year:</strong> ${escapeHtml(String(book.year ?? "—"))}</p>
          <p><strong>Pages:</strong> ${escapeHtml(String(book.pages ?? "—"))}</p>
          <p style="margin-top:14px">${escapeHtml(book.longDescription ?? book.shortDescription ?? "")}</p>
        </section>
      </div>
    `;
  } catch (err) {
    console.error(err);
    root.innerHTML = `
      <div class="container">
        <p>Αποτυχία φόρτωσης λεπτομερειών.</p>
        <p style="opacity:.7">${escapeHtml(String(err))}</p>
        <a href="/books.html">← Πίσω</a>
      </div>
    `;
  }
}
