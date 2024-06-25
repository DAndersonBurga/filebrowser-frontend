import { useNavigate } from "react-router-dom"
import BackIcon from "../icons/other/BackIcon"
import useGlobalContext from "../hooks/useGlobalContext"
import File from "./File"

const Table = ({ files, openModalFileForm }) => {

    const { store } = useGlobalContext()
    const { popFromStackPath } = store;

    const navigate = useNavigate();

    const handleOnClickBack = () => {
        popFromStackPath()

        navigate(-1)
    }

    return (
        <div className="relative overflow-x-auto overflow-y-auto shadow-sm">
            <button onClick={handleOnClickBack}
                colSpan="6" className="text-center p-4 flex items-center gap-2 hover:opacity-80">
                <BackIcon className="size-6 text-amber-600" />
                <p>Go back</p>
            </button>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="p-4"></th>

                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tamaño
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha de creación
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha de modificación
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {files?.length === 0 && (
                        <>
                            <tr>
                                <td colSpan="6" className="text-center p-4">No files</td>
                            </tr>
                        </>
                    )}

                    {files?.map(file => (
                        <File 
                            key={file.id}
                            file={file}
                            openModalFileForm={openModalFileForm}
                        />
                    ))}

                    
       
                </tbody>
            </table>
        </div>

    )
}

export default Table