import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import useGlobalContext from "../hooks/useGlobalContext"
import ContextMenu from "./ContextMenu"
import { getFilesFromDisk } from "../helpers/disks"
import FileForm from "./FileForm"
import CustomModal from "./CustomModal"
import Table from "./Table"
import { FILE_ACTION } from "../constants/file"
import { copyFile } from "../helpers/files"
import { toast } from "react-toastify"

const DiskContent = () => {
    const { store } = useGlobalContext()
    const { files, setFiles, selectedFileId, setSelectedFileId, setElementActionInfo, elementActionInfo } = store
    
    const { diskId } = useParams()
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 })
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        
        const getFiles = async () => {
            const { data } = await getFilesFromDisk(diskId)
            setFiles(data)
        }

        getFiles()
    }, [])

    const handleOnAuxClick = (e) => {
        e.preventDefault()
    
        setContextMenu({
          visible: !contextMenu?.visible,
          x: e.clientX,
          y: e.clientY
        })
    }

    const open = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)

    const handleClickCutAction = () => {
        setElementActionInfo({
            action: FILE_ACTION.CUT,
            sourceDiskId: diskId,
            sourceParentId: diskId,
            fileId: selectedFileId,
            destinationDiskId: "",
            destinationParentId: ""
        })
    }

    const handleClickCopyAction = () => {

        setElementActionInfo({
            action: FILE_ACTION.COPY,
            sourceDiskId: diskId,
            sourceParentId: diskId,
            fileId: selectedFileId,
            destinationDiskId: "",
            destinationParentId: ""
        })
    }

    const handleClickPasteAction = async () => {
        
        elementActionInfo.destinationDiskId = diskId
        elementActionInfo.destinationParentId = diskId

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

           // Implement cut action
        }

        const filesResponse = await getFilesFromDisk(diskId)
        setFiles(filesResponse.data)
    }

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

export default DiskContent