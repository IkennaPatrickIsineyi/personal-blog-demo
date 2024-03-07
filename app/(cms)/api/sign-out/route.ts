import { deleteSession, getSession } from "@/auth/useSession";
import { logServerError } from "@/utils/logServerError";

export async function GET(req: Request) {
    try {
        const { email, userId } = await getSession();

        //If user is already logged out, return true to show that the user is logged out
        if (!email && !userId) return Response.json({ data: true });

        //Log the user out
        await deleteSession();

        return Response.json({ data: true });
    } catch (error) {
        return logServerError(error, req.url)
    }
}