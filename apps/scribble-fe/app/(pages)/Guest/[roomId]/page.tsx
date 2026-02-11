import { GuestRoomCanvas } from "@/components/GuestRoomCanvas";

export default async function GuestRoomPage({ params }: { params: Promise<{ roomId: string }> }) {

    const roomId = (await params).roomId;
    return (
        <div className="h-screen w-screen">
            <GuestRoomCanvas roomId={roomId} />
        </div>
    );
}
