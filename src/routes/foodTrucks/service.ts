import axios from "axios";
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
    const [header, ...rows] = data
      .replace(constants.COMMA_REGEXP, constants.COMMA_REPLACEMENT)
      .split("\n");
    const keys = header.split(",");

    const mappedData = rows.map((row) =>
      convertFoodTruckData(
        row.split(",").reduce(
          (obj, value, index) => {
            obj[keys[index]] = value.replace(
              new RegExp(constants.COMMA_REPLACEMENT, "g"),
              ",",
            );
            return obj;
          },
          {} as Record<string, string>,
        ),
      ),
    );

    await Promise.allSettled(
      mappedData.map((item) => repository.upsertFoodTruck(item)),
    );

    await repository.setLastUpdate(Date.now());

    return mappedData;
  },

  async getData() {
    const { data } = await axios<string>(constants.DATA_ENDPOINT);
    return data;
  },

  async listFoodTrucks() {
    return repository.listFoodTrucks();
  },
};
