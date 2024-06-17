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

  async fetchAndUpdateData() {
    const data = await this.getData();
    const mappedData = data.map(convertFoodTruckData);

    await Promise.allSettled(
      mappedData.map((item) => repository.upsertFoodTruck(item)),
    );

    await repository.setLastUpdate(Date.now());
  },

  async getData(): Promise<Record<string, string>[]> {
    const { data } = await axios<string>(constants.DATA_ENDPOINT);
    return csv().fromString(data);
  },

  async listFoodTrucks(foodItems: string) {
    const response = await repository.listFoodTrucks();
    let mappedResponse = response.map(
      ({ locationId, foodItems, otherData }) => ({
        locationId,
        foodItems,
        ...JSON.parse(otherData),
      }),
    );

    if (foodItems) {
      const arrItems = foodItems
        .split(",")
        .map((item) => item.trim().toLowerCase());
      mappedResponse = mappedResponse.filter(({ foodItems }) =>
        foodItems.some((item: string) =>
          arrItems.some((filter) => item.toLowerCase().includes(filter)),
        ),
      );
    }

    return mappedResponse;
  },

  async clearFoodTrucks() {
    await repository.setLastUpdate(0);
    return repository.deleteFoodTrucks();
  },
};
