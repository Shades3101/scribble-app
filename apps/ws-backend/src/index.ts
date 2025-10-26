import { WebSocket, WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken";
import { prismaClient } from "@repo/db/client"

const wss = new WebSocketServer ({ port:8080});

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
    
}

const users : User[] =[];

function checkUser(token : string) : string | null {
    try{
    const vtoken = jwt.verify(token, JWT_SECRET)

    if(typeof vtoken == "string") {
        return null
    } 

    if(!vtoken || !vtoken.userId){
        return null
    }
    console.log("user reached here")
    return vtoken.userId

    } catch(e){
        return null
    }
    return null;
}

wss.on('connection', function connection (ws, request) {

    const url = request.url;

    if(!url) {
        return;
    }

    const queryParams = new URLSearchParams(url?.split('?')[1]);
    const token = queryParams.get('token') || "";
    const userId = checkUser(token);

    if(userId == null) {
        ws.close
        return null;
    }

    users.push({
        userId,
        rooms:[],
        ws
    })
    
    ws.on('message', async function message(data) {
        // try this if the it fails 
        let parsedData;

        if(typeof data !== "string" ) {
            parsedData = JSON.parse(data.toString());
        } else {
            parsedData = JSON.parse(data);
        }

        // const parsedData = JSON.parse(data as unknown as string);

        if(parsedData.type === "join_room") {
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parsedData.roomId);
        }

        if(parsedData.type === "leave_room") {
            const user = users.find(x => x.ws === ws);
            if(!user){
                return;
            }
            user.rooms = user?.rooms.filter(x => x === parsedData.room)

        }

        if(parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            //use queue - better approach, push it to queue
            //add try-catch to avoid crashing of the server 
            await prismaClient.chat.create({
                data: {
                    roomId : Number(roomId),
                    message,
                    userId
                }
            });

            console.log(parsedData)

            users.forEach( user => {
                if(user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))
                }
            })
        }
            
    });
    
});