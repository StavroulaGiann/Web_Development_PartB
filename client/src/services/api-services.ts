// --------------------
// Types (DATA ONLY)
// --------------------
export type Book = {
  _id: string;
  title: string;
  subtitle?: string;
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

export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
};

export type AboutData = {
  mission: string;
  team: TeamMember[];
};

// --------------------
// Internal fetch helper
// --------------------
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) msg = String(data.message);
    } catch {}
    throw new Error(msg);
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

// --------------------
// API functions
// --------------------
export function loadBooks(): Promise<Book[]> {
  return request<Book[]>("/api/books");
}

export function loadBook(id: string): Promise<Book> {
  return request<Book>(`/api/books/${encodeURIComponent(id)}`);
}

export function getBookByKey(key: string): Promise<Book> {
  return loadBook(key);
}


export function loadEnrollmentsByUser(userId: string): Promise<any[]> {
  return request<{ enrollments: any[] }>(`/api/enrollments?userId=${encodeURIComponent(userId)}`)
    .then((d) => d.enrollments);
}

export function loadCourses(): Promise<Course[]> {
  return request<Course[]>("/api/courses");
}

export function loadCourse(id: string): Promise<Course> {
  return request<Course>(`/api/courses/${encodeURIComponent(id)}`);
}

export function loadAbout(): Promise<AboutData> {
  return request<AboutData>("/api/about");
}
export async function login(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json") ? await res.json() : { message: await res.text() };

  if (!res.ok) throw new Error(String(data?.message || "Login failed"));
  return data;
}

export async function enroll(userId: string, courseId: string) {
  const res = await fetch("/api/enrollments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, courseId }),
  });

  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json") ? await res.json() : { message: await res.text() };

  if (!res.ok) throw new Error(String(data?.message || "Enroll failed"));
  return data;
}

export async function loadCourseReviews(courseId: string) {
  const res = await fetch(`/api/reviews/course/${encodeURIComponent(courseId)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(String(data?.message || "Failed to load reviews"));
  return data.reviews;
}

export async function createReview(userId: string, courseId: string, rating: number, comment: string) {
  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, courseId, rating, comment }),
  });

  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json") ? await res.json() : { message: await res.text() };

  if (!res.ok) throw new Error(String(data?.message || "Review failed"));
  return data.review;
}


