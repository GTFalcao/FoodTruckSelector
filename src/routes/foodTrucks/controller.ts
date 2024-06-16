import axios from "axios";
import { Request, Response } from "express";
import constants from "../../constants";

export default {
  async fetchLatestData(_req: Request, res: Response) {
    const data = await axios(constants.DATA_ENDPOINT);
    console.log(data);
    return res.sendStatus(204);
  },
};
