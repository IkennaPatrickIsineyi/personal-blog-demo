import { Blog } from "@/app/models/Blog";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";
import { randomUUID } from "crypto";

type PostType = {
    summaryImage: string, summaryTitle: string,
    introduction: string, author: string,
    categories: Array<any>, content: string,
    metaTitle: string, metaDescription: string
}

export async function POST(req: Request) {
    try {
        const { summaryImage, summaryTitle, introduction, author,
            categories, content, metaTitle, metaDescription }: PostType = await req.json();

        console.log('creating blog post', {
            summaryImage, summaryTitle, introduction, author,
            categories, content, metaTitle, metaDescription
        })

        const slug = summaryTitle.substring(0, 15).replaceAll(' ', '-') + '-' + randomUUID().substring(0, 5);

        await connectDb()

        console.log('slug', slug);

        await Blog.create({
            summaryImage, summaryTitle, introduction, author,
            categories, content, metaTitle, metaDescription, slug
        });

        console.log('blog post created');

        return Response.json({ data: slug })
    } catch (error) {
        return logServerError(error, req.url)
    }
}