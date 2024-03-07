import { Blog } from "@/app/models/Blog";
import { logServerError } from "@/utils/logServerError";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        //Get the request slug
        const slug = params.slug

        console.log('slug', slug)

        const post = await Blog.findOne({ slug })

        return Response.json({ data: post })
    } catch (error) {
        return logServerError(error, req.url)
    }
}