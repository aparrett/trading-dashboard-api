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

    @Field({ nullable: true })
    close?: number

    @Field()
    openDate!: Date

    @Field({ nullable: true })
    closeDate?: Date
}
