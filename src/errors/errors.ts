export class BadArgumentException extends Error {
    status: number;
    constructor(status: number, message: string) {
      super(message);
      this.name = 'BadArgumentException';
      this.status = status
    }
}

export class InsufficientLiquidityException extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.name = 'InsufficientLiquidityException';
        this.status = status
    }
}
