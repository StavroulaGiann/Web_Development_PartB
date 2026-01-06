
// Types (DATA ONLY)
// These are TypeScript type definitions used on the client side. They describe the shape of data we expect from the API (no runtime code).

export type Book = {
  _id: string; // MongoDB document id
  title: string;

  subtitle?: string; // Optional fields may be missing from the API response
  author?: string;
  year?: number;
  pages?: number;
  publisher?: string;
  isbn?: string;

  longDescription?: string;

  category: string; 
  level: string;    

  language?: string;
  shortDescription?: string;

  image?: string;      // Image URL or path 
  available?: boolean; // Availability flag 
};

export type Course = {
  // Some APIs return "_id" (MongoDB), others return "id"
  // Keeping both optional allows the UI to work with either format.
  _id?: string;
  id?: string;

  title: string;
  subtitle?: string;

  category: string; 
  level: string;    

  duration?: string;     
  lessonsCount?: number;
  projectsCount?: number;

  rating?: number;       // average rating
  ratingCount?: number;  // number of ratings

  language?: string; 
  mode?: string;     

  shortDescription?: string;
  longDescription?: string;
};

export type TeamMember = {
  _id: string;      // MongoDB id
  name: string;     // Display name
  role: string;     // Job title / responsibility
  bio: string;      // Short bio text
  photoUrl: string; // URL/path to profile photo
};

export type AboutData = {
  mission: string;      // Company/academy mission statement
  team: TeamMember[];   // Team members list
};


// Internal fetch helper

// Generic helper that:
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  // calls fetch()
  const res = await fetch(url, options);

  // If the response status is not OK, try to extract a useful error message
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      // parses response safely 
      const data = await res.json();
      if (data?.message) msg = String(data.message);
    } catch {
      // If parsing fails, keep the default message
    }
    throw new Error(msg);
  }

  // Read as text first to avoid JSON.parse throwing on empty bodies
  const text = await res.text();

// returns strongly-typed data (T)
  return (text ? JSON.parse(text) : undefined) as T;
}


// API functions
// Thin wrappers around request<T>() that define the endpoints and returned types.

export function loadBooks(): Promise<Book[]> {
  // GET /api/books -> Book[]
  return request<Book[]>("/api/books");
}

export function loadBook(id: string): Promise<Book> {
  // encodeURIComponent prevents broken URLs if id contains special characters
  // GET /api/books/:id -> Book
  return request<Book>(`/api/books/${encodeURIComponent(id)}`);
}

export function getBookByKey(key: string): Promise<Book> {
  // Alias helper 
  return loadBook(key);
}

export function loadEnrollmentsByUser(userId: string): Promise<any[]> {
  // GET /api/enrollments?userId=... -> { enrollments: [...] }
  // Then we only return the enrollments array to keep UI usage simple.
  return request<{ enrollments: any[] }>(
    `/api/enrollments?userId=${encodeURIComponent(userId)}`
  ).then((d) => d.enrollments);
}

export function loadCourses(): Promise<Course[]> {
  // GET /api/courses -> Course[]
  return request<Course[]>("/api/courses");
}

export function loadCourse(id: string): Promise<Course> {
  // GET /api/courses/:id -> Course
  return request<Course>(`/api/courses/${encodeURIComponent(id)}`);
}

export function loadAbout(): Promise<AboutData> {
  // GET /api/about -> AboutData
  return request<AboutData>("/api/about");
}

export async function login(email: string, password: string) {
  // POST /api/auth/login
  // Sends JSON credentials and expects JSON back 
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }), // request body 
  });

  // Some backends return JSON, others return plain text on errors.
  // We handle both by checking content-type.
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json")
    ? await res.json()
    : { message: await res.text() };

  // Convert non-OK responses to thrown errors so the UI can catch and display them
  if (!res.ok) throw new Error(String(data?.message || "Login failed"));

  return data;
}

export async function enroll(userId: string, courseId: string) {
  // POST /api/enrollments
  // Creates an enrollment record for a user to a course
  const res = await fetch("/api/enrollments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, courseId }),
  });

  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json")
    ? await res.json()
    : { message: await res.text() };

  if (!res.ok) throw new Error(String(data?.message || "Enroll failed"));
  return data;
}

export async function loadCourseReviews(courseId: string) {
  // GET /api/reviews/course/:courseId -> { reviews: [...] }
  const res = await fetch(`/api/reviews/course/${encodeURIComponent(courseId)}`);
  const data = await res.json();

  if (!res.ok) throw new Error(String(data?.message || "Failed to load reviews"));

  // Return only the array because that’s what the UI needs
  return data.reviews;
}

export async function createReview(
  userId: string,
  courseId: string,
  rating: number,
  comment: string
) {
  // POST /api/reviews
  // Creates a review for a course by a user
  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, courseId, rating, comment }),
  });

  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json")
    ? await res.json()
    : { message: await res.text() };

  if (!res.ok) throw new Error(String(data?.message || "Review failed"));

  // Backend returns { review: {...} }, we return only the review object
  return data.review;
}
