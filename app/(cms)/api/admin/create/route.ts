
import { User } from "@/app/models/User";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";

type AdminType = {
    profilePicture: string, email: string,
    fullName: string,
}

export async function POST(req: Request) {
    try {
        const { profilePicture, email, fullName }: AdminType = await req.json();

        console.log('creating admin', {
            profilePicture, email, fullName
        })

        await connectDb()

        //Check if email already exisits
        const emailExists = await User.findOne({ email });


        if (emailExists) {
            return Response.json({ error: 'The email has been taken. Please use a different email' })
        }
        else {
            await User.create({
                profilePicture, email, fullName, password: 'blank'
            });

            console.log('admin created');

            return Response.json({ data: true })
        }

    } catch (error) {
        return logServerError(error, req.url)
    }
}