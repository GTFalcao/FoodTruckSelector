import { Request, Response } from "express";

import service from "./service";

export default {
  async getAll({ query: { update } }: Request, res: Response) {
    const shouldUpdate = update || (await service.shouldFetchNewData());
    console.log(
      shouldUpdate ? "Fetching updated data from source" : "Using cached data",
    );
    const data = await (shouldUpdate
      ? service.updateAndReturnData()
      : service.listFoodTrucks());

    return res.status(200).send(data);
  },

  async deleteAll(_req: Request, res: Response) {
    await service.clearFoodTrucks();
    return res.sendStatus(204);
  },
};
