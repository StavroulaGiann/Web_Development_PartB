
// Imports
// Navbar UI logic and markup
import {
  initMobileMenu,
  initNavbar,
  navbarMarkup
} from "../components/navbar/navbar";

// Authentication helper (client-side)
import { isLoggedIn } from "../services/auth";

// SPA route configuration
import { routes } from "./app-routes";


// Re-export API
// These exports allow pages/components to import everything from a single central module instead of many different files.
export {
  createReview,
  enroll,
  getBookByKey,
  loadAbout,
  loadBook,
  loadBooks,
  loadCourse,
  loadCourseReviews,
  loadCourses,
  loadEnrollmentsByUser,
  login
} from "../services/api-services";

export type {
  AboutData,
  Book,
  Course,
  TeamMember
} from "../services/api-services";


// Types
// A route handler receives the main view container and renders content into it.
export type RouteHandler = (view: HTMLElement) => Promise<void> | void;


// UI helpers

// Escapes user-provided or dynamic strings to prevent XSS attacks
export function escapeHtml(s = "") {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Reads the `id` query parameter from the URL (?id=...). Throws an error if the id is missing
export function getIdFromQuery(): string {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) throw new Error("Missing id (?id=...)");
  return id;
}


// Navbar render

// Renders the navbar and creates the main <main id="view"> container. This function effectively resets the application shell.
export function renderNavbar() {
  const root = document.getElementById("app");
  if (!root) return;

  root.innerHTML = `
    ${navbarMarkup()}
    <main id="view" class="container"></main>
  `;

  // Initialize mobile menu behavior 
  initMobileMenu();
}


// Active link helper
// Adds aria-current="page" to the active navigation link for accessibility and visual state.
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


// App initialization
export function initApp() {
  // Render navbar + main view
  renderNavbar();

  const view = document.getElementById("view") as HTMLElement;

  // Routes that do NOT require authentication
  const PUBLIC_ROUTES = new Set<string>([
    "/",
    "/login",
    "/register",
  ]);

  // Central navigation function
  const navigate = async () => {
    const path = window.location.pathname;
    const handler = routes[path] ?? routes["/"];

    // Route guard: Redirect unauthenticated users trying to access protected routes
    if (!PUBLIC_ROUTES.has(path) && !isLoggedIn()) {
      history.replaceState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
      return;
    }

    // Highlight active navigation link
    setActiveLink(path);

    try {
      // Render the page
      await handler(view);
    } catch (err: any) {
      // Global error handling for page rendering
      console.error(err);

      view.innerHTML = `
        <div class="errorBox">
          <strong>Something went wrong.</strong><br/>
          ${escapeHtml(String(err?.message ?? err))}
        </div>
      `;
    }
  };

  // Initialize SPA navigation (link clicks + browser back/forward)
  initNavbar(navigate, setActiveLink);

  // Initial render
  setActiveLink(window.location.pathname);
  navigate();
}


// Backend configuration
// Base URL of the backend API 
export const API_ORIGIN = "http://localhost:5000";


// DOM helper
// Queries a required DOM element and throws if it does not exist. Helps fail fast instead of silently breaking.
export function mustGet<T extends Element>(
  root: ParentNode,
  selector: string
): T {
  const el = root.querySelector(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el as T;
}


// Image URL helper
// Normalizes image paths coming from the backend:
export function imageUrl(path?: string) {
  if (!path) return "";

  const p = String(path).trim();

  // Already an absolute URL
  if (/^https?:\/\//i.test(p)) return p;

  //  supports absolute URLs
  const normalized = p.startsWith("/") ? p : `/${p}`;

  // prefixes relative paths with /uploads
  const finalPath = normalized.startsWith("/uploads/")
    ? normalized
    : `/uploads/${normalized.replace(/^\//, "")}`;

  return `${API_ORIGIN}${finalPath}`;
}
