
import { Box, Typography } from "@mui/material";
import Dropzone, { Accept, DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { fileUploadStyle } from "./style";
import { Camera, Folder } from "@mui/icons-material";
import { useFileUpload } from "@/services/uploadFile";
import UiLoader from "../UiLoader";

type Props = {
    handleChange: (files: any) => void,
    fileHeight?: string | number,
    fileWidth?: string | number,
    maxSize?: string | number,
    multiple?: boolean,
    accept?: Accept,
    extensionArray?: string[],
    file?: string,
    errorMsg?: string,
    height?: string | number,
    width?: string | number
}

export default function ImageUpload({ handleChange, fileHeight, fileWidth, maxSize,
    multiple, accept, extensionArray = [], file = '', errorMsg, height, width }: Props) {

    const { processing, request, error, success } = useFileUpload()

    const handleFiles = async (files: Array<File>) => {
        const fileArray = Array.from(files).map(file => {
            return file
        })

        //Upload the files to cloud storage
        const uploadedFiles = await request({ fileArray })

        console.log('result of file upload', uploadedFiles)

        handleChange(Object.values((uploadedFiles || [])[0] || {})[0])
    }


    return <Box sx={{ width, height, minHeight: { xs: '200px', sm: 'inherit' } }}>
        <Dropzone onDrop={handleFiles} multiple={multiple} accept={accept}>
            {({ getRootProps, getInputProps, isDragActive }: {
                isDragActive: boolean,
                getRootProps: <T extends DropzoneRootProps>(props?: T) => T,
                getInputProps: <T extends DropzoneInputProps>(props?: T) => T
            }) =>
                <Box  {...getRootProps()} sx={{
                    ...fileUploadStyle.container,
                    border: isDragActive ? '2px dashed #BF0606' : '2px dashed rgba(28, 29, 34, 0.3)',
                    bgcolor: isDragActive ? 'rgba(191, 6, 6, 0.08)' : '#F8F8F8',
                    ...(!multiple && file?.length ? {
                        backgroundImage: `url(${file})`,
                        backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat',
                    } : {}),
                }}>
                    {processing ? <UiLoader /> :
                        file?.length > 0 ?
                            <Box sx={fileUploadStyle.labelContainer}>
                                <Camera sx={fileUploadStyle.camera} />
                                <Typography sx={fileUploadStyle.changeImage}>
                                    Click to Change image
                                </Typography>
                            </Box>
                            : <Box sx={fileUploadStyle.addImageContainer}>

                                {/* Upload icon */}
                                {/*   <Folder sx={fileUploadStyle.uploadIcon} /> */}

                                {/* First row */}
                                <Box sx={fileUploadStyle.wrapper1}>

                                    {/* click to upload label */}
                                    <Typography component='label'
                                        sx={fileUploadStyle.clickLabel}>
                                        Click to here to upload
                                    </Typography>

                                    {/* Other part of label */}
                                    <Typography sx={fileUploadStyle.dragLabel}>
                                        or drag and drop file
                                    </Typography>
                                </Box>

                                {/* Second row: allowed file extensions */}
                                <Typography sx={fileUploadStyle.imageInfo}>
                                    Image format must be one of {extensionArray.join(', ')} (size {fileHeight} by {fileWidth}). Maximum file size {maxSize}
                                </Typography>
                            </Box>}
                </Box>
            }
        </Dropzone>

        {(error || errorMsg) ? (
            <Typography sx={fileUploadStyle.errorLabel}>{errorMsg || error}</Typography>
        ) : null}
    </Box>
}