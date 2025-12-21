import "./styles.css";

type Book = {
  _id: string;
  title: string;
  subtitle?: string;
  author?: string;
  category: string;
  level: string;
  language?: string;
  shortDescription?: string;
  image?: string;
  available?: boolean;
};

async function loadBooks(): Promise<Book[]> {
  const res = await fetch("/api/books");
  if (!res.ok) throw new Error(`Failed to load books (${res.status})`);
  return res.json();
}

function escapeHtml(s = "") {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderBookCard(b: Book) {
  const title = escapeHtml(b.title ?? "Untitled");
  const desc = escapeHtml(b.shortDescription ?? "");
  const category = escapeHtml(b.category ?? "");
  const level = escapeHtml(b.level ?? "");
  const lang = escapeHtml(b.language ?? "GR");

  return `
    <a class="card" href="/books-details.html?id=${encodeURIComponent(b._id)}">
      <div class="card-top">
        <div>
          <h3>${title}</h3>
          <div class="meta">
            <span class="pill">#${category}</span>
            <span class="pill">${level}</span>
            <span class="pill">${lang}</span>
          </div>
        </div>
        <span class="badge">${b.available ? "Available" : "Unavailable"}</span>
      </div>

      <p class="desc">${desc}</p>
    </a>
  `;
}

async function main() {
  const root = document.querySelector<HTMLDivElement>("#app");
  if (!root) return;

  root.innerHTML = `
    <div class="topbar">
      <div class="container">
        <div class="topbar-inner">
          <div class="brand">
            <span class="logo"></span>
            <span>DevAcademy</span>
          </div>
          <span class="badge">Books</span>
        </div>
      </div>
    </div>

    <div class="container">
      <section class="hero">
        <h1>Books Library</h1>
        <p>Books are loaded dynamically from MongoDB μέσω REST API.</p>
        <div class="footerNote" id="status">Loading…</div>
      </section>

      <section class="grid" id="grid"></section>
      <div class="errorBox" id="error" style="display:none;"></div>
    </div>
  `;

  const grid = document.querySelector<HTMLDivElement>("#grid")!;
  const status = document.querySelector<HTMLDivElement>("#status")!;
  const error = document.querySelector<HTMLDivElement>("#error")!;

  try {
    const books = await loadBooks();
    status.textContent = `Loaded ${books.length} book(s)`;
    grid.innerHTML = books.map(renderBookCard).join("");
  } catch (e: any) {
    status.textContent = "Error";
    error.style.display = "block";
    error.textContent = e?.message ?? "Unknown error";
  }
}

main();
