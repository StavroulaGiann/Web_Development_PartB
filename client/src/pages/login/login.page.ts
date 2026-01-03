import { login, renderNavbar } from "../../app/app.component";
import { setUser } from "../../services/auth";

export function renderLogin(view: HTMLElement) {
  view.innerHTML = `
    <section class="page">
      <h1>Sign in</h1>

      <form id="loginForm" class="form">
        <label>Email</label>
        <input name="email" type="email" autocomplete="email" required />

        <label>Password</label>
        <input
          name="password"
          type="password"
          autocomplete="current-password"
          required
          minlength="8"
        />

        <button type="submit">Login</button>
        <p id="msg" class="form-msg" aria-live="polite"></p>
      </form>
    </section>
  `;

  const form = view.querySelector("#loginForm") as HTMLFormElement;
  const msg = view.querySelector("#msg") as HTMLParagraphElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "Loading...";

    const fd = new FormData(form);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    try {
      const data = await login(email, password);

      if (!data?.user?._id) {
        msg.textContent = "Login failed.";
        return;
      }

      // ✅ Save user session
      setUser(data.user);

      // 🔥 ΞΑΝΑ-ΚΑΝΕ RENDER ΤΟ NAVBAR
      renderNavbar();

      msg.textContent = `Welcome ${data.user.firstName || ""}!`;

      // 👉 Redirect σε protected area
      history.pushState({}, "", "/courses");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch (err: any) {
      msg.textContent = err?.message || "Login failed";
    }
  });
}
