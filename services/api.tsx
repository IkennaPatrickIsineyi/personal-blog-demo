/* import { useEffect } from "react"

type ReturnType = {
    data: any
}

type Props = {
    method: any,
    body?: any
}

export const api = async () => {
    let controller: AbortController

    const x = { method: 'GET' }

    useEffect(() => {
        controller = new AbortController();

        return
    }, [])

    const result = await (await fetch(x)).json()


    return { data: result }
} */