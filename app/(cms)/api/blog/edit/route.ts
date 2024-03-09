import { Blog } from "@/app/models/Blog";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";
import { randomUUID } from "crypto";

type PostType = {
    summaryImage: string, summaryTitle: string,
    introduction: string, author: string,
    categories: Array<any>, content: string,
    metaTitle: string, metaDescription: string
    _id: string
}

export async function POST(req: Request) {
    try {
        const { summaryImage, summaryTitle, introduction, author, _id,
            categories, content, metaTitle, metaDescription }: PostType = await req.json();

        const slug = `${summaryTitle.toLowerCase().substring(0, 15).replaceAll(' ', '-')}-${randomUUID().substring(0, 5)}`

        await connectDb()

        await Blog.updateOne({ _id }, {
            $set: {
                summaryImage, summaryTitle, introduction, author,
                categories, content, metaTitle, metaDescription, slug
            }
        });

        return Response.json({ data: slug })
    } catch (error) {
        return logServerError(error, req.url)
    }
}