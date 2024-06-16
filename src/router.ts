import express from "express";
import foodTrucksRouter from "./routes/foodTrucks/router";

const router = express.Router();

router.get("/", (_, res) => {
  res
    .setHeader("Content-Type", "text/plain")
    .status(200)
    .send("Initial route response");
});

router.use("/foodTrucks", foodTrucksRouter);

export default router;
