
import { User } from "@/app/models/User";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";

import { Types } from 'mongoose'

type AdminType = {
    profilePicture: string, email: string,
    fullName: string, id: string
}

export async function POST(req: Request) {
    try {
        const { profilePicture, email, fullName, id }: AdminType = await req.json();

        await connectDb()

        //Check if email already exisits
        const emailExists = await User.findOne({ email, _id: { $ne: new Types.ObjectId(id) } });

        if (emailExists) {
            return Response.json({ error: 'The email has been taken. Please use a different email', data: null })
        }
        else {
            console.log('updating admin', {
                profilePicture, email, fullName, id
            })

            await User.updateOne({ _id: id }, {
                $set: {
                    profilePicture, email, fullName
                }
            });

            console.log('admin updated');

            return Response.json({ data: true })
        }
    } catch (error) {
        return logServerError(error, req.url)
    }
}