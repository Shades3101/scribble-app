import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export default async function getUserSession() {
    try {
        const session = await getServerSession(authOptions);

        if (session && session.user) {
            return {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                photo: session.user.image
            };
        }

        return null;
    } catch (error) {
        console.log("Error fetching user:", error);
        return null;
    }
}