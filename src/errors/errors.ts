export class BadArgumentException extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "BadArgumentException";
    this.status = status;
  }
}

export class InsufficientAmountException extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "InsufficientAmountException";
    this.status = status;
  }
}
