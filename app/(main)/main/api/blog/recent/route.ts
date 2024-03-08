import { Blog } from "@/app/models/Blog";
import { Category } from "@/app/models/Categories";
import { User } from "@/app/models/User";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
    try {
        console.log('fetching recent posts');

        await connectDb()

        let posts = await Blog.find({}).sort({ '_id': 'desc' }).limit(5);

        //Get users
        const users = await User.find({ _id: posts?.map(i => i?.author) })

        //Get the categories 
        const categories = await Category.find({})

        posts = posts.map(i => {
            return {
                ...i?.toObject(), author: users.find(it => it?._id?.toString() === i?.author)?.fullName,
                categories: categories.filter(it => i?.categories?.includes(it?._id)), date: i?.createdAt,
                image: i?.summaryImage, title: i?.summaryTitle
            }
        })

        console.log('final recent posts', posts)

        return Response.json({ data: { posts } })
    } catch (error) {
        return logServerError(error, req.url)
    }
}