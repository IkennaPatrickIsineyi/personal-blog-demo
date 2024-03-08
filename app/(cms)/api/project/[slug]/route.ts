import { Blog } from "@/app/models/Blog";
import { Category } from "@/app/models/Categories";
import { logServerError } from "@/utils/logServerError";
import { Project } from "@/app/models/Project";
import { connectDb } from "@/utils/connectDb";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        //Get the request slug
        const slug = params.slug

        console.log('slug', slug)

        await connectDb()

        let project = await Project.findOne({ slug })

        //Get the categories 
        const categories = await Category.find({ _id: project?.categories })

        project = project && { ...project, categories }

        console.log('categories');

        return Response.json({ data: project })
    } catch (error) {
        return logServerError(error, req.url)
    }
}