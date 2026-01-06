
// Session user type

// Represents the minimal user data stored on the client side after a successful login 
export type SessionUser = {
  _id: string;        // User unique identifier 
  firstName: string;  // User first name
  lastName: string;   // User last name
  email: string;      // User email address
};

// Key used to store the user in localStorage
const KEY = "user";


// Read user from localStorage
// Returns the logged-in user from localStorage,or null if no user is stored or parsing fails.
export function getUser(): SessionUser | null {
  const raw = localStorage.getItem(KEY);

  // No user stored
  if (!raw) return null;

  try {
    // Parse stored JSON string into a SessionUser object
    return JSON.parse(raw) as SessionUser;
  } catch {
    // Corrupted or invalid JSON in localStorage
    return null;
  }
}


// Authentication state helper

// Returns true if a user is currently logged in.
export function isLoggedIn(): boolean {
  return !!getUser();
}


// Store user in localStorage

// Persists the logged-in user in localStorage so the session survives page refreshes.
export function setUser(u: SessionUser) {
  localStorage.setItem(KEY, JSON.stringify(u));
}

// Logout helper

// Removes the stored user from localStorage, effectively logging the user out on the client side.
export function logout() {
  localStorage.removeItem(KEY);
}