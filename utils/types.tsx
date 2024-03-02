export type BlogPostType = {
    id: string | number,
    image?: string,
    date: string,
    author: string,
    title: string,
    introduction: string,
    categories: {
        value: string,
        color: string
    }[],
}[]

export type ProjectType = {
    id: string | number,
    image?: string,
    title: string,
    introduction: string,
    categories: {
        value: string,
        color: string
    }[],
}[]

export type SessionData = {
    email: string,
    userId: string | number,
    token?: string
}