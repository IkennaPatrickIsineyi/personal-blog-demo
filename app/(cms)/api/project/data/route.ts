import { Category } from "@/app/models/Categories";
import { Project } from "@/app/models/Project";
import { User } from "@/app/models/User";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";


export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const slug = searchParams.get('slug');

        console.log('slug for data', slug);

        await connectDb()

        //Get blog project data (if slug was given)
        const project = slug && await Project.findOne({ slug });

        console.log('project', project);

        //Get admin users
        const users = await User.find({});

        //Get categories
        const categories = await Category.find({})

        return Response.json({ data: { project, users, categories } })
    } catch (error) {
        return logServerError(error, req.url)
    }
}