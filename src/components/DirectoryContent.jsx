import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import ContextMenu from "./ContextMenu"
import Table from "./Table"
import CustomModal from "./CustomModal"
import FileForm from "./FileForm"
import useGlobalContext from "../hooks/useGlobalContext"
import { copyFile, cutFile, deleteFile, getFilesFromDirectory } from "../helpers/files"
import { FILE_ACTION } from "../constants/file"
import { toast } from "react-toastify"

const DirectoryContent = () => {
    const { store } = useGlobalContext()
    const { files, setFiles, selectedFileId, setSelectedFileId, elementActionInfo,  setElementActionInfo} = store
    
    const { diskId, directoryId } = useParams()
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 })
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getFiles = async () => {
            const { data } = await getFilesFromDirectory(diskId, directoryId)
            setLoading(false)
            setFiles(data)
        }

        getFiles()
    }, [])

    useEffect(() => {
        const getFiles = async () => {
            const { data } = await getFilesFromDirectory(diskId, directoryId)
            setFiles(data)
        }

        if(!loading) {
            getFiles()
        }
    }, [directoryId])

    const handleOnAuxClick = (e) => {
        e.preventDefault()

        setContextMenu({
          visible: !contextMenu?.visible,
          x: e.clientX,
          y: e.clientY
        })
    }

    const handleClickCutAction = () => {
        setElementActionInfo({
            action: FILE_ACTION.CUT,
            sourceDiskId: diskId,
            sourceParentId: directoryId,
            fileId: selectedFileId,
            destinationDiskId: "",
            destinationParentId: ""
        })
    }

    const handleClickCopyAction = () => {

        setElementActionInfo({
            action: FILE_ACTION.COPY,
            sourceDiskId: diskId,
            sourceParentId: directoryId,
            fileId: selectedFileId,
            destinationDiskId: "",
            destinationParentId: ""
        })
    }

    const handleClickPasteAction = async () => {
        

        elementActionInfo.destinationDiskId = diskId
        elementActionInfo.destinationParentId = directoryId

        const { sourceDiskId, sourceParentId, destinationDiskId, destinationParentId, action } = elementActionInfo

        if(Object.values(elementActionInfo).includes("")) {
            return;
        }

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

            // Implement cut action
            const cutResponse = await cutFile(elementActionInfo);
            setElementActionInfo({})
            setSelectedFileId("")
            toast.success(cutResponse.data.message)
        }

        const filesResponse = await getFilesFromDirectory(diskId, directoryId)
        setFiles(filesResponse.data)
    }

    const handleClickDeleteAction = async () => {
        try {
            await deleteFile(diskId, directoryId, selectedFileId)
            toast.success("Archivo eliminado correctamente")

            const filesResponse = await getFilesFromDirectory(diskId, directoryId)
            setFiles(filesResponse.data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const open = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)

  return (
    <section 
        className="h-full bg-slate-100 p-2 text-black overflow-y-auto"
        onAuxClick={handleOnAuxClick}
        onContextMenu={(e) => e.preventDefault()}
        onClick={() => setContextMenu({ visible: false, x: 0, y: 0 })}
    >

        {contextMenu?.visible && (
            <ContextMenu
                y={contextMenu.y}
                x={contextMenu.x}
            >
                <button 
                    className="btn-context"
                    onClick={open}
                >
                    Nuevo
                </button>
                <button
                    onClick={handleClickCutAction}
                    className="btn-context"
                    disabled={selectedFileId === ""}
                >
                    Cortar
                </button>
                <button 
                    onClick={handleClickCopyAction}
                    className="btn-context"
                    disabled={selectedFileId === ""}
                >
                    Copiar
                </button>
                <button 
                    onClick={handleClickPasteAction}
                    className="btn-context"
                    disabled={elementActionInfo?.fileId === ""}
                >
                    Pegar
                </button>
                <button 
                    className="btn-context"
                    disabled={selectedFileId === ""}
                    onClick={handleClickDeleteAction}
                >
                    Eliminar
                </button>
            </ContextMenu>
        )}

        <Table
          files={files}
        />

        <CustomModal
            open={openModal}
            handleClose={handleClose}
        >
            <FileForm
                handleClose={handleClose}
            />
        </CustomModal>
    </section>
  )
}

export default DirectoryContent