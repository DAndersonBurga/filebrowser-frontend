import { useEffect } from "react"
import { useParams } from "react-router-dom"

import useGlobalContext from "../hooks/useGlobalContext"
import ContextMenu from "./ContextMenu"
import { getFilesFromDisk } from "../helpers/disks"
import FileForm from "./FileForm"
import CustomModal from "./CustomModal"
import Table from "./Table"
import useContextMenu from "../hooks/useContextMenu"
import ContextMenuOptions from "./ContextMenuOptions"

const DiskContent = () => {
    const { store } = useGlobalContext()
    const { 
        files, setFiles, contextMenu, 
        setContextMenu, modalIsOpen, closeModal 
    } = store
    
    const { handleOnAuxClick } = useContextMenu()

    const { diskId } = useParams()

    useEffect(() => {
        
        const getFiles = async () => {
            const { data } = await getFilesFromDisk(diskId)
            setFiles(data)
        }

        getFiles()
    }, [])

  return (
    <section 
        className="h-full bg-slate-100 p-2 text-black overflow-y-auto"

        onAuxClick={handleOnAuxClick}
        onContextMenu={(e) => e.preventDefault()}
        onClick={() => setContextMenu({ visible: false, x: 0, y: 0 })}
    >

        {contextMenu?.visible && (
            <ContextMenu>
                <ContextMenuOptions />
            </ContextMenu>
        )}

        <Table
            files={files}
        />

        <CustomModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
        >
            <FileForm />
        </CustomModal>
    </section>
  )
}

export default DiskContent