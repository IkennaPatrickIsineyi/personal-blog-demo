import { User } from "@/app/models/User";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";

export async function GET(req: Request) {
    try {
        await connectDb();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        const data = (await User.find(id ? { _id: id } : {})).map(i => {
            return { ...i.toObject(), id: i?._id }
        });

        return Response.json({ data: id ? data[0] : data })
    } catch (error) {
        return logServerError(error, req.url)
    }
}