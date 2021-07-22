import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql'
import { MyContext } from '../types'
import { Trade } from '../entities/Trade'
import { isAuth } from '../middleware/isAuth'
import { TradeInput } from './TradeInput'

@Resolver(Trade)
export class TradeResolver {
    @Mutation(() => [Trade])
    @UseMiddleware(isAuth)
    async saveTrades(
        @Arg('trades', () => [TradeInput]) trades: TradeInput[],
        @Ctx() { req }: MyContext
    ): Promise<Trade[]> {
        const tradeEntities = Trade.create(trades.map((t) => ({ ...t, traderId: req.session.userId })))
        await Trade.insert(tradeEntities)
        return tradeEntities
    }
}
