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
}
export default new SiteRepository();
