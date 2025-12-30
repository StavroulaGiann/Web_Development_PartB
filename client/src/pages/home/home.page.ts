export async function renderHome(view: HTMLElement) {
  view.innerHTML = `
    <div class="container">
      <h1>Home</h1>
      <a data-link href="/books">Books</a>
      <a data-link href="/courses">Courses</a>
    </div>
  `;
}
