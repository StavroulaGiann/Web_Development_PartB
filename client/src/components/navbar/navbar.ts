import { getUser, isLoggedIn, logout } from "../../services/auth";

// --------------------
// Navbar Markup
// --------------------
export function navbarMarkup() {
  const logged = isLoggedIn();
  const user = getUser();

  return `
    <header class="topbar" id="topbar">
      <nav class="menu container">
        <a class="brand" href="/" data-link id="brand">DevAcademy</a>

        <button
          class="navToggle"
          id="navToggle"
          aria-label="Menu"
          aria-expanded="false"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="navLinks" id="navLinks">
          ${
            logged
              ? `
                <a href="/books" data-link>Books</a>
                <a href="/courses" data-link>Courses</a>
                <a href="/about" data-link>About</a>
              `
              : `
                <a href="/" data-link>Home</a>
                <a href="/login" data-link>Sign in</a>
                <a href="/register" data-link>Register</a>
              `
          }
        </div>

        ${
          logged
            ? `
              <div class="navRight">
                <span class="navUser">${user?.firstName ?? ""}</span>
                <button
                  id="logoutBtn"
                  type="button"
                  class="btn btn-secondary"
                >
                  Logout
                </button>
              </div>
            `
            : ``
        }
      </nav>
    </header>
  `;
}

// --------------------
// Navbar Behaviors
// --------------------
export function initNavbar(
  navigate: () => void,
  setActiveLink: (pathname: string) => void
) {
  // SPA navigation + logout (delegation)
  document.addEventListener("click", (e) => {
    const el = e.target as HTMLElement;

    // ✅ Logout
    const logoutBtn = el.closest("#logoutBtn") as HTMLButtonElement | null;
    if (logoutBtn) {
      e.preventDefault();
      logout();
      history.pushState(null, "", "/");
      setActiveLink("/");
      navigate();
      return;
    }

    // ✅ SPA links
    const a = el.closest('a[data-link]') as HTMLAnchorElement | null;
    if (!a) return;

    e.preventDefault();
    const href = a.getAttribute("href") || "/";

    history.pushState(null, "", href);
    setActiveLink(href);
    navigate();
  });

  // Back / Forward buttons
  window.addEventListener("popstate", () => {
    setActiveLink(window.location.pathname);
    navigate();
  });
}

// --------------------
// Mobile Menu
// --------------------
export function initMobileMenu() {
  const topbar = document.getElementById("topbar");
  const btn = document.getElementById("navToggle") as HTMLButtonElement | null;
  const links = document.getElementById("navLinks");

  if (!topbar || !btn || !links) return;

  // μην δένεις listeners δεύτερη φορά
  if (btn.dataset.bound === "1") return;
  btn.dataset.bound = "1";

  const setOpen = (open: boolean) => {
    topbar.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  };

  // Toggle
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!topbar.classList.contains("is-open"));
  });

  // Click σε link -> close
  links.addEventListener("click", () => setOpen(false));

  // Escape -> close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  // Click outside -> close
  document.addEventListener("click", (e) => {
    if (!topbar.contains(e.target as Node)) setOpen(false);
  });
}
