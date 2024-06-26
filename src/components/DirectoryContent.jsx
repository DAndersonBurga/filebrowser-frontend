import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import useGlobalContext from "../hooks/useGlobalContext"
import ContextMenu from "./ContextMenu"
import { getFilesFromDirectory } from "../helpers/files"
import FileForm from "./FileForm"
import CustomModal from "./CustomModal"
import Table from "./Table"
import useContextMenu from "../hooks/useContextMenu"
import ContextMenuOptions from "./ContextMenuOptions"
import { getFilesFromDisk } from "../helpers/disks"
import FileView from "./FileView"
import FileProperties from "./FileProperties"

const DirectoryContent = () => {
    const { store } = useGlobalContext()
    const { 
        files, setFiles, setContextMenu, contextMenu, modalIsOpen, closeModal,
         viewFileModalIsOpen, setViewFileModalIsOpen, propertiesFileModalIsOpen, setPropertiesFileModalIsOpen
    } = store

    const { handleOnAuxClick } = useContextMenu()
            
    const { diskId, directoryId } = useParams()
    const [loading, setLoading] = useState(true)

    const getFiles = async () => {
        if(directoryId) {
            const { data } = await getFilesFromDirectory(diskId, directoryId)
            setFiles(data)
        } else {
            const { data } = await getFilesFromDisk(diskId)
            setFiles(data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getFiles()
            setLoading(false)
        }

        fetchData()
    }, [])

    useEffect(() => {
        if(!loading) {
            getFiles();
        }
    }, [directoryId])


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

        <CustomModal
            modalIsOpen={viewFileModalIsOpen}
            closeModal={() => setViewFileModalIsOpen(false)}
        >
            <FileView />
        </CustomModal>

        <CustomModal
            modalIsOpen={propertiesFileModalIsOpen}
            closeModal={() => setPropertiesFileModalIsOpen(false)}
        >
            <FileProperties />
        </CustomModal>
    </section>
  )
}

export default DirectoryContent