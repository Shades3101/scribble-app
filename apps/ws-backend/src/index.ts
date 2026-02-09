import dotenv from "dotenv";
dotenv.config();

import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { prismaClient } from "@repo/db/client"
import crypto from "crypto";

const PORT = Number(process.env.PORT);
const wss = new WebSocketServer({ port: PORT });

console.log("ws server listening on ", PORT)

const SECRET_ENV = process.env.JWT_SECRET;

if (!SECRET_ENV) {
    throw new Error("JWT Secret is not defined")
}

const SECRET: string = SECRET_ENV;

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string,
    isGuest: boolean
}

const users: User[] = [];

//new function - Added
function isGuestRoom(roomId: string): boolean {
    return roomId.startsWith("guest_");
}

function checkUser(token: string): string | null {
    try {
        const vtoken = jwt.verify(token, SECRET)

        if (typeof vtoken == "string") {
            return null
        }

        if (!vtoken || !vtoken.userId) {
            return null
        }
        console.log("user reached here");

        return vtoken.userId;
    } catch (e) {
        return null
    }
}

wss.on('connection', function connection(ws, request) {

    const url = request.url;

    if (!url) {
        return;
    }

    const queryParams = new URLSearchParams(url?.split('?')[1]);
    const token = queryParams.get('token') || "";
    const isGuestConnection = queryParams.get('guest') === 'true';

    let userId: string | null = null;
    let isGuest = false;

    if (isGuestConnection) {

        userId = `guest_${crypto.randomUUID()}`;
        isGuest = true;
        console.log("Guest connected:", userId);

    } else {

        userId = checkUser(token);
        if (userId == null) {
            ws.close();
            return;
        }
    }

    users.push({
        userId,
        rooms: [],
        ws,
        isGuest
    })

    ws.on('message', async function message(data) {
        // const parsedData = JSON.parse(data as unknown as string);

        // try this if the above fails 
        let parsedData;

        if (typeof data !== "string") {
            parsedData = JSON.parse(data.toString());
        } else {
            parsedData = JSON.parse(data);
        }

        if (parsedData.type === "join_room") {
            const user = users.find(x => x.ws === ws);
            const roomId = parsedData.roomId;

            if (user?.isGuest && !isGuestRoom(roomId)) {
                ws.send(JSON.stringify({
                    type: "error",
                    message: "Guests can only join guest rooms"
                }));
                return;
            }

            user?.rooms.push(roomId);
        }

        if (parsedData.type === "leave_room") {
            const user = users.find(x => x.ws === ws);
            if (!user) {
                return;
            }
            user.rooms = user?.rooms.filter(x => x === parsedData.room)

        }

        if (parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;
            const user = users.find(x => x.ws === ws);

            if (!isGuestRoom(roomId) && user && !user.isGuest) {
                //use queue - better approach, push it to queue
                try {
                    await prismaClient.chat.create({
                        data: {
                            roomId: Number(roomId),
                            message: typeof message === 'string' ? message : JSON.stringify(message),
                            userId: user.userId
                        }
                    });
                } catch (e) {
                    console.error("Failed to persist chat:", e);
                }
            }

            console.log(parsedData)

            // Broadcast to all users in the room
            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))
                }
            })
        }

    });

    // Clean up when connection closes
    ws.on('close', () => {
        const index = users.findIndex(x => x.ws === ws);
        if (index !== -1) {
            users.splice(index, 1);
        }
    });
});