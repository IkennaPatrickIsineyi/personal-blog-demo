import React, { useEffect, useState } from "react"

import axios from 'axios'

type ReturnType = {
    data: any
}

type Props = {
    fileArray: Array<File>
}

export const useFileUpload = () => {

    const [processing, setProcessing] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const controller = new AbortController();


    useEffect(() => {
        return () => {
            console.log('aborting request')
            controller.abort()
        }
    }, [])

    useEffect(() => {
        error && setError(null);
        success && setSuccess(null);
    }, [processing])



    const request = async ({ fileArray }: Props) => {
        console.log('files for upload', fileArray);

        if (!fileArray[0]) {
            console.log('no files selected')
            setError('You have not selected any files')
            return []
        }

        setProcessing(true);

        try {
            const fileUploading = await Promise.all(fileArray.map(async (file: File, index: number) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append("upload_preset", process.env.NEXT_PUBLIC_FILE_UPLOAD_PRESET || '');

                const response = await axios({
                    method: 'POST',
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                    url: process.env.NEXT_PUBLIC_FILE_UPLOAD_URL,
                    signal: controller.signal
                });

                if (response && response.status === 200) {
                    console.log('file uploaded', response.data?.secure_url)
                    return { [index]: response.data?.secure_url }
                }
                else {
                    console.log('upload failed')
                    return { [index]: null }
                }
            }))

            if (fileUploading.length === fileArray.length) {
                console.log('if evaluated')
                setProcessing(false)
                setSuccess('Files uploaded')
                return fileUploading
            }

        } catch (error) {
            console.log('api request error', error)
            setProcessing(false)
            setError('upload failed')
            return []
        }
    }

    return { processing, request, error, success }
}