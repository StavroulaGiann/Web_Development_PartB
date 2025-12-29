import template from "./app-component.html?raw";




export function renderLayout(root: HTMLElement) {
  root.innerHTML = template;

  const view = root.querySelector<HTMLElement>("#view");
  if (!view) throw new Error("Missing #view in layout");

  return view;
}
