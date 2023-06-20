import express from "express";
import { nexusPort, routes } from "./constants";
import { asyncHandler } from "./handlers/asyncHandler";
import { apiHandler } from "./handlers/apiHandler";

export const app = express();

for (const route of routes)
  app.get(`/${route}`, asyncHandler(apiHandler(route)));

const main = async (): Promise<void> => {
  app.listen(nexusPort, () => {
    console.log(`Nexus is listening on ${nexusPort}`);
  });
};

if (require.main === module) {
  main().catch(console.error);
}
