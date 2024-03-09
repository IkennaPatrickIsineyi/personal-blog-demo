import { NextResponse } from "next/server";
import { getSession } from "./auth/useSession";
import { logServerError } from "./utils/logServerError";

export async function middleware(req: Request) {
    try {
        const pathname = (new URL(req.url)).pathname;

        // const splitPath = pathname.split('/');

        //Auth required routes
        const authRequiredRoutes = [
            //CMS UI routes
            '/cms/about', '/cms/admin', '/cms/blog', '/cms/projects', '/cms/subscribers',
            //CMS API endpoints
            '/api/about', '/api/blog', '/api/project',
        ];

        if (authRequiredRoutes.find(i => pathname.startsWith(i))) {
            //Check if user is logged in
            const { userId } = await getSession()

            //Reject request if user is not logged in
            if (!userId) {
                console.log('user is not authenticated/authorised')
                return NextResponse.redirect(new URL('/cms', req.url))
            }
        }
    } catch (error) {
        return logServerError(error, req.url)
    }
}