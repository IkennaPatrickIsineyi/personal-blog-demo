import { getSession } from "@/auth/useSession";

export async function POST(req: Request) {
    const { email, token } = await getSession();

    const payload = await req.json()

    console.log('verify token data', { payload, email, token })

    if (email === payload.email && token === payload.token) {
        return Response.json({ data: true });
    }
    else {
        return Response.json({ data: false });
    }
}