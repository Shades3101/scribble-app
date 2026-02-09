"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId, token }: { roomId: string; token: string }) {

    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=${token}`);

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }));
        };

        ws.onerror = (error) => {
            console.log("Room Canvas WS Error:",error)
        }
        return () => {
            ws.close();
        };
    }, [token, roomId]);

    if (!socket) {
        return (
            <div className="h-screen flex items-center justify-center text-gray-900 dark:text-white bg-white dark:bg-zinc-950">
                Connecting to the server....
            </div>
        );
    }

    return <div>
        <Canvas roomId={roomId} socket={socket} />
    </div>
}