import { InputType, Field } from 'type-graphql'

@InputType()
export class TradeInput {
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
