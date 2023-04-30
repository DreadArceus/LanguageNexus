import express from "express";
import { nexusPort } from "./constants";

const main = async () => {
  const app = express();

  app.listen(nexusPort, () => {
    console.log(`Nexus is listening on http://localhost:${nexusPort}`);
  });
};

main().catch(console.error);
