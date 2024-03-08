import { Blog } from "@/app/models/Blog";
import { Category } from "@/app/models/Categories";
import { User } from "@/app/models/User";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        //Get the request slug
        const slug = params.slug

        console.log('slug', slug)

        await connectDb()

        let post = await Blog.findOne({ slug })

        let recentPosts = (await Blog.find({ slug: { $ne: slug } }).sort({ _id: 'desc' }).limit(5))

        console.log('retrieved recent posts', recentPosts);

        //Get the categories 
        const categories = await Category.find({})

        console.log('categories', categories);

        const users = await User.find({ _id: [post?.author, ...recentPosts.map(i => i?.author)] })

        console.log('users', users)

        post = post && {
            ...post?.toObject(),
            title: post?.summaryTitle,
            date: post?.createdAt,
            image: post?.summaryImage,
            author: users?.find((i: any) => i?._id?.toString() === post?.author)?.fullName,
            categories: categories.filter(i => post.categories.includes(i?._id?.toString()))
        }

        recentPosts = recentPosts.map(i => {
            return {
                ...i?.toObject(),
                title: i?.summaryTitle,
                date: i?.createdAt,
                image: i?.summaryImage,
                author: users?.find((it: any) => it?._id?.toString() === i?.author)?.fullName,
                categories: categories.filter(it => i.categories.includes(it?._id?.toString()))
            }
        });

        console.log('final result for slug', { slug, post, recentPosts });

        return Response.json({ data: { ...(post || {}), recentPosts } })
    } catch (error) {
        return logServerError(error, req.url)
    }
}