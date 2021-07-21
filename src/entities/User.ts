import { ObjectType, Field } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BaseEntity, OneToMany } from 'typeorm'
import { Trade } from './Trade'

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column({ unique: true })
    username!: string

    @Field()
    @Column({ unique: true })
    email!: string

    @Column()
    password!: string

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Trade, (trade) => trade.traderId, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    trades: Trade[]
}
