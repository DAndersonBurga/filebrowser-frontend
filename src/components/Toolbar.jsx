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
import HomeIcon from "../icons/other/HomeIcon"
import SaveIcon from "../icons/other/SaveIcon"
import { exportFileSystem } from "../helpers/fileSystem"

const Toolbar = () => {

    const { store } = useGlobalContext();
    const { selectedFileId, elementActionInfo, files } = store;

    const location = useLocation();

    const { handleClickCutAction, handleClickCopyAction, handleClickPasteAction,
        handleClickDeleteAction, handleClickEditAction, handleClickShowPropertiesAction } = useFileHandler();

    const file = useMemo(() => files?.find(f => f?.id === selectedFileId), [selectedFileId]);

    const handleClickExportFileSystem = async () => {
        const { data } = await exportFileSystem();

        const dataJson = JSON.stringify(data, null, 2);

        const url = window.URL.createObjectURL(new Blob([dataJson], {type: "application/json"}));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "fileSystem.json");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <section className="w-full bg-gray-700 h-28 flex items-center px-4 py-2 text-white justify-between">
            <div className="flex gap-6">
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

                {(location.pathname !== "/app/quickAccess" && location.pathname !== "/app")
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

                <Link to="/app" className="hover:opacity-80 flex flex-col items-center">
                    <HardDiskIcon className="size-12 text-zinc-300" />
                    <p>Discos</p>
                </Link>
                <Link to="/app/quickAccess" className="hover:opacity-80 flex flex-col items-center">
                    <StarIcon className="size-12 text-yellow-500" />
                    <p>Acceso rápido</p>
                </Link>
            </div>

            <div className="flex px-2 gap-4">
                <button 
                    onClick={handleClickExportFileSystem}
                    className="hover:opacity-80 flex flex-col items-center"
                >
                    <SaveIcon className="size-12 text-white" />
                    <p>Guardar Sistema</p>
                </button>
                <Link to="/" className="hover:opacity-80 flex flex-col items-center">
                    <HomeIcon className="size-12 text-gray-100" />
                    <p>Inicio</p>
                </Link>
            </div>
        </section>
    )
}

export default Toolbar