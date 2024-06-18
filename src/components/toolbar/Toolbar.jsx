import FileCopyIcon from "../../icons/files/FileCopyIcon"
import FileEditIcon from "../../icons/files/FileEditIcon"
import FilePasteIcon from "../../icons/files/FilePasteIcon"
import FilePropertiesIcon from "../../icons/files/FilePropertiesIcon"
import ScissorIcon from "../../icons/tools/ScissorIcon"

const Toolbar = () => {
  return (
    <section className="w-full bg-gray-700 h-28 flex items-center px-4 text-white gap-6">
        <button className="flex flex-col items-center hover:opacity-80">
            <FilePropertiesIcon className="size-12" />
            <p>Propiedades</p>
        </button>

        <button className="flex flex-col items-center hover:opacity-80">
            <FileCopyIcon className="size-12" />
            <p>Copiar</p>
        </button>

        <button className="flex flex-col items-center hover:opacity-80">
            <FilePasteIcon className="size-12" />
            <p>Pegar</p>
        </button>

        <button className="flex flex-col items-center hover:opacity-80">
            <ScissorIcon className="size-12" />
            <p>Cortar</p>
        </button>

        <button className="flex flex-col items-center hover:opacity-80">
            <FileEditIcon className="size-12" />
            <p>Editar</p>
        </button>
    </section>
  )
}

export default Toolbar