import { getSession } from "@/auth/useSession";
import { logServerError } from "@/utils/logServerError";

export async function GET(req: Request) {
    try {
        const { email, userId } = await getSession()

        return Response.json({ data: { email, userId } })
    } catch (error) {
        return logServerError(error, req.url)
    }
}