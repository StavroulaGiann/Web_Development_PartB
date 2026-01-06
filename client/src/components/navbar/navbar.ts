// Import authentication helpers
// isLoggedIn(): checks if a user session exists
// getUser(): returns the current logged-in user (if any)
// logout(): clears auth data (token, user info)
import { getUser, isLoggedIn, logout } from "../../services/auth";


//Navbar Markup (HTML structure)
export function navbarMarkup() {
  // Determine authentication state
  const logged = isLoggedIn();
  const user = getUser();

  // Return navbar HTML as a string
  return `
    <header class="topbar" id="topbar">
      <nav class="menu container">
        <!-- Brand / Home link -->
        <a class="brand" href="/" data-link id="brand">DevAcademy</a>

        <!-- Mobile hamburger button -->
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

        <!-- Navigation links -->
        <div class="navLinks" id="navLinks">
          ${
            logged
              ? `
                <!-- Links visible only when logged in -->
                <a href="/books" data-link>Books</a>
                <a href="/courses" data-link>Courses</a>
                <a href="/about" data-link>About</a>
              `
              : `
                <!-- Links visible when logged out -->
                <a href="/" data-link>Home</a>
                <a href="/login" data-link>Sign in</a>
                <a href="/register" data-link>Register</a>
              `
          }
        </div>

        ${
          logged
            ? `
              <!-- Right side: user info + logout -->
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


 //Navbar Behaviors (SPA navigation & logout)

export function initNavbar(
  navigate: () => void,
  setActiveLink: (pathname: string) => void
) {
  // Global click handler (event delegation)
  document.addEventListener("click", (e) => {
    const el = e.target as HTMLElement;

    //Logout handling  
    const logoutBtn = el.closest("#logoutBtn") as HTMLButtonElement | null;
    if (logoutBtn) {
      e.preventDefault();

      // Clear auth state
      logout();

      // Reset URL and re-render app
      history.pushState(null, "", "/");
      setActiveLink("/");
      navigate();
      return;
    }

    //SPA navigation 
    const a = el.closest('a[data-link]') as HTMLAnchorElement | null;
    if (!a) return;

    e.preventDefault();

    const href = a.getAttribute("href") || "/";

    // Update browser URL without full page reload
    history.pushState(null, "", href);

    // Update active link + render new view
    setActiveLink(href);
    navigate();
  });

  //Browser Back / Forward buttons
  window.addEventListener("popstate", () => {
    setActiveLink(window.location.pathname);
    navigate();
  });
}


  // Mobile Menu Behavior
export function initMobileMenu() {
  const topbar = document.getElementById("topbar");
  const btn = document.getElementById("navToggle") as HTMLButtonElement | null;
  const links = document.getElementById("navLinks");

  // Abort if required elements are missing
  if (!topbar || !btn || !links) return;

  // Prevent attaching listeners multiple times
  if (btn.dataset.bound === "1") return;
  btn.dataset.bound = "1";

  // Open / close helper
  const setOpen = (open: boolean) => {
    topbar.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  };

 // Toggle menu
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!topbar.classList.contains("is-open"));
  });

  // Close menu when a link is clicked 
  links.addEventListener("click", () => setOpen(false));

 // Close menu with ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

 // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!topbar.contains(e.target as Node)) setOpen(false);
  });
}
