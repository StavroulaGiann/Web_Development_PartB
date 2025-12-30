import { escapeHtml } from "../../app/app.component";
import { loadAbout } from "../../services/api-services";

export async function renderAboutPage(container: HTMLElement) {
  container.innerHTML = `
    <section class="page container">
      <h1>About</h1>
      <p class="muted">Loading...</p>
    </section>
  `;

  const data = await loadAbout();

  const teamHtml = data.team
    .map(
      (m) => `
      <article class="card team-card">
        <img class="team-photo" src="${m.photoUrl}" alt="${escapeHtml(m.name)}">
        <h3>${escapeHtml(m.name)}</h3>
        <p class="muted">${escapeHtml(m.role)}</p>
        <p>${escapeHtml(m.bio)}</p>
      </article>
    `
    )
    .join("");

  container.innerHTML = `
    <section class="page">

      <header class="page-header container">
        <h1>About DevAcademy</h1>
        <p class="page-subtitle">${escapeHtml(data.mission)}</p>
      </header>

      <section class="section container">
        <h2 class="section-title">Our Team</h2>
        <div class="grid team-grid">
          ${teamHtml || `<p class="muted">No team members available.</p>`}
        </div>
      </section>

    </section>
  `;
}
