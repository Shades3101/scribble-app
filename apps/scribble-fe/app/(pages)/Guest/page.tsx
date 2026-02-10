import { redirect } from "next/navigation";
import crypto from "crypto";

export default function GuestPage() {
    const roomId = `guest_${crypto.randomUUID()}`;
    redirect(`/Guest/${roomId}`);
}
