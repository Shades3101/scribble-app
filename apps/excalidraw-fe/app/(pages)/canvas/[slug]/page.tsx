import { RoomCanvas } from "@/components/RoomCanvas";
import { HTTP_BACKEND } from "@/config";
import { getAccessToken } from "@/lib/getAccessToken";
import axios from "axios";

async function getRoomId(slug: string) {
    try {
        const response = await axios.get(`${HTTP_BACKEND}/room/${slug}`);
        return response.data.room.id;
    } catch (e) {
        return null;
    }
}

export default async function CanvasPage({ params }: {
    params: {
        slug: string
    }
}) {
    const slug = (await params).slug;
    const roomId = await getRoomId(slug);
    const token = await getAccessToken();

    if (!token) {
        return (
            <div className="h-screen flex items-center justify-center text-gray-900 dark:text-white bg-white dark:bg-zinc-950">
                Please sign in to access this room.
            </div>
        );
    }

    if (!roomId) {
        return (
            <div className="h-screen flex items-center justify-center text-gray-900 dark:text-white bg-white dark:bg-zinc-950">
                Room not found
            </div>
        );
    }

    return <RoomCanvas roomId={String(roomId)} token={token} />;
}