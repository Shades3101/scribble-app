"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function GuestRoomCanvas({ roomId }: { roomId: string }) {

    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        
        const ws = new WebSocket(`${WS_URL}?guest=true`);

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }));
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            ws.close();
        };
    }, [roomId]);

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
