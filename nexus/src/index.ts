import express from "express";
import { langInfo, nexusPort } from "./constants";
import type { languages } from "./types";
import type { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
  ): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const app = express();

app.get(
  "/ping",
  asyncHandler(async (_, res) => {
    const results: Partial<Record<languages, unknown>> = {};
    const stats: Partial<Record<languages, number | "error">> = {};

    const promises = Object.entries(langInfo).map(async ([rawLang, port]) => {
      const lang = rawLang as languages;
      try {
        const startTime = Date.now();
        const res = await fetch(`http://127.0.0.1:${port}/ping`);
        const endTime = Date.now();
        const data = await res.json();
        results[lang] = data;
        stats[lang] = endTime - startTime;
      } catch (err) {
        console.error(err);
        results[lang] = { error: `Unable to reach ${lang} API` };
        stats[lang] = "error";
      }
    });

    await Promise.all(promises);
    res.send({ results, stats });
  })
);

const main = async (): Promise<void> => {
  app.listen(nexusPort, () => {
    console.log(`Nexus is listening on ${nexusPort}`);
  });
};

if (require.main === module) {
  main().catch(console.error);
}
