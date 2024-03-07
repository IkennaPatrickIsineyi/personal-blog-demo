export function logServerError(error: any, url: string) {
    console.log('Something went wrong at', { url, error });
    return Response.json({ error: 'something went wrong' })
}