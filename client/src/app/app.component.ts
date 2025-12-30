import { initMobileMenu, initNavbar, navbarMarkup } from "../components/navbar/navbar";
import { routes } from "./app-routes";
// --------------------
// Types
// --------------------

export type RouteHandler = (view: HTMLElement) => Promise<void> | void;

export type Book = {
  _id: string;
  title: string;
  subtitle?: string;
  author?: string;

  year?: number;          // 👈 χρονολογία
  pages?: number;         // 👈 σελίδες
  publisher?: string;     // 👈 εκδότης
  isbn?: string;          // 👈 ISBN
  longDescription?: string; // 👈 αναλυτική περιγραφή

  category: string;
  level: string;
  language?: string;
  shortDescription?: string;
  image?: string;
  available?: boolean;
};


export type Course = {
  _id?: string;
  id?: string;
  title: string;
  subtitle?: string;
  category: string;
  level: string;

  duration?: string;
  lessonsCount?: number;
  projectsCount?: number;
  rating?: number;
  ratingCount?: number;
  language?: string;
  mode?: string;
  shortDescription?: string;
  longDescription?: string;
};

// --------------------
// Helpers
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
// API loaders
// --------------------

export async function loadBooks(): Promise<Book[]> {
  const res = await fetch("/api/books");
  if (!res.ok) throw new Error(`Failed to load books (${res.status})`);
  return res.json();
}

export async function loadBook(id: string): Promise<Book> {
  const res = await fetch(`/api/books/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error(`Failed to load book (${res.status})`);
  return res.json();
}

export async function loadCourses(): Promise<Course[]> {
  const res = await fetch("/api/courses");
  if (!res.ok) throw new Error(`Failed to load courses (${res.status})`);
  return res.json();
}

export async function loadCourse(id: string): Promise<Course> {
  const res = await fetch(`/api/courses/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error(`Failed to load course (${res.status})`);
  return res.json();
}

// --------------------
// App init + Router
// --------------------

function setActiveLink(pathname: string) {
  document.querySelectorAll('a[data-link]').forEach((a) => {
    const href = (a as HTMLAnchorElement).getAttribute("href") || "";
    if (href === pathname) (a as HTMLAnchorElement).setAttribute("aria-current", "page");
    else (a as HTMLAnchorElement).removeAttribute("aria-current");
  });
}

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

  // ✅ ΟΛΑ τα navbar events εδώ (SPA clicks + hamburger + popstate)
  initNavbar(navigate, setActiveLink);
 
  // First render
  setActiveLink(window.location.pathname);
  navigate();
}

