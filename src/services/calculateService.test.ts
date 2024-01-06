import * as bitfinexService from './bitfinexService'
import { calculate } from './calculateService'
import { Book } from '../data/book.types'
import { BadArgumentException } from '../errors/errors'

describe('calculate function', () => {
  it('should calculate effectivePrice and maxOrderSize correctly for a buy operation', async () => {
    const books: Book = [
      123,
      [
        [2260.2, 1, 2.154],
        [2259.9, 2, 2.75230915],
        [2259.8, 3, 4.51898092],
      ],
    ]

    jest.spyOn(bitfinexService, 'getBook').mockResolvedValue(books)

    const result = await calculate('tETHUSD', 'buy', 5, 1)

    expect(result).toEqual({
      effectivePrice: 2259.8096203816003,
      maxOrderSize: 4.51898092,
    })
  })

  it('throws BadArgumentException for invalid operation', async () => {
    // Arrange
    const symbol = 'tBTCUSD'
    const invalidOperation = 'invalidOperation'
    const amount = 10

    // Act & Assert
    await expect(calculate(symbol, invalidOperation, amount)).rejects.toThrowError(
      BadArgumentException,
    )
  })
})
