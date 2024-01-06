import { Request, Response } from 'express'

import { BadArgumentException, InsufficientAmountException } from '../errors/errors'
import { calculate } from '../services/calculateService'

export async function marketController(req: Request, res: Response) {
  try {
    const { symbol, operation, amount, limit } = req.body
    const result = await calculate(symbol, operation, amount, limit)

    res.status(200).json(result)
  } catch (err) {
    if (err instanceof InsufficientAmountException) {
      res.status(err.status).json({ error: err.message })
    } else if (err instanceof BadArgumentException) {
      res.status(err.status).json({ error: err.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
