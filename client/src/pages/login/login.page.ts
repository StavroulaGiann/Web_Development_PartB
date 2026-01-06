import { login, renderNavbar } from "../../app/app.component";
import { setUser } from "../../services/auth";

//Renders the Login page and wires up the submit handler.
export function renderLogin(view: HTMLElement) {
  // Render the login form markup
  view.innerHTML = `
    <section class="auth-page">
      <div class="auth-card">
        <h1 class="auth-title">Sign in</h1>

        <form id="loginForm" class="auth-form">
          <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" autocomplete="email" required placeholder="you@example.com" />
          </div>

          <div class="field">
            <label for="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              minlength="8"
              placeholder="••••••••"
            />
          </div>

          <!-- Submit button triggers form submit -->
          <button class="auth-btn" type="submit">Login</button>

          <!-- Message area for loading/success/error -->
          <p id="msg" class="auth-msg" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `;

  // Get DOM references 
  const form = view.querySelector("#loginForm") as HTMLFormElement;
  const msg = view.querySelector("#msg") as HTMLParagraphElement;

  // Handle login form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent full page reload 

    // UI: show loading state
    msg.textContent = "Loading...";
    msg.classList.remove("is-error", "is-success");

    // Read form values
    const fd = new FormData(form);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    try {
      // Call API: returns { user, token? } depending on your backend design
      const data = await login(email, password);

      // Defensive check: ensure user object exists
      if (!data?.user?._id) {
        msg.textContent = "Login failed.";
        msg.classList.add("is-error");
        return;
      }

      // Persist user info  so app knows the user is logged in
      setUser(data.user);

      // Update navbar to reflect authenticated state 
      renderNavbar();

      // UI: success message
      msg.textContent = `Welcome ${data.user.firstName || ""}!`;
      msg.classList.add("is-success");

      // Redirect to courses using History API 
      history.pushState({}, "", "/courses");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch (err: any) {
      // UI: show error message from API if available
      msg.textContent = err?.message || "Login failed";
      msg.classList.add("is-error");
    }
  });
}
