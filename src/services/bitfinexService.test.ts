import { getBook } from './bitfinexService'
import { BadArgumentException } from '../errors/errors'
import logger from '../utils/logger'

jest.mock('ws', () =>
  jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    send: jest.fn(),
  })),
)

describe('Bitfinex service test', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  it('Create socket with correct symbol', () => {
    const socket = getBook('tBTCUSD')
    expect(socket).not.toBeNull
  })

  it('bitfinexService - invalid symbol', async () => {
    const testInvalidSymbol = 'invalidSymbol'

    await expect(getBook(testInvalidSymbol)).rejects.toThrowError(BadArgumentException)
  })
})
