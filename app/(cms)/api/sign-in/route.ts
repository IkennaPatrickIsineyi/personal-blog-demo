import { getSession, setSession } from "@/auth/useSession";
import { User } from '@/app/models/User'
import { connectDb } from '@/utils/connectDb'
import { comparePasswords } from '@/utils/comparePasswords'

export async function POST(req: Request) {
    const { email, userId } = await getSession();
    //If user is already logged in, return true to show that the user is logged in
    if (email || userId) return Response.json({ data: true, successMsg: 'Already logged in' })

    //const { searchParams } = new URL(req.url)

    const payload = await req.json()
    const userEmail = payload?.email
    const userPassword = payload?.password

    await connectDb();

    //Get the user with the email
    const user = await User.findOne({ email: userEmail });

    //Check if the password of the user matches the password in the request
    const passwordMatch = await comparePasswords({ password: userPassword, hash: user?.password });

    console.log('passwords matched?', passwordMatch)

    //Abort if the passwords do not match
    if (!passwordMatch) return Response.json({ data: false, error: 'Invalid login credentials' })

    //Log the user in if the passwords match
    await setSession({ email: userEmail || '', userId: user?._id });

    return Response.json({ data: true, successMsg: 'Login successful!' })
}