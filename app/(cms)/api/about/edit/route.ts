import { About } from "@/app/models/About";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";

type AboutType = {
    image: string, experience: string, about: string,
    education: string, skills: string,
    metaTitle: string, metaDescription: string
    _id: string
}

export async function POST(req: Request) {
    try {
        const { image, experience, about, education, skills, metaTitle,
            metaDescription, _id }: AboutType = await req.json();

        await connectDb()

        await About.updateOne({ _id }, {
            $set: {
                image, experience, about, education, skills, metaTitle, metaDescription
            }
        }, { upsert: true });

        return Response.json({ data: true })
    } catch (error) {
        return logServerError(error, req.url)
    }
}