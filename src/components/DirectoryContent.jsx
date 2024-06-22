import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import ContextMenu from "./ContextMenu"
import Table from "./Table"
import CustomModal from "./CustomModal"
import FileForm from "./FileForm"
import useGlobalContext from "../hooks/useGlobalContext"
import { getFilesFromDirectory } from "../helpers/files"

const DirectoryContent = () => {
    const { store } = useGlobalContext()
    const { files, setFiles } = store
    
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
          x: e.clientX - 225,
          y: e.clientY - 150
        })
    }

    const open = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)

  return (
    <section 
        className="h-full bg-slate-100 p-2 text-black relative"
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
                    className="btn-context"
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