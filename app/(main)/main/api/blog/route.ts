import { Blog } from "@/app/models/Blog";
import { Category } from "@/app/models/Categories";
import { User } from "@/app/models/User";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";

export async function GET(req: Request) {
    try {
        console.log('fetching all posts');
        const { searchParams } = new URL(req.url);

        const offset = Number(searchParams.get('offset'));

        const limit = Number(searchParams.get('limit'));

        console.log('post params', { offset, limit });

        await connectDb()

        let posts = await Blog.find({})
            .skip(offset || 0)
            .limit(limit || 0);

        //Get users
        const users = await User.find({ _id: posts?.map(i => i?.author) })

        //Get the categories 
        const categories = await Category.find({})

        posts = posts.map(i => {
            return {
                ...i?.toObject(), author: users.find(it => it?._id?.toString() === i?.author)?.fullName,
                categories: categories.filter(it => i?.categories?.includes(it?._id))
            }
        })

        const total = (await Blog.find({})).length

        console.log('final posts', posts, 'total', total)

        return Response.json({ data: { posts, total } })
    } catch (error) {
        return logServerError(error, req.url)
    }
}