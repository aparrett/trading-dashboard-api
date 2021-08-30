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
    @Column('decimal')
    entry!: number

    @Field({ nullable: true })
    @Column('decimal')
    close?: number

    @Field()
    @Column()
    openDate!: Date

    @Field({ nullable: true })
    @Column()
    closeDate?: Date
}
