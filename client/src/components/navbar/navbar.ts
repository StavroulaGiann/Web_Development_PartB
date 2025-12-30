// src/app/components/navbar/navbar.ts

export function navbarMarkup() {
  return `
    <header class="topbar" id="topbar">
      <nav class="menu container">
        <a class="brand" href="/" data-link id="brand">DevAcademy</a>

        <button class="navToggle" id="navToggle" aria-label="Menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="navLinks" id="navLinks">
          <a href="/" data-link>Home</a>
          <a href="/books" data-link>Books</a>
          <a href="/courses" data-link>Courses</a>
          <a href="/register" data-link>Register</a>
        </div>
      </nav>
    </header>
  `;
}


/**
 * Init behaviors:
 * - SPA navigation for a[data-link]
 * - active link styling via callback
 * - hamburger open/close in mobile
 */
export function initNavbar(
  navigate: () => void,
  setActiveLink: (pathname: string) => void
) {
  // SPA navigation clicks (delegation)
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest('a[data-link]') as HTMLAnchorElement | null;
    if (!a) return;

    e.preventDefault();
    const href = a.getAttribute("href") || "/";

    history.pushState(null, "", href);

    setActiveLink(window.location.pathname);
    navigate();
  });

  // back/forward
  window.addEventListener("popstate", () => {
    setActiveLink(window.location.pathname);
    navigate();
  });
}




export function initMobileMenu() {
  const topbar = document.getElementById("topbar");
  const btn = document.getElementById("navToggle") as HTMLButtonElement | null;
  const links = document.getElementById("navLinks");

  if (!topbar || !btn || !links) {
    console.warn("Hamburger init failed:", { topbar, btn, links });
    return;
  }

  // ✅ Μην ξανα-προσθέτεις listeners αν έχει ήδη γίνει init
  if (btn.dataset.bound === "1") return;
  btn.dataset.bound = "1";

  const setOpen = (open: boolean) => {
    topbar.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  };

  // Toggle open/close
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // να μη θεωρηθεί "click έξω"
    const open = !topbar.classList.contains("is-open");
    setOpen(open);
  });

  // Κλείνει όταν πατάς link μέσα στο nav
  links.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest("a");
    if (!a) return;
    setOpen(false);
  });

  // Escape -> close
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") setOpen(false);
  });

  // Click outside -> close
  document.addEventListener("click", (e) => {
    if (!topbar.contains(e.target as Node)) setOpen(false);
  });
}

