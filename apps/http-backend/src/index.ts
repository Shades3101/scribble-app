import express from "express";
import { authMiddleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

app.post("/signup", async (req, res) => {
    
    const parsedData = CreateUserSchema.safeParse(req.body);

    if(!parsedData.success) {
        res.json({
            message: "Incorrect Inputs"
        })

        return;
    }

    try {
        
        const hashedPass = await bcrypt.hash(parsedData.data.password, 10);

        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.username,
                password: hashedPass,
                name: parsedData.data.name
            }
        })

        res.json({
            userId: user.id
        })

    } catch (e){
        res.status(411).json({
            message: "User already exists with this username"
        })
    }
    
})

app.post("/signin", async (req, res) => {

    const parsedData = SigninSchema.safeParse(req.body);
    console.log(parsedData)
    if(!parsedData.success) {
        res.json({
            message: "Incorrect Inputs"
        })

        return;
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    })

    if(!user) {
        res.json({
            message: "Signup first"
        })
    }

    if(!parsedData.data.password || !user?.password){
        res.json({
            message: "Please Input Password"
        })
        return;
    }

    const passMatch = await bcrypt.compare(parsedData.data.password, user.password)

    if(passMatch) {

        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET)

        res.json({
            token
        })
    }

})

app.post("/room", authMiddleware, async (req, res) =>{

    const parsedData = CreateRoomSchema.safeParse(req.body);

    if(!parsedData.success) {
        res.json({
            message: "Incorrect Inputs"
        })

        return;
    }

    const userId = req.userId;

    if(!userId) {
        res.json({
            message: "UserID is Required"
        })
        return;
    }

    try {
        const room = await prismaClient.room.create({
        data :{
            slug: parsedData.data.name,
            adminId: userId
        }
        })

        res.json({
            roomId : room.id
        })

    }catch(e){
        res.status(411).json({
            message: "Room Already Exists with this name"
        })
    }
})

app.get("/chats/:roomId", async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);
        console.log(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 1000
        });

        res.json({
            messages
        })
    } catch(e) {
        console.log(e);
        res.json({
            messages: []
        })
    }
    
})

app.get("/room/:slug", async (req, res) => {

    const slug = req.params.slug

    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    })

    res.json({
        room
    })
})

app.listen(3001);
