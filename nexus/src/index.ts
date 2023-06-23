import express from "express";
import { nexusPort, getRoutes, postRoutes } from "./constants";
import { asyncHandler } from "./handlers/asyncHandler";
import { apiHandler } from "./handlers/apiHandler";

export const app = express();

for (const route of getRoutes)
  app.get(`/${route}`, asyncHandler(apiHandler(route, "GET")));
for (const route of postRoutes)
  app.get(`/${route}`, asyncHandler(apiHandler(route, "POST")));

const main = async (): Promise<void> => {
  app.listen(nexusPort, () => {
    console.log(`Nexus is listening on ${nexusPort}`);
  });
};

if (require.main === module) {
  main().catch(console.error);
}
