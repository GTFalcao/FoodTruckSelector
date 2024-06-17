import { FoodTruck, foodTruckModel } from "./schemas/foodTruck";
import { LastUpdateObject, lastUpdateModel } from "./schemas/lastUpdate";

export class SiteRepository {
  async getLastUpdate() {
    const result: LastUpdateObject = await lastUpdateModel.findOne().exec();
    return result?.lastUpdate;
  }

  async setLastUpdate(value: number) {
    const result = await lastUpdateModel
      .findOneAndUpdate({}, { lastUpdate: value }, { upsert: true })
      .exec();
    return !!result;
  }

  async upsertFoodTruck({ locationId, ...data }: FoodTruck) {
    return foodTruckModel.findOneAndUpdate(
      { locationId },
      {
        locationId,
        ...data,
      },
      { upsert: true },
    );
  }

  async listFoodTrucks() {
    return foodTruckModel.find().exec();
  }
}
export default new SiteRepository();
