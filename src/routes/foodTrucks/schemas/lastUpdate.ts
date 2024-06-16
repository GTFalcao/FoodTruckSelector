import { Schema, model } from "mongoose";

export type LastUpdateObject = {
  lastUpdate: number;
};
export const lastUpdateModel = model(
  "LastUpdate",
  new Schema({
    lastUpdate: {
      type: Number,
      required: true,
    },
  }),
);
