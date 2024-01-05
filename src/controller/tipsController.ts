import { Request, Response } from 'express';
import { getTips } from '../services/bitfinexService';
import { BadArgumentExeption } from "../errors/errors";

export async function getTipsController(req: Request, res: Response) {
    try{
        const { symbol } = req.query as { symbol: string };
        const { prec } = req.query as { prec: string };
        const { len } = req.query as { len: string };
        const [, tips] = await getTips(symbol, prec, len);
        res.status(200).json(tips);
    } catch (err) {
        if (err instanceof BadArgumentExeption) {
            res.status(err.status).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
