import 'dotenv/config'
import { Prisma, PrismaClient } from './generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import express from 'express'
import cors from "cors";

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter: pool })

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);


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

app.get(`/deck/all`, async (req,res)=>{
    const decks = await prisma.cardDeck.findMany({
        include:{
            cards:true,
        }
    })
    res.json(decks)
})

app.get(`/deck/:id`, async (req,res)=>{
    const {id} = req.params
    const decks = await prisma.cardDeck.findUnique({
        where:{id:Number(id)},
        include:{
            cards:true,
        }
    })
    res.json(decks)
})

app.patch(`/deck/:id`, async (req, res)=>{
    const {id} = req.params
    const {title, description} = req.body
    const deck = await prisma.cardDeck.update({
        where: {id:Number(id)},
        data : {title,
           description,},
    })
    res.json(deck)
})

app.delete(`/deck/:id`, async (req, res)=>{
    const {id} = req.params
    const deck = await prisma.cardDeck.delete({
        where: {id:Number(id),},
    })
    res.json(deck)
})

app.post(`/card/post`, async (req, res)=>{
    const {question, answer, isMastered,deckId} =req.body
    const result = await prisma.card.create({
        data:{
            question,
            answer,
            isMastered,
            deckId
        },
    })
    res.json(result)
})

app.get(`/card/all`, async (req,res)=>{
    const decks = await prisma.card.findMany({
        orderBy:{
            id: `asc`,
        }
    })
    res.json(decks)
})

app.get(`/card/:id`, async (req,res)=>{
    const {id} = req.params
    const decks = await prisma.card.findUnique({
        where:{id:Number(id)}
    })
    res.json(decks)
})

app.patch(`/card/:id`, async (req, res)=>{
    const {id} = req.params
    const {question, answer, isMastered, deckId} = req.body
    const deck = await prisma.card.update({
        where: {id:Number(id)},
        data : {question,
                answer,
                isMastered,
                deckId},
    })
    res.json(deck)
})

app.delete(`/card/:id`, async (req, res)=>{
    const {id} = req.params
    const deck = await prisma.cardDeck.delete({
        where: {id:Number(id),},
    })
    res.json(deck)
})

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: https://github.com/prisma/prisma-examples/blob/latest/orm/express/README.md#using-the-rest-api`),
)