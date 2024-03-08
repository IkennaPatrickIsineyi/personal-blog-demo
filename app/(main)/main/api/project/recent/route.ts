import { Category } from "@/app/models/Categories";
import { Project } from "@/app/models/Project";
import { User } from "@/app/models/User";
import { logServerError } from "@/utils/logServerError";

export async function GET(req: Request) {
    try {
        console.log('fetching recent projects');

        let projects = await Project.find({}).sort({ '_id': 'desc' }).limit(5);

        //Get users
        const users = await User.find({ _id: projects?.map(i => i?.author) })

        //Get the categories 
        const categories = await Category.find({})

        projects = projects.map(i => {
            return {
                ...i?.toObject(), author: users.find(it => it?._id?.toString() === i?.author)?.fullName,
                categories: categories.filter(it => i?.categories?.includes(it?._id)), date: i?.createdAt,
                image: i?.summaryImage, title: i?.summaryTitle
            }
        })

        console.log('final recent projects', projects)

        return Response.json({ data: { projects } })
    } catch (error) {
        return logServerError(error, req.url)
    }
}