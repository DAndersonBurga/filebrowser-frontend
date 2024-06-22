import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import useGlobalContext from "../hooks/useGlobalContext"
import ContextMenu from "./ContextMenu"
import { getFilesFromDisk } from "../helpers/disks"
import FileForm from "./FileForm"
import CustomModal from "./CustomModal"
import Table from "./Table"

const DiskContent = () => {
    const { store } = useGlobalContext()
    const { files, setFiles } = store
    
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

export default DiskContent