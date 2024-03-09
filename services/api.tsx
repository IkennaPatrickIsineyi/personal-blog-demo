import React, { useEffect, useState } from "react"

import axios from 'axios'

type ReturnType = {
    data: any
}

type Props = {
    method: any,
    body?: any,
    url: string
}

export const useApi = () => {

    const [processing, setProcessing] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [controller, setController] = useState<AbortController | null>(null)


    useEffect(() => {
        return () => {
            console.log('aborting request')
            controller && controller.abort()
        }
    }, [])

    useEffect(() => {
        error && setError(null);
        success && setSuccess(null);
    }, [processing])

    const request = async ({ method, body, url }: Props) => {
        setProcessing(true);

        try {
            const controller = new AbortController()
            setController(controller);

            if (controller) {
                const response = await axios({
                    method,
                    data: body,
                    url,
                    baseURL: process.env.NEXT_PUBLIC_SITEURL,
                    signal: controller.signal
                });

                if (response && response.status === 200) {
                    setProcessing(false)
                    setTimeout(() => {
                        response.data?.error && setError(response.data?.error)
                        response.data?.successMsg && setSuccess(response.data?.successMsg)
                    }, 100);
                    return response.data
                }
                else {
                    setProcessing(false)
                    return { data: null }
                }
            }

        } catch (error) {
            console.log('api request error', error)
            setProcessing(false)
            return { data: null }
        }
    }


    return { processing, request, error, success }
}