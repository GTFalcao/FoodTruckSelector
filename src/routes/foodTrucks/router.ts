import express from "express";
import controller from "./controller";

const router = express.Router();

router.get("/fetchLatestData", async (req, res) =>
  controller.fetchLatestData(req, res),
);

export default router;
