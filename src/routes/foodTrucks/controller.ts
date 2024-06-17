import { Request, Response } from "express";

import service from "./service";

export default {
  async fetchLatestData(_req: Request, res: Response) {
    const shouldUpdate = service.shouldFetchNewData();
    const data = await (shouldUpdate
      ? service.updateAndReturnData()
      : service.getData());

    return res.status(200).send(data);
  },
};
