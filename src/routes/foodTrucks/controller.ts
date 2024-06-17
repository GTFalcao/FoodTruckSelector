import { Request, Response } from "express";

import service from "./service";

export default {
  async fetchLatestData(_req: Request, res: Response) {
    const shouldUpdate = await service.shouldFetchNewData();
    console.log(
      shouldUpdate ? "Fetching updated data from source" : "Using cached data",
    );
    const data = await (shouldUpdate
      ? service.updateAndReturnData()
      : service.listFoodTrucks());

    return res.status(200).send(data);
  },
};
