import { escapeHtml } from "../../app/app.component";
import { loadAbout } from "../../services/api-services";


//Renders the "About" page into the given container element.

export async function renderAboutPage(container: HTMLElement) {
  // Initial skeleton UI so the user sees something immediately
  container.innerHTML = `
    <section class="page container">
      <h1>About</h1>
      <p class="muted">Loading...</p>
    </section>
  `;

  // Fetch about page content (mission + team members)
  const data = await loadAbout();

  // Build the team cards HTML from the array returned by the API
  const teamHtml = data.team
    .map(
      (m) => `
      <article class="card team-card">
        <!-- Team photo URL is used directly; ensure the backend returns trusted URLs -->
        <img class="team-photo" src="${m.photoUrl}" alt="${escapeHtml(m.name)}">

        <!-- Visible text content is escaped to prevent HTML injection -->
        <h3>${escapeHtml(m.name)}</h3>
        <p class="muted">${escapeHtml(m.role)}</p>
        <p>${escapeHtml(m.bio)}</p>
      </article>
    `
    )
    // Join cards into one string so it can be injected into the grid container
    .join("");

  // Final page layout with header + team grid
  container.innerHTML = `
    <section class="page">

      <!-- Page header -->
      <header class="page-header container">
        <h1>About DevAcademy</h1>

        <!-- Mission text is escaped since it comes from the API -->
        <p class="page-subtitle">${escapeHtml(data.mission)}</p>
      </header>

      <!-- Team section -->
      <section class="section container">
        <h2 class="section-title">Our Team</h2>

        <!-- Grid of team member cards; fallback message if the array is empty -->
        <div class="grid team-grid">
          ${teamHtml || `<p class="muted">No team members available.</p>`}
        </div>
      </section>

    </section>
  `;
}
