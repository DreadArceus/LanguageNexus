import express from "express";

const main = async () => {
  const app = express();

  app.listen(process.env.port || 4000, () => {
    console.log(
      `Nexus is listening on http://localhost:${process.env.port || 4000}`
    );
  });
};

main().catch(console.error);
