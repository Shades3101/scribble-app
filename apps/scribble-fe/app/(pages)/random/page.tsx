"use client";

import { GuestRoomCanvas } from "@/components/GuestRoomCanvas";
import { useMemo } from "react";

export default function TemporaryWorkspace() {

    const roomId = useMemo(() => `guest_${crypto.randomUUID()}`, []);

    console.log("Guest room ID:", roomId);

    return (
        <div className="h-screen w-screen">
            <GuestRoomCanvas roomId={roomId} />
        </div>
    );
}