import { GuestRoomCanvas } from "@/components/GuestRoomCanvas";

export default function GuestRoomPage({ params }: { params: { roomId: string } }) {
    return (
        <div className="h-screen w-screen">
            <GuestRoomCanvas roomId={params.roomId} />
        </div>
    );
}
