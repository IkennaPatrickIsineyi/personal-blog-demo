
import { Subscriber } from "@/app/models/Subscriber";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";

import { Types } from 'mongoose'

type SubscriberType = {
    email: string, id: string
}

export async function POST(req: Request) {
    try {
        const { email, id }: SubscriberType = await req.json();

        await connectDb()

        //Check if email already exisits
        const emailExists = await Subscriber.findOne({ email, _id: { $ne: new Types.ObjectId(id) } });

        if (emailExists) {
            return Response.json({ error: 'The email has been taken. Please use a different email', data: null })
        }
        else {
            console.log('updating subscriber', {
                email, id
            })

            await Subscriber.updateOne({ _id: id }, {
                $set: {
                    email,
                }
            });

            console.log('subsciber updated');

            return Response.json({ data: true })
        }
    } catch (error) {
        return logServerError(error, req.url)
    }
}