import type { Languages, RequestMethod, Stats } from "../types";
import type { Request, Response, NextFunction } from "express";
import { langInfo } from "../constants";
import { constructPostOptions } from "../utils";

export const apiHandler =
  (
    route: string,
    method: RequestMethod
  ): ((req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req, res) => {
    const results: Partial<Record<Languages, unknown>> = {};
    const stats: Partial<Stats> = {};

    const promises = Object.entries(langInfo).map(async ([rawLang, port]) => {
      const lang = rawLang as Languages;
      try {
        const startTime = Date.now();
        const res = await fetch(
          `http://127.0.0.1:${port}/${route}`,
          method === "POST" ? constructPostOptions(req.body) : {}
        );
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
