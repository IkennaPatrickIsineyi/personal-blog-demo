import { Dispatch, SetStateAction } from "react";

interface DeleteProps {
    setStatus: Dispatch<SetStateAction<string | null | undefined>>,
    setError: Dispatch<SetStateAction<string | null | undefined>>,
    selectItemsRows: Array<string>,
    deleteEndpoint: string,
    request: (props: { method: string, body: { [key: string]: any }, url: string }) => Promise<{ [key: string]: any }> | null,
    closeDeleteAllWarning: () => void,
}


export const deleteAll = async ({ setStatus, request, setError, selectItemsRows, deleteEndpoint, closeDeleteAllWarning, }: DeleteProps) => {
    setStatus('submitting')
    request({ method: 'POST', body: selectItemsRows, url: deleteEndpoint })?.then(
        resp => {
            if (resp?.data) {
                console.log('deleted ');
                closeDeleteAllWarning();
                window.location.reload()
                return resp?.data
            }
            else if (resp?.error) {
                closeDeleteAllWarning();
                setError(resp?.error)
                return resp?.data
            }
            else {
                console.log('error deleting ');
                closeDeleteAllWarning();
                return resp?.data
            }
        },
        err => {
            console.log('error deleting', err);
            closeDeleteAllWarning();
        }
    );
}

