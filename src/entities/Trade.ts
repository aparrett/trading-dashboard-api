import { ObjectType, Field } from 'type-graphql'
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Index } from 'typeorm'

@ObjectType()
@Entity()
export class Trade extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number

    @Index()
    @Field()
    @Column()
    traderId: number

    @Field()
    @Column()
    symbol!: string

    @Field()
    @Column()
    side!: string

    @Field()
    @Column()
    quantity!: number

    @Field()
    @Column()
    entry!: number

    @Field()
    @Column()
    close!: number

    @Field()
    @Column()
    openDate!: Date

    @Field()
    @Column()
    closeDate!: Date
}
