import { Category } from "@/app/models/Categories";
import { Project } from "@/app/models/Project";
import { User } from "@/app/models/User";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        //Get the request slug
        const slug = params.slug

        console.log('slug', slug)

        await connectDb()

        let project = await Project.findOne({ slug })

        let recentProjects = (await Project.find({ slug: { $ne: slug } }).sort({ _id: 'desc' }).limit(5))

        console.log('retrieved recent projects', recentProjects);

        //Get the categories 
        const categories = await Category.find({})

        console.log('categories', categories);

        const users = await User.find({ _id: [project?.author, ...recentProjects.map(i => i?.author)] })

        console.log('users', users)

        project = project && {
            ...project?.toObject(),
            title: project?.summaryTitle,
            date: project?.createdAt,
            image: project?.summaryImage,
            author: users?.find((i: any) => i?._id?.toString() === project?.author)?.fullName,
            categories: categories.filter(i => project.categories.includes(i?._id?.toString()))
        }

        recentProjects = recentProjects.map(i => {
            return {
                ...i?.toObject(),
                title: i?.summaryTitle,
                date: i?.createdAt,
                image: i?.summaryImage,
                author: users?.find((it: any) => it?._id?.toString() === i?.author)?.fullName,
                categories: categories.filter(it => i.categories.includes(it?._id?.toString()))
            }
        });

        console.log('final result for slug', { slug, project, recentProjects });

        return Response.json({ data: { ...(project || {}), recentProjects } })
    } catch (error) {
        return logServerError(error, req.url)
    }
}