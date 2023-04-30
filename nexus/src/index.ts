import express from "express";
import { nexusPort } from "./constants";

const main = async () => {
  const app = express();

  app.listen(nexusPort, () => {
    console.log(`Nexus is listening on ${nexusPort}`);
  });
};

main().catch(console.error);
