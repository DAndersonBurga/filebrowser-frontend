import { Link, useNavigate, useParams } from "react-router-dom"
import { FILE_TYPE } from "../constants/file"
import FolderIcon from "../icons/files/FolderIcon"
import TextFileIcon from "../icons/files/TextFileIcon"
import BackIcon from "../icons/other/BackIcon"
import useGlobalContext from "../hooks/useGlobalContext"

const Table = ({ files }) => {

    const { store } = useGlobalContext()
    const { pushToStackPath, popFromStackPath } = store;

    const { diskId } = useParams();
    const navigate = useNavigate();

    const handleOnClickBack = () => {
        popFromStackPath()

        navigate(-1)
    }

    return (
        <div className="relative overflow-x-auto shadow-sm">
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
                        <tr 
                            className="bg-white border-b  hover:bg-gray-50"
                            id={file.id}
                            key={file.id}
                        >
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>

                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex gap-1 items-center">
                                {file?.fileType === FILE_TYPE.TXT ? (
                                    <>
                                        <TextFileIcon className="w-6 h-6 text-amber-500" />
                                        {file.name}
                                    </>
                                ): (
                                    <Link 
                                        onClick={() => pushToStackPath(file.path)}
                                        to={`/app/${diskId}/${file.id}`} className="flex gap-1 items-center hover:text-blue-600">
                                        <FolderIcon className="w-6 h-6 text-blue-500" />
                                        {file.name}
                                    </Link>
                                )}
                            </th>
                            <td className="px-6 py-4">
                                {file.size}
                            </td>
                            <td className="px-6 py-4">
                                {file.creationAt}
                            </td>
                            <td className="px-6 py-4">
                                {file.lastModifiedAt}
                            </td>
                            <td className="flex items-center px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                                <a href="#" className="font-medium text-red-600 hover:underline ms-3">Remove</a>
                            </td>
                        </tr>
                    ))}

                    
       
                </tbody>
            </table>
        </div>

    )
}

export default Table