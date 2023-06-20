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

    const promises = Object.entries(langInfo).map(async ([lang, port]) => {
      try {
        const res = await fetch(`http://localhost:${port}/ping`);
        const data = await res.json();
        results[lang as languages] = data;
      } catch (err) {
        console.error(err);
        results[lang as languages] = { error: `Unable to reach ${lang} API` };
      }
    });

    await Promise.all(promises);
    res.send(results);
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
