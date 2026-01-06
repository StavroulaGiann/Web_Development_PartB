
// Layout template import

// Imports the HTML layout as a raw string.
import template from "./app-component.html?raw";

// Layout renderer

// Renders the main application layout into the given root element.
// Returns the <main id="view"> element, which is used as the dynamic content container by the router.
export function renderLayout(root: HTMLElement) {
  // Inject the layout HTML into the root element
  root.innerHTML = template;

  // Find the main view container where pages will be rendered
  const view = root.querySelector<HTMLElement>("#view");

  // Fail fast if the expected container is missing
  if (!view) throw new Error("Missing #view in layout");

  // Return the view element so the caller can render pages into it
  return view;
}
