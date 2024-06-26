import { useMemo } from "react";
import useFileHandler from "../hooks/useFileHandler";
import useGlobalContext from "../hooks/useGlobalContext";
import { FILE_TYPE } from "../constants/file";

const ContextMenuOptions = () => {

    const { store } = useGlobalContext()
    const { selectedFileId, elementActionInfo, openModal, files, setViewFileModalIsOpen } = store

    const { handleClickCutAction, handleClickCopyAction, 
        handleClickPasteAction, handleClickDeleteAction, handleClickShowPropertiesAction } = useFileHandler();

    const file = useMemo(() => files?.find(f => f?.id === selectedFileId), [selectedFileId]);

    const handleClickShow = () => {
        setViewFileModalIsOpen(true)
    }

    return (
        <>
            <button
                className="btn-context"
                onClick={openModal}
            >
                Nuevo
            </button>
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
                    onClick={handleClickShowPropertiesAction}
                >
                    Propiedades
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
                disabled={!elementActionInfo?.fileId}
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
        </>
    )
}

export default ContextMenuOptions