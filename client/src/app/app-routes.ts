import type { RouteHandler } from "./app-components";
import {
    renderBookDetails,
    renderBooks,
    renderCourseDetails,
    renderCourses,
    renderHome,
} from "./app-components";

const routes: Record<string, RouteHandler> = {
  "/": renderHome,
  "/books": renderBooks,
  "/courses": renderCourses,

  // details routes με query param: ?id=
  "/books/details": renderBookDetails,
  "/courses/details": renderCourseDetails,
};

async function renderRoute(view: HTMLElement) {
  const path = window.location.pathname;
  const handler = routes[path] ?? routes["/"];
  await handler(view);
  setActiveNav();
  window.scrollTo(0, 0);
}

export function navigate(to: string) {
  window.history.pushState({}, "", to);
  return renderRoute(currentView!);
}

let currentView: HTMLElement | null = null;

export function initRouter(view: HTMLElement) {
  currentView = view;

  // initial render
  renderRoute(view);

  // back/forward
  window.addEventListener("popstate", () => {
    renderRoute(view);
  });

  // intercept clicks
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest("a");
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href) return;

    // μόνο τα internal links που έχουν data-link
    if (!a.hasAttribute("data-link")) return;

    e.preventDefault();
    navigate(href);
  });
}

function setActiveNav() {
  document.querySelectorAll<HTMLAnchorElement>('nav.menu a[data-link]').forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;

    const isActive = href === window.location.pathname;
    if (isActive) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

