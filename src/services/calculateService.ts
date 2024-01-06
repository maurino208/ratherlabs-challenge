import { getBook } from './bitfinexService'
import { BadArgumentException, InsufficientAmountException } from '../errors/errors'
import logger from '../utils/logger'
import { isValidOperation } from '../utils/validator'

export async function calculate(
  symbol: string,
  operation: string,
  amount: number,
  limit?: number,
): Promise<{ effectivePrice: number; maxOrderSize: number }> {
  if (!isValidOperation(operation)) {
    logger.error('Must enter a valid operation')
    throw new BadArgumentException(400, "Operation must be ['buy', 'sell']")
  }

  const [, books] = await getBook(symbol)

  const sortedBooks =
    operation === 'buy' ? books.sort((a, b) => a[0] - b[0]) : books.sort((a, b) => b[0] - a[0])

  let remainingAmount = amount
  let totalPrice = 0
  let maxOrderSize = 0

  for (const book of sortedBooks) {
    const executedAmount = Math.min(remainingAmount, book[2])

    totalPrice += executedAmount * book[0]

    remainingAmount -= executedAmount

    maxOrderSize = Math.max(maxOrderSize, executedAmount)

    if (remainingAmount <= 0 || (limit && book[0] <= limit)) {
      break
    }
  }

  if (remainingAmount > 0) {
    throw new InsufficientAmountException(
      409,
      'There is not enough amount in the market to satisfy the order completely.',
    )
  }

  const effectivePrice = totalPrice / amount

  return { effectivePrice, maxOrderSize }
}
