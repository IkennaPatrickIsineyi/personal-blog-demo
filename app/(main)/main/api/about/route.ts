import { About } from "@/app/models/About";
import { logServerError } from "@/utils/logServerError";

export async function GET(req: Request) {
    try {
        console.log('fetching about');

        const about = (await About.findOne({})) || {
            image: '', experience: '', education: '', skills: '',
            about: '', metaTitle: '', metaDescription: ''
        }

        console.log('about', about)

        return Response.json({ data: { about } })
    } catch (error) {
        return logServerError(error, req.url)
    }
}