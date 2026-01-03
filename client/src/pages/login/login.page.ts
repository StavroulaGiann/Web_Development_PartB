import { login, renderNavbar } from "../../app/app.component";
import { setUser } from "../../services/auth";

export function renderLogin(view: HTMLElement) {
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

          <button class="auth-btn" type="submit">Login</button>

          <p id="msg" class="auth-msg" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `;

  const form = view.querySelector("#loginForm") as HTMLFormElement;
  const msg = view.querySelector("#msg") as HTMLParagraphElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "Loading...";
    msg.classList.remove("is-error", "is-success");

    const fd = new FormData(form);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    try {
      const data = await login(email, password);

      if (!data?.user?._id) {
        msg.textContent = "Login failed.";
        msg.classList.add("is-error");
        return;
      }

      setUser(data.user);
      renderNavbar();

      msg.textContent = `Welcome ${data.user.firstName || ""}!`;
      msg.classList.add("is-success");

      history.pushState({}, "", "/courses");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch (err: any) {
      msg.textContent = err?.message || "Login failed";
      msg.classList.add("is-error");
    }
  });
}
