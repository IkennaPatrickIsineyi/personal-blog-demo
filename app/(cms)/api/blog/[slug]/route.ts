import { Blog } from "@/app/models/Blog";
import { Category } from "@/app/models/Categories";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        //Get the request slug
        const slug = params.slug

        console.log('slug', slug)

        await connectDb()

        let post = await Blog.findOne({ slug })

        //Get the categories 
        const categories = await Category.find({ _id: post?.categories })

        post = post && { ...post, categories }

        console.log('categories');

        return Response.json({ data: post })
    } catch (error) {
        return logServerError(error, req.url)
    }
}