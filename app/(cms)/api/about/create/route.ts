import { About } from "@/app/models/About";
import { logServerError } from "@/utils/logServerError";

type AboutType = {
    image: string, experience: string, about: string,
    education: string, skills: string,
    metaTitle: string, metaDescription: string
}

export async function POST(req: Request) {
    try {
        const { image, experience, about, education, skills, metaTitle,
            metaDescription, }: AboutType = await req.json();

        await About.create({
            image, experience, about, education, skills, metaTitle,
            metaDescription,
        });

        console.log('About created');

        return Response.json({ data: true })
    } catch (error) {
        return logServerError(error, req.url)
    }
}