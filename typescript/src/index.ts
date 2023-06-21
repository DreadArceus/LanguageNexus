import express from "express";
import type { Request, Response } from "express";
import { port } from "./constants";
import normalizeRouter from "./routes/normalize";

export const app = express();

app.get("/ping", (_, res) => {
  res.send({ result: "pong" });
});

app.use(express.json());
app.use(normalizeRouter);
app.use((err: Error, _: Request, res: Response) => {
  console.error(err);
  res.status(500).send({ error: "An error occurred." });
});

const main = async (): Promise<void> => {
  app.listen(port, () => {
    console.log(`TypeScript is listening on ${port}`);
  });
};

if (require.main === module) {
  main().catch(console.error);
}
