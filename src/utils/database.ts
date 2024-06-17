import mongoose from "mongoose";

export function connectMongoDb() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("\x1b[32mSuccessfully connected to database\x1b[0m");
    })
    .catch((err) => {
      console.log("\x1b[31mError connecting to database!\x1b[0m");
      console.log(err);
    });
}
