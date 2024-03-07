import { getSession } from "@/auth/useSession";
import { logServerError } from "@/utils/logServerError";

export async function POST(req: Request) {
    try {
        const { email, token } = await getSession();

        const payload = await req.json()

        if (email === payload.email && token === payload.token) {
            return Response.json({ data: true });
        }
        else {
            return Response.json({ data: false });
        }
    } catch (error) {
        return logServerError(error, req.url)
    }
}