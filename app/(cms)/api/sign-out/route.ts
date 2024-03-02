import { deleteSession, getSession } from "@/auth/useSession";

export async function GET() {
    const { email, userId } = await getSession();

    //If user is already logged out, return true to show that the user is logged out
    if (!email && !userId) return Response.json({ data: true });

    //Log the user out
    await deleteSession();

    return Response.json({ data: true });
}