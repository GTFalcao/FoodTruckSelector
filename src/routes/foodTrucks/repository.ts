import { FoodTruck, foodTruckModel } from "./schemas/foodTruck";
import { LastUpdateObject, lastUpdateModel } from "./schemas/lastUpdate";

export default {
  async getLastUpdate() {
    const result: LastUpdateObject = await lastUpdateModel.findOne().exec();
    return result?.lastUpdate;
  },

  async setLastUpdate(value: number) {
    const result = await lastUpdateModel
      .findOneAndUpdate({}, { lastUpdate: value }, { upsert: true })
      .exec();
    return !!result;
  },

  async upsertFoodTruck({ locationId, ...data }: FoodTruck) {
    return foodTruckModel
      .findOneAndUpdate(
        { locationId },
        {
          locationId,
          ...data,
        },
        { upsert: true },
      )
      .exec();
  },

  async listFoodTrucks() {
    return foodTruckModel.find({}, { _id: false, __v: false }).exec();
  },

  async deleteFoodTrucks() {
    return foodTruckModel.deleteMany().exec();
  },
};
