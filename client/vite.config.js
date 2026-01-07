import { defineConfig } from "vite";          // Vite configuration helper
import path from "node:path";                 // Node.js path utilities
import sirv from "sirv";                      // Static file server (dev)

/**
 * Custom plugin για να σερβίρεται το Part A
 * (στατικό marketing site) μέσα από το Vite
 */
function servePartA() {
  // Απόλυτο path προς τον φάκελο του Part A
  const partARoot = path.resolve(__dirname, "../part-a-frontend");

  // Δημιουργία static server για το Part A
  const serve = sirv(partARoot, { dev: true });

  return {
    name: "serve-parta",

    // Hook που τρέχει όταν ξεκινά ο dev server
    configureServer(server) {
      // Ό,τι ζητείται στο /parta
      server.middlewares.use("/parta", (req, res, next) => {
        // Αν ο χρήστης ζητήσει σκέτο /parta
        // φόρτωσε αυτόματα το index.html
        if (req.url === "/" || req.url === "") {
          req.url = "/index.html";
        }

        // Σέρβιρε τα αρχεία του Part A
        serve(req, res, next);
      });
    },
  };
}

// Export του Vite configuration
export default defineConfig({
  plugins: [
    servePartA(), // Ενεργοποίηση του custom plugin για το Part A
  ],

  server: {
    proxy: {
      // Redirect API requests στον backend server
      "/api": "http://localhost:5000",

      // Redirect uploads (εικόνες κλπ) στον backend
      "/uploads": "http://localhost:5000",
    },
  },
});
