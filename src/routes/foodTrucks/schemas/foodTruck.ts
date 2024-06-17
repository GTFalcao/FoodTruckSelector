import { Schema, model } from "mongoose";

export type FoodTruck = {
  locationId: string;
  foodItems: string[];
  otherData: string;
};
export const foodTruckModel = model(
  "FoodTruck",
  new Schema({
    locationId: {
      type: String,
      required: true,
      unique: true,
    },
    foodItems: {
      type: [String],
      default: [],
    },
    otherData: {
      type: [String],
      required: true,
    },
  }),
);
