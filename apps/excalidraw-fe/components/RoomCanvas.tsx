"use client";

import { WS_URL } from "@/config";
import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId} : {roomId : string}) {
    
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMWJkZWFjZC05ZWYxLTQ5NWYtYWUzNS01OTJhMDZlYmE2MWEiLCJpYXQiOjE3NjA3MzcwNzR9.4_9r_htntWEFl8_k2iM7SBdqTJcwhJtSF7ylvXZAmug`)

        ws.onopen = () => {
            setSocket(ws)
            ws.send(JSON.stringify({
                type:"join_room",
                roomId
            }))
        }

    }, [])

    
    if(!socket) { 
        return <div>
            Connecting to the server....
        </div>
    }

    return <div>
        <Canvas roomId = {roomId} socket={socket} />
    </div>

}