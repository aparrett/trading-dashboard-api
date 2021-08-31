import { Resolver, Mutation, Arg, Ctx, UseMiddleware, Query, Int } from 'type-graphql'
import { MyContext } from '../types'
import { Trade } from '../entities/Trade'
import { isAuth } from '../middleware/isAuth'
import { TradeInput } from './TradeInput'
import { titlecase } from '../utils/titlecase'

@Resolver(Trade)
export class TradeResolver {
    @Mutation(() => [Trade])
    @UseMiddleware(isAuth)
    async saveTrades(
        @Arg('trades', () => [TradeInput]) trades: TradeInput[],
        @Ctx() { req }: MyContext
    ): Promise<Trade[]> {
        const tradeEntities = Trade.create(
            trades.map((t) => ({
                ...t,
                traderId: req.session.userId,
                quantity: Math.abs(t.quantity),
                side: titlecase(t.side)
            }))
        )
        await Trade.insert(tradeEntities)
        return tradeEntities
    }

    @Query(() => [Trade])
    trades(@Ctx() { req }: MyContext): Promise<Trade[]> {
        return Trade.find({ where: { traderId: req.session.userId } })
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteTrades(@Arg('ids', () => [Int]) ids: number[]): Promise<boolean> {
        await Trade.delete(ids)
        return true
    }
}
