import { Request, Response } from "express";

import service from "./service";

export default {
  async getAll({ query: { foodItems } }: Request, res: Response) {
    const shouldUpdate = await service.shouldFetchNewData();
    if (shouldUpdate) {
      await service.fetchAndUpdateData();
    }

    const filter = foodItems?.toString?.();
    const data = await service.listFoodTrucks(filter);

    return res.status(200).send(data);
  },

  async deleteAll(_req: Request, res: Response) {
    await service.clearFoodTrucks();
    return res.sendStatus(204);
  },
};
