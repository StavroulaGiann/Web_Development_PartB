export type SessionUser = { _id: string; firstName: string; lastName: string; email: string };

const KEY = "user";

export function getUser(): SessionUser | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as SessionUser; } catch { return null; }
}

export function isLoggedIn(): boolean {
  return !!getUser();
}

export function setUser(u: SessionUser) {
  localStorage.setItem(KEY, JSON.stringify(u));
}

export function logout() {
  localStorage.removeItem(KEY);
}
