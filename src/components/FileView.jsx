import { useMemo } from "react"
import useGlobalContext from "../hooks/useGlobalContext"

const FileView = () => {

  const { store } = useGlobalContext()
  const { selectedFileId, files } = store

  const file = useMemo(() => files?.find(f => f?.id === selectedFileId), [selectedFileId])

  return (
    
    <div className="w-[30rem] p-4 bg-slate-50 text-pretty">
        <h1 className="text-center text-blue-500 font-bold text-2xl mb-4">{file?.name}</h1>
        <p className="text-normal">
            <span className="font-bold">Descripción:</span> {file?.description}
        </p>
        <p>
            <span className="font-bold">Contenido:</span> {file?.content}
        </p>
    </div>
  )
}

export default FileView