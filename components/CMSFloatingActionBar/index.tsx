import { CSSProperties, useState } from "react";
import { useRouter } from "next/navigation";
import CloseIcon from '@mui/icons-material/Close';
import { Button, Typography } from "@mui/material";
import { Delete, } from "@mui/icons-material";

import WarningModal from '@/components/WarningModal/WarningModal'
import ModalMessage from "../ModalMessage/ModalMessage";
import { floatingBarStyle } from "./style";
import { deleteAll, } from "./functions";
import { useApi } from "@/services/api";

type Props = {
    selectItemsRows: Array<any>, title?: string, handleCancelSelection?: () => void, floatingActions: Array<string>,
    viewUrl?: string, editUrl?: string, read?: boolean, replied?: boolean, deleteEndpoint?: string,
    markAsReadEndpoint?: string, markAsUnreadEndpoint?: string, publishEndpoint?: string, unpublishEndpoint?: string,
    published?: boolean, cancelled?: boolean, cancelEndpoint?: string, defaultEmail?: boolean,
    includesJustConcluded?: string, includesConcluded?: string
}

export default function CMSFloatingActionBar({ selectItemsRows, title, handleCancelSelection, floatingActions,
    viewUrl = '', editUrl = '', read, replied, deleteEndpoint = '', markAsReadEndpoint = '', markAsUnreadEndpoint = '', publishEndpoint = '',
    unpublishEndpoint = '', published, cancelled, cancelEndpoint = '', defaultEmail, includesJustConcluded, includesConcluded
}: Props) {

    const router = useRouter();

    const api = useApi()

    const IconButton = ({ handleClick, label, iconRight, iconLeft, background }: {
        handleClick: () => void, label?: string, iconRight?: any, iconLeft?: any, background?: string
    }) => {
        return <Button sx={{ ...floatingBarStyle.iconButton, bgcolor: background ?? '#F5F5F5', }}
            onClick={handleClick}>
            {iconLeft}  {label} {iconRight}
        </Button>
    }

    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState<{ message?: string, title?: string } | null>(null);

    const [status, setStatus] = useState<string | null | undefined>(null);

    const [error, setError] = useState<string | null | undefined>(null);

    const [handler, setHandler] = useState<string | null | undefined>(null);

    const closeDeleteAllWarning = () => {
        setStatus(null)
        setHandler(null)
        setShowWarning(false)
    }

    const handleView = () => {
        router.push(`${viewUrl}?id=${selectItemsRows[0]}&&published=${published}&&read=${read}&&cancelled=${cancelled}`)
    }

    const handleEdit = () => {
        router.push(`${editUrl}?id=${selectItemsRows[0]}`)
    }

    const handleOpenWarning = ({ message, degree, title, status, handler }: {
        message: string, degree?: string, title?: string, status?: string, handler?: string
    }) => {
        setWarningMessage({ message, title });
        setShowWarning(true);
        setStatus(status)
        setHandler(handler)
    }

    const handleCloseWarning = () => {
        setShowWarning(false);
        setStatus(null);
        setHandler(null)
        setTimeout(() => {
            setWarningMessage(null);
        }, 300)
    }

    const handleInitiateDelete = () => {
        handleOpenWarning({
            message: `You are about to delete the selected ${title}`,
            title: `Delete${selectItemsRows?.length > 1 ? ' all' : ''} the selected ${title}`, status: '', handler: 'delete'
        })
    }

    const handleInitiatePublish = () => {
        handleOpenWarning({
            message: `You are about to publish the selected ${title}, which means they will be visible for everyone to see on the website.`,
            title: `Publish${selectItemsRows?.length > 1 ? ' all' : ''} the selected ${title}`, status: '', handler: 'publish'
        })
    }

    const handleInitiateUnpublish = () => {
        handleOpenWarning({
            message: `You are about to unpublish all the ${title}, which means it will no longer be visible on the website`,
            title: `Unpublish${selectItemsRows?.length > 1 ? ' all' : ''} the selected ${title}`, status: '', handler: 'unpublish'
        })
    }

    const handleInitiateMarkAsRead = () => {
        handleOpenWarning({
            message: `You are about to mark this enquiry as read`,
            title: `Mark${selectItemsRows?.length > 1 ? ' all' : ''} as read`, status: '', handler: 'markAsRead'
        })
    }

    const handleInitiateMarkAsUnread = () => {
        handleOpenWarning({
            message: `You are about to mark this enquiry as unread`,
            title: `Mark${selectItemsRows?.length > 1 ? ' all' : ''} as unread`, status: '', handler: 'markAsUnread'
        })
    }


    const handleInitiateCancel = () => {
        handleOpenWarning({
            message: `You are about to cancel the selected ${title}, which means all events will no longer hold`,
            title: `Cancel${selectItemsRows?.length > 1 ? ' all' : ''} the selected ${title}`, status: '', handler: 'cancel'
        })
    }

    const handleInitiateSetAsDefaultEmail = () => {
        handleOpenWarning({
            message: `This email address will be made the default email address for sending replies to enquiries`,
            title: `Set as default email`, status: '', handler: 'defaultEmail'
        })
    }

    const handleDeleteAll = async () => {
        await deleteAll({
            setStatus, setError, request: api.request, selectItemsRows, deleteEndpoint,
            closeDeleteAllWarning
        })
    }

    const opHandlers: { [key: string]: () => void } = {
        delete: handleDeleteAll,
    }

    const multipleSelection = selectItemsRows?.length > 1

    return <div style={floatingBarStyle.container as CSSProperties}>
        <CloseIcon
            onClick={handleCancelSelection} sx={floatingBarStyle.closeIcon}
        />

        <Typography sx={floatingBarStyle.selectedLabel}>
            {selectItemsRows?.length} {multipleSelection ? 'items' : 'item'} selected
        </Typography>

        {floatingActions?.includes('publish') && ((!includesJustConcluded && !includesConcluded && !published && !multipleSelection) || (multipleSelection && !includesJustConcluded && !includesConcluded)) &&
            <IconButton label={multipleSelection ? 'Publish All' : 'Publish'} handleClick={handleInitiatePublish} />}

        {floatingActions?.includes('unpublish') && (((!includesJustConcluded && !includesConcluded && published || cancelled) && !multipleSelection) || (multipleSelection && !includesJustConcluded && !includesConcluded)) &&
            <IconButton label={multipleSelection ? 'Unpublish All' : 'Unpublish'} handleClick={handleInitiateUnpublish} />}

        {floatingActions?.includes('defaultEmail') && !defaultEmail && !multipleSelection &&
            <IconButton label={'Set as default email'} handleClick={handleInitiateSetAsDefaultEmail} />}

        {floatingActions?.includes('cancel') && ((!includesJustConcluded && !includesConcluded && !cancelled && !multipleSelection) || (multipleSelection && !includesJustConcluded && !includesConcluded)) &&
            <IconButton label={multipleSelection ? 'Cancel All' : 'Cancel'} handleClick={handleInitiateCancel} />}

        {floatingActions?.includes('view') && !multipleSelection &&
            <IconButton label={'View'} handleClick={handleView} />}

        {floatingActions?.includes('edit') && !includesJustConcluded && !includesConcluded && !multipleSelection &&
            <IconButton label={'Edit'} handleClick={handleEdit} />}

        {floatingActions?.includes('markAsRead') && !replied && ((!read && !multipleSelection) || (multipleSelection)) &&
            <IconButton label={multipleSelection ? 'Mark As All Read' : 'Mark As Read'}
                handleClick={handleInitiateMarkAsRead}
            />}

        {floatingActions?.includes('markAsUnread') && !replied && ((read && !multipleSelection) || (multipleSelection)) &&
            <IconButton label={multipleSelection ? 'Mark All As Unread' : 'Mark As Unread'}
                handleClick={handleInitiateMarkAsUnread}
            />}

        {floatingActions?.includes('delete') && (multipleSelection ? floatingActions?.includes('deleteAll') ? true : false : true) &&
            <IconButton label={`Delete ${(multipleSelection) ? 'all' : ''}`} iconRight={<Delete sx={{ fontSize: 13, ml: 1 }} />}
                background='#FF00001A' handleClick={handleInitiateDelete} />}

        {showWarning && <WarningModal
            title={warningMessage?.title} open={showWarning}
            message={warningMessage?.message} status={status || ''}
            proceedAction={async () => { await opHandlers[handler || '']() }} handleCancel={handleCloseWarning} />}


        {error && <ModalMessage
            open={Boolean(error)}
            handleCancel={() => { setError(null) }}
            message={error}
        />}
    </div>
}