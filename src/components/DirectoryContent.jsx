import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import ContextMenu from "./ContextMenu"
import Table from "./Table"
import CustomModal from "./CustomModal"
import FileForm from "./FileForm"
import useGlobalContext from "../hooks/useGlobalContext"
import { getFilesFromDirectory } from "../helpers/files"
import useFileHandler from "../hooks/useFileHandler"

const DirectoryContent = () => {
    const { store } = useGlobalContext()
    const { files, setFiles, selectedFileId, elementActionInfo, openModal, setContextMenu, contextMenu } = store

    const { handleClickCutAction, handleClickCopyAction, handleClickPasteAction, handleClickDeleteAction } = useFileHandler();
    
    const { diskId, directoryId } = useParams()
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
                    onClick={openModal}
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

        <CustomModal>
            <FileForm />
        </CustomModal>
    </section>
  )
}

export default DirectoryContent