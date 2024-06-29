import { useEffect } from "react";
import Table from "../components/Table"
import { getQuickAccess } from "../helpers/quickAccess";
import useGlobalContext from "../hooks/useGlobalContext";
import useContextMenu from "../hooks/useContextMenu";
import ContextMenu from "../components/ContextMenu";
import ContextMenuOptions from "../components/ContextMenuOptions";
import CustomModal from "../components/CustomModal";
import FileView from "../components/FileView";
import FileProperties from "../components/FileProperties";
import FileForm from "../components/FileForm";

const QuickAccessPage = () => {

    const { store } = useGlobalContext();
    const { 
        files, setFiles, setContextMenu, contextMenu, viewFileModalIsOpen, modalIsOpen, closeModal,
        setViewFileModalIsOpen, propertiesFileModalIsOpen, setPropertiesFileModalIsOpen
    } = store;

    const { handleOnAuxClick } = useContextMenu()

    useEffect(() => {
        const getQuickAccessFiles = async () => {
            const { data } = await getQuickAccess()
            setFiles(data)
        }

        getQuickAccessFiles()
    }, [])

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

export default QuickAccessPage