import { User } from "@/app/models/User";
import { deleteSession, getSession } from "@/auth/useSession";
import { hashPassword } from "@/utils/hashPassword";

export async function POST(req: Request) {
    try {
        const { email, token } = await getSession();

        const payload = await req.json()

        console.log('change password token data', { payload, email, token })

        if (email === payload.email && token === payload.token) {
            console.log('changing password');
            const newPassword = payload.password1;
            //hash the password
            const hash = await hashPassword(newPassword);

            console.log('new password', { newPassword, hash });

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
        console.log('something went wrong', error);
        return Response.error()
    }
}