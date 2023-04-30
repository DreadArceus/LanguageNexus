import express from "express";
import { langInfo, nexusPort } from "./constants";
import { languages } from "./types";

const main = async () => {
  const app = express();

  app.get("/ping", async (_, res) => {
    const results: Partial<Record<languages, Object>> = {};

    const promises = Object.entries(langInfo).map(async ([lang, port]) => {
      try {
        const res = await fetch(`http://localhost:${port}/ping`);
        const data = await res.json();
        results[lang as languages] = data;
      } catch (err) {
        console.error(err);
        results[lang as languages] = { error: "Unable to reach API" };
      }
    });

    await Promise.all(promises);
    res.send(results);
  });

  app.listen(nexusPort, () => {
    console.log(`Nexus is listening on ${nexusPort}`);
  });
};

main().catch(console.error);
