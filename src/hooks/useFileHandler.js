import { toast } from "react-toastify"
import { FILE_ACTION } from "../constants/file"
import { copyFile, cutFile, deleteFile, getFilesFromDirectory } from "../helpers/files"
import { getFilesFromDisk } from "../helpers/disks"
import useGlobalContext from "./useGlobalContext"
import { useParams } from "react-router-dom"

const useFileHandler = () => {

    const { store } = useGlobalContext()
    const { 
        setElementActionInfo, elementActionInfo, setSelectedFileId, 
        setFiles, selectedFileId, openModal, setCurrentEditingFile, files, propertiesFileModalIsOpen, setPropertiesFileModalIsOpen
    } = store
    
    const { diskId, directoryId } = useParams()

    const handleClickCutAction = () => {
        
        setElementActionInfo({
            action: FILE_ACTION.CUT,
            sourceDiskId: diskId,
            sourceParentId: directoryId ? directoryId : diskId,
            fileId: selectedFileId,
            destinationDiskId: "",
            destinationParentId: ""
        })
    }
    
    const handleClickCopyAction = () => {
    
        setElementActionInfo({
            action: FILE_ACTION.COPY,
            sourceDiskId: diskId,
            sourceParentId: directoryId ? directoryId : diskId,
            fileId: selectedFileId,
            destinationDiskId: "",
            destinationParentId: ""
        })
    }
    
    const handleClickPasteAction = async () => {
        
        elementActionInfo.destinationDiskId = diskId
        elementActionInfo.destinationParentId = directoryId ? directoryId : diskId
    
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
    
    const handleClickDeleteAction = async () => {
        try {
            
            await deleteFile(
                diskId, 
                directoryId ? directoryId : diskId, 
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
        
        const file = files?.find(f => f?.id === selectedFileId)

        setCurrentEditingFile({
            id: file.id,
            name: file.name,
            description: file.description,
            content: file.content,
            fileType: file.fileType  
        })

        openModal()
    }

    const handleClickShowPropertiesAction = () => {
        setPropertiesFileModalIsOpen(true)
    }

    const getFiles = async () => {
        let filesResponse;

        if(directoryId) {
            filesResponse = await getFilesFromDirectory(diskId, directoryId)
        } else {
            filesResponse = await getFilesFromDisk(diskId)
        }

        setFiles(filesResponse.data)
    }

    return {
        handleClickCutAction,
        handleClickCopyAction,
        handleClickPasteAction,
        handleClickDeleteAction,
        handleClickEditAction,
        handleClickShowPropertiesAction
    }
}

export default useFileHandler