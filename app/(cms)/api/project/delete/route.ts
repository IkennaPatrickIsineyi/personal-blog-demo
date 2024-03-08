import { Project } from "@/app/models/Project";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const slug = searchParams.get('slug');

        await connectDb()

        await Project.deleteOne({ slug });

        return Response.json({ data: true })
    } catch (error) {
        return logServerError(error, req.url)
    }
}