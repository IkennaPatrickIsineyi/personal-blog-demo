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

export type GenericObjectType = {
    [key: string]: any
}

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

export type MenuOptions = {
    id: string,
    label: string,
    path: string,
    children?: {
        id: string,
        label: string,
        path: string,
    }[]
}[]

export type DropdownDataType = {
    image?: string,
    label?: string,
    value?: string
}[]

export type FilterMatcherType = {
    filterOption: GenericObjectType,
    value: any,
    filterText: string | Array<any>
}

