import express, { Request, Response, NextFunction } from "express";
import constants from "./utils/constants";
import router from "./router";
import StatusCode from "status-code-enum";
import { connectMongoDb } from "./utils/database";
import "dotenv/config";

const PORT = process.env.PORT ?? constants.DEFAULT_PORT;

const app = express();
app.use(express.json({ limit: constants.JSON_SIZE_LIMIT }));
app.use((error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (error) {
    return res.status(StatusCode.ServerErrorInternal).json({ error });
  }
  next();
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`\x1b[36mNode.js ${process.version}`);
  console.log(`Port: ${PORT}`);
  console.log(`\x1b[32mFood Truck Selector is running...\x1b[0m`);
});
connectMongoDb();
