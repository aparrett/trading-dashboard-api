import 'reflect-metadata'
import 'dotenv-safe/config'
import { __prod__, COOKIE_NAME } from './constants'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './resolvers/user'
import { TradeResolver } from './resolvers/trade'
import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import cors from 'cors'
import { createConnection } from 'typeorm'
import { User } from './entities/User'
import path from 'path'
import { createUserLoader } from './utils/createUserLoader'
import { Trade } from './entities/Trade'

const main = async () => {
    const conn = await createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        logging: false,
        migrations: [path.join(__dirname, './migrations/*')],
        entities: [User, Trade],
        ssl: __prod__,
        synchronize: false,
        extra: {
            ssl: __prod__
                ? {
                      rejectUnauthorized: false
                  }
                : false
        }
    })

    await conn.runMigrations()

    const app = express()
    const RedisStore = connectRedis(session)
    const redis = new Redis(process.env.REDIS_URL)

    app.set('trust proxy', 1)
    app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: false,
                sameSite: 'none', // csrf
                secure: false,
                domain: __prod__ ? 'daytradingdashboard.com' : undefined
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET,
            resave: false
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, TradeResolver],
            validate: false
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
            userLoader: createUserLoader()
        })
    })

    apolloServer.applyMiddleware({
        app,
        cors: false
    })

    app.listen(parseInt(process.env.PORT), () => {
        console.log(`server started on port ${process.env.PORT}`)
    })
}

main().catch((err) => {
    console.error(err)
})
