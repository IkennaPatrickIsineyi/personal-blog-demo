import { Blog } from "@/app/models/Blog";
import { Project } from "@/app/models/Project";
import { logServerError } from "@/utils/logServerError";
import { randomUUID } from "crypto";

type ProjectType = {
    summaryImage: string, summaryTitle: string,
    introduction: string, author: string,
    categories: Array<any>, content: string,
    metaTitle: string, metaDescription: string
    _id: string
}

export async function POST(req: Request) {
    try {
        const { summaryImage, summaryTitle, introduction, author, _id,
            categories, content, metaTitle, metaDescription }: ProjectType = await req.json();

        const slug = summaryTitle.replace(' ', '-') + randomUUID().substring(0, 5);

        await Project.updateOne({ _id }, {
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