import { useMemo } from "react";
import useFileHandler from "../hooks/useFileHandler";
import useGlobalContext from "../hooks/useGlobalContext";
import { FILE_TYPE } from "../constants/file";
import { useParams } from "react-router-dom";

const ContextMenuOptions = () => {

    const { store } = useGlobalContext()
    const { selectedFileId, elementActionInfo, openModal, files, setViewFileModalIsOpen } = store

    const { diskId, directoryId } = useParams();

    const { handleClickCutAction, handleClickCopyAction, handleClickCreateQuickAccess, handleClickExportFile,
        handleClickPasteAction, handleClickDeleteAction, handleClickShowPropertiesAction } = useFileHandler();

    const file = useMemo(() => files?.find(f => f?.id === selectedFileId), [selectedFileId]);

    const handleClickShow = () => {
        setViewFileModalIsOpen(true)
    }

    return (
        <>
            {(diskId || directoryId) && (
                <button
                    className="btn-context"
                    onClick={openModal}
                >
                    Nuevo
                </button>
            )}
            
            {file?.fileType === FILE_TYPE.TXT && (
                <button
                    className="btn-context"
                    onClick={handleClickShow}
                >
                    Ver
                </button>
            )}
            <button
                className="btn-context"
                disabled={selectedFileId === ""}
                onClick={handleClickShowPropertiesAction}
            >
                    Propiedades
            </button>

            <button
                className="btn-context"
                disabled={selectedFileId === ""}
                onClick={() => handleClickExportFile(file)}
            >
                Exportar
            </button>

            {(diskId || directoryId) && (
                <button
                    className="btn-context"
                    disabled={selectedFileId === ""}
                    onClick={handleClickCreateQuickAccess}
                >
                    Crear acceso rápido
                </button>
            )}
            
            <button
                onClick={() => handleClickCutAction(file)}
                className="btn-context"
                disabled={selectedFileId === ""}
            >
                Cortar
            </button>
            <button
                onClick={() => handleClickCopyAction(file)}
                className="btn-context"
                disabled={selectedFileId === ""}
            >
                Copiar
            </button>
            {(diskId || directoryId) && (
                <button
                    onClick={handleClickPasteAction}
                    className="btn-context"
                    disabled={!elementActionInfo?.fileId}
                >
                    Pegar
                </button>
            )}
            
            <button
                className="btn-context"
                disabled={selectedFileId === ""}
                onClick={() => handleClickDeleteAction(file)}
            >
                Eliminar
            </button>
        </>
    )
}

export default ContextMenuOptions