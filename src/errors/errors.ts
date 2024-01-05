export class BadArgumentExeption extends Error {
    status: number;

    constructor(status: number, message: string) {
      super(message);
      this.name = 'BadArgumentException';
      this.status = status
    }

}
