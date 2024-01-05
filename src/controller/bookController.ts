import { Request, Response } from "express";

import { BadArgumentException } from "../errors/errors";
import { getBook } from "../services/bitfinexService";

export async function getBookController(req: Request, res: Response) {
  try {
    const { symbol } = req.query as { symbol: string };
    const [, tips] = await getBook(symbol);
    res.status(200).json(tips);
  } catch (err) {
    if (err instanceof BadArgumentException) {
      res.status(err.status).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
