import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import useGlobalContext from "../hooks/useGlobalContext"
import ContextMenu from "./ContextMenu"
import { getFilesFromDisk } from "../helpers/disks"
import FileForm from "./FileForm"
import CustomModal from "./CustomModal"

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

        <div>
            {files?.length === 0 && <p>No hay archivos</p>}

            {files?.map(file => (
                <div key={file.id}>
                    <p>{file.name}</p>
                </div>
            ))}
        </div>

        <CustomModal
            open={openModal}
            handleClose={handleClose}
        >
            <FileForm />
        </CustomModal>
    </section>
  )
}

export default DiskContent