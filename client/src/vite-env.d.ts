/// <reference types="vite/client" />
// Includes Vite’s client-side type definitions.
// This allows TypeScript to recognize Vite-specific features
// such as import.meta.env and HMR (Hot Module Replacement).

declare module "*.html?raw" {
  // Declares a module for importing HTML files as raw strings.
  // Example: import template from "./template.html?raw";
  const content: string;

  // Export the HTML file content as a string
  export default content;
}
