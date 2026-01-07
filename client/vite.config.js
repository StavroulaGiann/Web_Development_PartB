import { defineConfig } from "vite";
import path from "node:path";
import sirv from "sirv";

function servePartA() {
  const partARoot = path.resolve(__dirname, "../part-a-frontend");
  const serve = sirv(partARoot, { dev: true });

  return {
    name: "serve-parta",
    configureServer(server) {
      server.middlewares.use("/parta", (req, res, next) => {
        // όταν ζητάς /parta -> να δείχνει /parta/index.html
        if (req.url === "/" || req.url === "") req.url = "/index.html";
        serve(req, res, next);
      });
    },
  };
}

export default defineConfig({
  plugins: [servePartA()],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
      "/uploads": "http://localhost:5000",
    },
  },
});
