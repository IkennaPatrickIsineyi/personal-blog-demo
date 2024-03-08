import { Blog } from "@/app/models/Blog";
import { Category } from "@/app/models/Categories";
import { User } from "@/app/models/User";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const slug = searchParams.get('slug');

        console.log('slug for data', slug);

        await connectDb()

        //Get blog post data (if slug was given)
        const post = slug && await Blog.findOne({ slug });

        console.log('post', post);

        //Get admin users
        const users = await User.find({});

        //Get categories
        const categories = await Category.find({})

        return Response.json({ data: { post, users, categories } })
    } catch (error) {
        return logServerError(error, req.url)
    }
}