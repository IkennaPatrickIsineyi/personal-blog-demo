import { getSession } from "@/auth/useSession";

export async function GET() {
    const { email, userId } = await getSession()

    return Response.json({ data: { email, userId } })
}