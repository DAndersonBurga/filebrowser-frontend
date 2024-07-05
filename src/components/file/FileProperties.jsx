import { useMemo } from "react"
import useGlobalContext from "../../hooks/useGlobalContext"
import { formatDate } from "../../helpers"

const FileProperties = ({ disk }) => {
    const { store } = useGlobalContext()
    const { selectedFileId, files } = store

    const file = useMemo(() => {
        if(disk) {
            return disk;
        } else {
            return files?.find(f => f?.id === selectedFileId);
        }
    }, [selectedFileId])
  
    return (
      
      <div className="w-[30rem] p-4 bg-slate-50 text-pretty">
          <h1 className="text-center text-blue-500 font-bold text-2xl mb-4">{file?.name}</h1>
          {file?.label && (
            <p>
                <span className="font-bold">Etiqueta:</span> {file?.label}
            </p>
          )}
          <p>
              <span className="font-bold">Ruta:</span> {file?.path}
          </p>
          <p>
              <span className="font-bold">Descripción:</span> {file?.description}
          </p>
          <p>
              <span className="font-bold">Tamaño:</span> {file?.size} KB
          </p>
          <p>
            <span className="font-bold">Tipo:</span> {file?.fileType}
          </p>
          <p>
            <span className="font-bold">Fecha de creación:</span> {file?.creationAt && formatDate(file?.creationAt)}
          </p>
          <p>
            <span className="font-bold">Ultima modificación:</span> {file?.lastModifiedAt && formatDate(file?.lastModifiedAt)}
          </p>
      </div>
    )
}

export default FileProperties