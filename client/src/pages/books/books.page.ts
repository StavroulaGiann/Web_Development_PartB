import { escapeHtml, loadBooks, mustGet } from "../../app/app.component";


const API_ORIGIN = "http://localhost:5000";


function bookImageUrl(path?: string) {
  if (!path) return "";
  const p = String(path).trim();

  if (/^https?:\/\//i.test(p)) return p;

  const normalized = p.startsWith("/") ? p : `/${p}`;
  const finalPath = normalized.startsWith("/uploads/")
    ? normalized
    : `/uploads/${normalized.replace(/^\//, "")}`;

  return `${API_ORIGIN}${finalPath}`;
}

function norm(v: any) {
  return String(v ?? "").trim().toLowerCase();
}

function parseMaybeNumber(v: any): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export async function renderBooks(view: HTMLElement) {
  view.innerHTML = `
    <section class="hero">
      <h1>Books</h1>
      <p>Διάλεξε βιβλίο για να δεις λεπτομέρειες.</p>
    </section>

    <section class="catalog-layout">
      <aside class="catalog-filters" aria-label="Φίλτρα βιβλίων">
        <h2 class="sectionTitle">Filters</h2>
        <p class="muted">Filter books by category, language and availability.</p>

        <form id="booksFilters" class="filters-form">
          <div class="field-group">
            <label for="bookSearchInput">Search</label>
            <input
              type="search"
              id="bookSearchInput"
              name="q"
              placeholder="Title, author or keywords..."
            />
          </div>

          <div class="filters-row">
            <div class="field-group">
              <label for="bookCategoryFilter">Category</label>
              <select id="bookCategoryFilter" name="category">
                <option value="">All</option>
                <option value="programming">Programming</option>
                <option value="web">Web</option>
                <option value="networks">Networks</option>
                <option value="security">Security</option>
              </select>
            </div>

            <div class="field-group">
              <label for="bookLevelFilter">Level</label>
              <select id="bookLevelFilter" name="level">
                <option value="">All</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div class="filters-row">
            <div class="field-group">
              <label for="bookAvailabilityFilter">Availability</label>
              <select id="bookAvailabilityFilter" name="availability">
                <option value="">All</option>
                <option value="available">Available only</option>
              </select>
            </div>

            <div class="field-group">
              <label for="bookLanguageFilter">Language</label>
              <select id="bookLanguageFilter" name="language">
                <option value="">All</option>
                <option value="GR">Greek</option>
                <option value="EN">English</option>
              </select>
            </div>
          </div>
        </form>
      </aside>

      <div class="catalog-list">
        <div class="catalog-list-header">
          <div>
            <h2 class="sectionTitle">All books</h2>
            <p class="muted"><span id="booksCount">0 books</span> found</p>
          </div>

          <div class="catalog-sort">
            <label for="bookSortBy">Sort by</label>
            <select id="bookSortBy" name="sort">
              <option value="featured">Suggested</option>
              <option value="rating">Best Rated</option>
              <option value="newest">Newest</option>
              <option value="pages">Pages</option>
            </select>
          </div>
        </div>

        <div id="booksGrid" class="grid"></div>

        <div id="booksEmpty" class="empty-state" hidden>
          No books found for these filters. Try changing category or keywords.
        </div>
      </div>
    </section>
  `;

  const grid = mustGet<HTMLElement>(view, "#booksGrid");
  const countEl = mustGet<HTMLElement>(view, "#booksCount");
  const emptyEl = mustGet<HTMLElement>(view, "#booksEmpty");

  const searchInput = mustGet<HTMLInputElement>(view, "#bookSearchInput");
  const categoryFilter = mustGet<HTMLSelectElement>(view, "#bookCategoryFilter");
  const levelFilter = mustGet<HTMLSelectElement>(view, "#bookLevelFilter");
  const availabilityFilter = mustGet<HTMLSelectElement>(view, "#bookAvailabilityFilter");
  const languageFilter = mustGet<HTMLSelectElement>(view, "#bookLanguageFilter");
  const sortBySelect = mustGet<HTMLSelectElement>(view, "#bookSortBy");

  function sortBooks(list: any[], sortBy: string) {
    const sorted = list.slice();

    if (sortBy === "rating") {
      sorted.sort((a, b) => parseMaybeNumber(b?.rating) - parseMaybeNumber(a?.rating));
    } else if (sortBy === "newest") {
      sorted.sort((a, b) => parseMaybeNumber(b?.year) - parseMaybeNumber(a?.year));
    } else if (sortBy === "pages") {
      sorted.sort((a, b) => parseMaybeNumber(a?.pages) - parseMaybeNumber(b?.pages));
    } else {
      // featured/suggested
      sorted.sort((a, b) => parseMaybeNumber(b?.rating) - parseMaybeNumber(a?.rating));
    }

    return sorted;
  }

  function renderBooksGrid(list: any[]) {
    grid.innerHTML = list
      .map((b) => {
        const extraLine =
          b?.author || typeof (b as any)?.year === "number" || typeof (b as any)?.pages === "number"
            ? `
              <div class="submeta">
                ${b?.author ? `✍️ ${escapeHtml(b.author)}` : ""}
                ${b?.author && (typeof (b as any)?.year === "number" || typeof (b as any)?.pages === "number") ? " • " : ""}
                ${typeof (b as any)?.year === "number" ? `📅 ${(b as any).year}` : ""}
                ${typeof (b as any)?.year === "number" && typeof (b as any)?.pages === "number" ? " • " : ""}
                ${typeof (b as any)?.pages === "number" ? `📄 ${(b as any).pages} σελ.` : ""}
              </div>
            `
            : "";

        return `
          <a class="card book-card" href="/books/details?id=${encodeURIComponent(b?._id ?? "")}" data-link>
            ${
              b?.image
                ? `<img
                    class="cover book-cover"
                    src="${escapeHtml(bookImageUrl(b.image))}"
                    alt="${escapeHtml(b?.title ?? "")}"
                    loading="lazy"
                  />`
                : ""
            }

            <div class="card-top">
              <div>
                <h3>${escapeHtml(b?.title ?? "")}</h3>
                ${b?.subtitle ? `<div class="sub">${escapeHtml(b.subtitle)}</div>` : ""}
                ${extraLine}
              </div>
            </div>

            ${b?.shortDescription ? `<p class="desc">${escapeHtml(b.shortDescription)}</p>` : ""}

            <div class="meta">
              ${b?.category ? `<span class="pill">📌 ${escapeHtml(String(b.category))}</span>` : ""}
              ${b?.level ? `<span class="pill">🎚 ${escapeHtml(String(b.level))}</span>` : ""}
              ${b?.language ? `<span class="pill">🌍 ${escapeHtml(String(b.language))}</span>` : ""}
              ${
                typeof b?.available === "boolean"
                  ? `<span class="badge">${b.available ? "✅ Available" : "⛔ Unavailable"}</span>`
                  : ""
              }
            </div>
          </a>
        `;
      })
      .join("");
  }

  function applyFiltersAndRender(allBooks: any[]) {
    let filtered = allBooks.slice();

    // Search (title, subtitle, author, shortDescription, tags)
    const q = norm(searchInput.value);
    if (q) {
      filtered = filtered.filter((book) => {
        const text =
          (book?.title ?? "") +
          " " +
          (book?.subtitle ?? "") +
          " " +
          (book?.author ?? "") +
          " " +
          (book?.shortDescription ?? "") +
          " " +
          (Array.isArray(book?.tags) ? book.tags.join(" ") : "");
        return norm(text).includes(q);
      });
    }

    // Category / Level / Language (normalized)
    const category = norm(categoryFilter.value);
    if (category) filtered = filtered.filter((b) => norm(b?.category) === category);

    const level = norm(levelFilter.value);
    if (level) filtered = filtered.filter((b) => norm(b?.level) === level);

    const availability = availabilityFilter.value || "";
    if (availability === "available") {
      filtered = filtered.filter((b) => b?.available === true);
    }

    const language = norm(languageFilter.value);
    if (language) filtered = filtered.filter((b) => norm(b?.language) === language);

    // Sort
    const sortBy = sortBySelect.value || "featured";
    filtered = sortBooks(filtered, sortBy);

    // Count + empty state
    countEl.textContent = filtered.length === 1 ? "1 book" : `${filtered.length} books`;
    emptyEl.hidden = filtered.length !== 0;

    renderBooksGrid(filtered);
  }

  // Load + wire filters
  grid.innerHTML = `<div class="empty">Loading…</div>`;

  try {
    const books = await loadBooks();

    if (!Array.isArray(books) || books.length === 0) {
      grid.innerHTML = `<div class="empty">Δεν βρέθηκαν βιβλία.</div>`;
      countEl.textContent = "0 books";
      emptyEl.hidden = false;
      return;
    }

    // Events (Part-A style)
    searchInput.addEventListener("input", () => applyFiltersAndRender(books));
    [
      categoryFilter,
      levelFilter,
      availabilityFilter,
      languageFilter,
      sortBySelect,
    ].forEach((el) => el.addEventListener("change", () => applyFiltersAndRender(books)));

    // Initial render
    applyFiltersAndRender(books);
  } catch (err: any) {
    console.error(err);
    grid.innerHTML = `
      <div class="errorBox">
        ${escapeHtml(String(err?.message ?? err))}
      </div>
    `;
    countEl.textContent = "0 books";
    emptyEl.hidden = false;
  }
}
