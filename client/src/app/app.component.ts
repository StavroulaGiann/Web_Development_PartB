import { initMobileMenu, initNavbar, navbarMarkup } from "../components/navbar/navbar";
import { routes } from "./app-routes";

// ✅ Re-export API ώστε τα pages να τα παίρνουν από εδώ
export {
  getBookByKey,
  loadAbout, loadBook, loadBooks, loadCourse, loadCourses
} from "../services/api-services";

export type {
  AboutData, Book,
  Course, TeamMember
} from "../services/api-services";

// --------------------
// Types
// --------------------
export type RouteHandler = (view: HTMLElement) => Promise<void> | void;

// --------------------
// UI Helpers (ΑΝΗΚΟΥΝ ΕΔΩ)
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
// Router helpers
// --------------------
function setActiveLink(pathname: string) {
  document.querySelectorAll("a[data-link]").forEach((a) => {
    const href = (a as HTMLAnchorElement).getAttribute("href") || "";
    if (href === pathname) {
      (a as HTMLAnchorElement).setAttribute("aria-current", "page");
    } else {
      (a as HTMLAnchorElement).removeAttribute("aria-current");
    }
  });
}

// --------------------
// App init
// --------------------
export function initApp() {
  const root = document.getElementById("app");
  if (!root) return;

  root.innerHTML = `
    ${navbarMarkup()}
    <main id="view" class="container"></main>
  `;

  initMobileMenu();

  const view = document.getElementById("view") as HTMLElement;

  const navigate = async () => {
    const path = window.location.pathname;
    const handler = routes[path] ?? routes["/"];

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
