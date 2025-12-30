import type { RouteHandler } from "./app.component";

import { renderBookDetails } from "../pages/book-details/book-details.page";
import { renderBooks } from "../pages/books/books.page";
import { renderCourseDetails } from "../pages/course-details/course-details.page";
import { renderCourses } from "../pages/courses/courses.page";
import { renderHome } from "../pages/home/home.page";
import { renderRegister } from "../pages/register/register.page";

export const routes: Record<string, RouteHandler> = {
  "/": renderHome,
  "/books": renderBooks,
  "/books/details": renderBookDetails,
  "/courses": renderCourses,
  "/courses/details": renderCourseDetails,
  "/register": renderRegister,
};
