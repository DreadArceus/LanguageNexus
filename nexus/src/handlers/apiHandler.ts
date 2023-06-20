import type { languages } from "../types";
import type { Request, Response, NextFunction } from "express";
import { langInfo } from "../constants";

export const apiHandler =
  (
    route: string
  ): ((req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (_, res) => {
    const results: Partial<Record<languages, unknown>> = {};
    const stats: Partial<Record<languages, number | "error">> = {};

    const promises = Object.entries(langInfo).map(async ([rawLang, port]) => {
      const lang = rawLang as languages;
      try {
        const startTime = Date.now();
        const res = await fetch(`http://127.0.0.1:${port}/${route}`);
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
  };
