import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import useGlobalContext from "../hooks/useGlobalContext"
import ContextMenu from "./ContextMenu"
import { getFilesFromDisk } from "../helpers/disks"
import FileForm from "./FileForm"
import CustomModal from "./CustomModal"
import Table from "./Table"
import useFileHandler from "../hooks/useFileHandler"

const DiskContent = () => {
    const { store } = useGlobalContext()
    const { files, setFiles, selectedFileId, elementActionInfo, setCurrentEditingFile } = store

    const { handleClickCutAction, handleClickCopyAction, handleClickPasteAction, handleClickDeleteAction } = useFileHandler();
    
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
    const handleClose = () => {
        setCurrentEditingFile({})
        setOpenModal(false)
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
                    disabled={elementActionInfo?.action === ""}
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
            openModalFileForm={open}
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