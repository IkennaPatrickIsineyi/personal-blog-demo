import { User } from "@/app/models/User";
import { logServerError } from "@/utils/logServerError";

export async function POST(req: Request) {
    try {
        const payload = await req.json();

        await User.deleteMany({ _id: payload })

        return Response.json({ data: true })
    } catch (error) {
        return logServerError(error, req.url)
    }
}