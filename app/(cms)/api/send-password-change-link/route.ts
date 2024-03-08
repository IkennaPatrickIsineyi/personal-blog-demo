import { updateSession } from "@/auth/useSession";
import { User } from '@/app/models/User'
import { randomUUID } from "crypto";
import sendEmail from "../../../../services/sendEmail";
import { passwordResetTemplate } from "../../../../utils/emailTemplate";
import { logServerError } from "@/utils/logServerError";
import { connectDb } from "@/utils/connectDb";

export async function POST(req: Request) {
    try {
        const payload = await req.json()
        const userEmail = payload?.email

        await connectDb()

        //Find the user that has the email
        const userExists = await User.findOne({ email: userEmail });

        if (userExists) {
            //Generate unique id
            const uniqueId = randomUUID();

            //Verification Url
            const url = `${process.env.NEXT_PUBLIC_SITEURL}/cms/change-password/${uniqueId}/${userEmail}`

            //Send email containing the verification URL
            await sendEmail({
                toEmail: userEmail,
                fromHeading: `Wickrose CMS<${process.env.EMAIL}>`,
                subject: 'Password Reset',
                text: `Please follow this link to reset your password. ${url}`,
                html: passwordResetTemplate({ url })
            })

            //Save the vertification token and email address
            await updateSession({ key: 'email', value: userEmail });
            await updateSession({ key: 'token', value: uniqueId })

            return Response.json({ data: true })
        }
        else {
            //Do not send any email because the user does not exist.
            // However, do not let the sender know that there is no such user.
            //It could be a trick to get you to confirm that a particular user exists in the system.
            console.log('email was not sent because the email does not exist in our database')
            return Response.json({ data: true })
        }
    } catch (error) {
        return logServerError(error, req.url)
    }
}