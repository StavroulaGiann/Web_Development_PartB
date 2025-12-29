import { initRouter } from "./app/app-routes";
import { renderLayout } from "./app/layout";
import "./styles.css";

const root = document.getElementById("app");
if (!root) {
  throw new Error("Missing #app root element");
}

const view = renderLayout(root);
initRouter(view);
