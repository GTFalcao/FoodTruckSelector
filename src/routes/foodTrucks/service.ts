import axios from "axios";
import csv from "csvtojson";
import constants from "./constants";
import repository from "./repository";
import { convertFoodTruckData } from "./utils";

export default {
  async shouldFetchNewData() {
    const lastUpdate = await repository.getLastUpdate();
    const now = Date.now();
    return !lastUpdate || now - lastUpdate > constants.CACHE_TIME_MS;
  },

  async updateAndReturnData() {
    const data = await this.getData();
    const mappedData = data.map(convertFoodTruckData);

    await Promise.allSettled(
      mappedData.map((item) => repository.upsertFoodTruck(item)),
    );

    await repository.setLastUpdate(Date.now());

    return mappedData;
  },

  async getData(): Promise<Record<string, string>[]> {
    const { data } = await axios<string>(constants.DATA_ENDPOINT);
    return csv().fromString(data);
  },

  async listFoodTrucks() {
    const response = await repository.listFoodTrucks();
    return response;
    // return response.map(({ otherData, ...args }) => ({
    //   ...args,
    //   otherData: JSON.parse(otherData),
    // }))
  },

  async clearFoodTrucks() {
    return repository.deleteFoodTrucks();
  },
};
