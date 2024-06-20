import { Link } from "react-router-dom"
import FileCopyIcon from "../icons/files/FileCopyIcon"
import FileEditIcon from "../icons/files/FileEditIcon"
import FilePasteIcon from "../icons/files/FilePasteIcon"
import FilePropertiesIcon from "../icons/files/FilePropertiesIcon"
import TrashIcon from "../icons/other/TrashIcon"
import ScissorIcon from "../icons/tools/ScissorIcon"
import HardDiskIcon from "../icons/files/HardDiskIcon"

const Toolbar = () => {
  return (
    <section className="w-full bg-gray-700 h-28 flex items-center px-4 text-white gap-6">
        <button className="flex flex-col items-center hover:opacity-80">
            <FilePropertiesIcon className="size-12 text-indigo-400" />
            <p>Propiedades</p>
        </button>

        <button className="flex flex-col items-center hover:opacity-80">
            <FileCopyIcon className="size-12 text-green-300" />
            <p>Copiar</p>
        </button>

        <button className="flex flex-col items-center hover:opacity-80">
            <FilePasteIcon className="size-12 text-amber-400" />
            <p>Pegar</p>
        </button>

        <button className="flex flex-col items-center hover:opacity-80">
            <ScissorIcon className="size-12 text-orange-500" />
            <p>Cortar</p>
        </button>

        <button className="flex flex-col items-center hover:opacity-80">
            <FileEditIcon className="size-12 text-sky-300" />
            <p>Editar</p>
        </button>

        <button className="flex flex-col items-center hover:opacity-80">
            <TrashIcon className="size-12 text-red-500" />
            <p>Eliminar</p>
        </button>

        <Link to="/app" className="hover:opacity-80">
            <HardDiskIcon className="size-12 text-blue-400" />
            <p>Discos</p>
        </Link>
    </section>
  )
}

export default Toolbar