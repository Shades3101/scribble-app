import { HTTP_BACKEND } from "@/config";
import { getAccessToken } from "@/lib/getAccessToken"
import axios from "axios";
import { redirect } from "next/navigation";
import WorkspaceClient from "./WorkspaceClient";

export default async function Workspace() {

    const token = await getAccessToken();

    if (!token) {
        redirect("/signin");
    }

    try {
        const res = await axios.get(`${HTTP_BACKEND}/user-rooms`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res.data)
        return (
            <div>
                <WorkspaceClient Rooms={res.data.userRooms} Token={token} />
            </div>
        );

    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return <WorkspaceClient Rooms={[]} Token={token} />;
        }

        console.error("Failed to fetch user rooms:", error);
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Failed to load workspace. Please try again.</p>
            </div>
        );
    }
}