import { Category } from "@/app/models/Categories";
import { Project } from "@/app/models/Project";
import { User } from "@/app/models/User";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";


export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
    try {
        console.log('fetching all projects');
        const { searchParams } = new URL(req.url);

        const offset = Number(searchParams.get('offset'));

        const limit = Number(searchParams.get('limit'));

        console.log('project params', { offset, limit });

        await connectDb()

        let projects = await Project.find({})
            .skip(offset || 0)
            .limit(limit || 0);

        //Get users
        const users = await User.find({ _id: projects?.map(i => i?.author) })

        //Get the categories 
        const categories = await Category.find({})

        projects = projects.map(i => {
            return {
                ...i?.toObject(), author: users.find(it => it?._id?.toString() === i?.author)?.fullName,
                categories: categories.filter(it => i?.categories?.includes(it?._id))
            }
        })

        const total = (await Project.find({})).length

        console.log('final projects', projects, 'total', total)

        return Response.json({ data: { projects, total } })
    } catch (error) {
        return logServerError(error, req.url)
    }
}