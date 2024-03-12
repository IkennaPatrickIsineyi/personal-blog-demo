
import { Subscriber } from "@/app/models/Subscriber";
import { connectDb } from "@/utils/connectDb";
import { logServerError } from "@/utils/logServerError";

type SubscriberType = {
    email: string,
}

export async function POST(req: Request) {
    try {
        const { email }: SubscriberType = await req.json();

        console.log('creating subscriber', {
            email
        })

        await connectDb()

        //Check if email already exisits
        const emailExists = await Subscriber.findOne({ email });


        if (emailExists) {
            return Response.json({ error: 'The email has been taken. Please use a different email' })
        }
        else {
            await Subscriber.create({
                email
            });

            console.log('subscriber created');

            return Response.json({ data: true })
        }

    } catch (error) {
        return logServerError(error, req.url)
    }
}