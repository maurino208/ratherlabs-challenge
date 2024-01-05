import { getBook } from "./bitfinexService";
import {BadArgumentException, InsufficientLiquidityException} from "../errors/errors";
import {isValidOperation, isValidSymbol} from "../utils/validator";
import logger from "../utils/logger";

export async function calculate(symbol: string, operation: string, amount: number, limit?: number): Promise<{ effectivePrice: number; maxOrderSize: number; }> {
    const [ ,books] = await getBook(symbol);

    if(!isValidOperation(operation)){
        logger.error('Must enter a valid operation');
        throw new BadArgumentException(400, 'Symbol must be [\'buy\', \'sell\']');
    }

    const sortedBooks = operation === 'buy'
        ? books.sort((a, b) => a[0] - b[0])
        : books.sort((a, b) => b[0] - a[0]);

    let remainingAmount = amount;
    let totalPrice = 0;
    let maxOrderSize = 0;

    for (const book of sortedBooks) {

        // Verifica cuánta cantidad de la orden actual se puede satisfacer
        const executedAmount = Math.min(remainingAmount, book[2]);

        // Calcula el precio acumulado ponderado por la cantidad ejecutada
        totalPrice += executedAmount * book[0];

        // Actualiza la cantidad restante
        remainingAmount -= executedAmount;

        // Actualiza el tamaño máximo de la orden ejecutada si es necesario
        maxOrderSize = Math.max(maxOrderSize, executedAmount);

        // Si se ha satisfecho la cantidad deseada o se alcanza el límite de precio, sal del bucle
        if (remainingAmount <= 0 || (limit && book[0] <= limit)) {
            break;
        }
    }

    // Si aún queda cantidad por satisfacer, la orden no se ha ejecutado completamente
    if (remainingAmount > 0) {
        throw new InsufficientLiquidityException(400,
            'There is not enough liquidity in the market to satisfy the order completely.');
    }

    // Calcula el precio efectivo dividiendo el precio total acumulado por la cantidad original
    const effectivePrice = totalPrice / amount;

    return { effectivePrice, maxOrderSize };
}
