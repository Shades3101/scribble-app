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

    if (!parsedData.success) {
        res.status(400).json({
            message: "Incorrect Inputs"
        })

        return;
    }

    try {

        const hashedPass = await bcrypt.hash(parsedData.data.password!, 10);

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

    } catch (e) {
        res.status(409).json({
            message: "User already exists with this username"
        })
    }

})

app.post("/signin", async (req, res) => {

    const parsedData = SigninSchema.safeParse(req.body);
    console.log(parsedData)
    if (!parsedData.success) {
        res.status(400).json({
            message: "Incorrect Inputs"
        })

        return;
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    })

    if (!user) {
        res.status(404).json({
            message: "Signup first"
        })
        return;
    }

    if (!parsedData.data.password || !user?.password) {
        res.status(400).json({
            message: "Please Input Password"
        })
        return;
    }

    const passMatch = await bcrypt.compare(parsedData.data.password, user.password)

    if (passMatch) {

        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET)

        res.json({
            token,
            userId: user.id
        })
    }

})

app.post("/room", authMiddleware, async (req, res) => {

    const parsedData = CreateRoomSchema.safeParse(req.body);

    if (!parsedData.success) {
        console.log(parsedData.error);
        res.status(400).json({
            message: "Incorrect Inputs",
            error: parsedData.error
        })

        return;
    }

    const userId = req.userId;

    if (!userId) {
        res.status(400).json({
            message: "UserID is Required"
        })
        return;
    }

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId,
                imageURL: parsedData.data.imageUrl
            }
        })

        res.json({
            roomId: room.id
        })

    } catch (e) {
        res.status(409).json({
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
    } catch (e) {
        console.log(e);
        res.status(500).json({
            messages: []
        })
    }

})

app.get("/room/:slug", async (req, res) => {

    const slug = req.params.slug;

    try {
        const room = await prismaClient.room.findFirst({
            where: {
                slug
            }
        })

        if (!room) {
            return res.status(404).json({
                message: "Room Does not Exist."
            })
        }

        res.json({
            room
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

})

app.get("/user-rooms", authMiddleware, async (req, res) => {

    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({
            message: "user not logged in or authorized"
        })
    }

    try {
        const userRooms = await prismaClient.room.findMany({
            where: {
                adminId: userId
            }
        })

        if (userRooms.length === 0) {
            return res.status(404).json({
                message: "no user rooms found"
            })
        }

        res.status(200).json({
            userRooms
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

})

app.delete("/delete-room/:roomId", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const roomId = Number(req.params.roomId);

    if (!userId) {
        return res.status(401).json({
            message: "user not logged in or authorized"
        })
    }

    try {
        await prismaClient.room.delete({
            where: {
                id: roomId,
                adminId: userId
            }
        })

        res.status(200).json({
            message: "Room Deleted"
        })
    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

app.post("/google-login", async (req, res) => {
    try {
        const { email, name, photo } = req.body;

        if (!email || !name) {
            res.status(400).json({
                message: "Email and Name are required"
            });
            return;
        }

        let user = await prismaClient.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    email,
                    name,
                    photo
                }
            });
        } else if (photo && user.photo !== photo) {
            await prismaClient.user.update({
                where: { id: user.id },
                data: { photo }
            });
        }

        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET, { expiresIn: "1d" });

        res.json({
            message: "Google Login Success",
            data: { userId: user.id, token: token }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
})


app.listen(3001);
