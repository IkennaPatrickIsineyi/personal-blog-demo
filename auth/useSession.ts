//Check if a user is logged in

import { sessionOptions } from "@/utils/sessionOptions"
import { SessionData } from "@/utils/types"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"

export async function getSession() {
    const { email, userId, token } = await getIronSession<SessionData>(cookies(), sessionOptions)

    return { email, userId, token }
}

export async function setSession({ email, userId }: SessionData) {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    session.email = email;
    session.userId = userId;

    await session.save()

    return true
}

export async function deleteSession() {
    (await getIronSession<SessionData>(cookies(), sessionOptions)).destroy()

    return true
}

export async function updateSession({ value, key }: { value: string, key: string }) {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    switch (key) {
        case 'token':
            session.token = value;
            break;
    }

    await session.save()

    return true
}