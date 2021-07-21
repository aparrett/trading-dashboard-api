import { Resolver, Mutation, Arg, Ctx, UseMiddleware, Field, InputType } from 'type-graphql'
import { MyContext } from '../types'
import { getConnection } from 'typeorm'
import { Trade } from '../entities/Trade'
import { isAuth } from '../middleware/isAuth'

@InputType()
class TradeInput {
    @Field()
    symbol!: string

    @Field()
    side!: string

    @Field()
    quantity!: number

    @Field()
    entry!: number

    @Field()
    close!: number

    @Field()
    openDate!: Date

    @Field()
    closeDate!: Date
}

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
