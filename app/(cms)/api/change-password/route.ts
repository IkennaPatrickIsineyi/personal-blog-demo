import { User } from "@/app/models/User";
import { deleteSession, getSession } from "@/auth/useSession";
import { connectDb } from "@/utils/connectDb";
import { hashPassword } from "@/utils/hashPassword";
import { logServerError } from "@/utils/logServerError";

export async function POST(req: Request) {
    try {
        const { email, token } = await getSession();

        const payload = await req.json()

        if (email === payload.email && token === payload.token) {
            const newPassword = payload.password1;
            //hash the password
            const hash = await hashPassword(newPassword);

            await connectDb()

            //update the account password
            await User.updateOne({ email }, { $set: { password: hash } });

            //Delete the session
            await deleteSession()

            return Response.json({ data: true });
        }
        else {
            return Response.json({ data: false });
        }
    } catch (error) {
        return logServerError(error, req.url)
    }
}