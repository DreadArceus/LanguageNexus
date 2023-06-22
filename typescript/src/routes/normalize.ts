import express from "express";

const router = express.Router();
router.post("/normalize", (req, res) => {
  const data = req.body.data;

  if (!Array.isArray(data) || data.some((item) => typeof item !== "number")) {
    res.status(422).send({ error: "Input must be an array of numbers." });
    return;
  }

  const max = Math.max(...data);
  const min = Math.min(...data);
  const normalizedData =
    max === min
      ? data.map(() => 0)
      : data.map((num) => (num - min) / (max - min));

  res.send({ normalizedData });
});

export default router;
