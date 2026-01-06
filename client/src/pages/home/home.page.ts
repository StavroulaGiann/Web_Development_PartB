//Renders the Home page content into the given view element. This is a static page (no API calls) that promotes the platform

export async function renderHome(view: HTMLElement) {
  // Inject the full home layout as HTML.
  view.innerHTML = `
    <!-- HERO SECTION: main marketing message + quick links + signup/login panel -->
    <section class="home-hero">
      <div class="home-hero__content">
        <!-- Small badge / tagline -->
        <p class="home-hero__badge">DevAcademy • Learn by doing</p>

        <!-- Main headline -->
        <h1 class="home-hero__title">Build Real Skills.</h1>

        <!-- Supporting subtitle text -->
        <p class="home-hero__subtitle">
          Carefully designed books and courses for developers at every stage — from first lines of code to advanced systems.
        </p>

        <!-- Quick navigation links (SPA navigation via data-link) -->
        <div class="home-hero__quick">
          <a class="quick-link" href="/books" data-link>✔ Browse Books</a>
          <a class="quick-link" href="/courses" data-link>✔ Explore Courses</a>
        </div>
      </div>

      <!-- Right panel: call-to-action card for account creation / login -->
      <div class="home-hero__panel">
        <div class="home-card">
          <h2 class="home-card__title">Start your journey</h2>
          <p class="home-card__text">
            Create an account to save books, track courses, and build your learning path.
          </p>

          <!-- Auth actions -->
          <div class="home-card__actions">
            <!-- NOTE: if your router relies on data-link, add it here too -->
            <a class="btn btn--primary btn--block" href="/register">Create Account</a>
            <a class="btn btn--primary btn--block" href="/login">I already have an account</a>
          </div>

          <!-- Small legal hint -->
          <p class="home-card__hint">
            By continuing you agree to the Terms & Privacy.
          </p>
        </div>
      </div>
    </section>

    <!-- FEATURES SECTION: 3 simple value props -->
    <section class="home-features">
      <div class="feature-card">
        
        <h3 class="feature-card__title">Curated Books</h3>
        <p class="feature-card__text">Read focused content with clear learning goals.</p>
      </div>

      <div class="feature-card">
        
        <h3 class="feature-card__title">Practical Courses</h3>
        <p class="feature-card__text">Learn with projects, exercises, and real examples.</p>
      </div>

      <div class="feature-card">
        
        <h3 class="feature-card__title">Track Progress</h3>
        <p class="feature-card__text">Keep your learning organized in one place.</p>
      </div>
    </section>
  `;
}
