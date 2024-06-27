import { Link, useLocation } from "react-router-dom"
import FileCopyIcon from "../icons/files/FileCopyIcon"
import FileEditIcon from "../icons/files/FileEditIcon"
import FilePasteIcon from "../icons/files/FilePasteIcon"
import FilePropertiesIcon from "../icons/files/FilePropertiesIcon"
import TrashIcon from "../icons/other/TrashIcon"
import ScissorIcon from "../icons/tools/ScissorIcon"
import HardDiskIcon from "../icons/files/HardDiskIcon"
import useGlobalContext from "../hooks/useGlobalContext"
import useFileHandler from "../hooks/useFileHandler"
import StarIcon from "../icons/other/StarIcon"
import { useMemo } from "react"

const Toolbar = () => {

    const { store } = useGlobalContext();
    const { selectedFileId, elementActionInfo, files } = store;

    const location = useLocation();

    const { handleClickCutAction, handleClickCopyAction, handleClickPasteAction, 
        handleClickDeleteAction, handleClickEditAction, handleClickShowPropertiesAction } = useFileHandler();

    const file = useMemo(() => files?.find(f => f?.id === selectedFileId), [selectedFileId]);


  return (
    <section className="w-full bg-gray-700 h-28 flex items-center px-4 py-2 text-white gap-6">
        <button 
            className="flex flex-col items-center hover:opacity-80 disabled:opacity-50"
            disabled={selectedFileId === ""}
            onClick={handleClickShowPropertiesAction}
        >
            <FilePropertiesIcon className="size-12 text-indigo-400" />
            <p>Propiedades</p>
        </button>

        <button 
            className="flex flex-col items-center hover:opacity-80 disabled:opacity-50"
            disabled={selectedFileId === ""}
            onClick={() => handleClickCopyAction(file)}
        >
            <FileCopyIcon className="size-12 text-green-300" />
            <p>Copiar</p>
        </button>

        {(location.pathname !== "/app/quickAccess" && location.pathname !== "/app" ) 
            && (
            <button 
                className="flex flex-col items-center hover:opacity-80 disabled:opacity-50"
                disabled={!elementActionInfo?.fileId}
                onClick={() => handleClickPasteAction(file)}
            >
                <FilePasteIcon className="size-12 text-amber-400" />
                <p>Pegar</p>
            </button>
        )}

        <button 
            className="flex flex-col items-center hover:opacity-80 disabled:opacity-50"
            disabled={selectedFileId === ""}
            onClick={() => handleClickCutAction(file)}
        >
            <ScissorIcon className="size-12 text-orange-500" />
            <p>Cortar</p>
        </button>

        <button 
            className="flex flex-col items-center hover:opacity-80 disabled:opacity-50"
            disabled={selectedFileId === ""}
            onClick={handleClickEditAction}
        >
            <FileEditIcon className="size-12 text-sky-300" />
            <p>Editar</p>
        </button>

        <button 
            className="flex flex-col items-center hover:opacity-80 disabled:opacity-50"
            disabled={selectedFileId === ""}
            onClick={() => handleClickDeleteAction(file)}
        >
            <TrashIcon className="size-12 text-red-500" />
            <p>Eliminar</p>
        </button>

        <Link to="/app" className="hover:opacity-80">
            <HardDiskIcon className="size-12 text-blue-400" />
            <p>Discos</p>
        </Link>
        <Link to="/app/quickAccess" className="hover:opacity-80 flex flex-col items-center">
            <StarIcon className="size-12 text-yellow-500" />
            <p>Acceso rápido</p>
        </Link>
    </section>
  )
}

export default Toolbar