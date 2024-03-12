import { Subscriber } from "@/app/models/Subscriber";
import { logServerError } from "@/utils/logServerError";

export async function POST(req: Request) {
    try {
        const payload = await req.json();

        await Subscriber.deleteMany({ _id: payload })

        return Response.json({ data: true })
    } catch (error) {
        return logServerError(error, req.url)
    }
}