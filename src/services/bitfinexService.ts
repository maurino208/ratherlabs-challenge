import ws from 'ws';
import { Book } from "../data/book.types";
import { BadArgumentException } from "../errors/errors";
import logger from "../utils/logger";
import { isValidSymbol } from "../utils/validator";

export const getBook = (symbol: string) =>
    new Promise<Book>((res, rej) => {
        const socket = new ws(process.env.BITFINEX_HOST || '');

        if(!isValidSymbol(symbol)){
            logger.error('Must enter a valid simbol');
            throw new BadArgumentException(400, 'Symbol must be [\'tBTCUSD\', \'tETHUSD\']');
        }

        socket.on('open', () =>
            socket.send(
                JSON.stringify({
                    event: 'subscribe',
                    channel: 'book',
                    symbol
                }),
            ),
        );

        socket.on('message', (data: any) => {

            const msg = JSON.parse(data);
            logger.info(`Subscribe to ${symbol}`);

            if (Array.isArray(msg)) {
                socket.close();
                res(msg as Book);
            }
        });
    });
