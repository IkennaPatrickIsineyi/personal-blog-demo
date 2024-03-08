import { About } from "@/app/models/About";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";

export async function GET(req: Request) {
    try {

        await connectDb()
        //Get blog post data (if slug was given)
        const about = (await About.findOne({})) || {
            image: '', experience: 'null', education: '', skills: '',
            about: '', metaTitle: '', metaDescription: ''
        };

        console.log('about', about);

        return Response.json({ data: { about } })
    } catch (error) {
        return logServerError(error, req.url)
    }
}