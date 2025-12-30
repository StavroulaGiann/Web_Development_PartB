import { escapeHtml, getIdFromQuery, loadCourse } from "../../app/app.component";

export async function renderCourseDetails(view: HTMLElement) {
  try {
    const id = getIdFromQuery();
    const c = await loadCourse(id);
    view.innerHTML = `
      <h1>${escapeHtml(c.title)}</h1>
      <p>${escapeHtml(c.longDescription ?? "")}</p>
      <a data-link href="/courses">Back</a>
    `;
  } catch (e: any) {
    view.innerHTML = escapeHtml(e.message);
  }
}
