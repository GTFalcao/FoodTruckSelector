import express from "express";
import controller from "./controller";

const router = express.Router();

router.get("/", async (req, res) => controller.getAll(req, res));
router.delete("/", async (req, res) => controller.deleteAll(req, res));

export default router;
