import ws from 'ws';
import { Book } from "../data/book.types";
import { BadArgumentExeption } from "../errors/errors";
import logger from "../utils/logger";
import {isValidLen, isValidPrec, isValidSymbol} from "../utils/validator";

export const getTips = (symbol: string, prec: string, len: string) =>
    new Promise<Book>((res, rej) => {
        const socket = new ws('wss://api-pub.bitfinex.com/ws/2');

        if(!isValidSymbol(symbol)){
            logger.error('Must enter a valid simbol');
            throw new BadArgumentExeption(400, 'Symbol must be [\'tBTCUSD\', \'tETHUSD\']');
        }

        if(!isValidPrec(prec)){
            logger.error('Must enter a valid precision');
            throw new BadArgumentExeption(400, 'Precision must be between [\'P0\', \'P1\', \'P2\', \'P3\', \'P4\', \'R0\']');
        }

        if(!isValidLen(len)){
            logger.error('Must enter a valid Price Points');
            throw new BadArgumentExeption(400, 'Price Points must be between [\'1\', \'25\', \'100\']');
        }

        socket.on('open', () =>
            socket.send(
                JSON.stringify({
                    event: 'subscribe',
                    channel: 'book',
                    symbol,
                    prec,
                    len
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
