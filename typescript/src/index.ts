import express from "express";
import { port } from "./constants";

const main = async () => {
  const app = express();

  app.listen(port, () => {
    console.log(`TypeScript is listening on ${port}`);
  });
};

main().catch(console.error);
