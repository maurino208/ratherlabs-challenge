const allowedSymbols = ['tBTCUSD', 'tETHUSD'];
const allowedOperations = ['buy', 'sell'];
export function isValidSymbol(symbol: string): boolean {
  return allowedSymbols.includes(symbol);
}

export function isValidOperation(operation: string): boolean {
  return allowedOperations.includes(operation);
}
