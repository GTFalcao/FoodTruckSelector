import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
  res
    .setHeader("Content-Type", "text/plain")
    .status(200)
    .send("Initial route response");
});

export default router;
