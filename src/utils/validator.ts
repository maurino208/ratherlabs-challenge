const allowedSymbols = ['tBTCUSD', 'tETHUSD'];
const allowedPrec = ['P0', 'P1', 'P2', 'P3', 'P4', 'R0']
const allowedLen = ['1', '25', '100']
export function isValidSymbol(symbol: string): boolean {
  return allowedSymbols.includes(symbol);
}

export function isValidPrec(prec: string): boolean {
  return allowedPrec.includes(prec);
}

export function isValidLen(len: string): boolean {
  return allowedLen.includes(len);
}
