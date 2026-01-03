import { initMobileMenu, initNavbar, navbarMarkup } from "../components/navbar/navbar";
import { routes } from "./app-routes";
import { isLoggedIn } from "../services/auth";

// --------------------
// Re-export API
// --------------------
export {
  getBookByKey,
  loadAbout,
  loadBook,
  loadBooks,
  loadCourse,
  loadCourses,
  login,
  enroll,
  loadCourseReviews,
  createReview,
  loadEnrollmentsByUser, // ✅ πρόσθεσε αυτό
} from "../services/api-services";

export type {
  AboutData,
  Book,
  Course,
  TeamMember
} from "../services/api-services";

// --------------------
// Types
// --------------------
export type RouteHandler = (view: HTMLElement) => Promise<void> | void;

// --------------------
// UI helpers
// --------------------
export function escapeHtml(s = "") {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function getIdFromQuery(): string {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) throw new Error("Missing id (?id=...)");
  return id;
}

// --------------------
// Navbar render (🔥 ΚΛΕΙΔΙ)
// --------------------
export function renderNavbar() {
  const root = document.getElementById("app");
  if (!root) return;

  root.innerHTML = `
    ${navbarMarkup()}
    <main id="view" class="container"></main>
  `;

  initMobileMenu();
}

// --------------------
// Active link helper
// --------------------
function setActiveLink(pathname: string) {
  document.querySelectorAll("a[data-link]").forEach((a) => {
    const href = (a as HTMLAnchorElement).getAttribute("href") || "";
    if (href === pathname) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  });
}

// --------------------
// App init
// --------------------
export function initApp() {
  renderNavbar();

  const view = document.getElementById("view") as HTMLElement;

  const PUBLIC_ROUTES = new Set<string>([
    "/",
    "/login",
    "/register"
  ]);

  const navigate = async () => {
    const path = window.location.pathname;
    const handler = routes[path] ?? routes["/"];

    // 🔒 Route guard
    if (!PUBLIC_ROUTES.has(path) && !isLoggedIn()) {
      history.replaceState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
      return;
    }

    setActiveLink(path);

    try {
      await handler(view);
    } catch (err: any) {
      console.error(err);
      view.innerHTML = `
        <div class="errorBox">
          <strong>Κάτι πήγε στραβά.</strong><br/>
          ${escapeHtml(String(err?.message ?? err))}
        </div>
      `;
    }
  };

  initNavbar(navigate, setActiveLink);

  setActiveLink(window.location.pathname);
  navigate();
}
