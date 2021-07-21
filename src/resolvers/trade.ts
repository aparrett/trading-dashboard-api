import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql'
import { MyContext } from '../types'
import { getConnection } from 'typeorm'
import { Trade } from '../entities/Trade'
import { isAuth } from '../middleware/isAuth'
import { TradeInput } from './TradeInput'

@Resolver(Trade)
export class TradeResolver {
    @Mutation(() => [Trade])
    @UseMiddleware(isAuth)
    async saveTrades(@Arg('trades', () => [TradeInput]) trades: TradeInput[], @Ctx() { req }: MyContext): Promise<Trade[]> {
        const res = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Trade)
            .values(trades.map((t) => ({ ...t, traderId: req.session.userId })))
            .execute()
        return res.raw
    }
}
