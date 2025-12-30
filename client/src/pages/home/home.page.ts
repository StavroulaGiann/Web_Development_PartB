export async function renderHome(view: HTMLElement) {
  view.innerHTML = `
    <section class="home-hero">
  <div class="home-hero__content">
    <p class="home-hero__badge">DevAcademy • Learn by doing</p>

    <h1 class="home-hero__title">Learn. Build. Grow.</h1>
    <p class="home-hero__subtitle">
      Books & courses designed to help you become a modern developer—step by step.
    </p>

 <div class="home-hero__quick">
  <a class="quick-link" href="/books" data-link>📚 Browse Books</a>
  <a class="quick-link" href="/courses" data-link>🎓 Explore Courses</a>
</div>
  </div>

  <div class="home-hero__panel">
    <div class="home-card">
      <h2 class="home-card__title">Start your journey</h2>
      <p class="home-card__text">
        Create an account to save books, track courses, and build your learning path.
      </p>

      <div class="home-card__actions">
        <a class="btn btn--soft btn--block"href="/register" data-link>Create Account</a>
        <a class="btn btn--soft btn--block" href="/login.html">I already have an account</a>
      </div>

      <p class="home-card__hint">
        By continuing you agree to the Terms & Privacy.
      </p>
    </div>
  </div>
</section>

<section class="home-features">
  <div class="feature-card">
    <div class="feature-card__icon">📚</div>
    <h3 class="feature-card__title">Curated Books</h3>
    <p class="feature-card__text">Read focused content with clear learning goals.</p>
  </div>

  <div class="feature-card">
    <div class="feature-card__icon">🎓</div>
    <h3 class="feature-card__title">Practical Courses</h3>
    <p class="feature-card__text">Learn with projects, exercises, and real examples.</p>
  </div>

  <div class="feature-card">
    <div class="feature-card__icon">🧩</div>
    <h3 class="feature-card__title">Track Progress</h3>
    <p class="feature-card__text">Keep your learning organized in one place.</p>
  </div>
</section>

  `;
}
