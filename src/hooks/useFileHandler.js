import { toast } from "react-toastify"
import { FILE_ACTION, FILE_TYPE } from "../constants/file"
import { copyFile, cutFile, deleteFile, getFilesFromDirectory } from "../helpers/files"
import { getFilesFromDisk } from "../helpers/disks"
import useGlobalContext from "./useGlobalContext"
import { useParams } from "react-router-dom"
import { createQuickAccess, getQuickAccess } from "../helpers/quickAccess"
import { downloadFile } from "../helpers/fileSystem"

const useFileHandler = () => {

    const { store } = useGlobalContext()
    const { 
        setElementActionInfo, elementActionInfo, setSelectedFileId, 
        setFiles, selectedFileId, openModal, setCurrentEditingFile, files, setPropertiesFileModalIsOpen
    } = store
    
    const { diskId, directoryId } = useParams()

    const handleClickCutAction = (file) => {
        
        setElementActionInfo({
            action: FILE_ACTION.CUT,
            sourceDiskId: diskId,
            sourceParentId: directoryId ? directoryId : file.parentId,
            fileId: selectedFileId,
            destinationDiskId: "",
            destinationParentId: ""
        })
    }
    
    const handleClickCopyAction = (file) => {
    
        setElementActionInfo({
            action: FILE_ACTION.COPY,
            sourceDiskId: diskId ? diskId : file.diskId,
            sourceParentId: directoryId ? directoryId : file.parentId,
            fileId: selectedFileId,
            destinationDiskId: "",
            destinationParentId: ""
        })
    }
    
    const handleClickPasteAction = async (file) => {

        elementActionInfo.destinationDiskId = diskId ? diskId : file.diskId
        elementActionInfo.destinationParentId = directoryId ? directoryId : (file?.parentId ? file.parentId : diskId)
    
        const { sourceDiskId, sourceParentId, destinationDiskId, destinationParentId, action } = elementActionInfo
    
        if(Object.values(elementActionInfo).includes("")) {
            return;
        }

        try {
            if(action === FILE_ACTION.COPY) {
                const copyResponse = await copyFile(elementActionInfo);
                setElementActionInfo({})
                setSelectedFileId("")
                toast.success(copyResponse.data.message)
        
            } else {
                
                if(destinationDiskId === sourceDiskId && 
                    destinationParentId === sourceParentId) {
                    return;
                }
        
               if(destinationDiskId === sourceDiskId && 
                    destinationParentId === sourceParentId) {
                    return;
               }
        
                const cutResponse = await cutFile(elementActionInfo);
                setElementActionInfo({})
                setSelectedFileId("")
                toast.success(cutResponse.data.message)
            }
        
            await getFiles();
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    
    const handleClickDeleteAction = async (file) => {
        try {
            await deleteFile(
                diskId ? diskId : file.diskId, 
                directoryId ? directoryId : (file?.parentId ? file.parentId : diskId), 
                selectedFileId
            )
            setSelectedFileId("")
            setElementActionInfo({})
            toast.success("Archivo eliminado correctamente")
    
            await getFiles()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleClickEditAction = () => {
        
        const fileFound = files?.find(f => f?.id === selectedFileId)

        setCurrentEditingFile({
            id: fileFound.id,
            name: fileFound.name,
            description: fileFound.description,
            content: fileFound.content,
            fileType: fileFound.fileType  
        })

        openModal()
    }

    const handleClickShowPropertiesAction = () => {
        setPropertiesFileModalIsOpen(true)
    }
    
    const handleClickCreateQuickAccess = async () => {
        const { data } = await createQuickAccess(diskId, selectedFileId);

        toast.success(data.message)
    }

    const getFiles = async () => {
        let filesResponse;

        if(!directoryId && !diskId) {
            const { data } = await getQuickAccess();
            setFiles(data)
            return;
        }

        if(directoryId) {
            filesResponse = await getFilesFromDirectory(diskId, directoryId)
        } else {
            filesResponse = await getFilesFromDisk(diskId)
        }

        setFiles(filesResponse.data)
    }

    const handleClickExportFile = async (file) => {
        const response = await downloadFile(file)

        const blob = new Blob([response.data])
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;

        let filename;

        if(file?.fileType === FILE_TYPE.TXT) {
            filename = file?.name + ".txt"
        } else {
            filename = file?.name + ".zip"
        }

        link.setAttribute('download', `${filename}`); // Nombre del archivo
        document.body.appendChild(link);
        link.click();

        // Limpiar la URL creada
        window.URL.revokeObjectURL(url);
    }

    return {
        handleClickCutAction,
        handleClickCopyAction,
        handleClickPasteAction,
        handleClickDeleteAction,
        handleClickEditAction,
        handleClickShowPropertiesAction,
        handleClickCreateQuickAccess,
        handleClickExportFile
    }
}

export default useFileHandler