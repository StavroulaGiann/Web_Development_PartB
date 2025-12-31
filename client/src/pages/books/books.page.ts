import { escapeHtml, loadBooks } from "../../app/app.component";
const API_ORIGIN = "http://localhost:5000";

function bookImageUrl(path?: string) {
  if (!path) return ""; // ή βάλε placeholder
  const p = String(path).trim();

  // αν είναι ήδη full url (http/https) το αφήνουμε όπως είναι
  if (/^https?:\/\//i.test(p)) return p;

  // αν έρχεται "uploads/..." το κάνουμε "/uploads/..."
  const normalized = p.startsWith("/") ? p : `/${p}`;

  // αν δεν ξεκινάει με /uploads, το βάζουμε (προαιρετικό safety)
  const finalPath = normalized.startsWith("/uploads/") ? normalized : `/uploads/${normalized.replace(/^\//, "")}`;

  return `${API_ORIGIN}${finalPath}`;
}

export async function renderBooks(view: HTMLElement) {
  view.innerHTML = `
    <section class="hero">
      <h1>Books</h1>
      <p>Διάλεξε βιβλίο για να δεις λεπτομέρειες.</p>
    </section>

    <div id="booksGrid" class="grid"></div>
    <div id="booksFooter" class="footerNote"></div>
  `;

  const grid = view.querySelector("#booksGrid") as HTMLElement;
  const footer = view.querySelector("#booksFooter") as HTMLElement;

  grid.innerHTML = `<div class="empty">Loading…</div>`;

  try {
    const books = await loadBooks();

    if (!books.length) {
      grid.innerHTML = `<div class="empty">Δεν βρέθηκαν βιβλία.</div>`;
      footer.textContent = "";
      return;
    }

    grid.innerHTML = books
      .map((b) => {
        const extraLine =
          b.author || typeof (b as any).year === "number" || typeof (b as any).pages === "number"
            ? `
              <div class="submeta">
                ${b.author ? `✍️ ${escapeHtml(b.author)}` : ""}
                ${b.author && (typeof (b as any).year === "number" || typeof (b as any).pages === "number") ? " • " : ""}
                ${typeof (b as any).year === "number" ? `📅 ${(b as any).year}` : ""}
                ${typeof (b as any).year === "number" && typeof (b as any).pages === "number" ? " • " : ""}
                ${typeof (b as any).pages === "number" ? `📄 ${(b as any).pages} σελ.` : ""}
              </div>
            `
            : "";
          
        return `
          <a class="card book-card" href="/books/details?id=${encodeURIComponent(b._id)}" data-link>
${
  b.image
    ? `<img
        class="cover book-cover"
        src="${escapeHtml(bookImageUrl(b.image))}"
        srcset="${escapeHtml(bookImageUrl((b as any).imageSrcSet || ""))}"
        sizes="${escapeHtml((b as any).imageSizes || "(max-width: 768px) 100vw, 300px")}"
        alt="${escapeHtml(b.title)}"
        loading="lazy"
      />`
    : ""
}


            <div class="card-top">
              <div>
                <h3>${escapeHtml(b.title)}</h3>
                ${b.subtitle ? `<div class="sub">${escapeHtml(b.subtitle)}</div>` : ""}
                ${extraLine}
              </div>
            </div>

            ${b.shortDescription ? `<p class="desc">${escapeHtml(b.shortDescription)}</p>` : ""}

            <div class="meta">
              <span class="pill">📌 ${escapeHtml(b.category)}</span>
              <span class="pill">🎚 ${escapeHtml(b.level)}</span>
              ${b.language ? `<span class="pill">🌍 ${escapeHtml(b.language)}</span>` : ""}
              ${(b as any).publisher ? `<span class="pill">🏛 ${escapeHtml(String((b as any).publisher))}</span>` : ""}
              ${(b as any).isbn ? `<span class="pill">🔖 ISBN: ${escapeHtml(String((b as any).isbn))}</span>` : ""}
              ${typeof b.available === "boolean"
                ? `<span class="badge">${b.available ? "✅ Available" : "⛔ Unavailable"}</span>`
                : ""}
            </div>
          </a>
        `;
      })
      .join("");

    footer.textContent = `Σύνολο: ${books.length}`;
  } catch (err: any) {
    console.error(err);
    grid.innerHTML = `
      <div class="errorBox">
        ${escapeHtml(String(err?.message ?? err))}
      </div>
    `;
    footer.textContent = "";
  }
}

