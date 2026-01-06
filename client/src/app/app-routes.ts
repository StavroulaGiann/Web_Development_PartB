
// Page render imports

// Each render function is responsible for displaying a specific page/view inside the main application container.
import { renderAboutPage } from "../pages/about/about.page";
import { renderBookDetails } from "../pages/book-details/book-details.page";
import { renderBooks } from "../pages/books/books.page";
import { renderCourseDetails } from "../pages/course-details/course-details.page";
import { renderCourses } from "../pages/courses/courses.page";
import { renderHome } from "../pages/home/home.page";
import { renderLogin } from "../pages/login/login.page";
import { renderRegister } from "../pages/register/register.page";

// Type definition for route handlers (SPA routing)
import type { RouteHandler } from "./app.component";

// Route configuration

// Maps URL paths to their corresponding render functions.
// This object is used by the client-side router to determine which page to render based on the current path.
export const routes: Record<string, RouteHandler> = {
  "/": renderHome,                    // Home page
  "/books": renderBooks,              // Books listing page
  "/books/details": renderBookDetails,// Single book details page
  "/courses": renderCourses,          // Courses listing page
  "/courses/details": renderCourseDetails, // Single course details page
  "/register": renderRegister,        // User registration page
  "/about": renderAboutPage,          // About / team / mission page
  "/login": renderLogin,              // Login page
};
