import express from "express";
import { port } from "./constants";

export const app = express();

app.get("/ping", (_, res) => {
  res.send({ result: "pong" });
});

const main = async (): Promise<void> => {
  app.listen(port, () => {
    console.log(`TypeScript is listening on ${port}`);
  });
};

if (require.main === module) {
  main().catch(console.error);
}
