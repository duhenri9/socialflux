import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

import type { HealthResponse } from "../shared/types";
import { campaigns } from "./data/campaigns";
import { buildResponse } from "./services/insights";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const clientRoot = path.resolve(currentDir, "../client");
const distRoot = path.resolve(currentDir, "../dist/public");

export const createApplication = async (): Promise<express.Express> => {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (_request, response) => {
    const payload: HealthResponse = {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV ?? "development",
      campaignsTracked: campaigns.length,
    };

    response.json(payload);
  });

  app.get("/api/insights", (_request, response) => {
    response.json(buildResponse(campaigns));
  });

  app.get("/api/campaigns/:id", (request, response) => {
    const campaign = campaigns.find((entry) => entry.id === request.params.id);

    if (!campaign) {
      response.status(404).json({ message: "Campanha não encontrada" });

      return;
    }

    response.json(campaign);
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(distRoot));

    app.get("*", async (_request, response, next) => {
      try {
        const html = await readFile(path.resolve(distRoot, "index.html"), "utf-8");
        response.status(200).setHeader("Content-Type", "text/html").send(html);
      } catch (error) {
        next(error);
      }
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      root: clientRoot,
      server: { middlewareMode: true },
      appType: "custom",
    });

    app.use(vite.middlewares);

    app.get("*", async (request, response, next) => {
      try {
        const url = request.originalUrl;
        const template = await readFile(path.resolve(clientRoot, "index.html"), "utf-8");
        const transformed = await vite.transformIndexHtml(url, template);
        response.status(200).setHeader("Content-Type", "text/html").send(transformed);
      } catch (error) {
        next(error);
      }
    });
  }

  app.use(
    (
      error: unknown,
      _request: express.Request,
      response: express.Response,
      _next: express.NextFunction,
    ) => {
      const message = error instanceof Error ? error.message : "Erro inesperado";

      response.status(500).json({ message });
    },
  );

  return app;
};

const isDirectExecution = (() => {
  if (!process.argv[1]) {
    return false;
  }

  const entryPoint = path.resolve(process.argv[1]);
  const modulePath = path.resolve(currentFile);

  return entryPoint === modulePath;
})();

if (isDirectExecution) {
  const port = Number.parseInt(process.env.PORT ?? "3000", 10);

  createApplication()
    .then((app) => {
      app.listen(port, () => {
        console.warn(`🚀 SocialFlux server disponível em http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.error("Não foi possível iniciar o servidor:", error);
      process.exitCode = 1;
    });
}
