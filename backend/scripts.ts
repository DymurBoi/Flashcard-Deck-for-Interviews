console.log('🔥 LOADED DECK SERVER FILE');

import 'dotenv/config'
import { Prisma, PrismaClient } from './generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import express from 'express'

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter: pool })

const app = express()

app.use(express.json())

app.post(`/deck/post`, async (req, res)=>{
    const {title, description} =req.body
    const result = await prisma.cardDeck.create({
        data:{
            title,
            description,
        },
    })
    res.json(result)
})

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: https://github.com/prisma/prisma-examples/blob/latest/orm/express/README.md#using-the-rest-api`),
)