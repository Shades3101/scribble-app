import { redirect } from "next/navigation";
import getUserSession from "./getUserSession";

export default async function getUser() {
    const user = await getUserSession();
    if(!user) {
        redirect("/signin")
    }

    return user;
}